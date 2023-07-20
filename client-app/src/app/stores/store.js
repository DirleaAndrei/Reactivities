import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

export const store = {
  activityStore: new ActivityStore(),
};

export const storeContext = createContext(store);

export function useStore() {
  return useContext(storeContext);
}
