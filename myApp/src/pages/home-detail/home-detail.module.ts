import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { HomeDetailPage } from '../home-detail/home-detail';

@NgModule({
  declarations: [
    HomeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    HomeDetailPage
  ]
})
export class ItemDetailPageModule { }
