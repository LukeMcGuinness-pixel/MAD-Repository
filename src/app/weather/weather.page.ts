import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {

  constructor(private ds:DataService, private mhs:MyHttpService) { }

  //code for getting name, latitude and longitude from restcountries.com
  name:string="";
  units:string="";
  latitude:any;
  longitude:any;

  async getCountryInfo(){
    this.name = await this.ds.get("countryName");
    this.units = await this.ds.get("option");
    this.latitude = await this.ds.get("countryLatitude");
    console.log(this.latitude)
    this.longitude = await this.ds.get("countryLongitude");
    console.log(this.longitude)
  }

  //code for get weather from openweathermap.org
  urlWithLatitude:any;
  urlWithLongitude:any;
  urlWithUnits:any;
  urlWithAPIKey:any;
  APIKey:string="452a51c92789b73436a0f22b8205e7fa";
  optionsWeather:HttpOptions={
    url: "https://api.openweathermap.org/data/2.5/weather?lat="
  }

  async getWeather(){
    await this.getCountryInfo();

    this.optionsWeather.url = this.optionsWeather.url.concat(this.latitude);
    this.optionsWeather.url = this.optionsWeather.url.concat("&lon="+this.longitude);
    this.optionsWeather.url = this.optionsWeather.url.concat("&units="+this.units);
    this.optionsWeather.url = this.optionsWeather.url.concat("&appid="+this.APIKey);
    
    console.log(JSON.stringify(this.optionsWeather.url));

  }

  ngOnInit() {
    this.getWeather();
  }


}
