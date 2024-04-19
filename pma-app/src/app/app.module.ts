import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { ProductsModule } from "./products/products.module";
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { RouterModule, Routes } from "@angular/router";
// import { SecondComponent } from "./second/second.component";


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent }
]

@NgModule({
  // to register components, pipes, directives
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent, DashBoardComponent],
  // to register services
  providers: [],
  // to register other modules only
  imports: [BrowserModule, ProductsModule, RouterModule.forRoot(appRoutes)],
  bootstrap: [AppComponent],

})
export class AppModule {

}