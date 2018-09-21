/*
Copyright (c) 2018 Friedrich-Alexander University Erlangen-Nürnberg (FAU)
SPDX-License-Identifier: AGPL-3.0-only
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatCardModule, MatTabsModule, MatStepperModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { OdsConfigComponent } from './ods-config/ods-config.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DataSourceFormComponent } from './ods-config/components/data-source-form/data-source-form.component';
import { StepperComponent } from './ods-config/components/stepper/stepper.component';
// import {StoreModule} from '@ngrx/store';
// import {NgrxJsonApiModule} from 'ngrx-json-api';

@NgModule({
  declarations: [
    AppComponent,
    OdsConfigComponent,
    SettingsComponent,
    DashboardComponent,
    OverviewComponent,
    DataSourceFormComponent,
    StepperComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    // StoreModule.forRoot(reducers, {}), // reducers, initial state
    // NgrxJsonApiModule.configure({
    //   apiUrl: 'http://localhost.com',
    //
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
