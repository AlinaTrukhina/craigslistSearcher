const cheerio = require('cheerio');
const axios = require('axios');

// const URL = 'https://minneapolis.craigslist.org/search/zip?query=dirt&sort=date#search=1~list~0~0';

const URL = 'https://nextdoor.com/for_sale_and_free/?init_source=more_menu&ccid=64235854-BBB1-44B9-8DF0-FC307F7C9E49&navigationScreen=FINDS&ssid=DCD8B5E0-FC11-4A1B-8FDE-F05B05D34884&query=bricks';

const getStuff = () => {
    axios.get(URL)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            console.log(html);
            const body = $('.layout_container').children.length;
            console.log(body);
            console.log($('nav').html());
        })
        .catch((err) => {
            console.error(err);
        })
} 

const getListings = async () => {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);
        console.log($);
        // console.log($('.css-8ltwkx'));
        const listings = [];

        $('.css-8ltwkx').each((_idx, el) => {
            const newListing = {
                title: $(el).text(),
                url: $(el).attr('href')
            }
            listings.push(newListing);
        });
        
        return listings;
    } catch (error) {
        console.log(error);
    }
}

getStuff();


