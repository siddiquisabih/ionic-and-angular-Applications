import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';



declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild(Slides) slides: Slides;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;



  title: string = 'My first AGM project';
  lat: number = 24.9662;
  lng: number = 67.0673;
  lat1: number = 24.7607;
  lng1: number = 67.1011;
  lat2: number = 24.6607;
  lng2: number = 67.2011;

  animation: 'BOUNCE' | 'DROP' | null;
  marker: any


  private icon = {
    url: ('../assets/icon/map.png'),
    scaledSize: {
    }
  };
  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    this.initMap();
  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: { lat: this.lat, lng: this.lng }
    });

    this.directionsDisplay.setMap(this.map);

    // this.marker = new google.maps.Marker({
    //   map: this.map,
    //   draggable: false,
    //   // animation: google.maps.Animation.BOUNCE,
    //   position: { lat: this.lat, lng: this.lng }
    // });

  }
  slideChanged() {
    console.log('sabih', this.slides.getActiveIndex())

    if (this.slides.getActiveIndex() === 0) {
      this.lat = 24.9728;
      this.lng = 67.0668;
      var icon = {
        scaledSize: new google.maps.Size(60, 65),
        url: "assets/icon/homeMap2.png",
      }
      this.directionsDisplay.setMap(new google.maps.Marker({
        map: this.map,
        draggable: false,
        animation: google.maps.Animation.BOUNCE,
        position: { lat: this.lat, lng: this.lng },
        icon: icon
      }))


      this.moveToLocation(this.lat, this.lng)
    }
    if (this.slides.getActiveIndex() === 1) {
      var icon = {
        scaledSize: new google.maps.Size(60, 65),
        url: "assets/icon/homeMap2.png",
      }
      this.lat = 24.7937;
      this.lng = 67.0643;

      this.marker = new google.maps.Marker({
        map: this.map,
        draggable: false,
        animation: google.maps.Animation.BOUNCE,
        position: { lat: this.lat, lng: this.lng },
        icon: icon
      })
      this.moveToLocation(this.lat, this.lng)
    }
  }


  moveToLocation(lat, lng) {
    var center = new google.maps.LatLng(lat, lng);
    var map = document.getElementById("map");
    this.map.panTo(center);

  }
}
