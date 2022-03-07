const express=require('express');
const app=express();
const cors = require('cors');
const mongoose=require('mongoose');
const users = require('./models/user')
const uri = "mongodb+srv://shabbir:14174422@cluster0.zru3f.mongodb.net/loginData?retryWrites=true&w=majority";


mongoose.connect(uri).then(()=>{
  console.log("connection successful");
  app.listen(process.env.PORT||5000,function () {
 console.log("Server is running at port 3000");
});
}).catch((err)=>console.log("unsuccessfull"));

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.post("/login", cors() , async (req,res)=>{
  console.log(req.body)
  users.find({email:req.body.email},function(err,doc){

    if(err){
      res.send({"message":"no"})
    }else{
      if(doc[0].password===req.body.password){

        res.send({"message":"yes"})
      }else{
        res.send({"message":"noMatch"})
      }
    }
  })
  console.log(req.body);
})
app.post("/signup",function(req,res){
  users.find({email:req.body.email},function(err,doc){
    if(err){
    }else{
      if(doc.length===0){
      const user=new users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone
      })
      user.save().then((result)=>{
        res.send({"message":"executed"})
      }).catch((err)=>{console.log(err)});
    }else{
      res.send({"message":"exists"})
    }


    }
  })

})
app.get("/fetch",cors(), async (req,res)=>{
  users.find().then((result)=>{
    res.send(result)
  }).catch((err)=>{console.log(err)})

})
