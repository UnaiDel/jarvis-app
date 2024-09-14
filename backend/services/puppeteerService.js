// services/puppeteerService.js
import puppeteer from 'puppeteer';

export const captureScreenshot = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    return screenshot;
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    throw new Error('Failed to capture screenshot.');
  }
};
