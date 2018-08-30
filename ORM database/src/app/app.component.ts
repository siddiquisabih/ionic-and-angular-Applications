import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { createConnection } from "ionic-orm";

import { HomePage } from '../pages/home/home';
import Photo from '../modelsOrm/photo';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    this.createDBConnection() 
  }









  
  createDBConnection() {
    createConnection({
      driver: {
        type: "websql",
        host: "localhost",
        port: 3306,
        username: "sabih",
        password: "siddiqui",
        database: "ORM"
      },
      entities: [
        Photo
      ],

      autoSchemaSync: true,
    }).then(connection => {
      console.log('connection successfully stable', connection)

     
    })
      .catch((err) => { console.log(err) })
  }

}

