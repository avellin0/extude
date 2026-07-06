import { useState } from 'react';
import { Search } from '../search_books/Search';
import './LibraryPage.css'

import { useNavigate, useParams } from 'react-router-dom'

function Library() {
   const navigate = useNavigate();
   const [view, setView] = useState(false)

   const { name, id } = useParams<{ name: string, id: string }>()


   const handleBookClick = (bookName: string, author: string) => {
      navigate(`/book/${name}/${id}/${bookName}/${author}`);
   }

   const searchBooks = () => {
      setView(true)
   }

   return (
      <div id='library-body'>

         <div id='library-header-scope'>
            <div id='library-header-logo-scope'>
               <div id='library-header-logo' />
            </div>
            <div id='library-header-links'>
               <p onClick={() => navigate(`/reading/${name}/${id}`)}>Reading</p>
               <p onClick={() => navigate(`/personal_book/${name}/${id}`)}>Personal</p>
               <p onClick={() => navigate('/favorites')}>Favorites</p>
               <p onClick={() => navigate('/translate')}>Translate</p>
            </div>

         </div>

         <div id='library-introduction-scope'>

            <div id='library-introduction'>
               <div>
                  <h4>Start your reading journey today</h4>
               </div>

               <div>
                  <h1>Where every page <br /> is a new Adventure</h1>
               </div>

               <p>
                  From classics to contemporary, our bookstore offers a <br /> wide selection of books to suit every taste and interest. <br />
                  Start exploring our shelves today and uncover your next literary generation
               </p>

               <div id='library-introduction-btn-scope'>
                  <button id='library-introduction-btn' onClick={() => searchBooks()}>Search Books</button>
               </div>

            </div>

            <div id='library-introduction-image' />
         </div>

         {
            view ? (<>
               <div id='library-search-books' >
                  <div id='view-exit' onClick={() => setView(false)} />
                  <Search view={view} />
               </div>
            </>) : ""
         }


         <div id="library-menu-scope">
            <div className='library-menu-title' id='best'><h1>Best Sellers</h1></div>
            <div className='library-menu-row'>
               <div className="library-menu-books-area" onClick={() => handleBookClick('seneca', 'Seneca')} id='library-menu-book-seneca' />
               <div className="library-menu-books-area" onClick={() => handleBookClick("freud", "Freud")} id='library-menu-book-freud' />
               <div className="library-menu-books-area" onClick={() => handleBookClick("conde_de_monte_cristo", " Alexandre Dumas")} id='library-menu-book-conde' />
               <div className="library-menu-books-area" onClick={() => handleBookClick("prince", "Antoine de Saint-Exupéry")} id='library-menu-book-prince' />
               <div className="library-menu-books-area" onClick={() => handleBookClick("poemas", "Pedro salomao")} id='library-menu-book-poemas' />
            </div>
            <div className='library-menu-title'><h1>Most Recomended</h1></div>
            <div className='library-menu-row'>
               <div className="library-menu-books-area" onClick={() => handleBookClick('picture', "Oscar wilde")} id='library-menu-book-picture' />
               <div className="library-menu-books-area" onClick={() => handleBookClick('alice', 'Lewis carrol')} id='library-menu-book-alice' />
               <div className="library-menu-books-area" onClick={() => handleBookClick('estranho', 'Mark twain')} id='library-menu-book-estranho' />
               <div className="library-menu-books-area" onClick={() => handleBookClick('mobi_dick', 'Herman malville')} id='library-menu-book-mobi_dick' />
               <div className="library-menu-books-area" onClick={() => handleBookClick('war_and_peace', 'Fiódor Dostoiévski')} id='library-menu-book-war_and_peace' />
            </div>
            <div className='library-menu-title'><h1>Dostoevsky</h1></div>
            <div className='library-menu-row'>
               <div className="library-menu-books-area" onClick={() => handleBookClick('underground', 'Fiódor Dostoiévski')} id='library-menu-book-underground' />
               <div className="library-menu-books-area" onClick={() => handleBookClick('poor_folk', 'Fiódor Dostoiévski')} id='library-menu-book-poor-folk' />
               <div className="library-menu-books-area" onClick={() => handleBookClick('white_nights', 'Fiódor Dostoiévski')} id='library-menu-book-white_nights' />
               <div className="library-menu-books-area" onClick={() => handleBookClick('crime_castigo', 'Fiódor Dostoiévski')} id='library-menu-book-crime_castigo' />
               <div className="library-menu-books-area" onClick={() => handleBookClick('idiot', 'Fiódor Dostoiévski')} id='library-menu-book-idiot' />
            </div>
         </div>
      </div>
   )
}

export default Library