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
  imports: [IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonCard, IonButton, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {

  constructor(private ds:DataService, private mhs:MyHttpService, private router:Router) { }

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
    //console.log(JSON.stringify(this.countryInfo))
    //this.countryName = this.countryInfo.name
    //console.log(this.countryName)
    //await this.ds.set("countryName",this.countryName)
  }

  async openNews(name:string,code:string){
    await this.ds.set('countryName', name);
    await this.ds.set('countryCode', code);
    console.log('Country name saved: '+name);
    console.log('Country code saved: '+code);
    this.router.navigate(['/news']);
  }

  async openWeather(latitude:any,longitude:any,name:string){
    await this.ds.set('countryLatitude', latitude);
    await this.ds.set('countryLongitude', longitude);
    await this.ds.set('countryName', name);
    console.log('Country lat saved: '+latitude);
    console.log('Country long saved: '+longitude);
    this.router.navigate(['/weather']);
  }

  ngOnInit() {
    this.getKeyWord();
  }

}
