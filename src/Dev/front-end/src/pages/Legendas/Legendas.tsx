import "./Legendas.css"
import { useEffect, useState, useRef } from "react";
import video from "./video.mp4"

// Função que parseia o VTT recebido em texto bruto
export function parseVTT(vttText: string) {
    const lines = vttText.split("\n");
    const subtitles: { start: number; end: number; text: string }[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i].trim();

        // se é uma linha de tempo
        if (line.includes("-->")) {
            const [start, end] = line.split("-->");
            const startTime = toSeconds(start.trim().split(" ")[0]); // pega só o tempo antes de "align"
            const endTime = toSeconds(end.trim().split(" ")[0]);

            i++;
            let text = "";
            while (i < lines.length && lines[i].trim() !== "") {
                // remove tags tipo <c> e <00:00:00.460>
                const clean = lines[i].replace(/<[^>]+>/g, "");
                text += clean + " ";
                i++;
            }

            subtitles.push({ start: startTime, end: endTime, text: text.trim() });
        }
        i++;
    }

    return subtitles;
}

// converte "00:01:02.500" para segundos
export function toSeconds(time: string) {
    const [h, m, s] = time.split(":");
    const [sec, ms] = s.split(".");
    return (
        parseInt(h) * 3600 +
        parseInt(m) * 60 +
        parseInt(sec) +
        (ms ? parseInt(ms) / 1000 : 0)
    );
}

export function Legendas() {
    const [subtitles, setSubtitles] = useState<
        { start: number; end: number; text: string }[]
    >([]);
    const [currentSubtitle, setCurrentSubtitle] = useState("");
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        async function fetchSubtitles() {
            const res = await fetch("http://localhost:8000/subtitles",
                {
                    cache: "no-store"
                }
            ); // sua API
            const text = await res.text();
            
            console.log("teste",text);
            

            const parsed = parseVTT(text);
            setSubtitles(parseVTT(text));
            console.log("Parsei agora:", parsed);

        }
        fetchSubtitles();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const update = () => {
            const time = video.currentTime;
            const active = subtitles.find(
                (s) => time >= s.start && time <= s.end
            );
            setCurrentSubtitle(active ? active.text : "");
        };

        video.addEventListener("timeupdate", update);
        return () => video.removeEventListener("timeupdate", update);
    }, [subtitles]);

    return (
        <div id="legendas-body">
            <div className="legendas-scope">
                <video ref={videoRef} controls width={600}>
                    <source src={video} type="video/mp4" />
                </video>
                <div className="">
                    <p>{currentSubtitle}</p>
                </div>
            </div>
        </div>
    );
}
