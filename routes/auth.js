var authroute = require("express").Router();
var db = require('../db/db.js');
const bcrypt = require('bcrypt');
const validateit = require('./validation')
const {validationResult} = require('express-validator'); 

authroute.post('/registor',validateit('username','email','password'),function(req , res){
    const errors = validationResult(req).array();
    const {username,email,password}=req.body;
        if(errors.length>0){
            res.render('begin/registor',{data:errors,body:req.body})
          
            }else{
                const {email,password}=req.check
                const query = 'select email,password from user where email = ?';
                db.query(query,[email],function(err,result){
                    if(err){
                            console.log(err);
                            res.end()
                          }
                    if(result.length >0){
                        
                        bcrypt.compare("1q2w3e1q2w3e",result[0].password).then((match=>{
                            res.send(match)
                        }))
                      
                    }else{
                       
                            bcrypt.hash(password,10,(err,hash)=>{
                                if(err){
                                    console.log(err);
                                }else
                    var query= `INSERT INTO users.user ('user_name', 'email', 'password') VALUES ('${req.check.username}','${req.check.email}', '${hash}')`;
            
                               db.query(query,(err,result)=>{
                                   if(err){
                                       console.log(err);
                                   }else
                                   res.send(result)
                               })
                            });
                        
                       
                    }
                    
                });

            }     
         

    
}); 

authroute.post('/find',function(req , res){
    const offset =+3;
    const limit =3;
  db.query(`select * from user limit ${offset},3 /* where nick_name like '%${req.body.name}%' */`,function(err,result){
        if(err){
            console.log(err);
        }
        if(result.length >0){
            res.render('begin/result',{data:result,offset:offset})
        }else{
            res.send("you got new email")
        }
        
    })
});
authroute.get('/find/:id',(req,res)=>{
   
    const x = Number(req.params.id)+ 3;
    
db.query(`select * from user limit ${x},3`,(e,result)=>{
    if(e){
        res.send(e)
    }else{
        res.render('begin/result',{data:result,offset:x})
// res.render('result',{data:result,offset:x})
    }
})
    
})
authroute.get('/profile/:id',function(req , res){
         var ids = req.params.id
        db.query(`select * from user where id = ${ids} `,function(err,result){
            if(err){
                res.send("can not find")
            }
            if(result.length >0){
                res.render('begin/profile',{data:result})
            }else{
                res.send("you got new email")
            }
            
        });

});

authroute.post('/update',function(req , res){
   console.log(req.check.id);
   res.send("updated")
}); 
authroute.post('/login',function(req , res){
          if(req.session.userId){
              res.redirect("admin")
          }
      message=[];
       
     const result = db.query('select * from user where  user_name = ? and email = ?',[req.body.username,req.body.email],function(err,result){
    
        if(err){
                res.render("begin/login")
            }
            if(result.length>0)
              {
            //    bcrypt.compare(req.body.password,result[0].password,(match)=>{
            //        if(match){
            //         req.session.userId= result[0].id
            //        res.send("sucesss").end();
            //        }else{
            //          res.send("password do not match")
            //        }
            //    }) 
              
              console.log(result);
              res.end()
              
       
              
              }  


            })
        });

authroute.get('/admin' ,function(req,res){
        if(req.session.userId){
            res.redirect('admin')
        }else{
            res.send("you r not authrised")
        }
    
     
 
     
 });

authroute.post('/logout',(req,res)=>{
     console.log(req.session);
     req.session.destroy((err)=>{
        
         if(!err){
             res.redirect("/login")
             console.log(req.session)
         }else{
            console.log(err)
         }
     })
 });

 
module.exports= authroute;
