import { Store } from 'store';

export interface Article {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPublish: boolean;
  createdAt: string;
  viewCount: number;
  commentCount: number;
}

export interface Tag {
  _id: string;
  tagName: string;
  url: string;
}

export type State = "pending" | "done" | "error";

export interface Ctx {
  mobxStore: Store;
}
