
import { Injectable } from '@angular/core';  //criar  metodos com objetos e chama em todas as classes da sua aplicação
import { AngularFirestore,    AngularFirestoreCollection }  from  '@angular/fire/firestore';
import { Cliente } from '../interface/cliente';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private  colecaoClientes: AngularFirestoreCollection<Cliente>; // <Produto> é um observal


  constructor(private afs: AngularFirestore) {
    this.colecaoClientes= this.afs.collection<Cliente>('Cliente');

  }



  listaCliente(){
    return  this.colecaoClientes.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();// payload da um carga  atraves do id, ou seja, grava a informação pelo ID
          const id = a.payload.doc.id;//doc é documentação do banco
          return{id,...data};
        });

      })
    ); //pipe trabalha com filtragem
  }


  addCliente(cliente:Cliente){
    return this. colecaoClientes.add(cliente);
  }


  mostraCliente(id:string){
    return this.colecaoClientes.doc<Cliente>(id).valueChanges();
  }


  editarCliente(id:string, cliente:Cliente){
    return this. colecaoClientes.doc<Cliente>(id).update(cliente);
  }


  excluirCliente(id:string){
    return this.colecaoClientes.doc(id).delete();
  }
}