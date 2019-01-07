Exercise Tracker
=================
    
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

