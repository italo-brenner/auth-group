import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { NotificationService } from './shared/components/notification/notification.service';
import { GrowlModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    GrowlModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
