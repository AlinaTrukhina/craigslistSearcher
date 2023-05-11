const cheerio = require('cheerio');

const $ = cheerio.load('https://minneapolis.craigslist.org/search/zip?query=dirt&sort=date#search=1~list~0~0');
// console.log($);

console.log($('a').html());
