'use strict';

const puppeteer = require('puppeteer');

(async () => {
  await generatePNG();
  await generatePDF();
  await launchChromiumFull();
  await blockImageLoading();
  await performSearch();

})();


async function generatePNG() {
  console.log(`Generating PNG screenshot of http://example.com`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });
  
  await browser.close();
}

async function generatePDF() {
  console.log(`Generating PDF for https://news.ycombinator.com`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle2' });  
  await page.pdf({ path: 'ycombinator.pdf', format: 'A4' });

  await browser.close();
}

async function launchChromiumFull() {
  console.log(`Launching full Chromium for https://github.com`);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://github.com', { waitUntil: 'networkidle2' } );  

  await browser.close();
}

async function blockImageLoading() {
  console.log(`Generating PNG screenshot of https://imdb.com without images`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.resourceType() === 'image') {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto('https://imdb.com');

  await page.screenshot({ path: 'imdb-no-images.png', fullPage: true });
  
  await browser.close();
}

async function performSearch() {
  // This one doesn't work anymore, but you get the idea...
  
  console.log(`Launching full Chromium for https://github.com`);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://developers.google.com/web/', { waitUntil: 'networkidle2' } );  

  // Typing into the search box
  await page.type('#searchbox input', 'Headless Chrome');

  // Wait for suggest overlay to appear and click on 'show all results'
  const allResultsSelector = '.devsite-suggest-all-results';
  await page.waitForSelector(allResultsSelector);
  await page.click(allResultsSelector);

  // Wait for the results page to load and display the results
  const resultsSelector = '.gsc-results .gsc-thumbnail-inside a.gs-title';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page
  const links = await page.evaluate(resultsSelector => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map(anchor => {
      const title = anchor.textContent.split('|')[0].trim();
      return `${ title } - ${ anchor.href }`;
    });
  }, resultsSelector);

  console.log(links.join(`\n`));


  await browser.close();
}