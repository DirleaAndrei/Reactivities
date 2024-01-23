import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore {
  comments = [];
  hubConnection = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (activityId) => {
    if (store.activityStore) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_CHAT_URL}?activityId=${activityId}`, {
          accessTokenFactory: () => store.userStore.user?.token,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection.start().catch((error) => {
        console.log("Error establishing the connection: ", error);
      });

      this.hubConnection.on("LoadComments", (comments) => {
        runInAction(() => {
          comments.forEach((comment) => {
            comment.createdAt = new Date(comment.createdAt);
          });
          this.comments = comments;
        });
      });

      this.hubConnection.on("ReceiveComment", (comment) => {
        runInAction(() => {
          comment.createdAt = new Date(comment.createdAt);
          this.comments.unshift(comment);
        });
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("Error stopping connection: ", error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComment = async (values) => {
    values.activityId = store.activityStore.selectedActivity?.id;
    try {
      await this.hubConnection?.invoke("SendComment", values);
    } catch (error) {
      console.log(error);
    }
  };
}
