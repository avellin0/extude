import { Reader } from "../EpubJS/MyEbook";
import { useState } from "react";
import {  useParams } from "react-router-dom";


import './book_reader.css'

export function EbookReader() {
    
    const [width] = useState("100vw")


    const { name, book_name, author } = useParams<{ name: string, id: string, book_name: string, author: string }>();

    if (name === undefined || book_name === undefined || author === undefined) return



  

    // const handleBack = async () => {
    //     const updateBook = HandleUpdate()
    //     const data = await updateBook

    //     if (data?.length === 0) {
    //         console.log('Novo livro');
    //         const response = await handleSave()
    //         return response
    //     }

    //     navigate(-1)
    // }




    return (
        <div id="reader-root">
            <Reader url={`/public/books/${book_name}.epub`} width={width} name={book_name} author={author} />
        </div>
    )
}