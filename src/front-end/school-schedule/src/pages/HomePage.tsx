import './HomePage.css'
import {useNavigate} from 'react-router-dom'
export function Home(){

    const navigate = useNavigate()

    const redirectLogin = () => {
        navigate('/login')        
    }

    return(
        <body>
            
        <div className='root'>

            <div className='header'>
                <h1>SmartSpace</h1>
                <div className='btn_log'>
                    <div className="btn_login" onClick={redirectLogin}>Sign In</div>
                    <div className="btn_logout">Sign Out</div>
                </div>
            </div>

            <div className='main'>
                    <p>New</p>
                    <div className='main-first-row'>

                        <div className='main-content' id='conversation'>
                            <div className='overlay'>Conversação</div>
                        </div>
                        <div className='main-content' id='economia'>
                            <div className="overlay">Economia</div>
                        </div>
                        <div className='main-content' id="nutricao">
                            <div className="overlay">Nutrição</div>
                        </div>
                        <div className='main-content'></div>
                    </div>

                    <div className='main-divisor'></div>
                   
                   <p>Your Progress</p>
                    <div className='main-second-row'>
                        <div className='main-content'></div>
                        <div className='main-content'></div>
                        <div className='main-content'></div>
                        <div className='main-content'></div>
                    </div>
            </div>

        </div>
    </body>  

    )
}

export default Home