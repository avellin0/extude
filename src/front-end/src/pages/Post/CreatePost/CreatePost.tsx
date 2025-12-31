import "./CreatePost.css"
import { useNavigate, useParams} from "react-router-dom"

export const CreatePost = () => {

    const {username} = useParams<{username: string}>()
    const navigate = useNavigate()


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
                            <input type="text" placeholder="Digite o titulo do post..." />
                        </div>
                        <div className="CP-inputs-scope">
                            <p>Subtitulo</p>
                            <input type="text" placeholder="Escreva uma breve descrição do post..." />
                        </div>
                    </div>

                    <div id="CP-content-scope">
                        <p>Conteúdo</p>
                        <textarea name="" id="" placeholder="Comece a escrever o conteúdo do post..."></textarea>
                    </div>

                    <div id="CP-buttons-scope">
                        <button type="button" id="CP-btn-cancelar" onClick={() => navigate(`/home/${username}`)}>Cancelar</button>
                        <button type="button" id="CP-btn-publicar">Vizualizar</button>
                    </div>
                </div>
            </div>

        </>
    )
}

