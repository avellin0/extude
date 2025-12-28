import "./LoginPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supa-client.ts";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Atual valor:", email);
    }, []);

    const verificacao = async () => {
        try {
            console.log("email atual:", email);

            const { data } = await supabase.functions.invoke("login", {
                body: { "email": email },
            });

            console.log('dados', data.name);
            

            const name = data.name;

            navigate(`/home/${name}`);
        } catch (err) {
            console.log("Ocorreu um erro:", err);
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
                                onClick={() => navigate("/home/Davi")}
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
