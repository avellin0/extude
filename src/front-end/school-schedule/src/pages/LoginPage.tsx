import './LoginPage.css'

const LoginPage = () => {
    return (
        <div className='FundoDeCadastro'>
            <div className='titulo'>SmartSpace</div>

            <div className='info-login-template'>
            
                <div className='info-login'>
                    <p>Username</p>
                    <input type="text" className='input-style' placeholder='Type your Username'/>
                    <div className='divisor'></div>
                </div>

                <div className='info-login'>
                    <p>Password</p>
                    <input type="password" className='input-style' placeholder='Type your Password'/>
                    <div className='divisor'></div>
                    <div className='forgot-pass'><p>Forgot Password?</p></div>
                </div>
            
            </div>

            <div className='btn-login'>Cadastrar-se</div>

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
    )
}

export default LoginPage