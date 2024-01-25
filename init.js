const mongoose = require('mongoose');
const chat=require("./models/chat.js");
main().then(() => console.log('Connected to MongoDB!'))
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  }
  let chats=[
    {
        from:"rahul",
        to:"anjana",
        msg:"hi anjana",
        createdAt:new Date()
    },
    {
        from:"anjana",
        to:"rakshita",
        msg:"hi rakshita",
        createdAt:new Date()
    },
    {
        from:"rakulpreet",
        to:"rahul",
        msg:"hi rahul",
        createdAt:new Date()
    },
    {
        from:"nayan",
        to:"harshita",
        msg:"hi how are you ?",
        createdAt:new Date()
    }
  ]
   chat.insertMany(chats);