import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interface/cliente';
import{ NavController, LoadingController,ToastController} from'@ionic/angular';
import {ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  private clienteId:string;
  private  cliente :Cliente ={};
  private carregar:any;
  private clienteSubscription: Subscription;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private LoadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
  this.clienteId = this.activatedRoute.snapshot.params['id'];
  if(this.clienteId){ this.carregarCliente();}
   }

  ngOnInit() {
  }


  carregarCliente()
  {
  this.clienteSubscription = this.clienteService.mostraCliente(this.clienteId).
  subscribe(data => {this.cliente = data});
  }



  async salvarCliente(){
if(this.clienteId){
  try{
 await this.clienteService.editarCliente(this.clienteId, this.cliente);
  this.navCtrl.navigateRoot('/home');
  }catch(erro){
    this.presentToast('Erro ao salvar');

   }
  }
   else{
     this.cliente.dataCadastro = new Date().getTime();

     try{
  await this.clienteService.addCliente(this.cliente);
  this.navCtrl.navigateRoot('/home');
     }catch(erro){
      this.presentToast('Erro ao salvar');
     }
   }

 }



 async presentToast(mensagem:string){
   const toast = await this.toastCtrl.create({
     message:mensagem,duration:2000
   });
   toast.present();
 }
}