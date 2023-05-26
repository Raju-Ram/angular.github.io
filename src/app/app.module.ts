import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { ApiService } from './service/api.service';


@NgModule({
  declarations: [
    AppComponent,
    FormComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
    

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }


