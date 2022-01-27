
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
// import { HttpClient } from  '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string = "";
  city: string = "";
  baseUrl:string = "https://api.github.com";
  constructor(public navCtrl: NavController,private route: ActivatedRoute, private router: Router,public toastController: ToastController,public actionSheetController: ActionSheetController,public alertController: AlertController,private fcm: FCM) {

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    });
    


    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.email = this.router.getCurrentNavigation().extras.state.email;
        this.city = this.router.getCurrentNavigation().extras.state.city;
        console.log("öbür sayfada home: "+this.email)
      }
      


// var emaill=this.httpClient

// .get(this.baseUrl + '/users/' + "tarikdavulcu")
// .pipe(response  => {
// console.log(response);
// emaill
//     .subscribe(data => {
//       console.log('my data: ', data);
//     })
  
// return  response;

// })


    //    this.storage.get('email').then((val) => {
    //   console.log('Your name is: ', val);
    //   this.email=val;
    // });
    });
  }

   async presentAlertConfirm(): Promise<boolean>  {
    let resolveFunction: (confirm: boolean) => void;
     let ret = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    let alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Uyarı',
      message: 'Çıkmak İstedigine <strong>Emin Misin</strong> !',
      buttons: [
        {
          text: 'Hayır',
          role: 'cancel',
          cssClass: 'secondary',
          
          handler: (blah) => {
            console.log('Confirm Cancel');
            resolveFunction(false);
          }
        }, {
          text: 'Evet',
          
          handler: () => {
            console.log('Confirm Okay');
            resolveFunction(true);
          }
        }
      ]
    });

    await alert.present();
    console.log("ret sonuıcu:" + ret);
    return ret;
    
  }
  
  async presentActionSheet() {
    
    const actionSheet = await this.actionSheetController.create({
      header: 'İşlem Seçiniz',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        
        
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        
        handler: () => {
          console.log('Share clicked');
        }
      },  {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          
        }
      },
      {
        text: 'Çıkış',
        role: 'cikis',
        icon: 'log-out',
        
        
        handler: async () => {
          console.log('cıkış clicked');
          
          
        
           
          // if(await this.presentAlertConfirm() == true) {
          //   this.logout();
          // }
          
          
        }
      },
    ]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('role and data', role, data);
    if(role=="cikis"){
      if(await this.presentAlertConfirm() == true)
      {
      this.logout();
      }
    }
  }

  
  logout(){
    this.showToast("Çıkış Yapıldı");
    this.navCtrl.navigateRoot("/login");
  }
  async showToast(metin:string) {
    const toast = await this.toastController.create({
      message: metin,
      duration: 2000
    });
    toast.present();
  }
  
}
