import { Component } from '@angular/core';
import{ LoadingController,ToastController} from '@ionic/angular';
import { ClienteService  } from 'src/app/services/cliente.service';
import{ Cliente } from 'src/app/interface/cliente';
import {Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public clientes = new  Array<Cliente>();
  private clienteSubscripition: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private clienteService: ClienteService,
    private toastCtrl: ToastController
  ) {

   this.clienteSubscripition = this.clienteService.listaCliente().subscribe(data =>{this.clientes = data});
  }
  async deleteCliente(id:string){
    try{
      await this.clienteService.excluirCliente(id);
    }catch(erro){
      this.presentToast("Erro ao excluir");

    }
  }

  



  async presentToast(mensagem:string){
    const toast = await this.toastCtrl.create({
      message:mensagem,
      duration:3000
    });

    toast.present();
  }







}