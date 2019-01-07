const mongoose = require('mongoose');
const moment  =   require('moment')
const _     = require('lodash');
const ExerciseSchema = new mongoose.Schema({
        description:{
            type: String,
            required:true,
            trim:true
        },
        duration:{
            type:Number,
            required:true
        },
        date:{
            type: Number,
            require:true
        }
})

// Instance method
ExerciseSchema.methods.toJSON =function(){
    let data = this
    let dataObject= data.toObject()
    dataObject.date = moment(dataObject.date).format('YYYY-MM-DD')
    return _.pick(dataObject,['description','duration','date'])
}


Exercise = mongoose.model('Exercise' ,ExerciseSchema);
   
module.exports  = {Exercise}