import { observable, flow, toJS } from "mobx";
import { Tag, State } from "interfaces";
import http from "api";
import { notice } from "components/notification";
import _ from "lodash";

export default class TagStore {
  @observable tags?: Tag[] = [];
  @observable state: State = "pending";

  createTag = flow(function*(this: TagStore, tagName) {
    this.state = "pending";
    try {
      const res = yield http.post("/admin/createTag", { tagName });
      notice(res);
      this.state = "done";
    } catch (error) {
      this.state = "error";
    }
  });

  getTags = flow(function*(this: TagStore) {
    this.state = "pending";
    try {
      const res = yield http.get("/admin/getTags");
      this.tags = res.data.tags;
      this.state = "done";
    } catch (error) {
      this.state = "error";
    }
  });

  deleteTag = flow(function*(this: TagStore, id: string) {
    this.state = "pending";
    try {
      const res = yield http.post("/admin/deleteTag", { id });
      notice(res);
      this.tags = toJS(this.tags!).filter(v => v._id !== id);
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
    this.tags = initialState.tags !== null ? initialState.tags : [];
  }
}
