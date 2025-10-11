import './HomePage.css'
// import star from "../icons/star.png" 
// import graphic from "../icons/statistics.png"
// import flash from "../icons/thunder.png"
// import people from "../icons/people.png"
import search from "../icons/search.png"
import { useParams } from 'react-router-dom'


export default function Home() {
    const { id } = useParams<{ id: string }>()

    return (
        <>
            <div className="Home-body">

                <div className="Home-sideBar-Scope">
                    <div className="Home-sideBar-tittle">
                        <h1>Piccoro</h1>
                    </div>
                    <div className="Home-sideBar-list">
                        <p>WorkSpace</p>
                        <div className="Home-sideBar-list-comunity">
                            {/* <img src={star} alt="" /> */}
                            <h2><a href={`/Project/${id}`} className='Home-link'>New Project</a></h2>
                        </div>
                        <div className="Home-sideBar-list-comunity">
                            {/* <img src={graphic} alt="" /> */}
                            <h2><a href={`/library/${id}`} className='Home-link'>Library</a></h2>
                        </div>
                        <div className="Home-sideBar-list-comunity">
                            {/* <img src={flash} alt="" /> */}
                            <h2><a href={`/chat/${id}`} className='Home-link'>Chat</a></h2>
                        </div>
                        <div className="Home-sideBar-list-comunity">
                            {/* <img src={people} alt="" /> */}
                            <h2><a href={`/home/${id}`} className='Home-link'>Comunity</a></h2>
                        </div>
                    </div>
                    <div className="Home-sideBar-workSpace">
                        <p>profile</p>
                        <h2><a href={`/profile/${id}`} className='Home-link'>Overview</a></h2>
                        <h2><a href={`/profile-timer/${id}`} className='Home-link'>My Progress</a></h2>
                    </div>
                </div>

                <div className="Home-Main-Scope">

                    <div className="Home-Main-Header">
                        <div className='Home-Main-Header-search'>
                            <img src={search} alt="" />
                            <input type="text" placeholder='search here' className='Home-Main-Header-search-input' />
                        </div>
                    </div>

                    <div className="Home-Main-Introduction">
                        <h2>expand your horizon</h2>
                        <h2>to the Future</h2>
                    </div>

                    <div className="Home-Main-Content">
                        <div className='Home-Main-Content-title'>
                            <h2>Como o cérebro aprende:</h2>
                        </div>

                        <div className='Home-Main-Content-text'>
                            <text>
                                Você sabia que entender como o cérebro funciona pode mudar completamente a forma como você estuda?
                                Conheça os processos de memória, atenção e repetição que ajudam o aprendizado,
                                e descubra técnicas para aprender de forma mais leve e eficiente.
                            </text>
                        </div>

                        <div className='Home-Main-Content-author'>
                            <p>Davi Avelino</p>
                            <p>21/05/26</p>
                            <p className='like'>👍</p>
                            <p className='deslike'>👎</p>
                        </div>
                    </div>

                    <div className="Home-Main-Content">
                        <div className='Home-Main-Content-title'>
                            <h2>Como funciona numeros Binarios ?</h2>
                        </div>

                        <div className='Home-Main-Content-text'>
                            <text>Você já se perguntou como o computador entende tudo o que fazemos — desde abrir um vídeo até jogar um game ou escrever um texto?
                                Por trás de toda essa tecnologia existe um sistema simples, mas poderoso: o sistema binário. Formado apenas pelos números 0 e 1,
                                ele é a base da linguagem dos computadores e de praticamente todos os dispositivos digitais.
                            </text>
                        </div>

                        <div className='Home-Main-Content-author'>
                            <p>Davi Avelino</p>
                            <p>20/05/26</p>
                            <p className='like'>👍</p>
                            <p className='deslike'>👎</p>
                        </div>
                    </div>

                    <div className="Home-Main-Content">
                        <div className='Home-Main-Content-title'>
                            <h2>Como organizar seus estudos para aprender mais em menos tempo</h2>
                        </div>

                        <div className='Home-Main-Content-text'>
                            <text>
                                Manter o foco e estudar com constância é um desafio, mas com as estratégias certas tudo fica mais fácil.
                                Aprenda a montar um cronograma eficiente, usar métodos como Pomodoro e revisão espaçada,
                                e descubra como estudar menos tempo e aprender muito mais.
                            </text>
                        </div>

                        <div className='Home-Main-Content-author'>
                            <p>Davi Avelino</p>
                            <p>19/05/26</p>
                            <p className='like'>👍</p>
                            <p className='deslike'>👎</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
