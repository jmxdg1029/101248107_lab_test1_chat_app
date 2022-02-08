const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const express = require('express')
const res = require('express/lib/response')
const PORT = 3000
const io = require('socket.io')(http)
const mongoose = require('mongoose');
const User = require('./model/user.js')
const userRouter = require('./routes/UserRouter.js');


app.use('/',express.json())

mongoose.connect('mongodb+srv://jmxdg1029:jmAug2901@cluster0.1iuws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(userRouter)

app.use(cors())

users = []


app.get("/",(req,res) => {
    res.send("Chat Server running...")
})

app.get("/index.html",(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

 //Get User Name
 app.get('/signUp.html', function(req,res){
    res.sendFile(__dirname + '/signUp.html')
})

app.get('/login.html', function(req,res){
    res.sendFile(__dirname + '/login.html')
})


io.on('connection', (socket) => {
    console.log('Connected')
    //console.log(socket)

    socket.emit('welcome', 'Welcome to Chat App '+ socket.id)

    var roomName = 'test'

    socket.on('message',(data) => {
        console.log(data) 

        //helps commicate too all sockets that are connected
        //(all clients connected to lobby)
        //io.socket.emit('newMessage', data)
        //socket.broadcast.emit('newMessage',data)
        io.to(roomName).emit('newMessage',data)
        //socket.to(roomName).broadcast.emit('newMessage', data )
    })

    //Sign Up Page
    socket.on('newUser', (name, username, password) => {
                const newuser = new User();
                console.log(name)
                newuser.name = name;
                newuser.username = username;
                newuser.password = password;
                console.log(newuser.name)
                newuser.save() 
    })


    //Login Page
    socket.on('login', (username, password) => {
        User.findOne({username: username, password: password}, function(err,user) {
            if(err){
                console.log(err)
            }
            if(!user){
                return console.log('user not found')
            }

            console.log('user FOUND!')
        })
         
    })
    

        
    //Group Join
    socket.on('joinroom', (room) => {
        socket.join(room)
        roomName = room
    })
    
    //io.in(roomName).emit('newMessage', 'New Message')

    //Disconnected
    socket.on('disconnect', () =>{
        console.log(`${socket.id} disconnected`)
    })
})

http.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})