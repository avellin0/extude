import { useEffect, useState } from "react";
import "./reading.css";
import livro from "/public/assets/icons/open-book.png"
import { useNavigate, useParams } from "react-router-dom";

export function Reading() {
    const [books, setBooks] = useState<Record<string, string>>({});
    const [update, setUpdate] = useState(false)
    const {name, id} = useParams<{name: string, id:string}>()

    useEffect(() => {
        const allData: Record<string, string> = {};

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key) continue;
            if (!key.startsWith("epub.")) continue;

            const value = localStorage.getItem(key);
            if (value !== null) {
                allData[key] = value;
            }
        }

        setBooks(allData);
    }, [update]);


    const navigate = useNavigate()


    return (
        <div id="reading-body">
            <div id="reading-container">
                <div id="reading-sidebar">
                    <div id="reading-sidebar-logo-scope">
                        <div id="reading-sidebar-logo" />
                    </div>
                    <div id="reading-sidebar-icons-scope">
                        <div className="reading-sidebar-icons" id="reading-sidebar-icon-home" onClick={() => navigate(`/home/${name}/${id}`)}/>
                        <div className="reading-sidebar-icons" id="reading-sidebar-icon-book" onClick={() => navigate(`/library/${name}/${id}`)}/>
                        <div className="reading-sidebar-icons" id="reading-sidebar-icon-confirm" />
                        <div className="reading-sidebar-icons" id="reading-sidebar-icon-setting" />
                    </div>
                </div>

                <div id="reading-books">
                    <div id="reading-books-header">
                        <div>
                            <p>Meus livros</p>
                        </div>
                        <div id="reading-books-add">
                            <button id="reading-books-btn">
                                + Adicionar Livros
                            </button>
                        </div>
                    </div>
                    <div id="reading-books-title">
                        <h2>Quais livros você está lendo?</h2>
                        <p>Gerencie os livros que você esta lendo atualmente</p>
                    </div>
                    <div id="reading-books-progress">
                        {Object.keys(books).length === 0 ? (
                            <div id="reading-book-progress-noBooks">
                                <img id="reading-book-img" src={livro} alt="" />
                                <h3>Você ainda não está lendo nada </h3>
                                <button id="reading-book-add-new-book">Adicionar seu primeiro livro</button>
                            </div>
                        ) : (
                            <>
                                {
                                    Object.entries(books).map(([key, value]) => {
                                        const book = JSON.parse(value)

                                        return (
                                            <div key={key} className="book-item">
                                                <div className="book-item-img-and-author">
                                                    <div className="book-item-img" style={{ backgroundImage: `url(/public/assets/images/${key.substring(5)}.jpg)` }} />
                                                    <div>
                                                        <p><strong>{key.substring(5)}</strong></p>
                                                        <p>{book.author}</p>
                                                        <input type="range" value={book.progress} disabled />
                                                    </div>
                                                </div>

                                                <div className="book-item-btn-scope">
                                                    <button className="book-item-update-btn" onClick={() => setUpdate(true)}>Atualizar</button>
                                                    <button className="book-item-etc-btn">...</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

