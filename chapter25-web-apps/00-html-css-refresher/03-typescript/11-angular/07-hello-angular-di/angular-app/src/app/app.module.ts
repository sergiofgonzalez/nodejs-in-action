import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BroadcastService } from './services/broadcast.service';

import { SharedModule } from './shared/shared.module';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    BroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
