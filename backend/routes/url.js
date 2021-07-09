const express = require('express');
const validUrl = require('valid-url');
var moment = require('moment');
const router = express.Router();

// Load Url model
const Url = require('../models/url');

// Load view model
const View = require('../models/view');

const local_url = 'http://localhost:8082/';

// @route GET /url/all
// @description Get all urls
// @access Public
router.get('/all', (req, res) => {
  Url.find()
    .then(url => res.json(url))
    .catch(err => res.status(404).json({ error: 'Urls not found' }));
});

router.get('/user-urls', async (req, res) => {

  let urls = await Url.find({ userIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
  userAgent: req.headers['user-agent']}).exec();

  res.json(urls);

});


// @route GET /utl/get/:shortUrl
// @description Get single url by shortUrl and create view record for this url
// @access Public
router.get('/get/:shortUrl', async (req, res) => {

  try {

    // find url by shortUrl
    let url = await Url.findOne({ shortUrl: req.params.shortUrl }).populate('views').exec();

    // return error if url not found
    if(!url){
      res.status(404).json({ error: 'Url: ' + local_url + req.params.shortUrl + ' not found' });
    }

    // convert to object
    url = url.toObject();

    // Create view record for given url with url id
    const view = new View({
      longUrl: req.body.url,
      userIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
      url: url._id
    })

    view.save();

    // Upade url views
    Url.updateOne({
      _id: url._id
    }, {
      $push: {
        views: view.id,
      }
    }).exec();

    // return succes
    return res.status(200).json(url)

  }
  // Handle exception
  catch (e) {

    console.error(e)
    res.status(500).json('Server Error')

  }

});

router.get('/stats/by-url/:shortUrl', async (req, res) => {

  let url = await Url.findOne({ shortUrl: req.params.shortUrl }).populate('views').exec();

  // return error if url not found
  if(!url){
    res.status(404).json({ error: 'Url: ' + local_url + req.params.shortUrl + ' not found' });
  }

  // convert to object
  url = url.toObject();

  let last_month = await View.find({ url: url._id, created_at: { $gte : moment().subtract(1, 'months').toDate() }  }).populate('url').exec();

  let last_week = await View.find({ url: url._id, created_at: { $gte : moment().subtract(7, 'days').toDate() }  }).populate('url').exec();

  let last_day = await View.find({ url: url._id, created_at: { $gte : moment().subtract(1, 'days').toDate() }  }).populate('url').exec();

  let last_hour = await View.find({ url: url._id, created_at: { $gte : moment().subtract(3600, 'seconds').toDate() }  }).populate('url').exec();

  let all = await View.find({ url: url._id }).populate('url').exec();

  let unique_last_month = await View.find({ url: url._id, created_at: { $gte : moment().subtract(1, 'months').toDate() }  }).distinct('userIp').populate('url').exec();

  let unique_last_week = await View.find({ url: url._id, created_at: { $gte : moment().subtract(7, 'days').toDate() }  }).distinct('userIp').populate('url').exec();

  let unique_last_day = await View.find({ url: url._id, created_at: { $gte : moment().subtract(1, 'days').toDate() }  }).distinct('userIp').populate('url').exec();

  let unique_last_hour = await View.find({ url: url._id, created_at: { $gte : moment().subtract(3600, 'seconds').toDate() }  }).distinct('userIp').populate('url').exec();

  let unique_all = await View.find({ url: url._id }).distinct('userIp').populate('url').exec();

  res.json({
    all: {
      last_month: last_month,
      last_week: last_week,
      last_day: last_day,
      last_hour: last_hour,
      all: all,
    },
    unique: {
      last_month: unique_last_month,
      last_week: unique_last_week,
      last_day: unique_last_day,
      last_hour: unique_last_hour,
      all: unique_all
    }
  });

});

router.get('/stats/by-user', async (req, res) => {

  let last_month = await View.find({ userIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
  userAgent: req.headers['user-agent'], created_at: { $gte : moment().subtract(1, 'months').toDate() }  }).populate('url').exec();

  let last_week = await View.find({ userIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
  userAgent: req.headers['user-agent'], created_at: { $gte : moment().subtract(7, 'days').toDate() }  }).populate('url').exec();

  let last_day = await View.find({ userIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
  userAgent: req.headers['user-agent'], created_at: { $gte : moment().subtract(1, 'days').toDate() }  }).populate('url').exec();

  let last_hour = await View.find({ userIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
  userAgent: req.headers['user-agent'], created_at: { $gte : moment().subtract(3600, 'seconds').toDate() }  }).populate('url').exec();

  let all = await View.find({ userIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
  userAgent: req.headers['user-agent']}).populate('url').exec();

  res.json({
    last_month: last_month,
    last_week: last_week,
    last_day: last_day,
    last_hour: last_hour,
    all: all,
  });

});

// @route POST /
// @description create url
// @access Public

router.post('/', async (req, res) => {

    // check url if valid using the validUrl.isUri method
    if (!validUrl.isUri(req.body.url)) {
        return res.status(401).json('Invalid URL')
    }
    //
    // check url if valid using the validUrl.isUri method
    if (validUrl.isUri(req.body.url)) {

        try {

            let url = await Url.findOne({
                longUrl: req.body.url
            })

            // url exist and return the response
            if (url) {
                res.json(url)
            } else {

                // Create new url
                url = new Url({
                  longUrl: req.body.url,
                  userIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                  userAgent: req.headers['user-agent'],
                  created_at: new Date()
                })

                await url.save()
                res.status(200).json(url)
            }
        }
        // exception handler
        catch (err) {
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid url')
    }

})

module.exports = router;
