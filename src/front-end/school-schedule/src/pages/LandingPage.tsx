import { useNavigate } from "react-router-dom"
import "./LandingPage.css"

export function LandingPage(){

    const navigate = useNavigate()

    const redirectLogin = () => navigate('/login')

    return (
        <>
            <div className="LandingBody">    
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
                        <div className="btn-log" id="tryFree">Try for Free</div>
                    </div>
                </header>       

                <div className="introduction">
                    <div className="outDoor">
                        <div className="outDoorTitulo">
                          <h1><span>Unlock</span> Your <br/> Potencial With <br/> <span>Knowledge</span>: Learn, <br/> Grow, Succeed</h1>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur,  adipisicing elit. <br/> Doloremque quidem harum necessitatibus quam molestias dolorem <br/> mollitia nesciunt</p>
                    </div>
                </div>   

                <div className="content">
                    <div className="landing-banner-One" id="home">
                        <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D" alt="" id="img-banner-one" />
                        <div className="banner-info">
                            <div className="banner-titulo">
                            <h1>Access to learning <br/> anytime any ware</h1>
                            <p>Online education has gained significant popularity and important in <br/> recent years, especially with the advancements in technology and <br/> increased accesibility to the internet</p>                            
                            </div>
                            <div className="banner-atributes">
                                
                                <div className="banner-check-atributes">
                                    <input type="checkbox" name="" id=""  checked/>
                                    <h2>Personal Experience</h2>
                                </div>
                                
                                <div className="banner-check-atributes">
                                    <input type="checkbox" name="" id=""  checked/>
                                    <h2>Free To Share</h2>
                                </div>
        
                            </div>

                        </div>
                    </div>

                </div>  
            </div>
        </>
    )
}

export default LandingPage