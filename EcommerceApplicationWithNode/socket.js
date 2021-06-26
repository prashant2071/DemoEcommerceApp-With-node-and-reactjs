const socket =require('socket.io')
const indexConfig = require('./configs/index.config')
const users=[];

module.exports=function(app){
    const io=socket(app.listen(indexConfig.SOCKET_PORT),{
    
        cors:{
            origin: '*'
        }
    })
    console.log('we are here in socket js file',indexConfig.SOCKET_PORT)
    io.on('connection',function(client){
        console.log('socket client connected to server',client.id)
        var id=client.id
        client.on('new-user',function(name){
            users.push({
                id:id,
                name:name
            })
            client.emit('users',users)
            client.broadcast.emit('users',users)

        })
        //  client.emit('hi','welcome to server')

        //  client.on('hello',function(data){
        //      console.log('hello from >>',data)

        //  })
        client.on('new-message',function(data){
            console.log('data is',data)
            client.emit('reply-message-own',data);
            // emit for the client who has send the connection
            //for other client we use broadcast.emit
            client.broadcast.to(data.recieverId).emit('reply-message',data) //for selected user
            client.broadcast.emit('reply-message',data) //for broadcast


            // client.broadcast.emit.to(id).emit('eventName')
        })
        client.on('disconnect', function () {
            users.forEach(function (user, index) {
                if (user.id === id) {
                    users.splice(index, 1)
                }
            })

            client.broadcast.emit('users', users)

        })
    })

}