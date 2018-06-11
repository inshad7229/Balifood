var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ModalController, ViewController } from 'ionic-angular';
var CreateEventLocationPage = /** @class */ (function () {
    function CreateEventLocationPage(viewCtrl, modalCtrl, geolocation, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.geolocation = geolocation;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CreateEventLocationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            _this.currentlat = position.coords.latitude;
            _this.currentlng = position.coords.longitude;
            _this.initMap();
        }, function (err) {
            console.log(err);
        });
        console.log('ionViewDidLoad CreateEventLocationPage');
    };
    CreateEventLocationPage.prototype.initMap = function () {
        var _this = this;
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
        autocomplete.addListener('place_changed', function () {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            }
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            console.log('place.geometry' + JSON.stringify(place.geometry));
            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
                _this.locationaddress = address;
                _this.lat = place.geometry.location.lat();
                _this.lng = place.geometry.location.lng();
                console.log("address" + _this.locationaddress + " " + "lat" + _this.lat + " " + "lng" + _this.lng);
            }
            infowindowContent.children['place-icon'].src = place.icon;
            infowindowContent.children['place-name'].textContent = place.name;
            infowindowContent.children['place-address'].textContent = address;
            infowindow.open(map, marker);
        });
    };
    CreateEventLocationPage.prototype.onDone = function () {
        var a = {
            address: this.locationaddress,
            lat: this.lat,
            lng: this.lng
        };
        this.viewCtrl.dismiss(a);
    };
    CreateEventLocationPage.prototype.onClose = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", ElementRef)
    ], CreateEventLocationPage.prototype, "mapElement", void 0);
    CreateEventLocationPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-create-event-location',
            templateUrl: 'create-event-location.html',
        }),
        __metadata("design:paramtypes", [ViewController, ModalController, Geolocation, NavController, NavParams])
    ], CreateEventLocationPage);
    return CreateEventLocationPage;
}());
export { CreateEventLocationPage };
//# sourceMappingURL=create-event-location.js.map