const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Exercise_Tracker_p2' ||process.env.MONGODB ,{useNewUrlParser:true})
.then(()=>{
    console.log('mongodb connected');
})
.catch((e)=>{
  console.log(e);  
})
module.exports ={
    mongoose
}