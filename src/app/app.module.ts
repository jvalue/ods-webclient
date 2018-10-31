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
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatCardModule, MatTabsModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatExpansionModule,
  MatSelectModule, MatCheckboxModule, MatTableModule, MatChipsModule
} from '@angular/material';
import { OdsConfigComponent } from './ods-config/ods-config.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DataSourceFormComponent } from './ods-config/components/data-source-form/data-source-form.component';
import { DataSourceDetailComponent } from './ods-config/components/data-source-detail/data-source-detail.component';
import { ProcessorChainFormComponent } from './ods-config/components/processor-chain-form/processor-chain-form.component';
import { NotificationFormComponent } from './ods-config/components/notification-form/notification-form.component';
import { DataViewFormComponent } from './ods-config/components/data-view-form/data-view-form.component';

@NgModule({
  declarations: [
    AppComponent,
    OdsConfigComponent,
    SettingsComponent,
    DashboardComponent,
    OverviewComponent,
    DataSourceFormComponent,
    DataSourceDetailComponent,
    ProcessorChainFormComponent,
    NotificationFormComponent,
    DataViewFormComponent
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
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
