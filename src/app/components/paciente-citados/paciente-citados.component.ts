import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-citados',
  templateUrl: './paciente-citados.component.html',
  styleUrls: ['./paciente-citados.component.css'],
})
export class PacienteCitadosComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router) {}
  ngOnInit(): void {}

  acto() {
    console.log('adad');
    this.router.navigate['actomedico'];
  }
}
