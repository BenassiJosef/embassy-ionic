import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator} from '@ionic-native/launch-navigator';


@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  @ViewChild("map") mapElement;
  map: any;
  constructor(private launchNavigator: LaunchNavigator) {
    
  }

  ngOnInit(){
    this.initMap();
   
  }

  initMap(){

  
   
    let coords = new google.maps.LatLng(55.953251,-3.188267);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      position: coords
      
    })
    // var infowindow = new google.maps.InfoWindow({
    //   content: "<button ion-button (click)= getDirections()>Get Directions</button>",
    //   maxWidth: 200
    //   //cssOptions? go here
    // });


    // marker.addListener('click', function() {
    //   infowindow.open(this.map, marker);
    // });

    var infowindow = new google.maps.InfoWindow({
      content: " "
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<p>Event Name: '+this.title+'</p>' +
              '<p>Event Type: '+this.etype+'</p>' +
              '<p>Cause: '+this.cause+'</p>' +
              '<p>Date: '+this.date+'</p>' +
                  '<p>Time: '+this.time+'</p>' +
                  '<button onclick="getDirections()">Click me</button>');
      
  
      infowindow.open(this.map, marker);
     
    });

 

    
}

getDirections(){

  this.launchNavigator.navigate([50.279306, -5.163158], {
    start: "50.342847, -4.749904"
});
}


    // google.maps.event.addListener(marker, 'click', function(){
    //   let infowindow = new google.maps.InfoWindow({
    //     content: "<div> <h1>Hello its me</h1></div>"
    //   });
    //   infowindow.open(this.map,marker);
    // })

  


  }
