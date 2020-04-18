import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BudgetService } from './services/budget.service';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MockBudgetService } from './services/mocks/budget.service.mock';
import { environment } from 'src/environments/environment';
import { MomentDatePipe } from './pipes/moment-date.pipe';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { PastTrendsChartComponent } from './components/past-trends-chart/past-trends-chart.component';
import { CurrentMonthChartComponent } from './components/current-month-chart/current-month-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    RecentTransactionsComponent,
    PastTrendsChartComponent,
    CurrentMonthChartComponent,
    MomentDatePipe,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: BudgetService,
      deps: [],
      useFactory: () => {
        if (environment.mock) {
          return new MockBudgetService();
        } else {
          return new BudgetService();
        }
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
