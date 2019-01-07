// exercise

// POST api/exercise
// GET  api/exercise?form=23&to=c&limit=2    Default all
// GET  api/exercise/:id
// PATCH api/exercise/:id
// DELTE api/exercise/:id



// Users
// POST api/user   SIGNup
// Get  api/user/me  GET profile
// POST api/user/login  login
// DELETE api/users/me/token   logout

// Post route for User
// app.post('/api/exercise/new', (req,res)=>{
//     let username = _.pick(req.body ,['username'])
//     User.findOne(username).then((user)=>{
//         if(user){
//           res.status(400).send({error:'Username Already exist'})
//         }else{
//           let user =new User(username);
//           user.save().then(user=> {
//             res.status(200).send({user})
//           }).catch(e=>console.log(e) )
//         }
//     })
//   })
  