import {
  getMangaList,
  getOneChapter,
  getPageUrl,
  getRandomManga,
  getServer,
} from '../src';

const randomManga = async () => {
  const manga = await getRandomManga();
  const chapter = await getOneChapter(manga);
  const serverBaseUrl = await getServer(chapter.id);
  const pageUrls: string[] = [];
  for (const fileName of chapter.attributes.data) {
    pageUrls.push(await getPageUrl(chapter, serverBaseUrl, fileName));
  }
  console.log(manga, pageUrls);
};

const mangaList = async () => {
  const mangaListResponse = await getMangaList({
    contentRating: ['suggestive'],
  });
  console.log(mangaListResponse);
  const index = Math.floor(Math.random() * mangaListResponse.results.length);
  console.log(index);

  console.log(mangaListResponse.results[index]);

  const chapter = await getOneChapter(mangaListResponse.results[index].data);
  const serverBaseUrl = await getServer(chapter.id);
  const pageUrls: string[] = [];
  for (const fileName of chapter.attributes.data) {
    pageUrls.push(await getPageUrl(chapter, serverBaseUrl, fileName));
  }

  console.log(mangaListResponse.results[0].data, pageUrls);
};

mangaList();
