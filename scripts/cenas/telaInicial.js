class TelaInicial {
  constructor() {}

  setup() {}

  draw() {
    this._imagemFundo();
    this._texto();
    this._botao();
  }

  _imagemFundo() {
    image(imagemTelaInicial, 0, 0, width, height);
  }

  _texto() {
    textFont(fontTelaInicial);
    textAlign(CENTER);
    textSize(50);
    text("As aventuras da", width / 2, height / 2 - 50);
    textSize(100);
    text("Hipstar", width / 2, height / 2 + 50);

    textSize(20);
    textFont("comic sans");
    text(`Para pular use a tecla ↑ `, width / 2, height / 2 + 150);
    fill(12);
  }

  _botao() {
    botaoGerenciador.y = (height / 7) * 5.5;
    botaoGerenciador.draw();
  }
}
