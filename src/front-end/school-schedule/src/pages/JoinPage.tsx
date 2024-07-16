import './JoinPage.css'
import {useState} from 'react'
import axios from 'axios'

export function Register(){
    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')


    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        try{

            const data = {
                userId: 6,
                name: Username,
                email: Email,
                password: Password,
                permission: "client"
            }

            axios.post('http://localhost:3000/create_account', data)
            
            console.log("será ?");

        }catch(err){
            console.log(err);
        }
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <div className="register-scope">
                <div className="register-header">ExTudex</div>

                <div className="register-fields">
                    
                    <div className="register-field">
                        <p>Username</p>
                        <input type="text" name=""   className='register-input-text' placeholder='Type Your Username' value={Username} onChange={handleName}/>
                    </div>
                    
                    <div className="register-field">
                        <p>Email</p>
                        <input type="text" name="" id="teste" className='register-input-text'  placeholder='Type Your Email' value={Email} onChange={handleEmail}/>
                    </div>

                    <div className="register-field">
                        <p>Password</p>
                        <input type="password" name=""  className='register-input-text' placeholder='Type Your Password' value={Password} onChange={handlePassword}/>
                    </div>
                
                </div>

                <input type="submit" value="Enviar" className='register-input-submit' />
                
            </div>
        </form>
    )
}