const portfinder = require('portfinder');
const puppeteer = require('puppeteer');

const app = require('../meadowlark');


let server = null;
let port = null;

beforeEach(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});


test('home page links o about page', async () => {
  const browser = await puppeterr.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:${port}');
  await Promise.all([
    page.awaitForNavigation(),
    page.click('[data-test-idd="about"]'),
  ]);

  expect(page.url()).tobe('http://localhost:${port}/about');
  await browser.close();
});
