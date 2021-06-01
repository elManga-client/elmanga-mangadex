import fetch from 'cross-fetch';
import {
  Chapter,
  ChapterResponse,
  Manga,
  MangaListResponse,
  MangaListOptions,
} from './interfaces';

const optionsToURLParams = (options: any): URLSearchParams => {
  const params = new URLSearchParams(<Record<string, string>>options);
  if (!options) return params;

  Object.entries(options)
    .filter(([_key, value]) => {
      return Array.isArray(value);
    })
    .forEach(([key, value]) => {
      params.delete(key);
      params.set(`${key}[]`, (value as any[]).join(','));
    });

  return params;
};

export const getMangaList = async (
  options?: MangaListOptions
): Promise<MangaListResponse> => {
  const url = new URL('https://api.mangadex.org/manga');
  const params = optionsToURLParams(options);
  url.search = params.toString();
  console.log(url.href);
  const res = await fetch(url.href);
  return res.json();
};

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
  return `${serverBaseUrl}/data/${chapter.attributes.hash}/${pageFileName}`;
};
