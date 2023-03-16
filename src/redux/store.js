import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { assigneeReducer } from "./reducers/assignee_reducer";
import { assignorReducer } from "./reducers/assignor_reducer";
import { loginReducer } from "./reducers/login_reducer";
import { taskReducer } from "./reducers/tasks_reducer";
const { configureStore, combineReducers } = require("@reduxjs/toolkit");
const rootPersistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: {
    log: loginReducer,
    assignor: assignorReducer,
    ass: assigneeReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);
