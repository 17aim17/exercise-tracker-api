const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/Exercise_Tracker_p2' ||process.env.MONGODB)
.then(()=>{
    console.log('mongodb connected');
})
.catch((e)=>{
  console.log(e);  
})
module.exports ={
    mongoose
}