Exercise Tracker
=================
    
User Sign Up  {Enter username ,password}
----------------------------------------------------------------------
                POST /api/user/


Get your user info  ----------------------------------------------------------------------
                GET /api/user/me


User login {Enter username ,password}
----------------------------------------------------------------------
                POST api/user/login


User Logout
----------------------------------------------------------------------
                DELETE api/users/me/token


Add exercises {Enter description ,duration ,date(YYYY-MM-DD)}
----------------------------------------------------------------------
                POST /api/exercise/

    
GET  exercise log: 
-------------------------
                GET /api/exercise?[&from][&to][&limit]   get all without any query
  { } = required, [ ] = optional
  from, to = dates (yyyy-mm-dd); limit = number


GET  Individual exercise log: 
-------------------------
                GET /api/exercise/:id


EDIT  Individual exercise log: 
-------------------------
                PATCH /api/exercise/:id


DELETE  Individual exercise log: 
-------------------------
                DELETE /api/exercise/:id

