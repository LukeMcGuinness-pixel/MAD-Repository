import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonItemDivider, IonButton, IonInput } from '@ionic/angular/standalone';
//import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: true,
  imports: [IonInput, IonButton, IonItemDivider, IonRadioGroup, IonRadio, IonList, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  constructor(private ds:DataService) { }

  async ngOnInit() {
    const storedOption = await this.ds.get('option');
    this.selectedOption = storedOption || "metric";
  }

  selectedOption:string="metric";
  async changeOption(){
    await this.ds.set("option", this.selectedOption)
  }

}
