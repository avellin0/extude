import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";

export function PageNotFound() {
    const navigate = useNavigate();

    return (
        <div id="PageNotFound-body">
            <div id="pg-container">
                <h1 id="pg-title"> <span>Cadastre-se</span> para acessar esta <span>página</span></h1>
                <p id="pg-description">Desculpe, a página que você está procurando não está disponível no momento.</p>
            </div>
            <div id="pg-footer">
                <button id="pg-button" onClick={() => navigate('/login')}>Cadastrar-se</button>
                <p onClick={() => navigate(-1)}>Go back</p>
            </div>
        </div>
    );
}
