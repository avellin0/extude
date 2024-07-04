import './HomePage.css'
import {useNavigate} from 'react-router-dom'
export function Home(){

    const navigate = useNavigate()

    const redirectLogin = () => {
        navigate('/login')        
    }

    return(
        <>  
        <div className='root'>

            <div className='header'>
                <h1>SmartSpace</h1>
                <div className='btn_log'>
                    <div className="btn_login" onClick={redirectLogin}>Sign In</div>
                    <div className="btn_logout">Sign Out</div>
                </div>
            </div>

            <div className='main'>
                    <div className='main-content'></div>
                    <div className='main-content'></div>
            </div>

        </div>
        </>
    )
}

export default Home