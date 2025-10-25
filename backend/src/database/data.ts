export interface User {
    nome: string;
    email: string;
    senha: string;
  }
  
  export interface Lista {
    id: string;
    nome: string;
    tarefas: string[];
    userEmail: string;
    descricao: string;
  }
  
  export const users: User[] = [];
  export const listas: Lista[] = [];