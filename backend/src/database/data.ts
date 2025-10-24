export interface User {
    nome: string;
    email: string;
    senha: string;
  }
  
  export interface Lista {
    id: number;
    nome: string;
    itens: string[];
    userEmail: string;
  }
  
  export const users: User[] = [];
  export const listas: Lista[] = [];