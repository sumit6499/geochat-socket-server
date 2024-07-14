import {Server,Socket} from 'socket.io'


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
            console.log("new socket connected "+socket.id)

            socket.on('recieve-location',({location}:{location:string})=>{
                console.log("location recieved "+location)
            })

            socket.on('recieve-message',(data:Message)=>{

            })
        })
    }

    get io(){
        return this._io
    }
}

export default SocketService