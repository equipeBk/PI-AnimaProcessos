class Node {
  constructor(elemento) {
    this.elemento = elemento;
    this.proximo = null;
  }
}

class Fila {
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Processo {
  constructor(id, tempoExecucao) {
    this.id = id;
    this.tempoExecucao = tempoExecucao;
  }
}

class RoundRobin {
  constructor(quantum) {
    this.fila = new Fila();
    this.quantum = 2;
  }

  adicionarProcesso(id, tempoExecucao) {
    const processo = new Processo(id, tempoExecucao);
    this.fila.add(processo);
  }

  async executar() {
    const processosElement = document.getElementById("processos");

    while (!this.fila.isEmpty()) {
      const processo = this.fila.pop();
      const li = document.createElement("li");
      li.textContent = `Round Robin Executando processo ${processo.id}`;
      processosElement.appendChild(li);
      await sleep(2000);

      if (processo.tempoExecucao > this.quantum) {
        processo.tempoExecucao -= this.quantum;
        const liRestante = document.createElement("li");
        liRestante.textContent = `Round Robin Processo ${processo.id} parcialmente executado. Tempo restante: ${processo.tempoExecucao}`;
        processosElement.appendChild(liRestante);
        this.fila.add(processo);
      } else {
        const liCompleto = document.createElement("li");
        liCompleto.textContent = `Round Robin Processo ${processo.id} completamente executado.`;
        processosElement.appendChild(liCompleto);
      }
    }
  }
}

function main() {
  // Teste do algoritmo Round Robin
  console.log("Teste do algoritmo Round Robin:");
  const roundRobin = new RoundRobin(3);
  roundRobin.adicionarProcesso(1, 5);
  roundRobin.adicionarProcesso(2, 7);
  roundRobin.adicionarProcesso(3, 4);
  roundRobin.executar();
}

// Chamando a função main
main();