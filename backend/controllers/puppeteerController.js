const { performSearch } = require('../services/puppeteerService');

// Controlador para realizar búsquedas en internet
const searchInternet = async (req, res) => {
  const { query } = req.body;
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    // Realiza la búsqueda...
    await page.type('input[name="q"]', query);
    await page.click('input[type="submit"]');
    // Esperar a que cargue la página de resultados...
    await page.waitForSelector('.g');
    const results = await page.evaluate(() => {
      // Extraer resultados...
    });
    res.json(results);
  } catch (error) {
    console.error('Error during internet search:', error);
    res
      .status(500)
      .json({ message: 'Error during search', error: error.message });
  } finally {
    await browser.close(); // Asegurarse de cerrar el navegador siempre.
  }
};

module.exports = {
  searchInternet,
};
