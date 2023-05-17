import { JSDOM } from 'jsdom';
import HttpManager from './httpManager';
import Feed from '~/models/feed';

class HttpFeedManager {
  private httpManager: HttpManager;

  constructor(url: string) {
    this.httpManager = new HttpManager(url);
  }

  public async getFeeds(): Promise<Record<string, any>> {
    const response = await this.httpManager.get<Response>();
    let response_text = await response.text();

    // Parse the XML using jsdom
    const { window } = new JSDOM(response_text, {
      contentType: 'text/xml'
    });
    const { document } = window;

    // Get the feeds
    const feeds: Feed[] = [];
    const items = document.getElementsByTagName('item');

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const title = item.querySelector('title')?.textContent;
      const link = item.querySelector('link')?.textContent;
      const description = item.querySelector('description')?.textContent;
      const pubDate = item.querySelector('pubDate')?.textContent;


      if (title && link && description && pubDate) {
        feeds.push({
          title: title,
          link: link,
          description: this.removeHtmlTags(description),
          pubDate: new Date(pubDate)
        });
      }
    }

    return feeds;
  }

  private removeHtmlTags(text: string): string {
    const { window } = new JSDOM(text);
    const { document } = window;
    return document.body.textContent || '';
  }
}

export default HttpFeedManager;
