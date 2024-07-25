import {Server,Socket} from 'socket.io'
import redisClient from '../lib/redis'

interface Ilocation{
    user:string
    lat:number,
    long:number,
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
            socket.on('send-message',(message:string,callback:Function)=>{
                    console.log(message)
                    io.emit('recieve-message',message)
                }
            )
            socket.on('send-location',async (location:string)=>{
                const{user,lat,long}:Ilocation=JSON.parse(location)

                console.log(user)
                if(user){
                    //store location of user in redis geospatial DS
                    await redisClient.geoadd("location:nearby","NX",long,lat,user)
                    redisClient.expire("location:nearby",7)
                    //find nearby user within 1KM
                    const userNearby=await redisClient.georadius("location:nearby",long,lat,1,"KM")
                    
                    const friendsNearby=userNearby.filter((val)=>{
                        if(val!==user){
                            return user
                        }
                    })

                    socket.emit("nearby-friend",friendsNearby)
                }


            })

        })
    }

    get io(){
        return this._io
    }
}

export default SocketService