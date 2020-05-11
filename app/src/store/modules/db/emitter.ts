import { createAction } from "@reduxjs/toolkit";
import { Token } from "@o-w-o/stores/db/modules/tokens";

export const CACHE_STORE_NAMESPACE = "@@rxdb";

export const triggerCacheStore = createAction<any>(
  `${CACHE_STORE_NAMESPACE}/TRIGGER`
);
export const dispatchCacheStore = createAction(
  `${CACHE_STORE_NAMESPACE}/DISPATCH`
);

export const tryCacheStore = createAction(`${CACHE_STORE_NAMESPACE}/TRY`);

export const storeToken = createAction<Token>(
  `${CACHE_STORE_NAMESPACE}/TOKEN/store`
);
