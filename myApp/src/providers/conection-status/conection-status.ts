
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { OfflinePage } from '../../pages/offline/offline';
import { HomePage } from '../../pages/home/home';
import { Subscription} from 'rxjs/Subscription';
import { NavController,ToastController } from 'ionic-angular';

/*
  Generated class for the ConectionStatusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConectionStatusProvider {

  constructor(private toast: ToastController, private network: Network,public navCtrl: NavController) {
    console.log('Hello ConectionStatusProvider Provider');
  }

  connected: Subscription;
  disconnected: Subscription;

  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: `You are now ${connectionState} via ${networkType}`,
      duration: 3000
    }).present();
  }

  connectionAction(){
    
    this.connected = this.network.onConnect().subscribe(data => {
      console.log(data)
      this.navCtrl.push(HomePage);
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.navCtrl.push(OfflinePage);
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
}

  connectionStandOff(){
 
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
}

  

}
