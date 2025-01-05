import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButton, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonCardHeader } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  standalone: true,
  imports: [IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {

  //constructor imports DataService for Ionic storage retrieval
  //constructor imports Router to navigate to the other app pages
  //constructor imports MyHttpService for using the RestCountries API url
  constructor(private ds:DataService, private mhs:MyHttpService, private router:Router) { }

  //getKeyWord() constructs url by appending country search by the user from input
  //sends a HTTP GET request to retrieve relevant country data
  //this is assigned to result, and the the data property of the HTTP Response is assigned to countryInfo
  keyword:string="";
  options:HttpOptions={
    url: "https://restcountries.com/v3.1/name/"
  }
  countryInfo:any;
  countryName:string="";

  async getKeyWord(){
    this.keyword = await this.ds.get("keyword");
    this.options.url = this.options.url.concat(this.keyword)
    let result = await this.mhs.get(this.options)
    this.countryInfo = result.data;
  }

  //openNews stores the country name and cca2 code for the selected country in ionic storage
  //these are passed as parameters to the method
  //and navigates to the news page
  async openNews(name:string,code:string){
    //ensure name and code variables have been set prior to navigation
    await this.ds.set('countryName', name);
    await this.ds.set('countryCode', code);
    this.router.navigate(['/news']);
  }

  //openWeather stores the country capital name,latitude and longitude for the selected country in ionic storage
  //these are passed as parameters to the method
  //and navigates to the weather page
  async openWeather(latitude:any,longitude:any,name:string){
    //ensure relevant variables have been set prior to navigation
    await this.ds.set('countryLatitude', latitude);
    await this.ds.set('countryLongitude', longitude);
    await this.ds.set('capitalName', name);
    this.router.navigate(['/weather']);
  }

  //openMusic stores the country name for the selected country in ionic storage
  //this is passed as a parameter to the method
  //and navigates to the music page
  async openMusic(name:string){
    await this.ds.set('commonName', name);
    this.router.navigate(['/music']);
  }

  ngOnInit() {
    this.getKeyWord();
  }

}
