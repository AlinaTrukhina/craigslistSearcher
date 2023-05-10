const jsdom = require("jsdom");
const dom = new JSDOM(``, {
  url: "https://minneapolis.craigslist.org/search/zip?query=dirt",
  referrer: "https://example.com/",
  contentType: "text/html",
  storageQuota: 10000000
});