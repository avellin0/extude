import "./Search.css"
import { useState } from "react";

interface ViewProps{
    view: Boolean
}

export function Search({view}:ViewProps) {

    const [query, setQuery] = useState("");
    const [book, setBook] = useState<any[]>([])

    const handleBook = async () => {
        const res = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}`)
        const data = await res.json()

        const ordemAlfabetica = data.results.sort((a: any, b: any) =>
            a.title.localeCompare(b.title))

        setBook(ordemAlfabetica)
    }
    return (
        <>
            {view ? (<>
                <div id="search-body-scope">
                    <div id="search-book-scope">
                        <div id="search-area-scope">
                            <input
                                type="text"
                                name=""
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                id="search-area"
                                placeholder="Busque por livro ou autor (original)" />

                            <div id="search-area-btn" onClick={() => handleBook()}>
                                <p>Buscar</p>
                            </div>
                            
                        </div>

                        <div id="search-book-find">
                            {book.map((book, index) => (
                                <>
                                    {
                                        <div key={index} className="search-book-recomendation">
                                            <a href={book.formats["application/epub+zip"]} target="_blank" rel="noopener noreferrer">
                                                <p className="search-book-recomendation-text">{book.title}</p>
                                            </a>
                                        </div>
                                    }
                                </>
                            ))
                            }
                        </div>
                    </div>
                </div>

            </>) : ""}

        </>
    )
}