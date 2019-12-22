const jwt = require('jsonwebtoken');
const SocketService = require('../../Service/SocketService');

const SocketController = (io) => {
    // const usernames = [];

    io.on('connection', function(socket){
        socket.on('updateSocketId', async (token) => {
            const user = jwt.verify(token,Env.APP_KEY);
            const result = await SocketService.updateSocketId(user.id , socket.id);
        });
        
        socket.on('workNotify', async (body) => {
            const result = await SocketService.insertNotification(body);
            const socketId= await SocketService.getSocketId(body.token);
            socket.broadcast.to(socketId.socket_id).emit('notifyNewWork', result);
        });

        socket.on('connectToAdmin', (dataConnect) => {
            let userData ={
                user : jwt.verify(dataConnect.token,Env.APP_KEY),
                socket_id : socket.id
            }
            socket.broadcast.to(dataConnect.admin.socket_id).emit('notifyConnect', userData);
        });
        socket.on('sendMessageToAdmin', (input) => {
            socket.broadcast.to(input.admin.socket_id).emit('adminReceiveMessage', input.chatlog);
        });
        socket.on('sendMessageToUser', (input) => {
            socket.broadcast.to(input).emit('userReceiveMessage','You received an Message from admin');
        });
        // socket.on('adduser', (username) => {
        //     socket.username = username;
        //     usernames.push(username);

        //     const data = {
        //         sender: 'SERVER',
        //         message: 'You have join chat room'
        //     };

        //     socket.emit('update_message', data);

        //     const data2 = {
        //         sender: 'SERVER',
        //         message: username + ' has join chat room'
        //     }

        //     socket.broadcast.emit('update_message', data2);
        // });

        // socket.on('send_message', (message) => {

        //     const data = {
        //         sender: 'YOU',
        //         message: message
        //     };

        //     socket.emit('update_message', data);

        //     const data2 = {
        //         sender: socket.username,
        //         message: message
        //     };

        //     socket.broadcast.emit('update_message', data2);
        // });

        // socket.on('disconnect', () => {

        //     for(let i = 0; i < usernames.length; i++){
        //         if(usernames[i] == socket.username){
        //             usernames.splice(i, 1);
        //         }
        //     };

        //     const data = {
        //         sender: 'SERVER',
        //         message: socket.username + ' has left chat room'
        //     };

        //     socket.broadcast.emit('update_message', data);
        // });
    });
}

module.exports = {
    SocketController
}