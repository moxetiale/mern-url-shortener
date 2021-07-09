const mongoose = require('mongoose')

// instantiate a mongoose schema
const ViewSchema = new mongoose.Schema({
    userIp: {
      type: String,
      required: true
    },
    userAgent: {
      type: String,
      required: true
    },
    url: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Url'
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
});

// create a model from schema and export it
module.exports = mongoose.model('View', ViewSchema)
