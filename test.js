const express = require('express');
const { Builder, By } = require('selenium-webdriver');

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
    // web scraping goes here
    try {
        const data = await WebScrapingLocalTest();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
        console.error(error);
    }
});

const searchQuery = 'dirt';

async function searchCraigslist() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(`https://minneapolis.craigslist.org/search/zip?query=${searchQuery}#search=1~list~0~0`);

    var searchForm = await driver.findElement(By.tagName('ol'));
    await driver.sleep(3000);
    let content = await driver.findElement(By.className('results'));
    const results = await driver.findElements(By.className('cl-search-result'));

    await driver.sleep(1000);
    return await getResults(results);

    } catch(err) {
        throw new Error(err);
    } finally {
    await driver.quit();
  }
};

async function getResults(posts) {
    let postDetails = [];
    try {
        for (post of posts) {
            const title = await post.findElement(By.className('titlestring')).getText();
            const url = await post.findElement(By.className('titlestring')).getAttribute('href');
            // const location = await post.findElement(By.css('.supertitle'));
            postDetails.push({
            title: title ?? '',
            url: url ?? '',
            // location: location ?? '',
        });
        }
    } catch (error) {
        console.log(error);
    }
    return postDetails;
}

searchCraigslist().then(results => console.log(results));



   
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});