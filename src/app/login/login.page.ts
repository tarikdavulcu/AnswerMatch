import { Component, OnInit,NgZone } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { Storage } from '@ionic/storage';
import { UserCrudService } from '../services/user-crud.service';
import { FormGroup,FormBuilder  } from '@angular/forms';

export class cardReader {
  id: number;
  login: string;
  eventDate: string;
  avatar_url: string;
  html_url: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  email: string = "";
  city: string = "";
  password: string = "";
  userForm: FormGroup;
  City: any = [];
  constructor(public navCtrl: NavController,private router: Router,public toastController: ToastController,public menu: AppComponent,private storage: Storage,private userCrudService: UserCrudService,private zone: NgZone  ) {
    this.storage.create();
   }

  ngOnInit() {
    console.log("login nginit calıstı");
    
  }
 
 
  login(): void{
    console.log(this.email + " " + this.password);
    let navigationExtras: NavigationExtras = {
      state: {
        email: this.email,
        city:this.city
      }
    };
    // this.navCtrl.navigateRoot('/home');
    if(this.email!="a" && this.password!="a")
    {

    
      this.storage.set('email', this.email);
      this.storage.set('city', this.city);

  
  
      this.userCrudService.getcitlist(this.email,this.password).subscribe((response) => {
        

        this.City= response;
        console.log("Sehir Adı: "+this.City[0].adi);
        return this.City[0].adi;
      })



      this.menu.sideMenu();
      this.navCtrl.navigateRoot(['home'], navigationExtras);
    }
    else this.showToast("Kullanıcı adı yada şifre hatalı");
  
    
    
  }
  register(){
    this.navCtrl.navigateRoot('/register');
  }

  async showToast(metin:string) {
    const toast = await this.toastController.create({
      message: metin,
      duration: 2000
    });
    toast.present();
  }
  
}
