import "./book_reader.css"
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"

interface BookProps {
    good_read: string[];
}

export function BookReader() {


    const [book, setBook] = useState<BookProps | null>(null);
    const [chapter, setChapter] = useState(0);

    const { name } = useParams<string>()

    useEffect(() => {
        console.log("Esse é o parametro:", name);
        GetBook();
    }, []);


    const [timer, setTimer] = useState(0);
    const [isLoading] = useState(true)

    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isLoading]);

    const GetBook = async () => {
        const response = await fetch(`https://pylibrary.onrender.com/books?name=${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Data fetched:", data);



        setBook(data);
    }


    return (
        <>

            <div id="book-reader">
                <div id="book-sidebar">
                    <div id="book-side-notes">
                        <h1>Notes</h1>
                        <textarea name="" id="book-side-text" spellCheck="false" placeholder="Deixe sua mente livre escreva aqui!" />
                    </div>

                    <div id="book-side-chapter">
                        <h3>pagina {chapter + 1}</h3>
                        <button id="book-side-btn" onClick={() => setChapter(chapter + 1)}>Proximo capitulo</button>
                    </div>
                </div>

                <div id="book-area">
                    {book?.good_read[chapter < book.good_read.length ? chapter : 0] || <>
                        <p>Loanding...</p>
                        <br />
                        <p id="book-area-alert">
                            Pode levar até 45s. Caso demore aperte - Proximo Capitulo -
                            <br/>
                            {timer}s
                        </p>
                    </>}
                </div>

            </div>
        </>
    )
}