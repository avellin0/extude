import React from 'react'
import './App.css'

const App = () => {
  return (
    <>

    <header>
      <h1>SmartSpace</h1>
      <div className="cadastro">
        <div className="btn_signIn">Sign In</div>
        <div className="btn_signOut">Sign Out</div>
      </div>
    </header>


    <main>
      <div className="quadrado">
        <div className="icone">👨🏼‍⚕️</div>
        <div className="conteudo">
          Salve vidas e faça a diferença. Torne-se um profissional de medicina e inspire o futuro!
        </div>
        <div className="footer">Mais informações</div>
        <div className="overlay">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div>
      <div className="quadrado">
        <div className="icone">👨🏼‍🎓</div>
        <div className="conteudo">
          Confira os outros cursos disponíveis e descubra novas oportunidades de aprendizado!
        </div>
        <div className="footer">Mais informações</div>
        <div className="overlay">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div>
      <div className="quadrado">
        <div className="icone">👨🏼‍💻</div>
        <div className="conteudo">
          Se torne um programador e transforme suas ideias em realidade. Comece sua jornada hoje!
        </div>
        <div className="footer">Mais informações</div>
        <div className="overlay">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div>
      <div className="quadrado">
        <div className="icone">👨🏼‍🔬</div>
        <div className="conteudo">
          Explore o mundo dos elementos e reações. Inicie sua carreira em Química e inove o amanhã!
        </div>
        <div className="footer">Mais informações</div>
        <div className="overlay">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      </div>
    </main>
  </>
  )
}

export default App
