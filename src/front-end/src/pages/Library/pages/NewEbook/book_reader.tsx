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


    const { name, id, book_name, author } = useParams<{ name: string, id: string, book_name: string, author: string }>();

    if (name === undefined || book_name === undefined || author === undefined) return



    const handleDownload = () => {
        const blob = new Blob([texto], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "meu_arquivo.txt";
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

    const HandleUpdate = async () => {

        const atual_cfi = await supabase.from('books').select('book_cfi').eq('book_name', name)
        let atualizar_cfi: any | any[];

        if (localStorage.getItem(name) === null) {
            console.log("Não tem nada no cache");
            atualizar_cfi = atual_cfi.data![0].book_cfi
        } else {
            console.log('Tem algo no cache');
            atualizar_cfi = localStorage.getItem(name)
        }


        console.log("esse é o valor do cfi", atualizar_cfi);


        const { data, error } = await supabase
            .from('books')
            .update(
                {
                    'book_cfi': atualizar_cfi as string,
                    'book_notes': texto
                },
            )
            .eq('book_name', name)
            .select()

        if (error) {
            console.error('Erro no update:', error)
        }

        return data

    }

    const handleSave = async () => {

        const response = (await supabase.from('app_users').select('id').eq('name', id)).data
        const userId = response![0].id

        const { data, error } = await supabase
            .from('books')
            .insert([
                { 'book_name': name, 'book_cfi': localStorage.getItem(name), 'book_notes': texto, 'user_id': userId },
            ])
            .select()

        if (error) {
            console.log('erro em salvar pagina', error);
        }

        return data
    }

    const handleBack = async () => {
        const updateBook = HandleUpdate()
        const data = await updateBook

        if (data?.length === 0) {
            console.log('Novo livro');
            const response = await handleSave()
            return response
        }

        navigate(-1)
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
            <Reader url={`/public/books/${book_name}.epub`} width={width} name={book_name} author={author} />
        </div>
    )
}