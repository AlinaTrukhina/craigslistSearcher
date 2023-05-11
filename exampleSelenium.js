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

async function WebScrapingLocalTest() {
    try {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://minneapolis.craigslist.org/search/zip#search=1~list~0~0');
        const allPosts = await driver.findElements(
            By.css('cl-search-results')
        );
        const wholePage = await driver.findElements(By.linkText('FREE'));

        await console.log(wholePage);
        return await getPosts(allPosts);
    } catch (error) {
        throw new Error(error);
    }
    finally {
        // await driver.quit();
    }
}



async function getPosts(posts) {
    let postDetails = [];
    try {
      for (const post of posts) {
        const title = await post.findElement(By.className('titlestring')).getText();
        console.log(title);
        const url = await post
          .findElement(By.className('titlestring')).getAttribute('href');
        postDetails.push({
          title: title ?? '',
          url: url ?? '',
        });
      }
    } catch (error) {
      console.log(error);
    }
    return postDetails;
   }
   
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});