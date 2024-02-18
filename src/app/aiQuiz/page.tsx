import Main from "@/components/Main";
import { sendMail } from "@/lib/mail";


const send = async(subject: string, message: string) => {
    "use server";
    await sendMail({
        to: "alissaedward82@gmail.com",
        name: "Alissa",
        subject: subject,
        body: message
    });
};


export default function Home() {
    return <Main send={send} />;
}