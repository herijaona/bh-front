import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: './entreprises.component.html',
    styleUrls: ['./entreprises.component.scss'],
    selector: 'app-entreprise'
})
export class EntrepriseComponent implements OnInit{
    ngOnInit(): void {
        console.log('ok ok entreprise');
    }

}