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

async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://www.google.com/ncr');
    var searchForm = await driver.findElement(By.className('MV3Tnb'));
    searchForm = searchForm.getText()
    // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    return searchForm;
    } finally {
    await driver.quit();
  }
};

example().then(searchForm => console.log(searchForm));


   
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});