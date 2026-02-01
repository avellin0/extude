// deno-lint-ignore-file
import './HomePage.css'
import search from "../icons/search.png"
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase/supa-client'
import { useEffect, useState } from 'react'

export default function Home() {

    const [post, setPost] = useState<any[]>([])


    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const GetUserId = async () => {
        const { data: user_id, error } = await supabase.from('app_users').select('id').eq('name', id)

        if (error) {
            console.log("this is the GetUserId error", error);
            return
        }

        console.log("this is the user id", user_id[0].id);


        return user_id[0].id
    }

    const GetInfo = async () => {
        const author_id = await GetUserId()

        const { data, error } = await supabase.from('post').select('*').eq('author_id', author_id)

        if (error) {
            console.log("this is the GetInfo error", error);
            return
        }

        setPost(data)

        return data
    }

    useEffect(() => {
        GetInfo()
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

                        <button id='Home-Main-Header-Create-Post' type='button' onClick={() => navigate(`/create_post/${id}`)}>Creat Post</button>


                    </div>

                    <div className="Home-Main-Introduction">
                        <h2>expand your horizon</h2>
                        <h2>to the Future</h2>
                    </div>

                    {post && post.length > 0 ? post.map((content, index) => (
                        <div key={index} className="Home-Main-Content" onClick={() => navigate(`/post/${content.id}`)}>
                            <div className='Home-Main-Content-title'>
                                <h2>{content.title}</h2>
                            </div>

                            <div className='Home-Main-Content-text'>
                                {content.subtitle}
                            </div>

                            <div className='Home-Main-Content-author'>
                                <p>Davi Avelino</p>
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
                        </>)}

                </div>
            </div>
        </>
    )
}
