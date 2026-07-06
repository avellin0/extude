export function Sidebar({ name, id }: { name: string, id: string }) {
    return (
        <>
            <div className="Home-sideBar-tittle">
                <h1>Extude</h1>
            </div>
            <div className="Home-sideBar-list">
                <p>WorkSpace</p>
                <div className="Home-sideBar-list-comunity">
                    {/* <img src={star} alt="" /> */}
                    <h2><a href={`/Project/${name}/${id}`} className='Home-link'>Videos</a></h2>
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
        </>

    )
}