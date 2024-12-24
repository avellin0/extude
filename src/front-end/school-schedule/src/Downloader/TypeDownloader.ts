import express, {Request,Response} from 'express'
import ytdl from 'ytdl-core'

const app = express()
const port = 3030

app.get('/download', async(req: Request, res: Response) => {
    const videoUrl = req.query.url as string

    if(!videoUrl){
        return res.status(400).send('URL não fornecida')
    }

    try {
        // Verifica se a URL é válida do YouTube
        if (!ytdl.validateURL(videoUrl)) {
            return res.status(400).send('URL inválida do YouTube');
        }

        // Inicia o download do vídeo em formato de streaming
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        res.header('Content-Type', 'video/mp4');

        // Fazendo o download do vídeo diretamente para a resposta do cliente
        ytdl(videoUrl, { quality: 'highest' }).pipe(res);
    } catch (error) {
        res.status(500).send('Erro ao baixar o vídeo');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});