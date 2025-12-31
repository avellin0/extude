import './Post.css'
import study from "./study.jpg"

export function Post() {
  return (
    <div id="PS-page">

      <div id="PS-header">
        <div id="PS-header-img" />

        <div id="PS-header-text">
          <h1 id="PS-header-title">Como o cérebro aprende</h1>

          <div id="PS-header-meta">
            <p>Por Davi Avelino</p>
            <p>•</p>
            <p>21 de maio de 2026</p>
          </div>
        </div>
      </div>

      <div id="PS-main">
        <div id='PS-content'>
          <div id='PS-article'>

            <div className='PS-article-text'>
              <p>
                O cérebro humano é uma máquina incrível, capaz de aprender e se adaptar a novas informações e experiências. Mas como exatamente o cérebro aprende? Neste artigo, exploraremos os principais mecanismos envolvidos no processo de aprendizagem.
              </p>

            </div>

            <div className='PS-article-img-scope'>
              <img className='PS-article-img' src={study} alt="Imagem ilustrativa de um cérebro humano" />
            </div>

            <div className='PS-article-text'>
              <h2>Neuroplasticidade</h2>
              <p>
                A neuroplasticidade é a capacidade do cérebro de reorganizar suas conexões neurais em resposta a novas experiências. Isso significa que, quando aprendemos algo novo, nosso cérebro cria novas sinapses ou fortalece as existentes, facilitando a retenção da informação.
              </p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias atque, omnis consectetur voluptatem voluptate architecto mollitia iure fugit facilis aut dicta pariatur, consequuntur quibusdam similique ipsam, id quis? Enim, consectetur.</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia deleniti minus, nisi deserunt dolore iure voluptatibus neque numquam! Iste velit qui corporis esse eum eaque consequuntur veniam consectetur at suscipit.</p>

              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate repellendus tempora, sit sapiente placeat illo possimus minima iste dolor adipisci amet provident aliquid similique ratione fugiat, porro libero officiis.</p>

              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur molestias non maxime, quos assumenda sit facilis accusamus, porro eligendi omnis laudantium quaerat possimus corporis! Cumque obcaecati asperiores in reiciendis eligendi.</p>

            </div>

          </div>
        </div>

        <div id='PS-sidebar'>

          <div className='PS-sidebar-content'>

            <div className='PS-sidebar-content-title'>
              <h3>Posts Relacionados</h3>
            </div>

            <div className='PS-sidebar-content-list'>

              <div className='PS-sidebar-content-list-value'>
                <p>Explorando países americanos</p>
              </div>

              <div className='PS-sidebar-content-list-value'>
                <p>Como funciona números bínarios</p>
              </div>

              <div className='PS-sidebar-content-list-value'>
                <p>Como usar o supabase</p>
              </div>

            </div></div>

              <div className='PS-sidebar-content'>

            <div className='PS-sidebar-content-title'>
              <h3>Comentários</h3>
            </div>

            <div className='PS-sidebar-content-list'>

              <div className='PS-sidebar-content-list-value'>
                <p>Ótimo post me ajudou</p>
              </div>

              <div className='PS-sidebar-content-list-value'>
                <p>Não sabia sobre isso!</p>
              </div>

              <div className='PS-sidebar-content-list-value'>
                <p>Acho que tu deveria ir a merda</p>
              </div>

              <div className='PS-sidebar-content-list-value'>
                <p>Incrivel, a mente é algo fantástico</p>
              </div>

            </div>

          </div>

              <div id='PS-sidebar-comment'>

            <div className='PS-sidebar-content-title'>
              <h3>Deixe um Comentário</h3>
            </div>

            <div id='PS-sidebar-comment-list'>

              <div className='PS-sidebar-comment-inputs'>
                <input type="text" placeholder='Seu nome' />
              </div>

              <div className='PS-sidebar-comment-inputs'>
                <input type="text" placeholder='Seu Email' />
              </div>

              <div id='PS-sidebar-coment-input-text'>
                <textarea name="comentario" id="PS-make-comment" placeholder='Escreva seu comentário' />
              </div>

              <button type='button' id='PS-sidebar-btn'>Enviar</button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
