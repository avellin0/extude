import "./LoginPage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//  import { createClient } from '@supabase/supabase-js'
import { supabase } from "../../supabase/supa-client";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const emailRef = useRef<string>("");
    const navigate = useNavigate();

    // interface userProps{
    //     email: string,
    //         password: string
    // }

    useEffect(() => {
        console.log("Atual valor:", email);
    }, []);

    const verificacao = async () => {
        try {
            // const User: userProps = { email: email, password: senha } // 0.1

            /* const getId = await fetch("http://127.0.0.1:54321/functions/v1/hello-world", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
                },
                body: JSON.stringify({ name: email})
            })

            const data = await getId.json();


            if (!getId.ok || !data.message) {
                throw new Error('Erro na requisição para a função edge');
            }

            console.log('Isso que recebo do edge:', data.message);



            console.log("user:", User);

            */
            // 0.2

            // =====================================================

            // const getId = await fetch("http://localhost:3000/verify_account", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(User)
            // })

            // const getId = await supabase.from('app_users').select('*').eq("email", email)

            // const data = await getId.json();
            // console.log("this is the getId:", data);

            // if (!data || data[0].length === 0) {
            //     throw new Error('Não estou conseguindo buscar o email');
            // }

            // const data = getId.data;
            // console.log("Esse é o resultado da pesquisa:", data[0].name);

            // const id = data.message;

            // console.log("esse é o id do usuario:", id);

            //=====================================================

            console.log("email atual:", email); // Teste

            const { data, error } = await supabase.functions.invoke(
                "hello-world",
                {
                    body: { name: email },
                },
            );

            if (error) {
                console.error(error);
                return;
            }

            console.log("nome retornado:", data.message);

            navigate(`/home/${data.message}`);
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
                                emailRef.current = e.target.value;
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
                                className="login-btn"
                                onClick={() => verificacao()}
                            >
                                Entrar
                            </button>
                            <button
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
