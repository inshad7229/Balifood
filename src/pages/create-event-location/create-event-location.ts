import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ModalController, ViewController } from 'ionic-angular';

 
declare var google;
@IonicPage()
@Component({
  selector: 'page-create-event-location',
  templateUrl: 'create-event-location.html',
})


export class CreateEventLocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentlat
  currentlng
  locationaddress
  lat
  lng
  constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.currentlat = position.coords.latitude
      this.currentlng = position.coords.longitude
      this.initMap();

    }, (err) => {
      console.log(err);
    });

    console.log('ionViewDidLoad CreateEventLocationPage');
  }

  initMap() {

    var map = new google.maps.Map(document.getElementById('mapsearch'), {
      center: {
        lat: this.currentlat,
        lng: this.currentlng
      },
      zoom: 13
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    autocomplete.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      console.log('place.geometry' + JSON.stringify(place.geometry))
      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
        this.locationaddress = address
        this.lat = place.geometry.location.lat()
        this.lng = place.geometry.location.lng()
        console.log("address" + this.locationaddress + " " + "lat" + this.lat + " " + "lng" + this.lng);

      }

      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);

    });

  }
  onDone() {
    var a = {
      address: this.locationaddress,
      lat: this.lat,
      lng: this.lng

    }
    this.viewCtrl.dismiss(a);
  }
  onClose() {
    this.viewCtrl.dismiss();
  }


}

