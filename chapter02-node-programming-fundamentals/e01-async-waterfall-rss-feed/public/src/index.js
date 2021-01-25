"use strict";

const fs = require("fs");
const request = require("request");
const htmlparser = require("htmlparser");
const async = require("async");

const rssFeedsFilename = `${__dirname}/rsrc/rss_feeds.txt`;

function checkForRSSFile(next) {
  fs.stat(rssFeedsFilename, err => {
    if (err) {
      console.log(`The RSS feeds filename does not exist: ${rssFeedsFilename}: ${err}`);
      return next(new Error(`Missing RSS file: ${rssFeedsFilename}`));
    }
    next(null, rssFeedsFilename);
  });
}

function readRSSFile(rssFeedsFilename, next) {
  fs.readFile(rssFeedsFilename, (err, feedList) => {
    if (err) {
      console.log(`Error found while reading ${rssFeedsFilename}: ${err}`);
      return next(err);
    }
    feedList = feedList
                .toString()
                .replace(/^s+|\s+$/g, "")
                .split("\n");
    const random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

function downloadRSSFeed(feedUrl, next) {
  request({uri: feedUrl}, (err, res, body) => {
    if (err) {
      console.log(`Error trying to download from ${feedUrl}: ${err}`);
      return next(err);
    } else if (res.statusCode !== 200) {
      console.log(`Unexpected HTTP status code while reaching ${feedUrl}: ${err}`);
      return next(err);
    }
    next(null, body);
  });
}

function parseRSSFeed(rss, next) {
  const handler = new htmlparser.RssHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length) {
    console.log(`Error parsing RSS feed: no elements found`);
    return next(new Error("No RSS items found"));
  }
  const item = handler.dom.items.shift();
  console.log(`RSS Feed Title: ${item.title}`);
  console.log(`RSS Feed URL  : ${item.link}`);
}

async.waterfall([
  checkForRSSFile,
  readRSSFile,
  downloadRSSFeed,
  parseRSSFeed
], function (err) {
  if (err) {
    console.log(`Error while processing ${rssFeedsFilename}: ${err}`);
    return;
  }
});
