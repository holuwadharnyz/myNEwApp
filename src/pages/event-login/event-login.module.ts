import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLoginPage } from './event-login';

@NgModule({
  declarations: [
    EventLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(EventLoginPage),
  ],
  exports: [
    EventLoginPage
  ]
})
export class EventLoginPageModule {}
