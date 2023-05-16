import RssManager from "~/server/managers/rssManager";

export default defineEventHandler(async (_event) => {
  const rssManager = new RssManager("https://rssfeeds.usatoday.com/UsatodaycomNation-TopStories");

  try {
    const feeds: any = await rssManager.getFeeds();
    return { statusCode: 200, feeds: feeds };
  } catch (err) {
    return { err }
  }
})
