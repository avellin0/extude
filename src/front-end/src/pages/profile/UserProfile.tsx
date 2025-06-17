import "./UserProfile.css"
import userImg from "../image/profile.png"
import image from "../icons/search.png"
import image2 from "../icons/people.png"

export function UserProfile(){    
    return (
        <div id="user-profile-scope">
            <div id="user-profile-user-content-scope">
                <div>
                    <p><a href="home/0ba92eeb-8226-425c-8f49-db82fea62424" className="Home-link">{`< back`}</a></p>
                </div>
                <div id="user-profile-content-header">
                    <img src={userImg} alt="" />
                    <h1>Davi Avelino</h1>
                </div>
                <div id="user-profile-content-list">
                
                    <p>Level</p>
                    <h3>Master +3</h3>
                    
                    <p>Guilda</p>
                    <h3>Los Hermanos</h3>

                    <p>Space</p>
                    <h3>Genius</h3>

                    <p>Progression</p>
                    <h3>Expert</h3>

                    <p>Email</p>
                    <h3>Ploglamador@hotmail.com</h3>

                    <p>Phone</p>
                    <h3>+55 21 96595-1085</h3>
                </div>
            </div>

            <div id="user-profile-info-scope">
                <div id="user-profile-activies">
                   <button className="user-profile-activies-btn" >Overview</button>
                   <button className="user-profile-activies-btn" >Activity</button>
                   <button className="user-profile-activies-btn" >Contracts</button>
                   <button className="user-profile-activies-btn" >Benefits</button>
                   <button className="user-profile-activies-btn" >Projects</button>
                </div>

                <div id="user-profile-progress">
                    <div className="user-profile-progress-scope">
                        <img src={image} alt="" />
                      <div className="user-profile-progress-info">
                        <h1>12%</h1>
                        <p>Of the profile is filled out</p>
                      </div>
                    </div>

                    <div className="user-profile-progress-scope">
                        <img src={image2} alt="" />
                            <div className="user-profile-progress-info">
                                <h1>48k</h1>
                                <p>Reported views this month</p>
                            </div>
                    </div>
                
                </div>


                <div id="user-profile-invite">
                    <div id="user-profile-invite-text">
                        <p>One Important thing...</p>
                        <h1>Davi is waiting for draft contract</h1>
                        <button id="user-profile-invite-btn">Create Contract</button>
                    </div>

                    <div id="user-profile-invite-img"/>

                </div>

                <div id="user-profile-status"/>
            </div>
        </div>
    )
}