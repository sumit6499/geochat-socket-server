import express from 'express'
import {createServer} from 'http'
import SocketService from './services/socket.service'
import { exit } from 'process'
const app=express()

const init= async ()=>{
    const PORT=process.env.PORT || 8000

    try {
        const socketService=new SocketService()
        const server=createServer(app)

        socketService.io.attach(server)

        socketService.socketListners()

        server.listen(PORT,()=>{
            console.log("server running")
        })

        return server
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

init()


