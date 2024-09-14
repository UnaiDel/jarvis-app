import { captureScreenshot } from '../services/puppeteerService.js';

describe('Puppeteer Service', () => {
  it('should capture a screenshot of a webpage', async () => {
    const screenshot = await captureScreenshot('https://example.com');
    expect(screenshot).toBeTruthy();
  });
});
