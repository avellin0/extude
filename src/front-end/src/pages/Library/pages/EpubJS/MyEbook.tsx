import { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";

interface URLprops {
  url: string;
  width?: string;
  name: string;
  author: string;
}

export function Reader({ url, width, name, author }: URLprops) {
  const [location, setLocation] = useState<string | number | null>(null);

  const renditionRef = useRef<any>(null);

  useEffect(() => {
    const savedBook = localStorage.getItem(`epub.${name}`);

    if (savedBook) {
      const parsedBook = JSON.parse(savedBook);

      console.log("Livro salvo:", parsedBook);

      setLocation(parsedBook.location);
    }
  }, [name]);

  return (
    <div style={{ height: "100vh", width: width || "100vw" }}>
      <ReactReader
        url={url}
        location={location}
        locationChanged={(epubCFI: string) => {
          const rendition = renditionRef.current;

          let progress = 0;

          try {
            const percentage =
              rendition.book.locations.percentageFromCfi(epubCFI);

            progress = Math.round(percentage * 100);
          } catch (err) {
            console.log("Erro ao calcular progresso");
          }

          const bookData = {
            location: epubCFI,
            author,
            progress,
            updatedAt: new Date().toISOString(),
          };

          localStorage.setItem(
            `epub.${name}`,
            JSON.stringify(bookData)
          );

          setLocation(epubCFI);
        }}
        getRendition={(rendition) => {
          renditionRef.current = rendition;

          rendition.book.ready.then(() => {
            return rendition.book.locations.generate(1000);
          });
        }}
        epubInitOptions={{ openAs: "epub" }}
      />
    </div>
  );
}