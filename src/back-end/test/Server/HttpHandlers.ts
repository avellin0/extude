import {http,HttpHandler, HttpResponse} from "msw"

export const HttpHandlers = [
    http.get("http://localhost:3000/test", () => {
        return HttpResponse.json(
            {message: "Hello from the test server!"}
        )
    })
]