import fetch from 'cross-fetch';
import { Chapter, ChapterResponse, Manga, Relationship } from './interfaces';

export const getFirstManga = async (): Promise<Manga> => {
  const res = await fetch('https://api.mangadex.org/manga');
  const { results } = await res.json();

  return results[0].data;
};

export const getRandomManga = async (): Promise<Manga> => {
  const res = await fetch('https://api.mangadex.org/manga/random');
  const { data } = await res.json();
  return data;
};

export const getOneChapter = async (manga: Manga): Promise<Chapter> => {
  const mangaId = manga.id;
  const resManga = await fetch(
    `https://api.mangadex.org/chapter/?manga=${mangaId}`
  );
  const payload = await resManga.json();

  const chapters = payload.results.map(
    (response: ChapterResponse) => response.data
  );

  const chapterId = chapters[0].id;
  const resChapter = await fetch(
    `https://api.mangadex.org/chapter/${chapterId}`
  );
  const { data } = await resChapter.json();
  return data;
};

export const getServer = async (chapterId: string): Promise<string> => {
  const res = await fetch(
    `https://api.mangadex.org/at-home/server/${chapterId}`
  );
  const { baseUrl } = await res.json();
  return baseUrl;
};

export const getPageUrl = async (
  chapter: Chapter,
  serverBaseUrl: string,
  pageFileName: string
): Promise<string> => {
  const pageUrl = `${serverBaseUrl}/data/${chapter.attributes.hash}/${pageFileName}`;

  return pageUrl;
};
