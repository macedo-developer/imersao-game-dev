class TelaInicial {
  constructor() {}

  setup() {}

  draw() {
    this._imagemFundo();
    this._texto();
    this._botao();
    this._redes();
  }

  _imagemFundo() {
    image(imagemTelaInicial, 0, 0, width, height);
  }

  _texto() {
    fill(10);
    textFont(fontTelaInicial);
    textAlign(CENTER);
    textSize(50);
    text("The Aventures of", width / 2, height / 2 - 50);
    textSize(150);
    text("Hipstar", width / 2, height / 2 + 80);

    textSize(20);
    fill("#fff");
    text(`To jump use the key arrow up`, width / 2, height / 2 + 240);
    fill(12);
  }

  _botao() {
    botaoGerenciador.y = (height / 7) * 5;
    botaoGerenciador.draw();
  }

  _redes() {
    linkLinkedin.draw();
  }
}
