let io = require('socket.io')(3003, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})
// const MongoClient = require('mongodb').MongoClient;
const connection = require('./connection');

io.on("connection", socket => {
    // const uri = "mongodb+srv://sana:ucirvine@cluster0.qaroa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    // const client = new MongoClient(uri);
    connection.main();

    socket.on('verifyUser', (username,passowrd)=>{
        console.log("server checking user")
        // console.log('will now update ', data, user, group, file)
        connection.login(username, passowrd).then(login=>{
            console.log(login);
            socket.emit('LoggedIn', login);
            console.log("emitted");
            // this.group = group;
            // connection.getGroup(group).then(file=>{
            //     this.file = file;
            //     connection.updateFile(file, data).then(text=>{
            //         console.log("from server", text);
            // socket.emit('data', text);
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

    var user, group, file;
    socket.on('getUserInfo',
        username => {
            console.log('got username', username)
            connection.listDatabases(username).then(group=>{
                this.group = group;
                connection.getGroup(group[0]).then(file=>{
                    this.file = file;
                    connection.getFile(file[0].file[0]).then(text=>{
                        console.log("from server", text);
                socket.emit('data', text);
            }).catch(err=>{
                console.log(err);
            });
                })
            }).catch(err=>{
                console.log(err);
            });
            // console.log("server ", text);
        })
    socket.on('updateChanges', (username,data)=>{
        console.log('will now update ', data, user, group, file)
        connection.listDatabases(username).then(group=>{
            this.group = group;
            connection.getGroup(group).then(file=>{
                this.file = file;
                connection.updateFile(file, data).then(text=>{
                    console.log("from server", text);
            // socket.emit('data', text);
        }).catch(err=>{
            console.log(err);
        });
            })
        }).catch(err=>{
            console.log(err);
        });
    }); 
    socket.on('send-changes', delta => {
            socket.broadcast.emit('accept-new-changes', delta)
            // console.log('will now update ', data, user, group, file)
        // connection.listDatabases(username).then(group=>{
        //     this.group = group;
        //     connection.getGroup(group).then(file=>{
        //         this.file = file;
        //         connection.updateFile(file, data).then(text=>{
        //             console.log("from server", text);
        //     // socket.emit('data', text);
        // }).catch(err=>{
        //     console.log(err);
        // });
        //     })       
        // }).catch(err=>{
        //     console.log(err);
        // });
            console.log(delta.ops)
        })
    console.log("Connection established")
})