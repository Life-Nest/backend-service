const express =require('express');
const app=express();

app.router("/users",)
app.get("/",(req,res)=>{
    res.send("<h1>Hello world");
})

app.listen(3000);