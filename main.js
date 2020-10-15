const puppeteer = require('puppeteer');

const site = "https://nexxos.prop360.cl/index.aspx";
const input = {
  mail: "equipo@nexxos.cl",
  pass: "Nexxos.2020",
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(site);
  await page.type("#tbMail", input.mail, { delay: 100 });
  await page.type("#tbPassword", input.pass, { delay: 100 });
  await page.click("#botLogin");
  await page.waitForNavigation();

  await page.screenshot({path: 'screenshot.png'});

  await browser.close();
})();