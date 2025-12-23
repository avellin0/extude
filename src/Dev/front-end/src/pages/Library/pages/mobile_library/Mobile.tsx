import './Mobile.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import foto from "../../assets/icons/v3.png"
import { Search } from '../search_books/Search';



function Mobile() {
  const navigate = useNavigate()

  const [view, setView] = useState(false);
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


  const handleBookClick = (bookName: string) => {
    navigate(`/book/${bookName}`);
  }


  return (
    <div id='body'>
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
                <li onClick={(() => navigate("/reading"))}>Reading</li>
                <li onClick={(() => navigate("/m_personal_book"))}>Personal</li>
                <li onClick={(() => navigate("/favorites"))}>Favorites</li>
                <li onClick={(() => navigate("/translate"))}>Translate</li>
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
          <div id='main-first-description'>
            <p>From classics to contemporary<br />our bookstore offers a wide selection of books to suit every taste and interest</p>
          </div>

        </div>
        <div id='main-first-button-scope'>
          <button id='main-search-btn' onClick={() => setView(true)}>Search books</button>
        </div>

      </div>

      {
        view ? (<>
          <div id='library-search-books' >
            <div id='view-exit' onClick={() => setView(false)} />
            <Search view={view} />
          </div>
        </>) : ""
      }

      <div id='library-menu-scope'>
        <div className='library-book-scope' onClick={() => handleBookClick("poor_folk")} id='img-1' />
        <div className='library-book-scope' onClick={() => handleBookClick("prince")} id='img-2' />
        <div className='library-book-scope' onClick={() => handleBookClick("livro")} id='img-3' />

      </div>

    </div>
  )
}

export default Mobile