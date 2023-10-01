type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  captcha: string;
};

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

type ReviewForm = {
  rate: number;
  review: string;
};

type State = {
  successToast: boolean;
  user: User;
  triedLogin: boolean;
  searchNovels: SearchNovel[];
  langs: LangsInfo;
  fontSize: number;
};

type User = {
  name: string;
  pfp: string;
  bookmarks: Bookmark[];
  bookmarksObj: { [id_number: number]: number };
  mod: boolean;
};

type UserDetail = {
  email: string;
  date: string;
};

type RandomNovel = {
  id: number;
  url: string;
  name: string;
  summary: string;
  img: string;
};

type RecentChapter = {
  id: number;
  name: string;
  url: string;
  chapter: number;
  title_en: string;
  date: string;
};

type SearchNovel = {
  id: number;
  url: string;
  name: string;
  cn_name: string;
  img: string;
};

type Novel = {
  id: number;
  url: string;
  name: string;
  cn_name: string;
  author: string;
  summary: string;
  img: string;
  date: string;
  completed: number;
  nchaps: number;
  rating: number;
  genres: string[];
  chapters: ChapterShort[];
};

type ChapterShort = {
  date: string;
  id: number;
  id_novel: number;
  number: number;
  title_cn: string;
  title_en: string;
};

type Chapters = {
  chapter: number;
  title_en: string;
}[];

type Review = {
  id: number;
  id_novel: number;
  id_user: number;
  rate: number;
  review: string;
  date: string;
  likes: number;
  liked?: number;
};

type SimpleResponseContent = {
  message: string;
};

type ChapterContent = {
  cn: string[];
  en: string;
};

type ChapterDict = {
  [key: string]: {
    def: string;
    py: string;
  };
};

type Chapter = {
  id: number;
  number: 5;
  date: string;
  titleEn: string;
  titleCn: string;
  name: string;
  content: ChapterContent[];
  dict: ChapterDict;
  firstChapter: number;
  lastChapter: number;
};

type LangsInfo = {
  en: boolean;
  cn: boolean;
};

type Bookmark = {
  id_user: number;
  id_novel: number;
  chapter: number;
};

type BookmarkNovel = {
  chapter: number;
  id_novel: number;
  url: string;
  name: string;
  current: number;
};

type UserComment = {
  id: number;
  comment: string;
  date: string;
  name: string;
  pfp: string;
};

type CommentForm = {
  comment: string;
};

type Page<T> = {
  results: T[];
  total: number;
  pageTotal: number;
  hasNext: boolean;
  hasPrevious: boolean;
};
