import { configureStore } from "@reduxjs/toolkit";
import activeUserSlice from "./activeUserSlice";
import chatsSlice from "./chatsSlice";
import profileSlice from "./profileSlice";
import searchSlice from "./searchSlice";
const store = configureStore({
  reducer: {
    activeUser: activeUserSlice,
    profile: profileSlice,
    search: searchSlice,
    chats: chatsSlice,
  },
});
export default store;
