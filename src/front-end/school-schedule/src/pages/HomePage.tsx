import './HomePage.css'

export default function Home(){
    return (
        <>
            <div className="Home-body">

                <div className="Home-sideBar-Scope">

                    <div className="Home-sideBar-tittle">
                        <h1>Tittle</h1>
                    </div>
                    <div className="Home-sideBar-list">
                        <h2>Overview</h2>
                        <h2>Course</h2>
                        <h2>My Progress</h2>
                        <div className="Home-sideBar-list-comunity">
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
                    <div className="Home-Main-Header"></div>
                    <div className="Home-Main-Introduction"></div>
                    <div className="Home-Main-Content"></div>
                </div>
            </div>
        </>
    )
}
