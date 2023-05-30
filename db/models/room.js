const { default: mongoose } = require("mongoose");


const roomSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   maxCount: {
      type: Number,
      required: true
   },
   opinionsCount: {
      type: Number,
      required: true
   },
   rating: {
      type: Number,
      required: true
   },
   cost: {
      type: Number,
      required: true
   },
   image:{
      type: String,
      required: true
   },
   type: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   currentBookings: [],
}, 
{timestamps: true});

export const roomModel = mongoose.model("rooms", roomSchema)