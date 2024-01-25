const express=require("express");
const app=express ();
const mongoose = require('mongoose');
const path=require("path");
const port=8080;
const chat=require("./models/chat.js");
var methodOverride = require('method-override');
app.set("views",path.join(__dirname, 'views'));
app.set("viewengine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

main().then(() => console.log('Connected to MongoDB!'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//index route
app.get("/chats",async(req,res)=>{
    let chats=await chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
   let newChat=new chat({
    from:from,
    msg:msg,
    to:to,
    createdAt:new Date()
   });
   newChat.save()
   .then(res=>console.log("response working"))
   .catch(err=>console.log(err));
   res.redirect("/chats");
})
//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chats= await chat.findById(id);
    res.render("edit.ejs",{chats});
})
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let{msg:updatedChat}=req.body;
    console.log(updatedChat);
    await chat.findByIdAndUpdate(id,{msg:updatedChat},{runValidators:true,new:true});
    res.redirect("/chats");
})
//delte
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
   await chat.findByIdAndDelete(id);
   res.redirect("/chats");
})
app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});