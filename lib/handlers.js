const musicSheet = require('./musicSheet');


exports.home = (req, res) => res.render('home');

exports.about = (req, res) => res.render('about', { musicSheet: musicSheet.getMusicSheet() });

exports.compositoresMysql = (req, res) => res.render('compositoresMysql');

exports.compositoresMongodb = (req, res) => res.render('compositoresMongodb');


//exports.notFound = (req, res) => res.render('404');

//exports.serverError = (err, req, res, next) => res.render('500');
