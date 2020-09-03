import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/hereos.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';;

@Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html',
    styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

    heroe = new HeroeModel();

    constructor(private heroesServices: HeroesService) { }

    ngOnInit(): void {
    }

    guardar(form: NgForm) {
        if( form.invalid )
            return;

        Swal.fire({
            title: 'Espere',
            text: 'Guardando información',
            allowOutsideClick: false,
            icon: 'info'
        });
        Swal.showLoading();
        
        let peticion: Observable<any>;

        if(this.heroe.id) 
            peticion = this.heroesServices.actualizarHeroe(this.heroe);
        else
            peticion = this.heroesServices.crearHeroe(this.heroe);
              
        peticion.subscribe(resp => {
            Swal.fire({
                title: this.heroe.nombre,
                text: 'Se actulizó correctamente',
                allowOutsideClick: false,
                icon: 'success'
            });

            console.log(resp);
        })
    }

    
}
