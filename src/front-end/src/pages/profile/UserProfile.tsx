import "./UserProfile.css"
import userImg from "../image/profile.png"
import image from "../icons/search.png"
import image2 from "../icons/people.png"
import arrow_back from "../icons/arrow_back.png"
import { useNavigate, useParams} from "react-router-dom"


export function UserProfile() {
    const navigate = useNavigate()
    const {id} = useParams<{id: string}>()

    const redirect = () => {
        navigate(`/home/${id}`)
    }

    return (
        <div id="user-profile-scope">
            <div id="user-profile-user-content-scope">
                <div>
                    <img src={arrow_back} alt="voltar" id="user-profile-back-icon" onClick={() => navigate(-1)} />
                </div>
                <div id="user-profile-content-header">
                    <img src={userImg} alt="" />
                    <h1>{id}</h1>
                </div>
                <div id="user-profile-content-list">

                    <p>Level</p>
                    <h3>Mid level</h3>

                    <p>Timer</p>
                    <h3 onClick={() => navigate(`/profile-timer/${id}`)}>Pomodoro+</h3>

                    <p>Space</p>
                    <h3>Genius</h3>

                    <p>Progression</p>
                    <h3>Expert</h3>

                    <p>Email</p>
                    <h4>Ploglamador@hotmail.com</h4>

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

                    <div id="user-profile-invite-img" />

                </div>

                <div id="user-profile-status" />
            </div>
        </div>
    )
}