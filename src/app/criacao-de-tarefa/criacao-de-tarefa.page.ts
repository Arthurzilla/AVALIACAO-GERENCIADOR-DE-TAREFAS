import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para ngIf, ngFor
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'; // Importe estes módulos e classes

import { IonicModule, ToastController, NavController } from '@ionic/angular'; // IonicModule é essencial

@Component({
  selector: 'app-criacao-de-tarefa',
  templateUrl: './criacao-de-tarefa.page.html',
  styleUrls: ['./criacao-de-tarefa.page.scss'],
  standalone: true, // ESSENCIAL: Indica que é um componente standalone
  imports: [
    IonicModule,       // Módulo do Ionic para os componentes UI
    CommonModule,      // Para diretivas Angular como ngIf, ngFor
    FormsModule,       // Para ngModel (se você usar em algum lugar, embora ReactiveForms seja preferível)
    ReactiveFormsModule // Para FormBuilder, FormGroup, FormArray
  ]
})
export class CriacaoDeTarefaPage implements OnInit {
  tarefaForm!: FormGroup;

  // Se estiver usando o stepper:
  // currentStep: number = 1;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.tarefaForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      responsible: [''],
      steps: this.fb.array([this.fb.control('')])
    });
  }

  get steps(): FormArray {
    return this.tarefaForm.get('steps') as FormArray;
  }

  addStep() {
    this.steps.push(this.fb.control(''));
  }

  removeStep(index: number) {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
    } else {
      this.presentToast('Deve haver pelo menos uma etapa.', 'warning');
    }
  }

  async salvarTarefa() {
    if (this.tarefaForm.valid) {
      const taskData = this.tarefaForm.value;
      console.log('Dados da Tarefa:', taskData);

      this.presentToast('Tarefa salva com sucesso!', 'success');
      this.navCtrl.navigateBack('/home');
    } else {
      this.presentToast('Por favor, preencha todos os campos obrigatórios.', 'danger');
      this.tarefaForm.markAllAsTouched();
    }
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}