import './LoginPage.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

    const verificacao = async () => {
        try {
            const getId = await fetch(`http://localhost:3000/verify_account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: senha
                })
            })

            if (!getId.ok) {
                throw new Error('Não estou conseguindo buscar');
            }

            const data = await getId.json()

            console.log("Esse é o resultado da pesquisa:", data[0].name);
            

            const id = data[0].name

            console.log("esse é o id do usuario:", id);

            navigate(`/home/${id}`)

        } catch (err) {
            console.log("Deu essa merda ai:", err);
        }
    }

    return (
        <>
            <div id="Login-Scope">
                <div id="login-form-scope">
                    <h1 id='login-title'>Welcome <br /> back  to the <br /> exTude</h1>
                    <div id="login-input-scope">
                        <input type="text" className='login-input' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" className='login-input' placeholder='Senha' defaultValue={senha} onChange={(e) => setSenha(e.target.value)} />
                        <div id='login-btn-scope'>
                            <button className='login-btn' onClick={() => verificacao()}>Entrar</button>
                            <button className='login-btn' id='login-btn-recrutadores' onClick={() => alert("Recrutadores")}>Recrutadores</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}