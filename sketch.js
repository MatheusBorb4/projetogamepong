//Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro =20;
let raio = diametro/2;

//Movimento da Bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//Variáves da Raquete1
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

//Variáves da Raquete2
let xRaquete2 = 585;
let yRaquete2 = 150;
let larguraRaquete2 = 10;
let alturaRaquete2 = 90;

//Movimento Raquete 2
let velocidadeyRaquete2;

//Variaveis para colisão das raquetes
let colidiu = false;

//Variáveis para marcação de pontuação
let meusPontos = 0;
let pontosOponente = 0;

//Sons do Jogo
let raquetada;
let ponto;
let trilha;

// Carrega as musicas
function preload()
{
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() 
{
  createCanvas(600, 400);
  trilha.loop();
}

function draw() 
{
  background(0);
  desenhaBolinha();
  movimentoBolinha();
  verificaBordas();
  desenhaRaquete(xRaquete, yRaquete);
  desenhaRaquete(xRaquete2, yRaquete2);
  movimentoRaquete1();
  //verificaColisaoRaquete();
  colisaoBiblioteca(xRaquete,yRaquete);
  //movimentaRaquete2();
  movimentaRaqueteJg2();
  colisaoBiblioteca(xRaquete2,yRaquete2);
  mostraPlacar();
  marcaPontos();
  verificaBolinhaBugada();
}

// Desenha a bolinha
function desenhaBolinha ()
{
  circle(xBolinha,yBolinha,diametro)
}

// Gera o movimento da bolinha
function movimentoBolinha()
{
  xBolinha += velocidadexBolinha
  yBolinha += velocidadeyBolinha
}

// Verifica a colisao da bolinha nas bordas
function verificaBordas ()
{
  if (xBolinha+raio > width || xBolinha-raio < 0)
  {
    velocidadexBolinha *= -1;
  }
  if (yBolinha+raio > height || yBolinha-raio < 0)
  {
    velocidadeyBolinha *= -1;
  }
}

// Desenha a Raquete 1 e 2 - Depende do parametro x,y
function desenhaRaquete(x,y)
{
  rect (x, y, larguraRaquete, alturaRaquete)
}

// Gera o movimento da Raquete 1 através do teclado
function movimentoRaquete1()
{
  if (keyIsDown(87))
    {
      yRaquete -= 10;
    }
  if (keyIsDown(83))
    {
      yRaquete += 10;
    }
  
  // Limitar o movimento da Raquete1 para não sair da tela
  yRaquete = constrain(yRaquete, 5, 305)
}

// Verifica a colisão da bolinha com a Raquete - metodo1
function verificaColisaoRaquete()
{
  if (xBolinha-raio < xRaquete+larguraRaquete && yBolinha-raio < yRaquete+alturaRaquete && yBolinha+raio > yRaquete)
    {
      velocidadexBolinha *= -1
    }
}

// Pega da bibliotéca GitHub uma função que verifica a colisão das Raquetes 1 e 2 através de parametros x,y
function colisaoBiblioteca (x,y)
{
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, diametro);

  if (colidiu) 
    {
      velocidadexBolinha *= -1
      raquetada.play();
    }
}

// Gera o movimento da Raquete 2 com base na posição da bolinha
function movimentaRaquete2()
{
  velocidadeyRaquete2 = yBolinha - yRaquete2 - alturaRaquete2 /2 - 40;
  yRaquete2 += velocidadeyRaquete2;
  
  // Limitar o movimento da Raquete1 para não sair da tela
  yRaquete2 = constrain(yRaquete2, 5, 305)
}

// Cria o placar e faz a edição do mesmo
function mostraPlacar()
{
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255,140,0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosOponente, 450, 26);
}

// Realiza a marcação dos pontos
function marcaPontos()
{
  if (xBolinha > 590)
    {
      meusPontos +=1;
      ponto.play();
    }
  
  if (xBolinha < 10)
    {
      pontosOponente +=1;
      ponto.play();
    }
}

function movimentaRaqueteJg2()
{
  if (keyIsDown(UP_ARROW))
    {
      yRaquete2 += -10;
    }
  if (keyIsDown(DOWN_ARROW))
    {
      yRaquete2 += 10;
    }
  
   // Limitar o movimento da Raquete1 para não sair da tela
  yRaquete2 = constrain(yRaquete2, 5, 305)
}

function verificaBolinhaBugada()
{
  if (xBolinha-raio < 0 || xBolinha+raio > 600)
    {
      xBolinha = 300;
      yBolinha = 200;
    }
}