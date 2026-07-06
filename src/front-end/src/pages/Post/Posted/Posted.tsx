import "./Posted.css"

export function Posted() {
    return (
        <>
            <div id="posted-body">
                <div id="posted-sidebar-scope">
                    <div id="posted-sidebar-search">
                        <input type="text" placeholder="#postgresql" />
                    </div>
                    <div id="posted-sidebar-links">
                        <p>Posts mais antigos</p>
                        <p>Posts mais novos</p>
                        <p>comentarios em posts</p>
                    </div>
                </div>
                <div id="posted-main-scroll-scope">
                    <div id="posted-post-container">
                        <div id="posted-post-title">
                            <h1>Criando meu primeiro SaaS</h1>
                        </div>
                        <div id="posted-post-subtitle">
                            <p>Hoje vou explicar como criei meu primeiro SaaS sabendo somente o básico</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi obcaecati beatae porro! Ut quo pariatur optio nobis adipisci eos ea dolor cupiditate repudiandae, enim molestiae in eligendi necessitatibus dicta similique.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi est cumque sequi sit, saepe impedit. Maxime earum dolore fuga repellat cum commodi, optio, atque pariatur, voluptas vero eos excepturi beatae!</p>
                        </div>
                        <div id="posted-post-footer">
                            <div id="posted-post-hashtag">
                                <p>#typescript</p>
                                <p>#python</p>
                                <p>#postgresql</p>
                            </div>
                            <div id="posted-post-interactions">
                                <p>📰</p>
                                <p>👍</p>
                                <p>👎</p>
                                <p>🔗</p>
                            </div>
                        </div>

                    </div>

                </div>
                <div id="posted-guias-scope">

                </div>
            </div>

        </>
    )
}