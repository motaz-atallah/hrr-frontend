/****************************
 Copyright © 2021-present Boeing. All rights reserved.
 ****************************/

import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_PREFIX, ManagementState, reservationEntityAdapter } from '../reducers';
import { ReservationDto } from '../../core/models/reservations-resources.model';
import { Dictionary } from '@ngrx/entity';

const managementState = createFeatureSelector<ManagementState>(FEATURE_PREFIX);
const featureSelector = createSelector(managementState, state => state.reservationStorage);
const entitySelectors = reservationEntityAdapter.getSelectors(featureSelector);

export class ReservationsStorageSelectors {
  static readonly feature = featureSelector;
  static readonly ids = entitySelectors.selectIds;
  static readonly dictionary = entitySelectors.selectEntities;
  static readonly entities = entitySelectors.selectAll;
  static readonly initialized = createSelector(
    ReservationsStorageSelectors.feature,
    state => state.initialized
  );
  static readonly loading = createSelector(ReservationsStorageSelectors.feature, state => state.loading);
  static readonly errorMessage = createSelector(
    ReservationsStorageSelectors.feature,
    state => state.errorMessage
  );
  static readonly oneById = (
    reservationId: number
  ): MemoizedSelector<Dictionary<ReservationDto>, ReservationDto> =>
    createSelector(ReservationsStorageSelectors.dictionary, dictionary => dictionary[reservationId]);
}
