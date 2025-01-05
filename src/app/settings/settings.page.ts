import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: true,
  imports: [IonRadioGroup, IonRadio, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  //constructor imports DataService for Ionic storage retrieval
  constructor(private ds:DataService) { }

  async ngOnInit() {
    const storedOption = await this.ds.get('option');
    this.selectedOption = storedOption || "metric";
  }

  //the default value of the key option is set to metric
  selectedOption:string="metric";
  //changeOption sets the value of option to the selected option
  async changeOption(){
    await this.ds.set("option", this.selectedOption)
  }

}
