const { MongoClient, ObjectId } = require('mongodb');
module.exports = {
    // MongoClient: require('mongodb'),
    // ObjectId : require('mongodb'),
    // uri: 'mongodb+srv://sana:ucirvine@cluster0.qaroa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    client: new MongoClient('mongodb+srv://sana:ucirvine@cluster0.qaroa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',  { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1}),
    main: async function(){
        console.log("here ia m");
        // const uri = "mongodb+srv://sana:ucirvine@cluster0.qaroa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        // const client = new MongoClient(uri);
            try {
            // Connect to the MongoDB cluster
            await this.client.connect();
     
            // Make the appropriate DB calls
            // await  this.listDatabases(client, collection, username);
              console.log("connected");
              return this.client;
        } catch (e) {
            console.error(e);
        } finally {
            // await client.close();
        }
    },
    // main().catch(console.error);

    login: async function(username, pass){ 
        console.log("user", username );
        const check1 = await this.client.db("Keystone").collection("user").find({username: username}).limit(1);
        const c = await check1.toArray();
        if(c[0]==null) return false;
        console.log(JSON.stringify(c));
        const password = c[0].password;
        return password == pass;
        // return this.getGroup(group);
    },

    listDatabases: async function(username){ 
        console.log("user", username );
        const check1 = await this.client.db("Keystone").collection("user").find({username: username}).limit(1);
        const c = await check1.toArray();
        console.log(JSON.stringify(c));
        const group = c[0].group;
        return group;
        // return this.getGroup(group);
    },

    getGroup: async function (group){
        const findGroup = await this.client.db("Keystone").collection("group").find({_id: new ObjectId(group)}).limit(1);
        const file = await findGroup.toArray();
        const fileID = file[0].file[0];
        console.log(JSON.stringify(fileID));
        // return fileID;
        return file;
        // return this.getFile(fileID);
    },
  
    getFile: async function (fileID){
        const findFile = await this.client.db("Keystone").collection("file").find({_id: new ObjectId(fileID)}).limit(1);
        const file = await findFile.toArray();
        const text = file[0].data;
        console.log(JSON.stringify(text));
        // return text;
        return file;
    },

    updateFile: async function (fileID, updatedData){        
        const result = await this.client.db("Keystone").collection("file")
        
                                .updateOne({ _id: new ObjectId(fileID) }, { $set: {data:updatedData} });
        const findFile = await this.client.db("Keystone").collection("file").find({_id: new ObjectId(fileID)}).limit(1);
        const file = await findFile.toArray();
        const text = file[0].data;
        console.log('now updated',JSON.stringify(text));        
    },

    createAccount: async function(username, email, password){
        const check1 = await this.client.db("Keystone").collection("user").find({username: username}).limit(2);
        const c = await check1.toArray();
        if(c.length>=1) return false;
        const result = await this.client.db("Keystone").collection("user").insertOne({
            username: username,
            email: email,
            password: password
        });
        return result.acknowledged;
    },

    // addNewGroup: async function(passcode, username){
    //     const check1 = await this.client.db("Keystone").collection("user").find({username: username}).limit(2);
    //     const c = await check1.toArray();
    //     const userid = c[0].id
    // },
  
  
    createListing: async function (client){
        const result = await client.db("sample_airbnb").collection("l   istingsAndReviews").insertOne({
            name: "Keystone ",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        });
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }
};