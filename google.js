const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: process.env.HEADLESS==='false'? false:true
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('JavaScript');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  await page.waitForSelector(".LC20lb", {visible: true});
  let linkNames = await page.evaluate(() => {
      let elements = document.querySelectorAll('.LC20lb');
      let links = [...elements];
      return links.map(link => link.innerHTML);
  });
  console.log(linkNames.length, linkNames);

  await page.goto('https://www.wikipedia.org/');

  // Click the get started link.
  await page.type("#searchInput", "world war I");
  await page.click("button[type='submit']");
  const headText = await page.$eval("h1[id='firstHeading'] span", el => el.innerHTML);
  console.log(headText);

  await context.close();
  await browser.close();
})();