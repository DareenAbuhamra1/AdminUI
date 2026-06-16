import { Component } from '@angular/core';
import { LocationDto } from '../../shared/models/LocationDto';
import { CountryEnum } from '../../shared/enums/CountryEnum';
import { CityEnum } from '../../shared/enums/CityEnum';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { environment } from '../../shared/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-location-customer',
  imports: [GoogleMapsModule],
  templateUrl: './location-customer.html',
  styleUrl: './location-customer.css',
})
export class LocationCustomer {
  location: LocationDto = {
    locationId:0,
    customerId: 0,
    addressTitle: '',
    country: CountryEnum.Jordan,
    city: CityEnum.Amman,
    area: '',
    street: '',
    latitude: 0,
    longitude: 0
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar:MatSnackBar,
  ) { }

  geocoder = new google.maps.Geocoder();

  center: google.maps.LatLngLiteral = {
    lat: 31.9539,
    lng: 35.9106
  };

  zoom = 15;

  markerPosition: google.maps.LatLngLiteral = {
    lat: 31.9539,
    lng: 35.9106
  };

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.location.customerId = Number(params['userId']) || 0;
    });
    navigator.geolocation.getCurrentPosition(position => {

      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      this.markerPosition = this.center;

      this.location.latitude = this.center.lat;
      this.location.longitude = this.center.lng;

    });

  }

  moveMarker(event: google.maps.MapMouseEvent) {
    if (!event.latLng) return;

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    this.markerPosition = { lat, lng };

    this.location.latitude = lat;
    this.location.longitude = lng;

    this.getAddressFromCoordinates(lat, lng);
  }

  getAddressFromCoordinates(lat: number, lng: number) {
    const latlng = { lat, lng };

    this.geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {

        const place = results[0];

        this.location.addressTitle = place.formatted_address;

        // Extract street + area
        const components = place.address_components;

        this.location.street =
          components.find(c => c.types.includes('route'))?.long_name || '';

        this.location.area =
          components.find(c => c.types.includes('sublocality') || c.types.includes('neighborhood'))?.long_name || '';
      }
    });
  }

  addLocation() {
    const token = localStorage.getItem('jwt');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    this.http.post<LocationDto>(`${environment.apiUrls.customer}/Location/add`,this.location, {headers}).subscribe({
      next : (res) =>{
        if(res.locationId != null && res.locationId > 0){
          localStorage.setItem("loc",res.locationId.toString());
          localStorage.setItem("customerId",res.customerId.toString());
          this.router.navigate(['customer/domains']);
        }
        else{
          this.snackBar.open("Failed to add location", 'Close',{duration:3000});
        }
      },
      error: (err) => {
        if(err.status == 400){
          this.snackBar.open("Bad request, failed to add location", 'Close',{duration:3000});
        }
        if(err.status == 500){
          this.snackBar.open("Internal Server Error", 'Close',{duration:3000 });
        }
      },
    })
  }
}
