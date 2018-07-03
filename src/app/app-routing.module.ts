import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'dashboard', component: AppComponent },
  { path: '**', component: AppComponent }

];
@NgModule({
  exports: [RouterModule]
})
export class AppRoutingModule { }
