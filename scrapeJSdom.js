const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require('axios');

// const URL = "https://minneapolis.craigslist.org/search/zip?query=dirt#search=1~list~0~0";
const URL = "https://minneapolis.craigslist.org/search/zip#search=1~list~0~0";

let posts = [];

axios.get(URL)
    .then((response) => {
        const dom = new JSDOM(response.body);
        // console.log(dom.window);

        const titles = dom.window.document.querySelectorAll(".titlestring");
        console.log(titles);
        titles.forEach(element => {
            posts.push(element.innerHTML);
        }); 
        console.log(dom.window.document.children);
    })
    .catch((err) => {
        console.log(err);
    });

