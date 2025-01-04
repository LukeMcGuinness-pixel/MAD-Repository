import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  standalone: true,
  imports: [IonIcon, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {

  constructor(private ds:DataService, private mhs:MyHttpService) { }

  //code for getting name, latitude and longitude from restcountries.com
  capitalName:string="";
  units:string="";
  latitude:any;
  longitude:any;

  async getCountryInfo(){
    this.capitalName = await this.ds.get("capitalName");
    this.units = await this.ds.get("option");
    this.latitude = await this.ds.get("countryLatitude");
    //console.log(this.latitude)
    this.longitude = await this.ds.get("countryLongitude");
    //console.log(this.longitude)
  }

  //code for get weather from openweathermap.org
  resultsWeather:any;
  weatherInfo:any;
  weatherDescription:string="";
  weatherIconCode:any;
  weatherIconLink:any;

  weatherTemp:number=0;
  weatherTempConverted:number=0;
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

    this.resultsWeather = await this.mhs.get(this.optionsWeather);
    //console.log(this.resultsWeather)
    this.weatherInfo = this.resultsWeather.data;
    this.weatherDescription = this.weatherInfo.weather[0].description;
    console.log('Raw Temperature Before:', this.weatherTemp);
    this.weatherTemp = this.weatherInfo.main.temp;
    console.log('Temperature After:', this.weatherTemp);

    //console.log(this.weatherTemp)
    //console.log('Units:', this.units);
    //if(this.units=="metric"){
      //this.weatherTempConverted = (this.weatherTemp-273.15);
      //console.log("'"+this.units+"'");
    //} else if(this.units=="imperial") {
      //this.weatherTempConverted = ((this.weatherTemp-273.15)*(9/5))+32;
      //console.log("'"+this.units+"'");
    //} else {
      //this.weatherTempConverted = this.weatherTemp;
      //console.log("'"+this.units+"'");
    //}
    
    this.weatherIconCode = this.weatherInfo.weather[0].icon;
    this.weatherIconLink = "http://openweathermap.org/img/wn/"+this.weatherIconCode+"@2x.png";
    //console.log(this.weatherIconLink)
  }

  ngOnInit() {
    this.getWeather();
  }


}
