const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    company:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['Applied', 'Interview', 'Rejected', 'Selected'],
        default:'Applied'
    },
    date:{
        type:Date,
        default:Date.now
    },
      notes: {
    type: String,
    trim: true,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Job',JobSchema);