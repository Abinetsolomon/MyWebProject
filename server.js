 const express = require('express');
 const socket = require('socket.io');
 const authroute = require("./routes/auth");
 const pagesroute = require("./routes/pages");
 const session = require('express-session');
 const MySQLStore = require('express-mysql-session')(session);

 const cors = require("cors")

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const options = {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '1q2w3e1q2w3e',
      database: 'users',
      clearExpired: true,
  checkExpirationInterval: 20000,
  connectionLimit: 1,
   endConnectionOnClose: true,
  charset: 'utf8mb4_bin',
  schema:{
    tableName:"etiya",
    columnNames:{
      session_id:'id',
      expires:'expirdate',
      data:'mydata'
    }
  }
  };
  const sessionStore = new MySQLStore(options);

const sess ={
  name:'sid',
  resave:false,
  saveUninitialized:false,
  secret:'mv trudy',
  store:sessionStore,

  cookie:{
    maxAge:200000,
    sameSite:true,
    secure:false
  }
}
// if (app.get('env') === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     sess.cookie.secure = true // serve secure cookies
//   }
app.use(session(sess));
app.set('view engine','ejs');
app.use("/auth",authroute);
app.use("/",pagesroute);





  
 


 const server = app.listen(2000,function(res){
      console.log('server started');
  });

  const io = socket(server);
  io.on('connection',function(socket){
    
   socket.on('chat',function(data){
     
     io.sockets.emit('chat',data);
   });
   
   socket.on('typing',function(data){
      socket.broadcast.emit('typing',data);
   });
  });





