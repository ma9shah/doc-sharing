let io = require('socket.io')(3003, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", socket => {
    socket.on('send-changes',
        delta => {
            socket.broadcast.emit('accept-new-changes', delta)
            console.log(delta.ops)
        })
    console.log("Connection established")
})