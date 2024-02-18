import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import openai, { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { match } from "assert";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import {OpenAIStream, StreamingTextResponse} from "ai"


export async function POST(req: Request) {

    try{

        

        const body = await req.json();
        console.log("POST function called");
        const messages: ChatCompletionMessage[] = body.messages;

        console.log("Received messages: ", messages);

        const messagesTruncated = messages.slice(-6);

        console.log("Truncated messages: ", messagesTruncated);

        const embedding = await getEmbedding(
            messagesTruncated.map((message)=> message.content).join("\n")
        );
        
        const {userId} = auth()

        const vectorQueryResponse = await notesIndex.query({
            vector: embedding,
            topK: 4,
            filter: {userId}
        })

       // console.log("Vector query response: ", vectorQueryResponse.matches)

        const relevantNotes = await prisma.note.findMany({
            where: {
                id: {
                    in: vectorQueryResponse.matches.map((match )=> match.id)
                }
            }
        })

        console.log("Relevant notes found: ", relevantNotes);

        const systemMessages: ChatCompletionMessage={
            role: "assistant",
            content: 
            "You are an itelligent note-taking app. You answer the user's question based on their existing notes." +
            "The relevant notes for this query are:\n" +
            relevantNotes.map((note)=>`Title: ${note.title}\n\nContent:\n${note.content}`).join("\n\n")
        };

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            stream: true,
            messages: [systemMessages, ...messagesTruncated],
           
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
        
        

    }catch(error){
        console.error("An error occurred: ", error);
        return Response.json({error: "Internal server error"}, {status: 500});
    }
}