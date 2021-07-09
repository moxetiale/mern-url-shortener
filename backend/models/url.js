const mongoose = require('mongoose')
const shortId = require('shortid')

// instantiate a mongoose schema

const UrlSchema = new mongoose.Schema({
    longUrl: {
      type: String,
      required: true
    },
    shortUrl: {
      type: String,
      required: true,
      default: shortId.generate
    },
    userIp: {
      type: String,
      required: true
    },
    userAgent: {
      type: String,
      required: true
    },
    views: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'View'
    }],
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
module.exports = mongoose.model('Url', UrlSchema)
