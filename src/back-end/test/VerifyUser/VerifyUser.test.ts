import {beforeAll,afterAll,afterEach,it,expect,test,describe} from "vitest"
import {server} from "../Server/HttpServer"

describe("VerifyUser", () => {
    beforeAll(() => server.listen())
    afterAll(() => server.close())
    afterEach(() => server.resetHandlers())

    it("should verify user", async () => {
       const response = await fetch("http://localhost:3000/test")

       await expect(response.json()).resolves.toEqual({message: "Hello from the test server!"})
    })
})

