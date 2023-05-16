import { JSDOM } from 'jsdom';
import HttpManager from './httpManager';

class RssManager {
  private httpManager: HttpManager;

  constructor(url: string) {
    this.httpManager = new HttpManager(url);
  }

  public async getFeeds(): Promise<Record<string, any>> {
    const xmlData = await this.httpManager.get<string>();

    // Parse the XML using jsdom
    const { window } = new JSDOM(xmlData, {
      contentType: 'text/xml'
    });
    const { document } = window;

    // TODO: parsing

    return [document];
  }
}

export default RssManager;
