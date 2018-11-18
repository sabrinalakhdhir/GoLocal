import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ActivityPage } from '../pages/activity/activity';
import { ProfilePage } from '../pages/profile/profile';
import { CreateAccountPage } from '../pages/createAccount/createAccount';
import { LoginPage } from '../pages/login/login';
import { PaymentPage } from '../pages/payment/payment'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    ProfilePage,
    ActivityPage,
    CreateAccountPage,
    LoginPage,
    PaymentPage 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    ProfilePage,
    ActivityPage,
    CreateAccountPage,
    LoginPage,
    PaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
