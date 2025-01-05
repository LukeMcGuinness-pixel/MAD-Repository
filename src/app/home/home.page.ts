import { Component } from '@angular/core';
import { IonButton, IonItem, IonItemDivider, IonInput, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [RouterLink, FormsModule, IonButton, IonItem, IonItemDivider, IonInput, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  //constructor imports DataService for Ionic storage retrieval
  //constructor imports Router to navigate to the countries page
  constructor(private ds:DataService, private router:Router) {}

  //use the DataService method set to set the value of keyword in ionic storage and open the countries page
  keyword:string="";
  async openCountries(){
    await this.ds.set("keyword",this.keyword)
    this.router.navigate(['/countries']);
  }

  ngOnInit(){

  }
}
