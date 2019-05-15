// mongoimport --host cluster0-shard-00-00-5wvnk.mongodb.net:27017 --db web-tin-tuc --collection CategoryList --file CategoryList.json --authenticationDatabase admin --ssl --username admin --password admin1
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const News = require('./News');

const schema = new Schema({
    title: {type: String, trim:true, default: 'Tin the thao', unique: true},
    imgUrl: {type: String, trim:true, default: '/images/logo/budesliga-logo.png'},
    link: {type: String, trim: true, default: '/tin-Seagame'}
});

module.exports = mongoose.model('Category', schema, 'CategoryList');