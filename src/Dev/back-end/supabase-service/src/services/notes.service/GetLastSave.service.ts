import { notes } from "../../Queries/Notes.queries";

export class LastSaveNotes {
    async execute(id: string) {

        try {
            const lastnotes = new notes()
            
            const result = await lastnotes.VerifyLastNotes(id)

            return result
        
        } catch (error) {
            console.log("this is the error:", error);
            return {message: "id não encontrado"}
        }
    }
}