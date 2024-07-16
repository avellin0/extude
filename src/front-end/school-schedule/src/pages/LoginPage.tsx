import './LoginPage.css'
import { useState } from 'react'


const LoginPage = () => {

    const [name, setName] = useState('Davi')
    const [password, setPassword] = useState<string>('')

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    
    const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try{

            const student = {
                userid: 4, 
                name: name,
                age: 18,
                classe: 1001,
                access: 1
            }

            const response = await fetch('http://localhost:3000/new_student', {
                method: 'POST',
                headers:{ 'Content-Type': 'application/json'},
                body: JSON.stringify(student)
            })

            if(!response.ok){
                console.log('deu merda!');
            }

            console.log('Safe!');
        
        }catch(err){
            console.log(err);
        }
    }

    return (
    
    <form onSubmit={handleSubmit}>
        <div className='FundoDeCadastro'>
            <div className='titulo'>SmartSpace</div>

            <div className='info-login-template'>
        

                <div className='info-login'>
                    <p>Username</p>
                    <input type="text" className='input-style' placeholder='Type your Username' value={name} onChange={handleName}/>
                    <div className='divisor'></div>
                </div>

                <div className='info-login'>
                    <p>Password</p>
                    <input type="password" className='input-style' placeholder='Type your Password' value={password} onChange={handlePass}/>
                    <div className='divisor'></div>
                    <div className='forgot-pass'><p>Forgot Password?</p></div>
                </div>
            
            </div>

            <input type="submit" className='btn-login' value="Cadastrar-se"  />
        

        <div className='divisor-principal'>
            <div className='main-divisor'></div>
            <p>sign up using</p>
            <div className='main-divisor'></div>
        </div>

            <div className='Oauth-apps'>
                <div className='apps-circle' id='facebook-circle'></div>
                <div className='apps-circle' id='google-circle'></div>
                <div className='apps-circle' id='twitter-circle'></div>
            </div>


            <div className='create_account'>
                <p>Don't have a account ?</p>
                 <a href="">Sign In</a>
            </div>

        </div>
    </form>
    
)
}

export default LoginPage