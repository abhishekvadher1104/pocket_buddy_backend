const mongoose = require('mongoose')
const stateSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
    unique:true
  },

},{
  timestamps:true
})

module.exports = mongoose.model('State',stateSchema)