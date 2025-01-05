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

  constructor(private ds:DataService, private mhs:MyHttpService) { }

  commonName:string="";
  async getCountryName(){
    this.commonName = await this.ds.get("commonName");
    //console.log(this.commonName)
  }

  resultsMusic:any;
  musicInfo:any;
  musicArtist:string="";
  musicSong:string="";
  musicRank:any;
  musicListeners:any;
  APIKey:string="9f2f6d295a04e12fc2ac01d56fe7f04a";
  optionsMusic:HttpOptions={
    url: "https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country="
  }

  async getMusic(){
    await this.getCountryName();

    this.optionsMusic.url = this.optionsMusic.url.concat(this.commonName);
    this.optionsMusic.url = this.optionsMusic.url.concat("&api_key="+this.APIKey+"&format=json");

    console.log(JSON.stringify(this.optionsMusic.url));

    this.resultsMusic = await this.mhs.get(this.optionsMusic);
    this.musicInfo = this.resultsMusic.data.tracks.track;
    //console.log(this.musicInfo)
  }

  ngOnInit() {
    this.getMusic();
  }

}
