import fetch from 'node-fetch';


fetch('https://sapi.craigslist.org/web/v8/postings/search/full?batch=19-0-360-0-0&cc=US&lang=en&query=dirt&searchPath=zip', 
{
    method: 'GET',
    headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection' : 'keep-alive'
    },
    mode: 'cors',
    cache: 'default'
}
)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        let postsArray = [];
        for (const post of data.data.items) {
            const urlHelper = post[post.length-2];
            const newPost = {
                title: post[post.length-1],
                urlEnd: urlHelper[1]
            }
            postsArray.push(newPost);
        }
        console.log(postsArray);
    })
    .catch((error) => {
        console.error(error);
    });