import { db } from "database/client-db"


interface NotesProps{
    user_id: string,
    content_text: string
}

export class notes {
    async VerifyLastNotes(id: string) {
        try {
            const research = await db.query("SELECT content FROM notes WHERE user_id = $1;", [id])
            const result = research.rows[research.rows.length - 1].content
            console.log(`this is the teste ${result}`);

            return result

        } catch (error) {
            console.log("this is the error:", error);
            return { message: "id não encontrado" }
        }
    }

    async CreateNotes({user_id, content_text}: NotesProps){
        console.log({ user_id, content_text });

        if (!user_id || !content_text) {
            throw new Error("error ao salvar anotação")
        }

        const user = await db.query('INSERT INTO notes(note_id,user_id,content) VALUES (uuid_generate_v4(),$1,$2)', [user_id, content_text])

        return user
    }
}