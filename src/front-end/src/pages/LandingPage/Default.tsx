import "./Default.css"
import { useNavigate } from 'react-router-dom'

export function Default() {

    const navigate = useNavigate()

    const SignSubmit = () => {
        navigate('/login')
    }

    const joinSubmit = () => {
        navigate('/cadastro')
    }


    return (
        <div id="default-body">

            <div id="default-header-scope">
                <div id="default-header">
                    <div id="default-header-logo-scope">
                        <h2>Piccoro.ex</h2>
                    </div>
                    <div id="default-header-links">
                        <a href="">Sobre</a>
                        <a href="">Comunidade</a>
                        <a href="">Ferramentas</a>
                    </div>
                    <div id="default-header-btns-scope">
                        <button id="default-header-btn-login" onClick={() => SignSubmit()}><h3>Sign in</h3></button>
                        <button id="default-header-btn-join" onClick={() => joinSubmit()}><h3>Try for free</h3></button>
                    </div>
                </div>
                <div id="default-introduction-scope">
                    <div id="default-text-scope">
                        <div id="default-text-main">
                            <h1>Fomos <span>condenados</span> a ser <br /> <span>livres</span>, liberte sua <span>mente.</span></h1>
                            <p>Com acesso a vídeos, transcrições e ferramentas de aprendizado, seu progresso nunca esteve tão ao seu alcance.</p>

                            <div id="default-introduction-btn-scope">
                                <button className="Default-join-btn" onClick={() => joinSubmit()}><h3>Try for free</h3></button>
                                <p><a href="/home">view the news features →</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="default-first-part-scope">
                <div id="default-videos-page-layout">
                    <div id="default-video-and-downloader-scope-layout">

                        <div id="default-video-and-download-layout">
                            <div id="default-video" />
                            <div id="default-video-subtitles">
                                <p> {"→"} Lorem ipsum <span>dolor sit amet</span>  consectetur adipisicing elit.</p>
                            </div>

                            <div id="default-downloader-scope-layout">
                                <div id="default-downloader-input">url</div>
                                <div id="default-downloader-btn">Search</div>
                            </div>
                        </div>

                    </div>

                    <div id="default-write-scope-layout">
                        <div id="default-write-header"><h3>Notes</h3></div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div id="default-write-btn-save">Save</div>
                    </div>
                </div>
            </div>
            <div className="default-line-separator" />

            <div id="default-first-right-info-scope">
                <h2>Increase your <span>knowledge</span> <br /> about the <span>universe</span> with personal <br /> science studies with our <br /><span>Science Space</span></h2>
                <button className="Default-join-btn default-join-btn-for-info">Try for free</button>
            </div>

            <div id="default-first-left-info-scope">
                <h2>
                    <span>Improve</span> your language <span>skills</span> <br /> with your own videos, podcast <br /> and notes with <span>translate</span>
                </h2>
                <button className="Default-join-btn default-join-btn-for-info">Try for free</button>
            </div>

            <div id="default-second-right-info-scope">
                <h2>
                    <span>Share study</span> materials and stay <br />  organized easily — work better <br /><span>together</span> and boost your<br /> learning <span>success!</span>.
                </h2>
                <button className="Default-join-btn default-join-btn-for-info">Try for free</button>
            </div>

            <div id="default-second-left-info-scope">
                <h2>
                    <span>Flashcards</span> and <span>AI-powered</span><br /> speech tools improve language retention and boost  <span>speaking skills</span> <span>effectively.</span>
                </h2>
                <button className="Default-join-btn default-join-btn-for-info">Try for free</button>
            </div>

            <div id="default-private-rooms-scope">
                <div id="default-private-rooms-info">
                    <h1>
                        Ambiente<span> Privado</span>  para você e seus amigos poderem explorar ideias e <span>compartilhar informações</span>
                    </h1>
                </div>

                <div id="default-private-rooms-layout">
                    <div id="default-private-room">
                        <div id="default-private-room-friends-scope">
                            <div className="default-private-room-friends" id="default-private-room-friend-selected">Kevin</div>
                            <div className="default-private-room-friends">James</div>
                            <div className="default-private-room-friends">Davi</div>
                            <div className="default-private-room-friends">Hernandes</div>
                        </div>
                        <div id="default-private-room-chat">
                            <div id="default-private-room-chat-area">
                                <div id="default-private-room-chat-area-left"> hi jimmy</div>
                                <div id="default-private-room-chat-area-right">Hi kevin <br /> what are you doing ? </div>
                            </div>
                            <div id="default-private-room-chat-input">
                                Are you free now ?
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="default-line-2">
                <div className="default-arrow-separator" />
                <div id="default-arrow-separator-text">
                    <h1>
                        Explore lugares inimaginaveis
                    </h1>
                </div>
                <div className="default-arrow-separator" />
            </div>

            <div id="default-footer">
                <div className="default-footer-session" id="default-footer-session-first">
                    <div>
                        <h3>About</h3>
                    </div>
                    <div className="default-footer-session-links">
                        <p>Contact</p>
                        <p>Formats</p>
                        <p>FAQ</p>
                        <p>About us</p>
                    </div>
                </div>
                <div className="default-footer-session">
                    <div>
                        <h3>Starting</h3>
                    </div>
                    <div className="default-footer-session-links">
                        <p>Introduction</p>
                        <p>Theme</p>
                        <p>Usages</p>
                        <p>Documentation</p>
                    </div>
                </div>
                <div className="default-footer-session">
                    <div>
                        <h3>Resources</h3>
                    </div>
                    <div className="default-footer-session-links">
                        <p>API</p>
                        <p>Acessibility</p>
                        <p>Source code</p>
                        <p>Readme</p>
                    </div>
                </div>

                <div id="default-footer-newletter">
                    <div id="default-footer-newletter-title">
                            <h2>
                                Newsletter
                            </h2>
                    </div>
                    <div id="default-footer-newletter-info">
                        <p>
                            Subscribe in our letter now and stay tuned about everything! 
                        </p>
                    </div>
                    <div id="default-footer-newletter-input-scope">
                        <input type="email" id="default-footer-newletter-input-text"/>
                        <input type="button" value="enviar" id="default-footer-newletter-input-btn"/>
                    </div>
                    <div id="default-footer-newletter-social-media"></div>
                </div>

            </div>

            {/* <div className="default-style-bolls" id="first-ball"></div>
            <div className="default-style-trhee-bolls" id="second-ball"></div>
            <div className="default-style-multiple" id="trhee-ball"></div>
            <div className="default-style-cursor" id="first-cursor"></div> */}
        </div>
    )
}

export default Default