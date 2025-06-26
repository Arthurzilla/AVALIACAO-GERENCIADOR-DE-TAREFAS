import { Injectable } from '@angular/core';
// Importações necessárias para o Firebase Realtime Database
import { Database, ref, push, onValue, update, remove, DataSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Usaremos map aqui para transformar o snapshot

// -----------------------------------------------------------
// Interface para o seu objeto Tarefa
// É altamente recomendável definir uma interface para ter tipagem forte
// Isso ajuda muito a evitar erros e a ter autocompletar no seu código
// -----------------------------------------------------------
export interface Tarefa {
  id?: string; // O ID é opcional ao criar, mas será a 'chave' gerada pelo Realtime DB
  title: string;
  description: string;
  responsible: string;
  steps: string[]; // Um array de strings para as etapas
  createdAt?: number; // Opcional: timestamp de criação (pode ser útil para ordenar)
  status?: 'pending' | 'completed'; // Opcional: status da tarefa
  // Você pode adicionar mais campos aqui conforme precisar (ex: dueDate, category, etc.)
}

@Injectable({
  providedIn: 'root' // Indica que este serviço é um singleton e pode ser injetado em qualquer lugar
})
export class TarefasService {

  // Referência ao nó principal 'tarefas' no seu Realtime Database
  private tarefasRef;

  constructor(private db: Database) {
    // Inicializa a referência. 'tarefas' será o nome da sua coleção principal no DB.
    this.tarefasRef = ref(this.db, 'tarefas');
  }

  // -----------------------------------------------------------
  // Métodos CRUD (Create, Read, Update, Delete) para Tarefas
  // -----------------------------------------------------------

  /**
   * Adiciona uma nova tarefa ao Realtime Database.
   * @param tarefa Os dados da tarefa a serem salvos (sem o ID, que será gerado).
   * @returns Uma Promise que resolve com a referência para o novo item.
   */
  async addTarefa(tarefa: Tarefa) {
    // Adiciona um timestamp de criação e um status padrão antes de salvar
    const tarefaComMetadata: Tarefa = {
      ...tarefa,
      createdAt: Date.now(), // Adiciona o timestamp atual
      status: 'pending'      // Define um status inicial
    };
    // O método 'push' adiciona um novo nó filho com uma chave única gerada automaticamente
    return push(this.tarefasRef, tarefaComMetadata);
  }

  /**
   * Obtém todas as tarefas do Realtime Database em tempo real.
   * Retorna um Observable que emite a lista de tarefas sempre que houver uma mudança no DB.
   * @returns Um Observable de um array de Tarefas.
   */
  getTarefas(): Observable<Tarefa[]> {
    // onValue é a função do Realtime DB para ouvir eventos de dados
    return new Observable<Tarefa[]>(observer => {
      onValue(this.tarefasRef, (snapshot: DataSnapshot) => {
        const tarefas: Tarefa[] = [];
        // Itera sobre cada 'child' (cada tarefa) no snapshot
        snapshot.forEach(childSnapshot => {
          const tarefaData = childSnapshot.val(); // Obtém os dados do objeto tarefa
          tarefas.push({
            id: childSnapshot.key as string, // O 'key' do child é o ID único da tarefa
            ...tarefaData                 // Espalha os outros dados da tarefa
          });
        });
        observer.next(tarefas); // Emite a lista de tarefas atualizada
      }, (error) => {
        console.error('Erro ao ler tarefas do Realtime Database:', error);
        observer.error(error); // Emite o erro caso ocorra
      });
    });
  }

  /**
   * Atualiza uma tarefa existente no Realtime Database.
   * @param tarefa O objeto Tarefa com o ID e os dados atualizados.
   * @returns Uma Promise que resolve quando a atualização for concluída.
   */
  async updateTarefa(tarefa: Tarefa) {
    if (!tarefa.id) {
      throw new Error('Tarefa deve ter um ID para ser atualizada no Realtime Database.');
    }
    // Cria uma referência específica para o nó da tarefa usando seu ID
    const tarefaDocRef = ref(this.db, `tarefas/${tarefa.id}`);
    // O Realtime Database usa 'update' para mesclar os dados, mas você deve garantir
    // que o ID não seja enviado como parte dos dados internos.
    const { id, ...dataToUpdate } = tarefa; // Remove o 'id' do objeto para a atualização
    return update(tarefaDocRef, dataToUpdate);
  }

  /**
   * Deleta uma tarefa do Realtime Database.
   * @param id O ID da tarefa a ser deletada.
   * @returns Uma Promise que resolve quando a remoção for concluída.
   */
  async deleteTarefa(id: string) {
    // Cria uma referência específica para o nó da tarefa a ser removida
    const tarefaDocRef = ref(this.db, `tarefas/${id}`);
    return remove(tarefaDocRef);
  }
}