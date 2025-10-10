import {setupServer} from "msw/node"
import {HttpHandlers} from "./HttpHandlers"

export const server = setupServer(...HttpHandlers)