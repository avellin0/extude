import './Post.css'
import { supabase } from "../../supabase/supa-client"
import { useEffect, useState } from 'react'
import { PostRenderer } from './PostRender/PostRender'
import { useParams } from 'react-router-dom'

export function Post() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState()

  const {id} = useParams<{id: string}>()


  const GetInfo = async () => {
    let { data: post, error } = await supabase
      .from('post')
      .select('*')
      .eq('id', id)

    console.log("Esses são os dados:", post)

    const teste = JSON.parse(post![0].content)

    if(!teste || typeof(teste) === 'undefined') return 

    console.log('Esse é o json:', teste.content)


    if (error) {
      console.log("Esse é o erro ao buscar post", error);
    }


    setContent(teste)
    setTitle(post![0].title)

    return post
  }


  useEffect(() => {
    GetInfo()
  },[])


  return (
    <div id="PS-page">

      <div id="PS-header">
        <div id="PS-header-img" />

        <div id="PS-header-text">
          <h1 id="PS-header-title">
            {title}
          </h1>

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
            <PostRenderer content={content}/>
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
