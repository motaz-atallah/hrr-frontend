/****************************
 Copyright © 2021-present Boeing. All rights reserved.
 ****************************/

import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomDto, RoomFilter } from '../../core/models/rooms-resources.model';
import { Dictionary } from '@ngrx/entity';
import { FEATURE_PREFIX, ManagementState, roomEntityAdapter } from '../reducers';

const managementState = createFeatureSelector<ManagementState>(FEATURE_PREFIX);
const featureSelector = createSelector(managementState, state => state.roomStorage);
const entitySelectors = roomEntityAdapter.getSelectors(featureSelector);

export class RoomsStorageSelectors {
  static readonly feature = featureSelector;
  static readonly ids = entitySelectors.selectIds;
  static readonly dictionary = entitySelectors.selectEntities;
  static readonly entities = entitySelectors.selectAll;
  static readonly initialized = createSelector(
    RoomsStorageSelectors.feature,
    state => state.initialized
  );
  static readonly loading = createSelector(RoomsStorageSelectors.feature, state => state.loading);
  static readonly errorMessage = createSelector(
    RoomsStorageSelectors.feature,
    state => state.errorMessage
  );
  static readonly filters = createSelector(
    RoomsStorageSelectors.feature,
    state => state.filter as RoomFilter
  );
  static readonly sortBy = createSelector(
    RoomsStorageSelectors.feature,
    state => state.sortBy
  );
  static readonly oneById = (
    roomId: number
  ): MemoizedSelector<Dictionary<RoomDto>, RoomDto> =>
    createSelector(RoomsStorageSelectors.dictionary, dictionary => dictionary[roomId]);
}
