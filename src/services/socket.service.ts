import {Server,Socket} from 'socket.io'
import {listenMessage} from '../controllers/socketEvent.controller'

interface Message{
    message:string,
    user:Socket,
}

class SocketService{
    private readonly _io:Server

    constructor(){
        console.log("socket server intialized")
        this._io=new Server({

                cors:{
                    allowedHeaders:['*'],
                    origin:'*'
                }
            }
        );
    }


    public socketListners(){
        const io=this._io
        console.log("socket listeners intialized")
        io.on('connect',(socket)=>{
            console.log("new socket connected"+socket.id)
            socket.on('event:message',(message:string,callback:Function)=>{
                    console.log(message)
                    io.emit('event:recieve',message)
                }
            )
            socket.on('event:location',(location:Object)=>{
                console.log(location)
            })
        })
    }

    get io(){
        return this._io
    }
}

export default SocketService