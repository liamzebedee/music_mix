# aura / listenhere
Music discovery app created in 21 hours (DIRTY CODE) in the first Facebook Sydney Hackathon (18/04/2015). Tech: **Node.js and Express**, **Parse**, **Ionic**, **FB graph**.

Music discovery right is a cumbersome collection of mechanistic processes, algorithms and such. Where is the diversity? Where is the human element?

Using Facebook Login, Aura connects you to people near you who share your musical tastes and provides you with a mix of their favourite songs. These songs are categorised by genre, the contents of which are constantly changing based on where you find yourself. 

![Genres screenshot](http://40.media.tumblr.com/18084f6d463685fbac4f01b52d94e028/tumblr_nn18m7K7qK1trskuwo3_1280.png)

![Songs screenshot](http://41.media.tumblr.com/17722f37251068f2e9fe8cf8a34a0db5/tumblr_nn18m7K7qK1trskuwo1_1280.png)

You can also explore the music of other cultures using the interactive 3D globe, which shows the most popular songs of different genres in each country.

![Globe screenshot](http://40.media.tumblr.com/37b8dace6441d77cb80eb42ac9a528d4/tumblr_nn18m7K7qK1trskuwo2_1280.png)

## License
All original code is GPLv3. Copyright Liam Edwards-Playne, Bear Boyarinov, Stephanie Hansen, Advait Junnarkar.

## Install
 1. contact me probably
 2. create a parse account and sub in the API variables in `fbLogin.js` and `findNearMe.js`
 3. create an FB app and add relevant permissions, configure URLs, sub in the app id in `public/js/fbLogin.js`

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```