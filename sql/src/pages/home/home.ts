import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
   
  }



  createDB() {
    console.log('execute')
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db) => {
        db.executeSql('create table danceMoves(name VARCHAR(32))', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }


  openDb() {

  }




}
