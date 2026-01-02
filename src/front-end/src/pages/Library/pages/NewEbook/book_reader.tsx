import { Reader } from "../EpubJS/MyEbook";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from '../../../../supabase/supa-client'

import back from "../../assets/icons/back.png";
import write from "../../assets/icons/write.png";
import './book_reader.css'

export function EbookReader() {
    const [notes, setNotes] = useState(false)
    const [texto, setTexto] = useState<string>("");
    const [anotacoes, setAnotacoes] = useState('')

    const navigate = useNavigate()

    const [width, setWidth] = useState("100vw")


    const { name } = useParams<{ name: string }>();

    if (name === undefined) return



    const handleDownload = () => {
        const blob = new Blob([texto], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "meu_arquivo.txt"; // Você pode permitir que o usuário escolha
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const handleNotes = () => {
        setWidth("80vw")

        if (notes) {
            setWidth("100vw")
            return setNotes(false)
        }

        setNotes(true)
    }

    const handleSalvar = async () => {

        const { data, error } = await supabase
            .from('books')
            .update({'book_notes': anotacoes })
            .eq('book_name', 'conde_de_monte_cristo')
            .select()

        if (!data || error) {   
            console.log("Deu erro em buscar o ultimo diz:", error);
        }
        
    }

    const GetLastNotes = async () => {
        let { data: books, error } = await supabase
            .from('books')
            .select('*')
            .eq('book_name', name)

        if (!books || books.length === 0) return error

        return books[0].book_notes
    }

    useEffect(() => {

        const teste = GetLastNotes()
        teste.then((r) => setAnotacoes(r)
        )
    })



    return (
        <div id="reader-root">

                <div id={width === "100vw" ? "reader-header-deactive" : "reader-header-active"}>
                    <div id="reader-settings">
                        <img src={write} alt="" className="icon" onClick={handleNotes} />
                        <img src={back} alt="" className="icon" onClick={() => handleSalvar()} />
                    </div>

                    {width === "80vw" && notes ? (
                        <div id="reader-scope">
                            <textarea
                                id="reader-notes"
                                spellCheck="false"
                                defaultValue={anotacoes}
                                placeholder="Deixe sua mente livre..."
                                onChange={(e) => setTexto(e.target.value)} />

                            <button type="button" id="save-notes" onClick={handleDownload}>Download</button>
                        </div>
                    ) : ""}
                </div>

            <Reader url={`/books/${name}.epub`} width={width} />
        </div>
    )
}