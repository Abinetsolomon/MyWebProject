var pagesroute = require("express").Router();
var session = require('./auth')
var db = require('../db/db.js');
pagesroute.get('/login',function(req,res){
    if(req.session.userId){
        res.render("admin")
    }else{
        res.render('begin/login');
    }
   
});

pagesroute.get('/find',function(req,res){
    res.render('begin/find');
});
pagesroute.get('/registor',function(req,res){
       
    res.render("begin/registor")
});


pagesroute.get('/',function(req,res){
    db.query(`select * from store.catagories`,(e,r)=>{
        if(e){
            res.send(e)
        }else{
         res.render('home',{data:r});
        }
    })
   
});

pagesroute.get('/catagories/:id',function(req,res){
     const query = `select * from store.items where catagory_id =${Number(req.params.id)}`;
     db.query(query,(e,r)=>{
         if(e){
             console.log(e);
             res.send("err")
         }else{
           res.render('store/catagories',{data:r})  
         }
     })

    
});
pagesroute.get('/jqury',(req,res)=>{
    res.render('begin/jqury')
})
module.exports=pagesroute;