import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//Modulos
import { PagesModule } from './pages/pages.module';

//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//rutas
import { APP_ROUTES } from './app.routes';
//import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
