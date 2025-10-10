import "./Sidebar.css"
import { useNavigate } from "react-router-dom"



export function Sidebar() {

    const navigate = useNavigate()

    return (
            <div id="Sidebar_scope">
                <div>
                    <img src={"/icons/arrow_back.png"} alt="" style={{width: "10%",height:"100%",cursor: "pointer"}} onClick={() => navigate(-1)}/>
                </div>

                <div id="user-profile-content-header">
                    <h1>Davi Avelino</h1>
                </div>
                <div id="user-profile-content-list">

                    <div className="user_info">
                        <p>Level</p>
                        <h2>Master +3</h2>
                    </div>

                    <div className="user_info">
                        <p>Timer</p>
                        <h3>Pomodoro</h3>
                    </div>

                    <div className="user_info">
                        <p>Planner</p>
                        <h3>Make Schedule</h3>
                    </div>

                    <div className="user_info">
                        <p>Your books</p>
                        <h3>Library</h3>
                    </div>

                    <div className="user_info">
                        <p>Your posts</p>
                        <h3>Social</h3>
                    </div>

                </div>
            </div>
    )
}