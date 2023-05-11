#import get to call a get request on the site
from requests import get
from bs4 import BeautifulSoup
import time

#get html
response = get('https://sfbay.craigslist.org/search/eby/apa?availabilityMode=0&hasPic=1#search=1~gallery~0~0')

soup = BeautifulSoup(response.text, 'html.parser')

posts = soup.find_all('li')
print(type(posts))
print(len(posts))