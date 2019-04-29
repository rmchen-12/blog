import http from "api";
import { toJS, flow, observable } from "mobx";
import { Article, State } from "interfaces";
import { notice } from "components/notification";

type NewArticle = Pick<Article, "content" | "title" | "isPublish" | "tags">;

export default class ArticleStore {
  @observable articles?: Article[] = [];
  @observable state: State = "pending";

  publish = flow(function*(this: ArticleStore, newArticle: NewArticle) {
    this.state = "pending";
    try {
      const res = yield http.post("/admin/addArticle", newArticle);
      notice(res);
      this.state = "done";
    } catch (error) {
      this.state = "error";
    }
  });

  getArticles = flow(function*(this: ArticleStore) {
    this.state = "pending";
    try {
      const res = yield http.post("/admin/postArticles", {});
      this.articles = res.data.articles;
      this.state = "done";
    } catch (error) {
      this.state = "error";
    }
  });

  deleteArticle = flow(function*(this: ArticleStore, id: string) {
    this.state = "pending";
    try {
      const res = yield http.post("/admin/deleteArticle", { id });
      notice(res);
      this.articles = toJS(this.articles!).filter(v => v._id !== id);
      this.state = "done";
    } catch (error) {
      this.state = "error";
    }
  });

  constructor({
    initialState = {},
    isServer
  }: {
    initialState?: any;
    isServer: boolean;
  }) {
    this.articles = initialState.articles !== null ? initialState.articles : [];
  }
}
