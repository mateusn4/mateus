import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//imports do Firebase
import { AngularFireModule } from '@angular/fire';//indica a essência do firebase
import { AngularFireAuthModule } from '@angular/fire/auth';
// responsável pela autenticação
import { AngularFirestoreModule } from '@angular/fire/firestore';
// responsável pelos dados gravados no firebase
import { environment } from  'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  AngularFireAuthModule,
  AngularFireModule.initializeApp(environment.firebase_Config ),
  AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
