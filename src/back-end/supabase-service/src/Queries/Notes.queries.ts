import { title } from "process";
import { supabase } from "../../database/client-db"


interface NotesProps {
    user_id: string,
    content_text: string,
}

export class notes {
    async VerifyLastNotes(id: string) {
        try {
            const research = await supabase.from('notes').select('content').eq('user_id', id)
            const result = research.data![research.data!.length - 1].content
            console.log(`this is the teste ${result}`);

            return result

        } catch (error) {
            console.log("this is the error:", error);
            return { message: "id não encontrado" }
        }
    }

    async CreateNotes({ user_id, content_text }: NotesProps) {
        console.log({ user_id, content_text });

        if (!user_id || !content_text) {
            throw new Error("error ao salvar anotação")
        }

        const title = "hello"

        const user = await supabase.from('notes').insert({ user_id, title, content: content_text })

        return user
    }

   
}