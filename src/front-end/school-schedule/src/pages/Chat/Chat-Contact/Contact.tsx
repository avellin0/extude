import "./Contact.css"

interface ContactConfigProps{
    username?: string,
    leastMessage?: boolean,    
}

export function Contact({username,leastMessage}:ContactConfigProps){
    return (
        <>
            <div id="Contact-scope">
                <div id="Contact-image-user">
                    <img src="" alt="" />
                </div>

                <div id="Contact-info-scope">
                    <h2>{username}</h2>
                    <div id="Contact-leastmessage">
                        {leastMessage? "✔✔ vlw" : ""}
                    </div>
                </div>
            </div>
        </>
    )
}