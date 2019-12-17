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
            socket.broadcast.to(socketId).emit('notifyNewWork', '')
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