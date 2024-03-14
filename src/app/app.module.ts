import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateInputsModule, DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SliderImageComponent } from './components/slider-image/slider-image.component';
import { CommonModule, DatePipe } from '@angular/common';
import { IntlModule } from '@progress/kendo-angular-intl';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormFieldModule, InputsModule } from '@progress/kendo-angular-inputs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { HeaderComponent } from './components/header/header.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { MainComponent } from './components/main/main.component';
import { RoomDetailsComponent } from './components/rooms/room-details/room-details.component';
import { RoomCardComponent } from './components/rooms/room-card/room-card.component';
import { BaseComponent } from './components/base/base.component';
import { CapitalizePipe } from './core/pipes/capitalize.pipe';
import { PopupModule } from '@progress/kendo-angular-popup';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AppStoreModule } from './store/store.module';
import { RoomReserveFormComponent } from './components/rooms/room-reserve-form/room-reserve-form.component';


@NgModule({
  declarations: [
    AppComponent,
    SliderImageComponent,
    SearchFormComponent,
    HeaderComponent,
    RoomsComponent,
    MainComponent,
    RoomDetailsComponent,
    RoomCardComponent,
    BaseComponent,
    CapitalizePipe,
    ReservationsComponent,
    LoginFormComponent,
    RoomReserveFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DateInputsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    IntlModule,
    LabelModule,
    ButtonsModule,
    DateInputsModule,
    FormFieldModule,
    ReactiveFormsModule,
    DropDownsModule,
    FormsModule,
    IconsModule,
    PopupModule,
    DatePickerModule,
    InputsModule,
    GridModule,
    IndicatorsModule,
    DialogsModule,
    AppStoreModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
