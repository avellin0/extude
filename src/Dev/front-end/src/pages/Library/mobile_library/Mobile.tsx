import './Mobile.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import foto from "../../assets/v3.png"



function Mobile() {
  const navigate = useNavigate()

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
        <div className='library-book-scope' onClick={() => handleBookClick("poor_folk")} id='img-1'/>
        <div className='library-book-scope' onClick={() => handleBookClick("prince")} id='img-2'/>
        <div className='library-book-scope' onClick={() => handleBookClick("livro")} id='img-3'/>

      </div>
     
    </>
  )
}

export default Mobile