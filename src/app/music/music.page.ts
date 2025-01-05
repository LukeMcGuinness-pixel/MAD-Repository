import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCard, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCard, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MusicPage implements OnInit {

  //constructor imports DataService for Ionic storage retrieval
  //constructor imports MyHttpService for using the Last.fm API url
  constructor(private ds:DataService, private mhs:MyHttpService) { }

  //getCountryName retrieves the country name from ionic storage
  //stored with the key "commonName" and assigned to the commonName variable
  commonName:string="";
  async getCountryName(){
    this.commonName = await this.ds.get("commonName");
  }

  //getMusic() constructs url by appending country name and API key
  //sends a HTTP GET request to retrieve music data in JSON format
  //this is assigned to resultsMusic, and the track list is assigned to musicInfo
  resultsMusic:any;
  musicInfo:any;
  APIKey:string="9f2f6d295a04e12fc2ac01d56fe7f04a";
  optionsMusic:HttpOptions={
    url: "https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country="
  }

  async getMusic(){
    //ensure the variable associated with getCountryName has been set
    await this.getCountryName();

    this.optionsMusic.url = this.optionsMusic.url.concat(this.commonName);
    this.optionsMusic.url = this.optionsMusic.url.concat("&api_key="+this.APIKey+"&format=json");

    this.resultsMusic = await this.mhs.get(this.optionsMusic);
    this.musicInfo = this.resultsMusic.data.tracks.track;
    //the track rank started at 0, but this was increased by 1 to start the ranking at 1
    //this was done using the unary plus operator
  }

  ngOnInit() {
    this.getMusic();
  }

}
