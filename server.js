
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const { connect }= require('./db/mongoose')
const bodyParser = require('body-parser')
const  {ObjectID} =require('mongodb')
const { Exercise } = require('./model/Exercise')
const {User} = require('./model/User')
const _ =             require('lodash')
const moment  =   require('moment')
const {authenticate} =require('./middleware/authenticate')

app.use(express.static('public'))
app.use(bodyParser.json())

const port  = process.env.PORT || 3000

app.get('/',(req,res)=>{
  res.status(200).send({Message:"EveryThing is Ok"})
})

/**
 * 
 *  Adding Information Routes
 * 
 */

// Post route for exercises
app.post('/api/exercise/' ,(req,res)=>{
    // const userId = req.body.userId;
    // if(!ObjectID.isValid(userId)){
    //   return res.status(404).send(); 
    // }

    const exercise =_.pick(req.body , [ 'description' ,'duration','date']);
     if(isValidDate(exercise.date)){
       const date =exercise.date;
       exercise.date = moment(date).valueOf()
     }else{
        return res.status(400).send({error:"Date must be Valid and In format (YYYY-MM-DD)"})
     }

      const newExercise = new Exercise(exercise)

      newExercise.save().then((exercise)=>{
        res.status(200).send({exercise})
      }).catch((e)=>res.status(400).send(e))

})

app.get('/api/exercise/' ,(req,res)=>{
   const from = req.query.from;
   const to = req.query.to;
   const limit = req.query.limit;

   Exercise.find({}).then((exercises)=>{
      let fromArray =[]
      let toArray = [] 
      let resultArray =[]

      // 1st filter
      if(_.isEmpty(from)){
        fromArray = exercises
      }else{
        if(!isValidDate(from)){
          res.send({error:"Start Date must be Valid and In format (YYYY-MM-DD)"})
          return 
        }
         fromArray = exercises.filter(d=>{
           return moment(d.date).isAfter(from)
         })
      }

      // 2nd filter
      if(_.isEmpty(to)){
        toArray =fromArray
      }else{
         if(!isValidDate(to)){
           res.send({error:"End Date must be Valid and In format (YYYY-MM-DD)"})
           return 
         }
          toArray = fromArray.filter(d=>{
         return moment(d.date).isBefore(to)
       })
      }

      // 3rd filter
      if(_.isEmpty(limit)){
        resultArray =toArray
      }else{
         start = toArray.length-1;
         counter = toArray.length>limit?limit:toArray.length;
         while(counter!=0){
           resultArray.push(toArray[start--])
           counter--;
         }
      }

      res.status(200).send(resultArray)

   })
   .catch((e)=>{
      res.status(400).send()
   })
  
})

app.get('/api/exercise/:id',(req,res)=>{
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
      return res.status(404).send(); 
    }
    Exercise.findById(id).then((exercise)=>{
      if(!exercise){
        res.status(400).send();
      }
      res.status(200).send({exercise})
    }).catch((e)=>{
      res.status(400).send()
    })

})

app.delete('/api/exercise/:id',(req,res)=>{
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
      return res.status(404).send(); 
    }
    Exercise.findOneAndRemove({_id:id}).then((exercise)=>{
      if(!exercise){
        res.status(400).send();
      }
      res.status(200).send({exercise})
    }).catch((e)=>{
      res.status(400).send()
    })

})

app.patch('/api/exercise/:id',(req,res)=>{
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
      return res.status(404).send(); 
    }
    let body = _.pick(req.body,[ 'description' ,'duration','date'])
    Exercise.findOne({_id:id}).then((exercise)=>{
       if(!exercise){
         res.status(400).send()
       }
      let doc =  _.pick(exercise,[ 'description' ,'duration','date'])
      console.log(doc);
      
       if( !(_.isEmpty(body.description)) ){ doc.description =body.description}
       if( !(_.isEmpty(body.duration.toString())) ){ doc.duration =body.duration}
       if( !(_.isEmpty(body.date)) ){
          if(!isValidDate(body.date)){
            return res.send({error:"Date must be Valid and In format (YYYY-MM-DD)"})
          }
          const date =body.date;
          doc.date = moment(date).valueOf()
        }
        return doc
    }).then((exercise)=>{
      Exercise.findOneAndUpdate({_id:id}, {$set:exercise} ,{new:true}).then((doc)=>{
          if(!doc) {
              return res.status(404).send()
          }
          res.status(200).send({doc})
      })
    }).catch((e)=>{
      return res.status(400).send()
    })

})

/**
 *  
 *  USERS ROUTES
 * 
 */

app.post('/api/user' ,(req,res)=>{
    const userData = _.pick(req.body,['username','password'])

    const user =new User(userData)
   
    user.save().then(()=>{
      return  user.generateAuthToken();
    }).then((token)=>{
      res.header('x-auth',token).send({user});
    })
    .catch((e)=>{
     return res.status(400).send(e);
    })  
})

app.get('/api/user/me', authenticate , (req,res)=>{
    res.send(req.user)
})

app.post('/api/user/login' , (req,res)=>{
  const userData = _.pick(req.body,['username','password'])
  User.findByCredentials(userData.username ,userData.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user)
    })
  }).catch((e)=>{
    res.status(400).send()
  })
})



const isValidDate =(date)=>{
  return moment(date ,"YYYY-MM-DD" ,true).isValid()
}

app.listen(port, ()=> {
  console.log(`Listening on port ${port}`);
});
