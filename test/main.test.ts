import { error } from 'console';
import {
  getChapter,
  getChapterServerUrl,
  getOneChapter,
  getPageUrl,
  getRandomManga,
  searchChapters,
  searchManga,
} from '../src';

const randomManga = async () => {
  const manga = await getRandomManga();
  const chapter = await getOneChapter(manga);
  const serverBaseUrl = await getChapterServerUrl(chapter.id);
  const pageUrls: string[] = [];
  for (const fileName of chapter.attributes.data) {
    pageUrls.push(await getPageUrl(chapter, serverBaseUrl, fileName));
  }
  console.log(manga, pageUrls);
};

const mangaList = async () => {
  const mangaListResponse = await searchManga({
    contentRating: ['suggestive'],
  });
  console.log(mangaListResponse);
  const index = Math.floor(Math.random() * mangaListResponse.results.length);
  console.log(index);

  console.log(mangaListResponse.results[index]);

  const chapter = await getOneChapter(mangaListResponse.results[index].data);
  const serverBaseUrl = await getChapterServerUrl(chapter.id);
  const pageUrls: string[] = [];
  for (const fileName of chapter.attributes.data) {
    pageUrls.push(await getPageUrl(chapter, serverBaseUrl, fileName));
  }

  console.log(mangaListResponse.results[0].data, pageUrls);
};

const chapter = async () => {
  const mangaList = await searchManga({ contentRating: ['erotica'] });
  console.log(mangaList);
  const index = Math.floor(Math.random() * mangaList.results.length);
  console.log(index);
  const manga = mangaList.results[index];
  console.log(manga);
  const chapter = await searchChapters({ manga: manga.data.id });
  console.log(chapter.results);
};

// randomManga();
// mangaList();
describe('chapter', () => {
  it('should run without error', () => chapter());
});
