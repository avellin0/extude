import "./LibraryBookPage.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface ApiResponse{
    livro: string[]
}


export default function LibraryBookPage(){
    
    const [indice,setIndice] = useState<number>(0)
    const [message, setMessage] = useState<string>('')
    const [sections, setSections] = useState<string[]>([])
    const [quotes, setQuotes] = useState<string[]>([])
    const [result, setResult] = useState<string[]>([])


    const {book} = useParams<{book: string}>()

    useEffect(() => {
     const getEpub = async() => {
        try{

        const response = await fetch(`http://localhost:5000/book/${book}`)
       
        if(!response){
            throw new Error("Deu merda na resposta!")
          }
  
          const data: ApiResponse = await response.json()  
          
         data.livro.forEach((v) => console.log(v.length)
         );
          
            const text = data.livro.map((capitulo) => capitulo)


        function CountString(text: string[], tamanho: number){
                

                text.map(str => {
                    while(str.length >= tamanho){
                        result.push(str.slice(0,tamanho))
                        str = str.slice(tamanho)
                    }

                    if(str.length > 0){
                        result.push(str)
                    }
                });

                setResult(result)
                return console.log(result);
                
            }

            CountString(text,600)
            
            
            setSections(text)
            setMessage('Clique em "Veja" para inicar a leitura')
         
        }catch(err){
        console.log("esse é o erro:", err)
        }

     }
     
    
    getEpub()     
    
},[])


    const CountCharcter = () => {
        
        const texto = document.getElementById('epub-book')
        if(!texto) return

        const page = sections[indice].substring(4,6)
        const nowPage = page

        if(nowPage){
            console.log(indice);
            console.log(nowPage);
        }

        const newArray:number[] = [28,29,1,12,21,22,23,24,25,26,27,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,18,19,20]
       

        console.log(newArray);
        
        setIndice((prevIndex) => (prevIndex + 1) % newArray.length);
        
        

        
        texto.innerText = sections[newArray[indice]]
    }


    
const handleMouseUp = () => {
    
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim() || "";

    // Adiciona ao estado se o texto for válido
    if (selectedText) {
      setQuotes((prevQuotes) => [...prevQuotes, selectedText]);
      console.log("Texto selecionado:", selectedText); // Para depuração
    }

    // Limpa a seleção visual da página
    selection?.removeAllRanges()
  }

    return (
        <div id="epub-body" >
            <div id="epub-sidebar-scope">
                <div id="epub-side-book-notes">
                    <h3>Notes</h3>
                    <textarea id="epub-side-book-textarea" placeholder="Reflita sobre seus pensamentos aqui "/>
                </div>

                <div id="epub-side-book-quote">
                    <h3>Quotes</h3>
                    
                    <ul id="teste">
                        {quotes.map((quote,index) => (
                            <li key={index}>{quote}</li>
                        ))}
                    </ul>

                </div>
                <button onClick={() => CountCharcter()} id="epub-side-book-btn" >VEJA</button>
            </div>
            <div id="epub-book-scope" onMouseUp={() => handleMouseUp()}>
                <div id="epub-book">{message}</div>
            </div>
        </div>
    )
}