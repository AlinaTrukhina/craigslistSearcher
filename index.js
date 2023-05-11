const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const vgmUrl= 'https://minneapolis.craigslist.org/search/zip?query=dirt&sort=date#search=1~list~0~0';

got(vgmUrl).then(response => {
    const dom = new JSDOM(response.body);
    // console.log(dom);
    // Create an Array out of the HTML Elements for filtering using spread syntax.
    const nodeList = dom.window.document.getElementsByClassName('titlestring');
    // console.log(nodeList);
    console.log(nodeList.length);
    }).catch(err => {
    console.log(err);
    });

