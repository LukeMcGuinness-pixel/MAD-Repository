import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonItem } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  standalone: true,
  imports: [IonItem, IonCardContent, IonCardHeader, IonCardTitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {

  //constructor imports DataService for Ionic storage retrieval
  //constructor imports MyHttpService for using the NewsData.io API url
  constructor(private ds:DataService, private mhs:MyHttpService) { }

  //the getCode method retrieves the country name and cca2 code from ionic storage
  //assigns these values in the name and code variables, respectively
  name:string="";
  code:string="";

  async getCode(){
    this.name = await this.ds.get("countryName");
    this.code = await this.ds.get("countryCode");
  }

  //getNews() constructs url by appending API key aND country cca2 code
  //sends a HTTP GET request to retrieve news data
  //this is assigned to resultsNews, and the results part of the data property of the HTTP Response is assigned to newsInfo

  APIKey:string="pub_6404503dcdce26f5af1503ca95b2f0b612347";
  optionsNews:HttpOptions={
    url: "https://newsdata.io/api/1/latest?apikey="+this.APIKey+"&country="
  }
  newsInfo:any;
  newsTitles:any=[]
  hasNews:boolean=false;

  //No news method is used when there is no recent news for a selected country
  //in the event of no news, the hasNews boolean variable is set to true
  //if hasNews is true, the "No news found" message will be displayed to the user
  noNews(){
    this.hasNews=true;
  }

  //getNews() constructs url by appending API key and country code
  //sends a HTTP GET request to retrieve news data
  //this is assigned to resultsNews, and the data property of the HTTP Response is assigned to NewsInfo
  async getNews(){
    //ensure hasNews is set to false
    this.hasNews=false;
    //ensure the getCode method executes prior to creating the url
    await this.getCode();
    let resultsNews:any;
      //ensure code has been retrieved prior to creating the url
      if (this.code) {
      this.optionsNews.url = this.optionsNews.url.concat(this.code);
      resultsNews = await this.mhs.get(this.optionsNews);
      this.newsInfo = resultsNews.data.results;
    }
    //if no news is found, set hasNews to true using the noNews method
    if(resultsNews.data.totalResults==0){
      this.noNews();
    } else { 
      this.newsInfo = resultsNews.data.results;
    }
  }

  ngOnInit() {
    this.getNews();
  }

}
