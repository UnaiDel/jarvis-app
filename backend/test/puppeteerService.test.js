const { performSearch } = require('../services/puppeteerService');

describe('Puppeteer Service', () => {
  it('should return search results from Google', async () => {
    const query = 'Node.js testing with Jest';
    const results = await performSearch(query);

    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toContain('Node.js');
  });
});
