import { ChapterSearchOptions, MangaSearchOptions } from './interfaces';

export const optionsToUrlParams = (
  options?: MangaSearchOptions | ChapterSearchOptions
): URLSearchParams => {
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
