import { Reader } from "../EpubJS/MyEbook";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import back from "../../assets/icons/back.png";
import write from "../../assets/icons/write.png";

import './book_reader.css'

export function EbookReader() {
    const [notes, setNotes] = useState(false)
    const [texto, setTexto] = useState<string>("");

    const navigate = useNavigate()

    const [width, setWidth] = useState("100vw")


    const { name } = useParams<{ name: string }>();


    const handleSalvar = () => {
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


    return (
        <div id="reader-root">

            <div id={width === "100vw" ? "reader-header-deactive" : "reader-header-active"}>
                <div id="reader-settings">
                    <img src={write} alt="" className="icon" onClick={handleNotes} />
                    <img src={back} alt="" className="icon" onClick={() => navigate(-1)} />
                </div>

                {width === "80vw" && notes ? (
                    <div id="reader-scope">
                        <textarea id="reader-notes" spellCheck="false" placeholder="Deixe sua mente livre..." onChange={(e) => setTexto(e.target.value)} />
                        <button id="save-notes" onClick={handleSalvar}>Salvar</button>
                    </div>
                ) : ""}
            </div>

            <Reader url={`/books/${name}.epub`} width={width} />
        </div>
    )
}