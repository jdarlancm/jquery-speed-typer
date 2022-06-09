var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCrontometro();
    inicializaMarcadores();
    //Outra forma de chamar onClick
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();

    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });

    $('.tooltip').tooltipster({
        trigger: "custom"
    });
    
});

function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(" ").length;
  $("#tamanho-frase").text(numPalavras);
}

function atualizaTempoInicial(tempo) {
    $("#tempo-digitacao").text(tempo);
    tempoInicial = tempo;
}

function inicializaContadores() {
  campo.on("input",function(){
    var conteudo = campo.val();
    $("#contador-caracteres").text(conteudo.length);
    $("#contador-palavras").text(conteudo.split(/\S+/).length -1);
  });
}

function inicializaMarcadores() {
  campo.on("input",function(){
      var frase = $(".frase").text();
        if(frase.startsWith(campo.val())) {
            campo.removeClass("borda-vermelha")
            campo.addClass("borda-verde");
        } else {
            campo.removeClass("borda-verde");
            campo.addClass("borda-vermelha")
        }

  });
}

function inicializaCrontometro() {

  campo.one("focus",function() {
      var tempoRestante = $("#tempo-digitacao").text();
    $("#botao-reiniciar").attr("disabled",true);
    var cronometroID = setInterval(function() {
      tempoRestante--;
      $("#tempo-digitacao").text(tempoRestante);
      if(tempoRestante == 0) {
          clearInterval(cronometroID);
          finalizaJogo();
      }
    },1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled",true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function reiniciaJogo() {
  campo.attr("disabled",false);
  campo.val("");
  $("#contador-caracteres").text(0);
  $("#contador-palavras").text(0);
  $("#tempo-digitacao").text(tempoInicial);
  inicializaCrontometro();
  campo.toggleClass("campo-desativado");
  campo.removeClass("borda-verde");
  campo.removeClass("borda-vermelha");
}
