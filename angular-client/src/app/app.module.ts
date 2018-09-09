import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule, ConfirmationService, MessageService } from 'primeng/primeng';
import { AuthInterceptorProvider } from './shared/inteceptor/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
