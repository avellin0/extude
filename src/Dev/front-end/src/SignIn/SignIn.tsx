import './SignIn.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface DataPayload {
    username: string,
    email: string,
    password: string,
}

interface Email {
    email: string
}


export function SignIn() {
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [widthSize, setWidthSize] = useState(0)


    useEffect(() => {
        const handleHighSize = () => {
            setWidthSize(window.innerWidth);
        };

        handleHighSize();
        window.addEventListener('resize', handleHighSize);

        return () => window.removeEventListener('resize', handleHighSize);
    }, [])

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value); ''
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const AlreadySign = async (email: Email | string) => {
        try {
            const response = await fetch('https://chat-service-tjzg.onrender.com/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                })
            })

            if (!response.ok) {
                console.log("Deu MERDA");
            }

            const user = await response.json()

            console.log("Usuario registrado com sucesso:", user);

        } catch (err) {
            console.log('deu esse erro aqui na importação:', err);
            return
        }
    }

    const sendData = async (data: DataPayload): Promise<void> => {
        try {
            AlreadySign(email)

            const createAccount = await fetch('https://chat-service-tjzg.onrender.com/new_user', {
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
            navigate(`/chat/${username}`)

        } catch (err) {
            console.log("erro:", err);
        }
    }

    const pegarId = async () => {

        const getId = await fetch(`https://chat-service-tjzg.onrender.com/user_info/${username}`)

        if (!getId.ok) {
            throw new Error('Não estou conseguindo buscar');
        }

        const data = await getId.json()
        const name = data.username

        console.log("esse é o id do usuario:", name);

    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {

            const data: DataPayload = { username: username, email: email, password: password };


            if (data) {
                setEmail('')
                setPassword('')
                setUsername('')
            }

            await sendData(data);
            await pegarId()

            console.log("enviado com sucesso", username);


        } catch (err) {
            console.log("erro aqui:", err);
        }
    }

    return (
        <div className='register-body'>
            {widthSize > 500 ?
                <div id="register-introduction-scope">
                    <h1 id="register-introduction-text">Junte-se a <span>maior</span> <br /> <span>comunidade</span> de estudos</h1>
                </div>
                : <div id='register-introduction-cel'>
                    <h3>Bem vindo</h3>
                </div>}

            <form onSubmit={handleSubmit}>
                <div className="register-scope">

                    {widthSize > 500 ?
                        <div className="register-header">
                            <h1>Create an account</h1>
                            <p>Already have an account ? <span onClick={() => navigate('/')}>Log in</span></p>
                        </div>
                        : ""}

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