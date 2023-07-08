const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Backend-1');

const userSchema = new mongoose.Schema({
    username : String , 
    password: String ,
    Role : {
        type: String ,
        enum : ['User' , 'Admin'] ,
        default:'User'
    }
})

const UserModel = mongoose.model("User" , userSchema)
module.exports ={UserModel}