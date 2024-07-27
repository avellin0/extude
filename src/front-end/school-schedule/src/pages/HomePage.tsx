import './HomePage.css'
import star from "../icons/star.png" 
import graphic from "../icons/statistics.png"
import flash from "../icons/thunder.png"
import people from "../icons/people.png"
import search from "../icons/search.png"

export default function Home(){
    return (
        <>
            <div className="Home-body">

                <div className="Home-sideBar-Scope">

                    <div className="Home-sideBar-tittle">
                        <h1>Piccoro</h1>
                    </div>
                    <div className="Home-sideBar-list">
                        <div className="Home-sideBar-list-comunity">
                            <img src={star} alt="" />
                            <h2>Course</h2>
                        </div>
                        <div className="Home-sideBar-list-comunity">
                            <img src={graphic} alt="" />
                            <h2>OverView</h2>
                        </div>
                        <div className="Home-sideBar-list-comunity">
                            <img src={flash} alt="" />
                            <h2>Learning Progress</h2>
                        </div>
                        <div className="Home-sideBar-list-comunity">
                            <img src={people} alt="" />
                            <h2>Comunity</h2>
                        </div>
                    </div>
                    <div className="Home-sideBar-workSpace">
                        <p>WorkSpace</p>
                        <h2>Overview</h2>
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
                    <div className="Home-Main-Introduction"></div>
                    <div className="Home-Main-Content"></div>
                </div>
            </div>
        </>
    )
}
