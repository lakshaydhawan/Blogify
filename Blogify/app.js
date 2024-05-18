//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql=require("mysql");
const connection=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"lakshayparth",
  database:"blog"
});
connection.connect((error)=>{
  if(error){
    console.log(error.message);
  }
  else{
    console.log("database connected")
  }
});
let posts=[];
const homeStartingContent =  "Welcome to Blogify, your go-to destination for insightful articles, engaging stories, and expert advice on various topics. Dive into a world of captivating content crafted by passionate writers who are dedicated to bringing you the latest trends, thought-provoking discussions, and practical tips. Whether you're a seasoned enthusiast or a curious beginner, our diverse range of topics ensures there's something for everyone. Join our community of readers and embark on a journey of discovery, inspiration, and learning at Blogify.";
const aboutContent = "Welcome to Blogify, We're a passionate team of writers, creators, and enthusiasts dedicated to sharing our knowledge and experiences with the world.At Blogify, we believe in the power of storytelling and the value of knowledge exchange. Our mission is to inspire, educate, and entertain our readers through engaging content that explores a wide range of topics, from politics,daily life experiences to social issues.With a commitment to quality and authenticity, we strive to deliver thought-provoking articles, helpful guides, and insightful perspectives that resonate with our diverse audience. Whether you're seeking practical advice, seeking inspiration, or simply looking to expand your horizons, we're here to accompany you on your journey.Join us as we embark on this adventure of discovery, learning, and growth together. Thank you for being part of our community!";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
 
  const insertQ=`Select * from blog`;
      connection.query(insertQ,(error,result)=>{
        if(error) throw error;    
        else{
          res.render("home",{homeContent:homeStartingContent,posts:result});
        }
      });
  
  

})
app.get("/about",(req,res)=>{
  res.render("about",{about:aboutContent});
  })
app.get("/contact",(req,res)=>{
  res.render("contact");
  })
app.get("/compose",(req,res)=>{
    res.render("compose");
    }) 
app.get("/post/:title",(req,res)=>{
  const insertQ=`Select * from blog`;
  connection.query(insertQ,(error,result)=>{
    if(error) throw error;    
    else{
      var titleofpost="";
  var bodyofpost="";
  for(var i=0;i<result.length;i++){
 if(result[i].title==req.params.title){
  titleofpost=result[i].title;
  bodyofpost=result[i].body;
 res.render("post",{title:titleofpost,body:bodyofpost})
 }
 
  }
    }
  });
  
      })     
app.post("/insert",(req,res)=>{
      var title=req.body.title;
      var body=req.body.body;
      var post={t:title,b:body};
      var id=1;
      const insertQ=`Insert into blog(title,body) Values('${title}','${body}')`;
      connection.query(insertQ,(error)=>{
        if(error){
          res.send(error.message);
        }
        else{
          console.log("values added");
        }
      });
      // posts.push(post);
     res.redirect("/");
      
      }) 

app.get("/need",(req,res)=>{
  const insertQ=`Select * from blog`;
      connection.query(insertQ,(error,result)=>{
        if(error){
          res.send(error.message);
        }
        else{
          console.log(result);
        }
      });
})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
