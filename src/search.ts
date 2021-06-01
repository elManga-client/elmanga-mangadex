import fetch from 'cross-fetch';
import {
  ChapterList,
  ChapterSearchOptions,
  MangaList,
  MangaSearchOptions,
} from './interfaces';
import { optionsToUrlParams } from './util';

export const searchManga = async (
  options?: MangaSearchOptions
): Promise<MangaList> => {
  const url = new URL('https://api.mangadex.org/manga');
  const params = optionsToUrlParams(options);
  url.search = params.toString();
  console.log(url.href);
  const res = await fetch(url.href);
  return res.json();
};

export const searchChapters = async (
  options?: ChapterSearchOptions
): Promise<ChapterList> => {
  const url = new URL('https://api.mangadex.org/chapter');
  const params = optionsToUrlParams(options);
  url.search = params.toString();
  console.log(url.href);
  const res = await fetch(url.href);
  return res.json();
};
