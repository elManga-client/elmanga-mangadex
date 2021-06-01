export type MangaResponse = Response<Manga>;
export type ChapterResponse = Response<Chapter>;

export type MangaList = SearchList<Manga>;
export type ChapterList = SearchList<Chapter>;

export enum ResultStatuses {
  Ok = 'ok',
  Error = 'error',
}

export interface Response<T> {
  result: ResultStatuses;
  data: T;
  relationships: Relationship[];
}

export interface SearchList<T> {
  results: Response<T>[];
  limit: number;
  offset: number;
  total: number;
}

export interface Manga {
  id: string;
  type: 'manga';
  attributes: MangaAttributes;
}

export interface MangaAttributes {
  title: Record<string, string>;
  altTitles: Record<string, unknown>[];
  description: Record<string, unknown>;
  isLocked: boolean;
  links: Record<string, unknown>;
  originalLanguage: string;
  lastVolume?: string;
  lastChapter?: string;
  publicationDemographic?: string;
  status?: string;
  year?: string;
  contentRating?: string;
  tags: Record<string, unknown>[];
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  type: 'chapter';
  attributes: ChapterAttributes;
}

export interface ChapterAttributes {
  title: string;
  volume?: string;
  chapter?: string;
  translatedLanguage: string;
  hash: string;
  data: string[];
  dataSaver: string[];
  uploader: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Relationship {
  id: string;
  type: RelationshipTypes;
}

export enum RelationshipTypes {
  Manga = 'manga',
  Chapter = 'chapter',
  Author = 'author',
  Artist = 'artist',
  ScanlationGroup = 'scanlation_group',
  Tag = 'tag',
  User = 'user',
  CustomList = 'custom_list',
}

export interface MangaSearchOptions {
  limit?: number;
  offset?: number;
  title?: string;
  authors?: string[];
  artists?: string[];
  year?: number;
  includedTags?: string[];
  includedTagsMode?: 'AND' | 'OR';
  excludedTags?: string[];
  excludedTagsMode?: 'AND' | 'OR';
  status?: 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
  originalLanguage?: string[];
  publicationDemographic?: 'shounen' | 'shoujo' | 'josei' | 'seinen' | 'none';
  ids?: string[];
  contentRating?: ('safe' | 'suggestive' | 'erotica' | 'pornographic')[];
  createdAtSince?: string;
  updatedAtSince?: string;
  order?: { createdAt: 'asc' | 'desc'; updatedAt: 'asc' | 'desc' };
}

export interface ChapterSearchOptions {
  limit?: number;
  offset?: number;
  ids?: string[];
  title?: string;
  groups?: string[];
  uploader?: string;
  manga?: string;
  volume?: string;
  chapter?: string;
  translatedLanguage?: string[];
  createdAtSince?: string;
  updatedAtSince?: string;
  publishAtSince?: string;
  order?: {
    createdAt: 'asc' | 'desc';
    updatedAt: 'asc' | 'desc';
    publishAt: 'asc' | 'desc';
    volume: 'asc' | 'desc';
    chapter: 'asc' | 'desc';
  };
}
