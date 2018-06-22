import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AcceuilComponent } from "./acceuil/acceuil.component";
import { EntrepriseComponent } from "./entreprises/entreprises.component";

const routes: Routes = [
  {
    path: 'portal-web',
    children: [
      { path: 'acceuil', component: AcceuilComponent },
      { path: 'entreprises', component: EntrepriseComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalWebRoutingModule { }
