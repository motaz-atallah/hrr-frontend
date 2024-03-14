import { EntityState } from "@ngrx/entity";
import { SortType } from "../enums/sort-type.enum";

export interface ApiLoadingState {
  loading: boolean;
  initialized: boolean;
  errorMessage: string;
  sortBy: { column: string, sortType: SortType };
  filter: object
}

export type EntityExtState = ApiLoadingState;

export const initialEntityExtState: EntityExtState = {
  loading: false,
  initialized: false,
  errorMessage: '',
  sortBy: null,
  filter: {}
};

export type DataStorageEntityState<T> = EntityState<T> & EntityExtState;

export const initialExtState: EntityExtState = {
  ...initialEntityExtState
};
