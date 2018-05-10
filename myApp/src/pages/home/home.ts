import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { ContentfulProvider } from '../../providers/contentful/contentful';
import { Entry} from 'contentful';
import { HomeDetailPage } from '../../pages/home-detail/home-detail';
import { Network } from '@ionic-native/network';
import { Subscription} from 'rxjs/Subscription';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private eventItems:Entry<any>[] = [];  
  constructor(public loading: LoadingController,private toast: ToastController, private network: Network,private contentfulService: ContentfulProvider,public navCtrl: NavController) {

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
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

  ionViewDidEnter() {
    this.connected = this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      console.log(data)
       this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

  ionViewWillLeave(){
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }

  
  ngOnInit() {

    let loader = this.loading.create({
      content: 'Loading...Please Wait',
    });
  
    loader.present().then(() => {
      this.contentfulService.getEventItems()
      .then(event => this.eventItems = event);
      loader.dismiss();
    });
    
    // this.contentfulService.getEventItems()
    // .then(event => this.eventItems = event);
   
  }

  openItem(event) {
    this.navCtrl.push(HomeDetailPage,{

      event: event
    });
  }

}
