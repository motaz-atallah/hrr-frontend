/****************************
Copyright © 2021-present Boeing. All rights reserved.
****************************/

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { ReservationsEffects } from './effects/reservations.effects';
import { RoomsEffects } from './effects/rooms.effects';
import { FEATURE_PREFIX, reducers } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(FEATURE_PREFIX, reducers),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([
      RoomsEffects,
      ReservationsEffects
    ]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 60,
      logOnly: environment.production
    })
  ],
})
export class AppStoreModule { }
