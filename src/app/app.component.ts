import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate : any;
  email: string = "Hoşgeldin";
  constructor(public navCtrl: NavController,private route: ActivatedRoute, private router: Router,private platform: Platform) {
    
   
    //this.initializeApp();
    
    // this.sideMenu();
    // console.log("side menu calıstı");
  }
  initializeApp() {  
    this.platform.ready().then(() => {  
      console.log("app-com");
      
    });  
  }  
   sideMenu()
  {
    console.log("sideMenu calıstı");
    // this.storage.get('email').then((val) => {
    //   console.log('Your name is: ', val);
    //   this.email=val;
    // });

    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "About",
        url   : "/about",
        icon  : "document"
      },
      {
        title : "Contact",
        url   : "/contact",
        icon  : "person"
      },
      
    ]
  }
}
