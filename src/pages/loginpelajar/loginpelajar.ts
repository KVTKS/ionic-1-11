import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import {HomepelajarPage} from "../homepelajar/homepelajar";
import { FrontPage } from "../front/front";



@Component({
  selector: 'page-loginpelajar',
  templateUrl: 'loginpelajar.html'
})
export class LoginpelajarPage {

  responseData:any;
  userPelajar = { ic : "", no_ndp: "",};

  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,public authService: AuthserviceProvider) {
    this.menu.swipeEnable(false);
  }
 
 
  // login and go to home page
  loginpelajar() {
    if (this.userPelajar.ic && this.userPelajar.no_ndp) {
      console.log(this.userPelajar);
      this.authService.postData(this.userPelajar, "login").then(
        result => {
          this.responseData = result;
          console.log(this.responseData);
          if (this.responseData.code === 200) {
            localStorage.setItem("userPelajar", JSON.stringify(this.responseData.data));
            console.log(this.responseData.data);
            this.nav.setRoot(HomepelajarPage);
          } else {
            let alert = this.forgotCtrl.create({
              title: "Login failed!",
              subTitle: "Wrong credentials",
              buttons: ["OK"]
            });
            alert.present();
          }
        },
        err => {
          //Connection failed message
        }
      );
    } else {
      let alert = this.forgotCtrl.create({
        title: "Login failed!",
        subTitle: "Wrong credentials",
        buttons: ["OK"]
      });
      alert.present();
    }
  }

  back() {
    this.nav.push(FrontPage);
  }
}

