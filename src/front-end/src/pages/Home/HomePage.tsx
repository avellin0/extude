// deno-lint-ignore-file
import './HomePage.css'
import search from "../icons/search.png"
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { postsMockeds } from './mock/PostsMocks'

export default function Home() {

    type Post = {
        id: string;
        user_id: string;
        title: string;
        content: string;
        is_public: boolean;
        created_at: string;
    }


    const [post, setPost] = useState<Post[]>([])


    const { id, name } = useParams<{ id: string | any, name: string }>()
    const navigate = useNavigate()

    if (name === "recruiter") {
        console.log("certo!");

        return (
            <>
                <div className="Home-body">

                    <div className="Home-sideBar-Scope">
                        <Sidebar name={name} id={id} />
                    </div>

                    <div className="Home-Main-Scope">

                        <div className="Home-Main-Header">
                            <div className="Home-Main-Header-Title">
                                <div className='Home-Main-Header-search'>
                                    <img src={search} alt="" />
                                    <input type="text" placeholder='search here' className='Home-Main-Header-search-input' />
                                </div>
                                <button id='Home-Main-Header-Create-Post' type='button' onClick={() => navigate(`/create_post/${name}/${id}`)}>Creat Post</button>
                            </div>

                            <div className="Home-Main-Introduction">
                                <h2>expand your horizon</h2>
                                <h2>to the Future</h2>
                            </div>
                        </div>

                        {postsMockeds && postsMockeds.length > 0 ? postsMockeds.map((postItem, index) => (
                            <div key={index} className="Home-Main-Content" onClick={() => navigate(`/post/${postItem.id}`)}>
                                <div className='Home-Main-Content-title'>
                                    <h2>{postItem.title}</h2>
                                </div>
                                <div className='Home-Main-Content-text'>
                                    {postItem.subtitle}
                                </div>
                                <div className='Home-Main-Content-author'>
                                    <p>{postItem.user_id}</p>
                                    <p>{postItem.created_at}</p>
                                    <p className='like'>👍</p>
                                    <p className='deslike'>👎</p>
                                </div>
                            </div>
                        )) : (
                            <>
                                <div className="Home-Empty-State">
                                    <h2>Armazene suas ideias</h2>
                                    <p>E</p>
                                    <h2>Compartilhe seu aprendizado</h2>
                                    <p>Clique aqui para criar seu primeiro post</p>
                                    <button>Criar Post</button>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </>
        )
    }


    const getPosts = async () => {
        const data = await fetch(`http://localhost:3000/recruiter-posts/${id}`)

        if (!data.ok) {
            console.log("Erro ao buscar dados");

            return;
        }

        const json = await data.json()

        setPost(json)
    }

    useEffect(() => {
        getPosts()
        localStorage.removeItem('html_editor')
        localStorage.removeItem('json_editor')
        localStorage.removeItem('titulo')
        localStorage.removeItem('subtitulo')
    }, [])


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
                            <h2><a href={`/Project/${name}/${id}`} className='Home-link'>New Project</a></h2>
                        </div>
                        <div className="Home-sideBar-list-comunity">
                            {/* <img src={graphic} alt="" /> */}
                            <h2><a href={`/library/${name}/${id}`} className='Home-link'>Library</a></h2>
                        </div>
                        <div className="Home-sideBar-list-comunity">
                            {/* <img src={flash} alt="" /> */}
                            <h2><a href={`/chat/${name}/${id}`} className='Home-link'>Chat</a></h2>
                        </div>
                        <div className="Home-sideBar-list-comunity">
                            {/* <img src={people} alt="" /> */}
                            <h2><a href={`/home/${name}/${id}`} className='Home-link'>Comunity</a></h2>
                        </div>
                    </div>
                    <div className="Home-sideBar-workSpace">
                        <p>profile</p>
                        <h2><a href={`/profile/${name}/${id}`} className='Home-link'>Overview</a></h2>
                        <h2><a href={`/profile-timer/${name}/${id}`} className='Home-link'>My Progress</a></h2>
                    </div>
                </div>

                <div className="Home-Main-Scope">

                    <div className="Home-Main-Header">
                        <div className="Home-Main-Header-Title">
                            <div className='Home-Main-Header-search'>
                                <img src={search} alt="" />
                                <input type="text" placeholder='search here' className='Home-Main-Header-search-input' />
                            </div>
                            <button id='Home-Main-Header-Create-Post' type='button' onClick={() => navigate(`/create_post/${name}/${id}`)}>Creat Post</button>
                        </div>

                        <div className="Home-Main-Introduction">
                            <h2>expand your horizon</h2>
                            <h2>to the Future</h2>
                        </div>
                    </div>




                    {post && post.length > 0 ? post.map((postItem, index) => (
                        <div key={index} className="Home-Main-Content" onClick={() => navigate(`/post/${postItem.id}`)}>
                            <div className='Home-Main-Content-title'>
                                <h2>{postItem.title}</h2>
                            </div>
                            <div className='Home-Main-Content-text'>
                                {postItem.content}
                            </div>
                            <div className='Home-Main-Content-author'>
                                <p>{postItem.user_id}</p>
                                <p>21/05/26</p>
                                <p className='like'>👍</p>
                                <p className='deslike'>👎</p>
                            </div>
                        </div>
                    )) : (
                        <>
                            <div className="Home-Empty-State">
                                <h2>Armazene suas ideias</h2>
                                <p>E</p>
                                <h2>Compartilhe seu aprendizado</h2>
                                <p>Clique aqui para criar seu primeiro post</p>
                                <button>Criar Post</button>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}
