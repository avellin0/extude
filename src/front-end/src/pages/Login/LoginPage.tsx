import "./LoginPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

 
    const verificacao = async () => {
        try {
            const { data } = await fetch("http://localhost:3000/login", { //Preciso mudar isso aqui, no back-end é /login/:id. Como passar o id antes de saber o usuario ? talvez seja melhor mudar a lógica
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, "password": senha, "refresh_email": email}),
                credentials: "include"
            }).then((res) => res.json());


            navigate(`/home/${data.username}/${data.id}`);
        } catch (err) {
            console.error("Erro ao fazer login:", err);
        }
    };

    return (
        <>
            <div id="Login-Scope">
                <div id="login-form-scope">
                    <h1 id="login-title">
                        Welcome <br /> back to the <br /> exTude
                    </h1>
                    <div id="login-input-scope">
                        <input
                            type="text"
                            className="login-input"
                            placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            className="login-input"
                            placeholder="Senha"
                            defaultValue={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <div id="login-btn-scope">
                            <button
                                type="button"
                                className="login-btn"
                                onClick={() => verificacao()}
                            >
                                Entrar
                            </button>
                            <button
                                type="button"
                                className="login-btn"
                                id="login-btn-recrutadores"
                                onClick={() => navigate("/home/recruiter/0744edd3-f3fc-44b7-9837-3f0a3f9927c4")}
                            >
                                Recrutadores
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
