import { Component } from '@angular/core';
import { IonIcon, IonButton, IonItem, IonItemDivider, IonInput, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [IonIcon, RouterLink, FormsModule, IonButton, IonItem, IonItemDivider, IonInput, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor(private ds:DataService, private router:Router) {}

  keyword:string="";
  async openCountries(){
    await this.ds.set("keyword",this.keyword)
    this.router.navigate(['/countries']);
  }

  ngOnInit(){

  }
}
