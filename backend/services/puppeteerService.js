const puppeteer = require('puppeteer');

const performSearch = async (query) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com');

    // Esperar a que el campo de búsqueda esté disponible
    await page.waitForSelector('input[name="q"]');

    // Introducir el texto en la búsqueda
    await page.type('input[name="q"]', query);
    await page.keyboard.press('Enter');

    // Esperar a que los resultados aparezcan
    await page.waitForSelector('h3');

    // Obtener los títulos de los resultados de la búsqueda
    const searchResults = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('h3')).map(
        (el) => el.innerText,
      );
      return titles;
    });

    await browser.close();
    return searchResults;
  } catch (error) {
    console.error('Error navigating the web:', error);
    throw new Error('Error during web navigation');
  }
};

module.exports = {
  performSearch,
};
