import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './modules/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Auth Component
import { AuthInterceptor } from './auth/auth-interceptor';
import { LoginComponent } from './components/login/login.component';
//Components
import { AppComponent } from './app.component';

import { ButtonComponent } from './shared/button/button.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './layouts/side-nav/side-nav.component';
import { UserEntryComponent } from './components/user-entry/user-entry.component';
import { ItemEntryComponent } from './components/item-entry/item-entry.component';
import { TestComponent } from './test/test/test.component';
import { OrderListComponent } from './test/order-list/order-list.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FieldToDisplayPipe } from './test/order-list/field-to-display.pipe';
import { DynamicTableComponent } from './test/dynamic-table/dynamic-table.component';

@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    ButtonComponent,
    SpinnerComponent,
    HomeComponent,
    SideNavComponent,
    UserEntryComponent,
    ItemEntryComponent,
    TestComponent,
    OrderListComponent,
    FieldToDisplayPipe,
    DynamicTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    FormsModule,
    NgxSummernoteModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
