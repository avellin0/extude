import "./CreatePost.css"
import { useNavigate, useParams } from "react-router-dom"
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Toolbar } from './ToolBar'
import { EditorView } from './EditorView'
import { useState } from "react"

export const CreatePost = () => {

    const [sendCheck, setSendCheck] = useState(false)
    const [titulo, setTitulo] =  useState('')
    const [subTitulo, setSubTitulo] = useState('')

    const { username, id} = useParams<{ username: string, id: string }>()
    const navigate = useNavigate()

   
    const handleSend = async () => {
        localStorage.setItem('titulo', titulo)
        localStorage.setItem('subtitulo', subTitulo)
        
        setSendCheck(true)
        navigate(`preview`)
    }

    return (
        <>
            <div id="CP-body-scope">
                <div id="CP-body">
                    <div id="CP-header">
                        <h2>Imagem de capa</h2>
                        <p>Clique para adicionar uma imagem de capa</p>
                        <button type="button">+ Adicionar Imagem</button>
                    </div>

                    <div id="CP-main">
                        <div className="CP-inputs-scope">
                            <p>Titulo</p>
                            <input type="text" placeholder="Digite o titulo do post..." onChange={(e) => setTitulo(e.target.value)}/>
                        </div>
                        <div className="CP-inputs-scope">
                            <p>Subtitulo</p>
                            <input type="text" placeholder="Escreva uma breve descrição do post..." onChange={(e) => setSubTitulo(e.target.value)}/>
                        </div>
                    </div>

                    <div id="CP-content-scope">
                        <p>Content</p>
                        <EditorProvider extensions={[StarterKit]} editorProps={{
                            attributes: {
                                class: 'editor-content',
                            },
                        }}>
                            <Toolbar />
                            <EditorView send={sendCheck} />
                        </EditorProvider>
                    </div>

                    <div id="CP-buttons-scope">
                        <button type="button" id="CP-btn-cancelar" onClick={() => navigate(`/home/${username}/${id}`)}>Cancelar</button>
                        <button type="button" id="CP-btn-publicar" onClick={() => handleSend()}>Vizualizar</button>
                    </div>
                </div>
            </div>

        </>
    )
}

