// controllers/puppeteerController.js
import { captureScreenshot as captureScreenshotService } from '../services/puppeteerService.js';

export const captureScreenshot = async (req, res, next) => {
  try {
    const url = req.body.url;
    const screenshot = await captureScreenshotService(url);
    res.status(200).send(screenshot);
  } catch (error) {
    next(error);
  }
};
