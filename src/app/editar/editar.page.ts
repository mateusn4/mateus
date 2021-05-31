import { Component, OnInit } from '@angular/core';
import { Cliente } from "../interface/cliente";
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import {
LoadingController,
ToastController,
NavController
} from "@ionic/angular";

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  cliente = {} as Cliente;
  id: any;
  constructor(
    private actRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
    ) {
    this.id = this.actRoute.snapshot.paramMap.get("id");
    }

  ngOnInit() {
    this.getPostById(this.id);
  }

  async getPostById(id: string) {
    let loader = await this.loadingCtrl.create({
    message: "Espere por favor..."
    });
    loader.present();
    this.firestore
    .doc("cliente/" + id)
    .valueChanges()
    .subscribe(data => {
    this.cliente.nomeCli = data["nome"];
    this.cliente.email = data["cliente"];
    this.cliente.telCli = data["telefone"];
    this.cliente.dataCadastro = data["dataDeCadastro"];
    loader.dismiss();
    });
    }


    async updateCli(cli:Cliente){
     if(this.validarFormulario){
       let loader = await this.loadingCtrl.create({
         message: "Espere por favor ..."
       });
       loader.present();
       try{
         await this.firestore.doc("clientes/" + this.id).update(cli);
       }
       catch(e){
         this.showToast(e);

       }

       await loader.dismiss();
       this.navCtrl.navigateRoot("home");
     }

    }


    validarFormulario(){
      if(!this.cliente.nomeCli){
        this.showToast("Escreva o nome");
        return true;
      }
      if(!this.cliente.email){
        this.showToast("Escreva o email");
        return true;
      }
      if(!this.cliente.telCli){
        this.showToast("Escreva o telefone");
        return true;
      }
      if(!this.cliente.dataCadastro){
        this.showToast("data");
        return true;
      }
    
    
      return true;
    }

    showToast(mensagem:string){
    this.toastCtrl.create({
      message: mensagem,
      duration: 3000

    }).then(toastData => toastData.present());
    }





}