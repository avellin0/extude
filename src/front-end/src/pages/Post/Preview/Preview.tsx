import './Preview.css'
import { supabase } from "../../../supabase/supa-client"
import { useNavigate } from 'react-router-dom'

export const Preview = () => {

    const navigate = useNavigate()
    const html_body = localStorage.getItem('html_editor')

    console.log("Esse é o json do editor", localStorage.getItem('json_editor'));

    const content = localStorage.getItem('json_editor')
    const title = localStorage.getItem('titulo') 
    const subTitle = localStorage.getItem('subtitulo') 

    

    const AddOnDb = async () => {
        const {data, error} = await supabase.from('post').insert([
            { title: title, subtitle: subTitle, content: content, author_id: '20b6bc85-45db-405a-9664-4355d0d84d7e'},
        ])

        if(error) {
            console.log("Esse foi o erro", error);
            return
        }

        console.log('Esse é os dados enviados', data);
        navigate(-2)
    }


    if (!html_body) {
        console.log('Erro no html');

        return
    }


    return (
        <>
            <div id="pv-body">

                <div id="pv-title">
                    {/* <h1>Titulo</h1> */}
                    <h1>{localStorage.getItem('titulo')}</h1>
                </div>

                <div id="pv-subtitle">
                    {/* <h2>SubTitulo</h2> */}
                    <h2>{localStorage.getItem('subtitulo')}</h2>
                </div>

                <div id="pv-main">
                    <article dangerouslySetInnerHTML={{ __html: html_body }} /> 
                   </div>

                <div id="pv-footer">
                    <button id='pv-btn' onClick={() => AddOnDb()}>Publicar</button>
                </div>

            </div>

        </>
    )
}