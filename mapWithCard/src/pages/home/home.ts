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

  lat: number = 24.9662;
  lng: number = 67.0673;
  marker: any = []



  cardsData: any = [{
    image: 'assets/icon/nagan.jpeg',
    date: '21 Dec, 2018 - 29 Dec, 2018',
    room: 1,
    persons: 2,
    name: 'Buffer Zone',
    lat: 24.9662,
    long: 67.0675,
    price: 500,
    isActive: false,
  }, {
    image: 'assets/icon/defence.jpeg',
    date: '20 Dec, 2018 - 23 Dec, 2018',
    room: 6,
    persons: 12,
    name: 'Defence Phase iv',
    lat: 24.7937,
    long: 67.0643,
    price: 230,
    isActive: false,
  },
  {
    image: 'assets/imgs/dummy-card.png',
    date: '20 Sep, 2018 - 23 Sep, 2018',
    room: 2,
    persons: 7,
    name: 'garden ',
    lat: 24.8532,
    long: 67.0167,
    price: 150,
    isActive: false,
  }]

  constructor(public navCtrl: NavController) {



    setTimeout(() => {
      this.renderFirstSlide()
    }, 500)

  }



  renderFirstSlide() {

    if (this.cardsData[0] !== undefined) {
      var long = this.cardsData[0].long
      var lat = this.cardsData[0].lat
      this.cardsData[0].isActive = true

      var icon = {
        scaledSize: new google.maps.Size(60, 65),
        url: "assets/icon/homeMap2.png",
      }
      this.deleteMarker(null)
      var marker = new google.maps.Marker({
        map: this.map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: { lat: lat, lng: long },
        icon: icon
      })
      this.marker.push(marker)
      console.log(long)
      console.log(lat)
      this.moveToLocation(lat, long)
    }


  }




  ionViewDidLoad() {
    //fill dummy cards Data 




    this.initMap();
  }


  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 11,
      // center: { lat: this.lat, lng: this.lng }
    });

  }
  slideChanged() {

    if (this.slides.getActiveIndex() !== this.cardsData.length - 1) {
      this.slides.lockSwipeToNext(false)

    }
    else {
      this.slides.lockSwipeToNext(true)
    }





    var index = this.slides.getActiveIndex()


    for (var a = 0; a < this.cardsData.length; a++) {
      this.cardsData[a].isActive = false
    }

    this.cardsData[index].isActive = true
    // change Active Color





    var long = this.cardsData[index].long
    var lat = this.cardsData[index].lat

    var icon = {
      scaledSize: new google.maps.Size(60, 65),
      url: "assets/icon/homeMap2.png",
    }
    this.deleteMarker(null)
    var marker = new google.maps.Marker({
      map: this.map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: { lat: lat, lng: long },
      icon: icon
    })
    this.marker.push(marker)
    this.moveToLocation(lat, long)



  }


  moveToLocation(lat, lng) {
    var center = new google.maps.LatLng(lat, lng);
    var map = document.getElementById("map");
    this.map.panTo(center);

  }




  deleteMarker(map) {
    for (var a = 0; a < this.marker.length; a++) {
      this.marker[a].setMap(map);
    }
  }


}
