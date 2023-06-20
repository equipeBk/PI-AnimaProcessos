function selecionarFila(fila, radio) {
    var filaSelecionada = fila;
    var radioValue = radio;

    radioValue = document.querySelector('input[name="' + filaSelecionada + '"]');
    
    
    if (radioValue.checked) {
        console.log("RR selecionado");
      return 1; // 

    } else {
        console.log("fifo selecionado");
      return 0; // 
    }
  }

  function quantFila() {
    var radioQuant = document.querySelector('input[name="bloco1-filas"]');
    
    if (radioQuant.checked) {
        console.log("2 filas");
      return 1; // 

    } else {
        console.log("3 filas");
      return 0; // 
    }
  }

  