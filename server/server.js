let io = require('socket.io')(3003, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", socket => {

    socket.on('docId-change', docId => {
        data = "Start typing..."
        socket.join(docId)
        socket.emit('updated-docId', data)
        socket.on('send-changes',
        delta => {
            socket.broadcast.to(docId).emit('accept-new-changes', delta)
            console.log(delta.ops)
        })
    })
    console.log("Connection established")
})