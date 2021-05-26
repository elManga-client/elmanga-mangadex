import assert from 'assert';
import { getOneChapter, getPageUrl, getRandomManga, getServer } from '../src';

it('5 * 5 = 25', () => assert.strictEqual(5 * 5, 25));

const main = async () => {
  const manga = await getRandomManga();
  const chapter = await getOneChapter(manga);
  const serverBaseUrl = await getServer(chapter.id);
  const pageUrls: string[] = [];
  for (const fileName of chapter.attributes.data) {
    pageUrls.push(await getPageUrl(chapter, serverBaseUrl, fileName));
  }
  console.log(manga, pageUrls);
};

main();
