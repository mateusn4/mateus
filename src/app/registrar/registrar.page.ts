import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { ToastController,
  LoadingController,
  NavController
 } from '@ionic/angular';
 import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  usuario = {} as Login;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }
    async registrar(usuario:Login){
      console.log(usuario);
      if(this.formValidation()){
        let loader = await this.loadingCtrl.create({
          message:"Por Favor Espere.."
        });
        loader.present();

        try{
          await this.afAuth.
          createUserWithEmailAndPassword(usuario.email,usuario.senha).
          then(data => {
            console.log(data);
            this.navCtrl.navigateRoot("home");
          });
        }catch(e){
          this.showToast(e);
        }
        loader.dismiss();
      }
    }

    formValidation(){
      if(!this.usuario.email){
        this.showToast("Digite seu e-mail");
        return false;
      }
      if(!this.usuario.senha){
        this.showToast("Digite a senha");
        return false;
      }
      return true;
    }

    showToast(mensagem:string){
      this.toastCtrl.
      create({
        message: mensagem,
        duration: 5000
      }).then(toastData => toastData.present());
    }

}
