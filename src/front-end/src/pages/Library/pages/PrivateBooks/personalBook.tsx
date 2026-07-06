import { Reader } from "../EpubJS/MyEbook";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import back from "../../assets/icons/back.png";
import write from "../../assets/icons/write.png";

import "./personalBook.css";

interface MobileProps {
    mobile: boolean;
}

export function PersonalBooks({ mobile }: MobileProps) {
    const [file, setFile] = useState<string | null>(null);
    const [showHeader, setShowHeader] = useState(true);
    const [showNotes, setShowNotes] = useState(false);
    const [texto, setTexto] = useState("");

    const navigate = useNavigate();
    const { name,id} = useParams<{ id: string, name: string}>();

    const objectUrl = useRef<string | null>(null);

    const width = showNotes ? "80vw" : "100vw";

    // cleanup do blob URL
    useEffect(() => {
        return () => {
            if (objectUrl.current) {
                URL.revokeObjectURL(objectUrl.current);
            }
        };
    }, []);

    // Upload do EPUB
    const handleUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // limpa URL antiga se existir
        if (objectUrl.current) {
            URL.revokeObjectURL(objectUrl.current);
        }

        const url = URL.createObjectURL(selectedFile);
        objectUrl.current = url;

        setFile(url);
        setShowHeader(false);
    };

    // Salvar notas
    const handleSalvar = () => {
        const blob = new Blob([texto], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "minhas_notas.txt";
        link.click();

        URL.revokeObjectURL(url);
    };

    // Toggle notes
    const handleNotes = () => {
        setShowNotes((prev) => !prev);
    };

    return (
        <div id="reader-body">
            {/* HEADER */}
            <div>
                {showHeader ? (
                    <div id="reader-header">
                        <h1>Selecione seu Livro Epub</h1>
                        <input
                            type="file"
                            accept="application/epub+zip"
                            onChange={handleUrl}
                        />
                    </div>
                ) : (
                    <div
                        id={
                            showNotes
                                ? "reader-header-active"
                                : "reader-header-deactive"
                        }
                    >
                        <div id="reader-settings">
                            {!mobile && (
                                <img
                                    src={write}
                                    alt="notes"
                                    className="icon"
                                    onClick={handleNotes}
                                />
                            )}

                            <img
                                src={back}
                                alt="back"
                                className="icon"
                                onClick={() => navigate(`/library/${name}/${id}`)}
                            />
                        </div>

                        {showNotes && (
                            <div id="reader-scope">
                                <textarea
                                    id="reader-notes"
                                    spellCheck="false"
                                    placeholder="Deixe sua mente livre..."
                                    value={texto}
                                    onChange={(e) => setTexto(e.target.value)}
                                />
                                <button id="save-notes" onClick={handleSalvar}>
                                    Salvar
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* READER */}
            <div>
                {file && <Reader url={file} width={width} name={id || "default-book"} />}
            </div>
        </div>
    );
}