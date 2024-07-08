import { useNavigate } from "react-router-dom"
import "./LandingPage.css"

export function LandingPage(){

    const navigate = useNavigate()

    const redirectLogin = () => navigate('/login')

    return (
        <>
            <body>    
                <header>
                    <div className="nav">
                        <div className="logo">Logo</div>
                        <div className="ListLink">
                                <li>Home</li>
                                <li>Pages</li>
                                <li>Courses</li>
                                <li>Contact</li>
                        </div>
                     </div>
                    <div className="login">
                        <div className="btn-log" onClick={redirectLogin}>Login</div>
                        <div className="btn-log" id="tryFree">Trial for Free</div>
                    </div>
                </header>       

                <main>
                    <div className="outDoor">Develop Your Skills Here!</div>
                </main>     
            </body>
        </>
    )
}

export default LandingPage