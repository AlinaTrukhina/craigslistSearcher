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
        await driver.get('https://www.youtube.com/c/LambdaTest/videos');
        const allVideos = await driver.findElements(
            By.css('ytd-rich-grid-row')
        );
        // console.log(allVideos);
        return await getVideos(allVideos);
    } catch (error) {
        throw new Error(error);
    }
    finally {
        // await driver.quit();
    }
}

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

async function getVideos(videos) {
    let videoDetails = [];
    try {
      for (const video of videos) {
        const title = await video.findElement(By.id('video-title')).getText();
        const views = await video
          .findElement(By.xpath(".//*[@id='metadata-line']/span[1]"))
          .getText();
        const date = await video
          .findElement(By.xpath(".//*[@id='metadata-line']/span[2]"))
          .getText();
        videoDetails.push({
          title: title ?? '',
          views: views ?? '',
          publishedDate: date ?? '',
        });
      }
    } catch (error) {
      console.log(error);
    }
    return videoDetails;
   }