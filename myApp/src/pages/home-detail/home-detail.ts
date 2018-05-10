import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Entry} from 'contentful';
import { LaunchNavigator} from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the HomeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-detail',
  templateUrl: 'home-detail.html',
})
export class HomeDetailPage {

  item:Entry<any>;

  constructor(private geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams,public launchNavigator: LaunchNavigator) {

      this.item = navParams.get('event');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeDetailPage');
  }

  getDirections(desination :string){

    let coords:any ;
    
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     coords = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
    
    }).catch((error) => {
       console.log('Error getting location', error);
     });

    this.launchNavigator.navigate(desination, {
      start: coords
  });
  
  }
}
