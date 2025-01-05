import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  standalone: true,
  imports: [ IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {

  //constructor imports DataService for Ionic storage retrieval
  //constructor imports MyHttpService for using the OpenWeather API url
  constructor(private ds:DataService, private mhs:MyHttpService) { }

  //getCountryInfo retrieves the country capital, temperature units, latitude and longitude from ionic storage
  //These values are assigned to their respective variables
  capitalName:string="";
  units:string="";
  latitude:any;
  longitude:any;

  async getCountryInfo(){
    this.capitalName = await this.ds.get("capitalName");
    this.units = await this.ds.get("option");
    this.latitude = await this.ds.get("countryLatitude");
    this.longitude = await this.ds.get("countryLongitude");
  }

  //getWeather() constructs url by appending country latitude,longitude,units and API key
  //sends a HTTP GET request to retrieve weather data in JSON format
  //this is assigned to resultsWeather, and the data property of the HTTP Response is assigned to weatherInfo
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
    //ensure the variables associated with getCountryInfo have been set
    await this.getCountryInfo();

    this.optionsWeather.url = this.optionsWeather.url.concat(this.latitude);
    this.optionsWeather.url = this.optionsWeather.url.concat("&lon="+this.longitude);
    this.optionsWeather.url = this.optionsWeather.url.concat("&units="+this.units);
    this.optionsWeather.url = this.optionsWeather.url.concat("&appid="+this.APIKey);

    this.resultsWeather = await this.mhs.get(this.optionsWeather);
    this.weatherInfo = this.resultsWeather.data;
    //weather is an array, and description is retrieved from the first element of this array
    this.weatherDescription = this.weatherInfo.weather[0].description;
    this.weatherTemp = this.weatherInfo.main.temp;
    
    //store the weather icon code from the first element of the weather array, and use it in the weather icon link
    this.weatherIconCode = this.weatherInfo.weather[0].icon;
    this.weatherIconLink = "http://openweathermap.org/img/wn/"+this.weatherIconCode+"@2x.png";
  }

  ngOnInit() {
    this.getWeather();
  }


}
