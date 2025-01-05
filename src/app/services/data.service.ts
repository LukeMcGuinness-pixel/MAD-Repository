import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage:Storage) { 
    this.init();
  }

  //create the ionic storage
  async init(){
    await this.storage.create();
  }

  //set the ionic storage using a key
  async set(key:string, value:any){
    await this.storage.set(key, value);
  }

  //get the value from storage from an associated key
  async get(key:string){
    return await this.storage.get(key);
  }
}
