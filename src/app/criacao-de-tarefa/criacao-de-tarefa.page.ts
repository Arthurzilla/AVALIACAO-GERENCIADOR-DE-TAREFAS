import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-criacao-de-tarefa',
  templateUrl: './criacao-de-tarefa.page.html',
  styleUrls: ['./criacao-de-tarefa.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CriacaoDeTarefaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
