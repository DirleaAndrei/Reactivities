import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

export const store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
};

export const storeContext = createContext(store);

export function useStore() {
  return useContext(storeContext);
}
