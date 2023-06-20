class Node {
  constructor(elemento) {
    this.elemento = elemento;
    this.proximo = null;
  }
}

export class Fila {
  constructor() {
    this.primeiro = null;
    this.ultimo = null;
    this.tamanho = 0;
  }

  add(elemento) {
    const novoNo = new Node(elemento);

    if (this.tamanho === 0) {
      this.primeiro = novoNo;
    } else {
      this.ultimo.proximo = novoNo;
    }

    this.ultimo = novoNo;
    this.tamanho++;
    console.log("Item adicionado!");
  }

  pop() {
    if (this.tamanho === 0) {
      console.log("Erro: fila vazia");
      return false;
    }

    const elementoRemovido = this.primeiro.elemento;
    this.primeiro = this.primeiro.proximo;

    if (this.tamanho === 1) {
      this.ultimo = null;
    }

    this.tamanho--;
    console.log("Item removido");
    return elementoRemovido;
  }

  size() {
    return this.tamanho;
  }

  first() {
    if (this.tamanho > 0) {
      return this.primeiro.elemento;
    } else {
      return -1;
    }
  }

  last() {
    if (this.tamanho > 0) {
      return this.ultimo.elemento;
    } else {
      return -1;
    }
  }

  find(elemento) {
    let atual = this.primeiro;
    let indice = 0;

    while (atual !== null) {
      if (atual.elemento === elemento) {
        return indice;
      }
      atual = atual.proximo;
      indice++;
    }

    return -1;
  }

  isEmpty() {
    return this.tamanho === 0;
  }

  clear() {
    this.primeiro = null;
    this.ultimo = null;
    this.tamanho = 0;
  }
}
