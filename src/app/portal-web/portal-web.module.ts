import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalWebRoutingModule } from './portal-web-routing.module';
import { AdministrationInModule } from '../administration-in/administration-in.module';
import { NavBarPortalComponent } from './navbar/navbar-portal.component';
import { TabsComponent } from './core/tabs/tabs.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { EntrepriseComponent } from './entreprises/entreprises.component';

@NgModule({
  imports: [
    CommonModule,
    AdministrationInModule,
    PortalWebRoutingModule
  ],
  declarations: [
    AcceuilComponent,
    NavBarPortalComponent,
    TabsComponent,
    EntrepriseComponent
  ]
})
export class PortalWebModule { }
