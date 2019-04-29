import ArticleStore from "./articleStore";
import TagStore from "./tagStore";
import { useStaticRendering } from "mobx-react";

const isServer = !(process as any).browser;
useStaticRendering(isServer);

export class Store {
  tagStore: TagStore;
  articleStore: ArticleStore;

  constructor({
    initialState = {},
    isServer
  }: {
    initialState?: any;
    isServer: boolean;
  }) {
    this.tagStore = new TagStore({ initialState, isServer });
    this.articleStore = new ArticleStore({ initialState, isServer });
  }
}

let store: Store | null = null;

export function initStore(initialState = {}) {
  if (isServer) return new Store({ initialState, isServer });
  if (store === null) store = new Store({ initialState, isServer });
  return store;
}

export function getStore() {
  return store;
}
