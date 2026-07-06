import './Preview.css'
import { supabase } from "../../../supabase/supa-client"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const Preview = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const html_body = localStorage.getItem('html_editor')
    const content = localStorage.getItem('json_editor')
    const title = localStorage.getItem('titulo')
    const subTitle = localStorage.getItem('subtitulo')

    const addOnDb = async () => {
        if (!title || !content) {
            setError("Dados incompletos")
            return
        }

        try {
            setLoading(true)
            setError(null)

            const { error } = await supabase
                .from('post')
                .insert([
                    {
                        title,
                        subtitle: subTitle,
                        content,
                        author_id: '20b6bc85-45db-405a-9664-4355d0d84d7e'
                    }
                ])

            if (error) throw error

            localStorage.removeItem('html_editor')
            localStorage.removeItem('json_editor')
            localStorage.removeItem('titulo')
            localStorage.removeItem('subtitulo')

            navigate(-2)

        } catch (err) {
            console.error(err)
            setError("Erro ao publicar post")
        } finally {
            setLoading(false)
        }
    }

    if (!html_body) {
        console.error("No content to preview")
        return 
    }

    console.log("html_body:", html_body)        
    

    return (
        <div id="pv-body">

            <div id="pv-title">
                <h1>{title}</h1>
            </div>

            <div id="pv-subtitle">
                <h2>{subTitle}</h2>
            </div>

            <div id="pv-main">
                <article dangerouslySetInnerHTML={{ __html: html_body }} />
            </div>

            <div id="pv-footer">
                {error && <p className="error">{error}</p>}

                <button
                    id='pv-btn'
                    onClick={addOnDb}
                    disabled={loading}
                >
                    {loading ? "Publicando..." : "Publicar"}
                </button>
            </div>

        </div>
    )
}
