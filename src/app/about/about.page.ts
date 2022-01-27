import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(public navCtrl: NavController,private router: Router) { }

  ngOnInit() {
  }
detail(){
  this.router.navigateByUrl('/contact');
}
}
