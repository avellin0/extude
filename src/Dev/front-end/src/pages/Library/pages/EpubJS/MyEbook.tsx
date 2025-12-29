import {useState} from "react"
import { ReactReader } from "react-reader"

interface URLprops{
  url: string|any,
  width?: string
}

export function Reader({url, width}: URLprops){

  const [location, setLocation] = useState<string|number>(0)

  return (
    <>
      <div style={{height: "100vh", width: width || "100vw"}}>
        <ReactReader
          url={url}
          location={location}
          locationChanged={(epubCFI: string) => setLocation(epubCFI)}
          epubInitOptions={{openAs: "epub"}}
        />
      </div>
    </>
  )
}