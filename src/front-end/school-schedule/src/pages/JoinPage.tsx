import './JoinPage.css'
import { useState } from 'react'

interface DataPayload {
    userId: number,
    name: string,
    email: string,
    password: string,
    permissions: string        
}

export function Register() {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }
    
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const sendData = async (data: DataPayload): Promise<void> => {
        try {
            const response = await fetch('http://localhost:3000/create_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('network response not ok');
            }

            const responseData = await response.json();
            console.log('Success:', responseData);

        } catch (err) {
            console.log("erro:", err);
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const data: DataPayload = { userId: 4, name: username, email: email, password: password, permissions: "client" };
        await sendData(data);
        console.log("enviado com sucesso");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="register-scope">
                <div className="register-header">ExTudex</div>

                <div className="register-fields">
                    
                    <div className="register-field">
                        <p>Username</p>
                        <input 
                            type="text" 
                            className='register-input-text' 
                            placeholder='Type Your Username' 
                            value={username} 
                            onChange={handleName} 
                        />
                    </div>
                    
                    <div className="register-field">
                        <p>Email</p>
                        <input 
                            type="text" 
                            className='register-input-text'  
                            placeholder='Type Your Email' 
                            value={email} 
                            onChange={handleEmail} 
                        />
                    </div>

                    <div className="register-field">
                        <p>Password</p>
                        <input 
                            type="password" 
                            className='register-input-text' 
                            placeholder='Type Your Password' 
                            value={password} 
                            onChange={handlePassword} 
                        />
                    </div>
                
                </div>

                <input type="submit" value="Enviar" className='register-input-submit' />
                
            </div>
        </form>
    );
}
