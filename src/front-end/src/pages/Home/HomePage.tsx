import './HomePage.css'
// import star from "../icons/star.png" 
// import graphic from "../icons/statistics.png"
// import flash from "../icons/thunder.png"
// import people from "../icons/people.png"
import search from "../icons/search.png"
import { useParams } from 'react-router-dom'


export default function Home(){
    const {id} = useParams<{id: string}>()

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
                            <h2><a href={`/chat/:${id}`} className='Home-link'>Chat</a></h2>
                        </div>
                        <div className="Home-sideBar-list-comunity">
                            {/* <img src={people} alt="" /> */}
                            <h2><a href={`/comunity/:${id}`} className='Home-link'>Comunity</a></h2>
                        </div>
                    </div>
                    <div className="Home-sideBar-workSpace">
                        <p>profile</p>
                        <h2><a href={`/profile/:${id}`} className='Home-link'>Overview</a></h2>
                        <h2>My Progress</h2>
                    </div>
                </div>

                <div className="Home-Main-Scope">

                    <div className="Home-Main-Header">
                        <div className='Home-Main-Header-search'>
                            <img src={search} alt="" />
                            <input type="text" placeholder='Press F to search' className='Home-Main-Header-search-input'/>
                        </div>
                    </div>

                    <div className="Home-Main-Introduction">
                        <h1>expand your horizon</h1>
                        <h1>to the Future</h1>
                    </div>

                    <div className="Home-Main-Content"></div>
                    <div className="Home-Main-Content"></div>
                    <div className="Home-Main-Content"></div>
                </div>
            </div>          
        </>
    )
}
