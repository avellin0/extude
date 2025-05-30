import './JoinPage.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface DataPayload {
    name: string,
    email: string,
    password: string,
    permissions: string        
}

interface Email{
    email: string
}


export function Register() {

    const navigate = useNavigate()

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }
    
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);''
    }
    
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }


    

    const AlreadySign = async(email: Email | string) => {
        try{
            const response = await fetch('http://localhost:3000/students',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                })
            })

            if(! response.ok){
                console.log("Deu MERDA");
            }

            const user = await response.json()

            console.log("Usuario registrado com sucesso:", user);

         }catch(err){
            console.log('deu esse erro aqui na importação:', err);
            return
        }
    }


    const sendData = async (data: DataPayload): Promise<void> => {
        try {
            AlreadySign(email)

            const createAccount = await fetch('https://extude.onrender.com/create_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!createAccount.ok) {
                throw new Error('network response not ok');
            }

            const responseData = await createAccount.json();

            console.log('Success:', responseData);   
        } catch (err) {
            console.log("erro:", err);
        }
    }

    const pegarId = async() => {
        
        const getId = await fetch(`https://extude.onrender.com/student_id/${email}`)

        if(!getId.ok){
            throw new Error('Não estou conseguindo buscar');
        }

        const data = await getId.json()
        const id = data[0]?.userid
        
        console.log("esse é o id do usuario:", id);
        
        
        navigate(`/home/${id}`)
    }

   
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try{
  
        const data: DataPayload = { name: username, email: email, password: password, permissions: "client" };
        

        if(data){
            setEmail('')
            setPassword('')
            setUsername('') 
        }   

        await sendData(data);
        await pegarId()

        console.log("enviado com sucesso");

        }catch(err){
            console.log("erro aqui:", err);
        }
    }



    return ( 
    <div className='register-body'>

        <div id="register-introduction-scope">
            <div id='register-triangulo-itens'/>
            <h1 id='register-introduction-text'>Junte-se a <span>maior</span> <br/> <span>comunidade</span> de estudos</h1>
            <div id='register-three-bolls-itens'/>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="register-scope">
                <div className="register-header">
                    <h1>Create an account</h1>
                    <p>Already have an account? <a href="/login">Log in</a></p>
                    </div>

                <div className="register-fields">
                    
                    <div className="register-field">
                        <p>Username</p>
                        <input 
                            type="text" 
                            maxLength={25}
                            className='register-input-text' 
                            placeholder='Username' 
                            value={username} 
                            onChange={handleName} 
                        />
                    </div>
                    
                    <div className="register-field">
                        <p>Email</p>
                        <input 
                            type="email" 
                            maxLength={25}
                            className='register-input-text'  
                            placeholder='Email@email.com' 
                            value={email} 
                            onChange={handleEmail} 
                        />
                    </div>

                    <div className="register-field">
                        <p>Password</p>
                        <input 
                            type="password" 
                            maxLength={25}
                            className='register-input-text' 
                            placeholder='********' 
                            value={password} 
                            onChange={handlePassword}
                        />
                    </div>
                
                </div>

                <input type="submit" value="Enviar" className='register-input-submit' />
                
            </div>
        </form>
    
  </div>
 );
}
