// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { NgModuleRef } from "@angular/core";
// import { AppComponent } from './app/app.component';


// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


const platFormObj = platformBrowserDynamic()

platFormObj.bootstrapModule(AppModule)
.then((moduleref: NgModuleRef<AppModule>)=>{
  console.log("I am here")
}).catch(e=>{
  console.log(e)})