/****************************
 Copyright © 2021-present Boeing. All rights reserved.
 ****************************/

import { DataStorageEntityState } from "src/app/core/models/state-ext";


export class ReducerHelpers {
  static reduceFailureAction(
    state: DataStorageEntityState<any>,
    payload: { errorMessage: string },
  ): DataStorageEntityState<any> {
    return {
      ...state,
      loading: false,
      errorMessage: payload.errorMessage
    };
  }

  static reduceLoadOperation(state: DataStorageEntityState<any>): DataStorageEntityState<any> {
    return {
      ...state,
      loading: true,
      errorMessage: ''
    };
  }

  static reduceOnSuccess(state: DataStorageEntityState<any>): DataStorageEntityState<any> {
    return {
      ...state,
      loading: false,
      initialized: true
    };
  }
}
