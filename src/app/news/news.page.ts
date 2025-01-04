import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardHeader, IonButton, IonCardContent, IonItem } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  standalone: true,
  imports: [IonItem, IonCardContent, IonButton, IonCardHeader, IonCardTitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {

  constructor(private ds:DataService, private mhs:MyHttpService) { }

  //code for getting cca2 code from restcountries.com
  keyword:string="";
  name:string="";
  code:string="";
  options:HttpOptions={
    url: "https://restcountries.com/v3.1/name/"
  }
  countryInfo:any;

  async getCode(){
    this.name = await this.ds.get("countryName");
    this.code = await this.ds.get("countryCode");
    //this.options.url = this.options.url.concat(this.code)
    //console.log(this.options.url)
    //let result = await this.mhs.get(this.options)
    //this.countryInfo = result.data;
    //this.code = this.countryInfo.cca2;
    //console.log(this.code)
  }




//code for news from newsdata.io

  APIKey:string="pub_6404503dcdce26f5af1503ca95b2f0b612347";
  optionsNews:HttpOptions={
    url: "https://newsdata.io/api/1/latest?apikey="+this.APIKey+"&country="
  }
  newsInfo:any;
  newsTitles:any=[]
  hasNews:boolean=false;

  noNews(){
    this.hasNews=true;
  }

  async getNews(){
    this.hasNews=false;
    await this.getCode();
    let resultsNews:any;
      if (this.code) {
      this.optionsNews.url = this.optionsNews.url.concat(this.code)
      resultsNews = await this.mhs.get(this.optionsNews)
      //console.log(resultsNews.data.totalResults)
      this.newsInfo = resultsNews.data.results;
      //console.log(this.newsInfo)
    }
    if(resultsNews.data.totalResults==0){
      this.noNews();
      //console.log(this.hasNews)
    } else { 
      this.newsInfo = resultsNews.data.results;
      //console.log(this.newsInfo)
    }
  }

  ngOnInit() {
    this.getNews();
  }

  //set up github, and upload code
  //weather (L&L parameters and storage (same as name cca2 for news) units from storage.)
  //settings button if possible
  //extra functionality and innovation.pdf
  //refactor code

}
