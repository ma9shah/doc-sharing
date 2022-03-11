let io = require('socket.io')(3003, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})
const connection = require('./connection');

io.on("connection", socket => {
    connection.main();

    socket.on('verifyUser', (username,passowrd)=>{
        console.log("server checking user")
        // console.log('will now update ', data, user, group, file)
        connection.login(username, passowrd).then(login=>{
            console.log(login);
            socket.emit('LoggedIn', login);
            console.log("emitted");
        }).catch(err=>{
            console.log(err);
        });
    }); 

    socket.on('getGroupList', (username)=>{
        connection.listDatabases(username).then(groups=>{
            socket.emit("groups", groups);
        }).catch(err=>{
            console.log(err);
        })
    });

    socket.on('getGroupData', (groupId)=>{
        console.log("sever", groupId);
        connection.getGroup(groupId).then(groupInfo=>{
            socket.emit('groupData',groupInfo);
        }).catch(err=>{
            console.log(err);
        })
    });

    socket.on('getFileData', fileId =>{
        connection.getFile(fileId).then(text=>{
            console.log("text from server ", text);
            socket.emit('data', text);
        }).catch(err=>{
            console.log(err);
        })
    });

    socket.on('updateFile', (fileId, updatedText) =>{
        connection.updateFile(fileId, updatedText).then(text=>{
            console.log("text updated to ", text);
        }).catch(err=>{
            console.log(err);
        })
    });

    socket.on('createAccount',(username, email, password) =>{
        connection.createAccount(username, email, password).then(created=>{
            console.log(created, "created");
            socket.emit("created", created);
        }).catch(err=>{
            console.log(err);
        })
    });

    socket.on('addNewGroup', (passcode, username)=>{
        connection.addNewGroup(passcode, username).then(added=>{
            socket.emit('added', added);
        }).catch(err=>{
            console.log(err);
        });
    })

    socket.on('send-changes', delta => {
            socket.broadcast.emit('accept-new-changes', delta)
            console.log(delta.ops)
        })
        
    console.log("Connection established")
})