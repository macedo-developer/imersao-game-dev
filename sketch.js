function setup() {
  createCanvas(windowWidth, windowHeight);

  jogo = new Jogo();
  jogo.setup();

  telaInicial = new TelaInicial();

  frameRate(40);
  cenas = {
    jogo,
    telaInicial,
  };

  botaoGerenciador = new BotaoGerenciador("Iniciar", width / 2, height / 2);

  somDoJogo.loop();
  somDoJogo.setVolume(0.1);
}

function keyPressed() {
  jogo.keyPress(key);
}

function draw() {
  cenas[cenaAtual].draw();
}
