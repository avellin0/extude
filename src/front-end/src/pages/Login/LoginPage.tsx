import './LoginPage.css'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginPage(){
    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const navigate = useNavigate()

    const verificacao = async() => { 

    try{
        const getId = await fetch(`https://extude.onrender.com/student_id/${email}`)

        if(!getId.ok){
            throw new Error('Não estou conseguindo buscar');
        }

        const data = await getId.json()
        const id = data[0]?.userid

        console.log("isso que eu recebo", data[0].userid);
        console.log("esse é o id do usuario:", id);

        navigate(`/home/${id}`)
        
     }catch(err){
        console.log("Deu essa merda ai:", err); 
     }
    }

    return(
        <>
            <div id="Login-Scope">
                <div id="login-form-scope">
                    <h1 id='login-title'>Welcome <br/> back  to the <br/> exTude</h1>
                    <div id="login-input-scope">
                        <input type="text" className='login-input' placeholder='Email' onChange={(e) => setEmail(e.target.value) }/>
                        <input type="text" className='login-input' placeholder='Senha' defaultValue={senha} onChange={(e) => setSenha(e.target.value)}/>
                        <button id='login-btn' onClick={() => verificacao()}>Entrar</button>
                    </div>
                </div>
            </div>
        </>
    )
}