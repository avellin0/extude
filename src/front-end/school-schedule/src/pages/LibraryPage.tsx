import './LibraryPage.css'

import { useNavigate, useParams} from 'react-router-dom'




export function LibraryPage(){
   const navigate = useNavigate()
   const {id} = useParams<{id: string}>()
   
   return (
    <div id='library-body'>      
      <div id='library-header-scope'>
         <div id='library-header-logo-scope'>
            <div id='library-header-logo'/>
         </div>
         <div id='library-header-links'>
            <p><a href="">Reading</a></p>
            <p><a href="">Favorites</a></p>
            <p><a href="">week</a></p>
            <p><a href="">best</a></p>
         </div>
         
      </div>

      <div id='library-introduction-scope'>
         <div id='library-introduction'>
         
            <h4>Start your reading journey today</h4>
         
            <div>
               <h1>Where every page <br/> is a new Adventure</h1>
            </div>
         
            <p>From classics to contemporary, our bookstore offers a <br/> wide selection of books to suit every taste and interest. <br/> Start exploring our shelves today and uncover your next literary gern</p>
         
            <button id='library-introduction-btn'>Search Books</button>
         
         </div>

         <div id='library-introduction-image'/>
      </div>

      <div id="library-menu-scope">
         <div className='library-menu-title' id='best'><h1>Best Sellers</h1></div>
         <div className='library-menu-row'>
            <div className="library-menu-books-area" onClick={() => navigate(`/book/${id}/${"livro"}`)} id='library-menu-book-seneca'/>
            <div className="library-menu-books-area" onClick={() => navigate(`/book/${id}/${"algoritmo"}`)} id='library-menu-book-freud'/>
            <div className="library-menu-books-area" onClick={() => navigate(`/book/${id}/${"conde"}`)} id='library-menu-book-conde'/>
            <div className="library-menu-books-area" onClick={() => navigate(`/book/${id}/${"prince"}`)} id='library-menu-book-prince'/>
            <div className="library-menu-books-area"/>
         </div>
         <div className='library-menu-title'><h1>Most Recomended</h1></div>
         <div className='library-menu-row'>
            <div className="library-menu-books-area"/>
            <div className="library-menu-books-area"/>
            <div className="library-menu-books-area"/>
            <div className="library-menu-books-area"/>
            <div className="library-menu-books-area"/>
         </div>
      </div>
    </div>
 )
}