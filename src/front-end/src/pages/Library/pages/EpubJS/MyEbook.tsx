import { useEffect, useRef, useState } from "react"
import { ReactReader } from "react-reader"
import { useParams } from "react-router-dom"
import { supabase } from '../../../../supabase/supa-client'

interface URLprops {
  url: string | any,
  width?: string
}

export function Reader({ url, width }: URLprops) {

  const { name } = useParams<{ name: string }>()

  if (!name) return

  const [location, setLocation] = useState<string | number>(0)
  const renditionRef = useRef<any>(null)

  const debounceDB = async () => {
    let { data: books, error } = await supabase
      .from('books')
      .select('book_cfi')
      .eq('book_name', name)


    if (!books || books.length === 0) {
      console.log('Erro ao buscar livro');
      setLocation(1)
      return
    }

    if (error) {
      console.log('this is the error:', error);
    }

    if( books[0].book_cfi === null){
      setLocation(1)
      return 
    }


    setLocation(books[0].book_cfi)
  }

  useEffect(() => {
    const local = localStorage.getItem(name)
    console.log("Estou buscando pelo local:", local);

    if (local === null) {
      debounceDB()
    } else if (local) {
      setLocation(local)
    } else {
      debounceDB()
    }

  }, [])



  return (
    <>
      <div style={{ height: "100vh", width: width || "100vw" }}>
        {location && (
          <ReactReader
            url={url}
            location={location}
            locationChanged={(epubCFI: string) => {
              localStorage.setItem(name, epubCFI)
            }}
            getRendition={(rendition) => { renditionRef.current = rendition }}
            epubInitOptions={{ openAs: "epub" }}
          />
        )}

      </div>
    </>
  )
}