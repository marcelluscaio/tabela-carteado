function Pessoa (nome){
   this.nome = nome;
   this.vitorias = 0;
   this.empates = 0;
   this.derrotas = 0;
   this.pontos = 0;
   this.calculaPontos = function(){this.pontos = this.vitorias*2 + this.empates - this.derrotas*2};
}

let mae = new Pessoa ("Mãe");
let tia = new Pessoa ("Tia");
let dinda = new Pessoa ("Dinda");
let vo = new Pessoa ("Vó");
const botaoNovaPartida = document.querySelector("#nova-partida");
botaoNovaPartida.addEventListener("click", novaPartida);
const botaoReiniciarPartida = document.querySelector("#reiniciar-partida");
botaoReiniciarPartida.addEventListener("click", reiniciarPartida);
const botaoEncerrarPartida = document.querySelector("#encerrar-partida");
botaoEncerrarPartida.addEventListener("click", encerrarPartida);
const botaoInserirJogadores = document.querySelector("#inserir-jogadores");
botaoInserirJogadores.addEventListener("click", inserirJogadores);
const inputNomeJogador = document.querySelector("#nome-jogador");
inputNomeJogador.addEventListener("keypress", acionaBotao);
const botaoComecarJogo = document.querySelector("#comecar-jogo");
botaoComecarJogo.addEventListener("click", comecarJogo);
let jogadores = [];
jogadores.push(mae, tia, dinda, vo);
let tabela = document.querySelector("#tabelaJogadores");
let erro = false;
const divErro = document.querySelector(".mensagem-erro");
const divVitoria = document.querySelector(".mensagem-vitoria");

exibeTabela(jogadores);

function exibeTabela(listaJogadores){
   ordenaJogadores(listaJogadores);   
   tabela.innerHTML ="";
   for(i=0;i<listaJogadores.length;i++){
      tabela.innerHTML += `<tr><td>#${[i+1]}</td><td>${listaJogadores[i].nome}</td><td>${listaJogadores[i].vitorias}</td><td>${listaJogadores[i].empates}</td><td>${listaJogadores[i].derrotas}</td><td>${listaJogadores[i].pontos}</td><td><button class="botao-tabela" onClick="adicionarVitoria(${i})">Vitória</button></td><td><button class="botao-tabela" onClick="adicionarEmpate(${i})">Empate</button></td></tr>`      
   }
   esconde(divErro);
   esconde(divVitoria);
}

function ordenaJogadores(listaJogadores){
   listaJogadores.sort(function(a,b){return b.pontos - a.pontos});   
};

function adicionarVitoria(i){
   jogadores[i].vitorias++;
   jogadores[i].calculaPontos();
   for(jogador of jogadores){
      if(jogador ===jogadores[i]){
         continue;
      }
      jogador.derrotas++;
      jogador.calculaPontos();
   }
   exibeTabela(jogadores);
}

function adicionarEmpate(i){
   for(jogador of jogadores){
      jogador.empates++;
      jogador.calculaPontos();
   }   
   exibeTabela(jogadores);
}

function novaPartida(e){
   e.preventDefault();
   reiniciarPartida(e);
   tabela.innerHTML =`<tr><td></td><td></td><td></td><td></td><td></td><td></td><td><button disabled>Vitória</button></td><td><button disabled>Empate</button></td></tr>` ;
   jogadores=[];
   desabilita(botaoEncerrarPartida);
   desabilita(botaoComecarJogo);
   desabilita(botaoReiniciarPartida);
   habilita(botaoInserirJogadores);
   habilita(inputNomeJogador);   
   esconde(divVitoria); 
}

function esconde(elemento){
   elemento.classList.add("escondido");   
}

function mostra(elemento){
   elemento.classList.remove("escondido"); 
}

function habilita(elemento){
   elemento.disabled=false;
}

function desabilita(elemento){
   elemento.disabled=true;
}

function acionaBotao(e){
   if(e.key==="Enter"){
      botaoInserirJogadores.click();   
   }
};

function inserirJogadores(e){
   e.preventDefault();
   let nomeJogador = inputNomeJogador.value;   
   validaJogador(nomeJogador);
   if(!erro){
   inputNomeJogador.value = "";
   divErro.innerHTML = "";
   esconde(divErro);
   criaJogador(nomeJogador);
   exibeTabela(jogadores);
   habilita(botaoComecarJogo);
   }
   erro = false;
}

function criaJogador(nomeJogador){
   nomeJogador = new Pessoa (`${nomeJogador}`);
   jogadores.push(nomeJogador);
}

function validaJogador(nomeJogador){
   let tipoErro = "";

   for(jogador of jogadores){            
      nomeJogador === jogador.nome ? tipoErro = "nomeRepetido" : tipoErro=tipoErro;      
   }
   
   nomeJogador==="" ? tipoErro="nomeVazio" : tipoErro=tipoErro;

   if(tipoErro !==""){
      erro = true;
      mostra(divErro);
      switch(tipoErro){
         case "nomeRepetido":
         divErro.innerHTML = `<p>${nomeJogador} já está jogando</p>`;
            break;
         case "nomeVazio":
         divErro.innerHTML = `<p>Opa, acho que voce esqueceu de inserir o nome</p>`;

            break;
      }   
   }    
}

function comecarJogo(e){
   e.preventDefault();
   if(jogadores.length!==1){
      desabilita(botaoComecarJogo);
      desabilita(botaoInserirJogadores);
      desabilita(inputNomeJogador); 
      habilita(botaoEncerrarPartida);
      habilita(botaoReiniciarPartida);      
      esconde(divErro);
   } else{
      mostra(divErro);
      divErro.innerHTML = `<p>Parece que ${jogadores[0].nome} não tem adversários. Adicione mais jogadores</p>`;
   }   
}

function reiniciarPartida(e){
   e.preventDefault();
   for(i=0;i<jogadores.length;i++){
      jogadores[i].vitorias =0;
      jogadores[i].empates =0;
      jogadores[i].derrotas =0;
      jogadores[i].calculaPontos();
   }
   exibeTabela(jogadores);
   habilita(botaoEncerrarPartida);
   desabilita(botaoInserirJogadores);
   desabilita(botaoComecarJogo);
}

function encerrarPartida(e){
   e.preventDefault();
   if(jogadores[0].vitorias!==0 || jogadores[0].empates!==0){
      let botaoTabela = document.querySelectorAll(".botao-tabela");
      for(botao in botaoTabela){
         desabilita(botaoTabela[botao]);
      }
      desabilita(botaoEncerrarPartida);
      mostra(divVitoria);
      let mensagemVitoria = jogadores[0].pontos == jogadores[1].pontos ? `<p>Deu empate! Querem jogar outra?</p>` : `<p>${jogadores[0].nome} venceu! Querem jogar outra?</p>`;
      divVitoria.innerHTML = mensagemVitoria;   
   } else{
      mostra(divErro);
      divErro.innerHTML = `<p>Acho que esse jogo ainda nem começou. Adicione vitórias ou empates</p>`;
   }
}

