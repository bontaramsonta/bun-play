import { parseArgs } from "node:util";
import puppeteer from "puppeteer-core";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    browserWSEndpoint: {
      short: "b",
      type: "string",
    },
  },
  strict: true,
  allowPositionals: true,
});
// 1. run browser using this command
// `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 | grep Devtools`
// 2. copy and paste the WS enpoint url in config variable
// 2. go to bumble and login
// 3. change config values if needed
// 4. run this script and let the magic happen

// config
let browserWSEndpoint = values.browserWSEndpoint;
// ---
// globals
const like =
  "#main > div > div.page__layout > main > div.page__content-inner > div > div > span > div.encounters-user__controls > div > div:nth-child(2) > div > div:nth-child(3) > div > div.encounters-action__icon > span";
const pass =
  "#main > div > div.page__layout > main > div.page__content-inner > div > div > span > div.encounters-user__controls > div > div:nth-child(2) > div > div:nth-child(1) > div > div.encounters-action__icon > span";
let browser;

// ---
async function pimp() {
  browser = await puppeteer.connect({
    browserWSEndpoint,
    defaultViewport: null,
  });
  const newPage = await browser.newPage();
  await newPage.setViewport({
    width: 3840,
    height: 2160,
    deviceScaleFactor: 1,
  });
  await newPage.goto("https://youtube.com", { waitUntil: "networkidle0" });
  const imgBuffer = await newPage.screenshot({
    captureBeyondViewport: false,
    type: "webp",
    quality: 100,
  });
  await Bun.write("img.webp", imgBuffer);
  // const pages = await browser.pages()
  // console.log(pages)
  // // find bumble page
  // const bumblePage = pages.filter(page => page.url().includes(".bumble.com/app"))?.[0]
  // if (!bumblePage) {
  //   throw new Error("bumble page not open")
  // }

  // // bumblePage.click(like)
  // await bumblePage.waitForNetworkIdle()
  await newPage.close();
  await browser.disconnect();
}
pimp();
