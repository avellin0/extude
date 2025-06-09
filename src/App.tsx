import './App.css'
import { useState, useEffect } from 'react'
import foto from "./assets/v3.png"

function App() {

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false)


  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <header id={scrolled ? 'header scrolled' : 'header'}>
        <div>
          <img src={foto} alt="" id='header-img' />
        </div>

        <div id='portfolio-more'>
          <div>

            <div className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
              <span className="bar bar1"></span>
              <span className="bar bar2"></span>
              <span className="bar bar3"></span>
            </div>

            <div className={`sidebar ${open ? 'show' : ''}`}>
              <ul>
                <li><a href="/reading">Reading</a></li>
                <li><a href="/reading">Favorites</a></li>
                <li><a href="/reading">Week</a></li>
                <li><a href="/reading">Best</a></li>
              </ul>
            </div>

          </div>
        </div>
      </header>


      <div id='introduction'>
        <div id='main-first-text-scope'>
          <p>Start your reading journey today</p>
          <div>
            <h2>Where every page <br /> is a new Adventure</h2>
          </div>
          <p>From classics to contemporary<br />our bookstore offers a wide selection of books to suit every taste and interest</p>

        </div>
        <div id='main-first-button-scope'>
          <button id='library-introduction-btn'>Search books</button>
        </div>

      </div>

      <div id='library-menu-scope'>

        <div className='library-menu-row'>
          <div className="library-menu-books-area"  id='library-menu-book-seneca'/>
          <div className="library-menu-books-area"  id='library-menu-book-freud' />
        </div>  
        <div className='library-menu-row'>
          <div className="library-menu-books-area"  id='library-menu-book-conde'></div>
          <div className="library-menu-books-area"  id='library-menu-book-prince' />
        </div>  
        <div className='library-menu-row'>
          <div className="library-menu-books-area"  id='library-menu-book-seneca'></div>
          <div className="library-menu-books-area"  id='library-menu-book-poemas' />
        </div>  
      </div>
    </>
  )
}

export default App
