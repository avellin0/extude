import {notes} from "../../Queries/Notes.queries"
import {NotesProps} from "../../interface/Notes.interface"

export class CreateNoteService {
    async execute({user_id, content_text}: NotesProps) {

        const query = new notes()
        const result = await query.CreateNotes({user_id, content_text})
        
        return result.rows
    }
}