const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ratingsSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    ref:"userModel"
  },
  restroId:{
    type: Schema.Types.ObjectId,
    ref:"offer"
  },
  ratings:{
    type:Number
  }
})
module.exports = mongoose.model('ratings',ratingsSchema)
