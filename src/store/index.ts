import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "../modules/auth/auth.api";
import { authSlice } from "../modules/auth/auth.slice";
import { userApi } from "../modules/users/api/user.api";
import { companyApi } from "../modules/company/company/api/company.api";
import { orderApi } from "../modules/orders/api/order.api";
import { productApi } from "../modules/product/api/product.api";
import { productFamilyApi } from "../modules/product/api/product-family.api";
import { subscriptionApi } from "../modules/subscription/api/subscription.api";
import { productPricingSlice } from "../modules/product/entity/product.slice";
import { companyRequestApi } from "../modules/company/company-request/api/company-request.api";
import { employeeApi } from "../modules/employee/api/employee.api";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["authSlice", "productPricingSlice"],
};

const reducers = {
  /** Auth Module */
  [authSlice.name]: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,

  /* BTB Module  -------------------------------------- */
  [companyApi.reducerPath]: companyApi.reducer,
  [companyRequestApi.reducerPath]: companyRequestApi.reducer,

  // employee
  [employeeApi.reducerPath]: employeeApi.reducer,
  /* -------------------------------------------------- */

  /** User Module */
  [userApi.reducerPath]: userApi.reducer,

  /* Product Module */
  [productApi.reducerPath]: productApi.reducer,

  [productPricingSlice.name]: productPricingSlice.reducer,

  [productFamilyApi.reducerPath]: productFamilyApi.reducer,

  /* Order Module */
  [orderApi.reducerPath]: orderApi.reducer,

  /* Subscription api */
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,
};

export const rootReducer: Reducer<RootState> = (state, action) => {
  //   if (action.type === RESET_STATE_ACTION_TYPE) {
  //     state = {} as RootState;
  //   }
  if (action.type === FLUSH) {
    // }
    state = undefined;
  }

  if (action.type === REHYDRATE) {
    state = {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === PERSIST) {
    state = {
      ...state,
      ...action.payload,
    };
  }
  if (action.type === PURGE) {
    state = undefined;
  }

  return combinedReducer(state, action);
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // ignore reduxt persist actions
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
      //   thunk: {
      //     extraArgument:,
      //   },
    }).concat([
      authApi.middleware,
      orderApi.middleware,
      userApi.middleware,
      companyApi.middleware,
      companyRequestApi.middleware,
      productApi.middleware,
      productFamilyApi.middleware,
      subscriptionApi.middleware,
      employeeApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
