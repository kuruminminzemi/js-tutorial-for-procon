//ゲームエリアの管理
const MainCanvas = document.getElementById("MainCanvas");
const MainContext = MainCanvas.getContext("2d");
const GameArea = new CanvasManager(new Vector2(1280, 720), MainCanvas);
const keyInput = new keyInputManager();
GameArea.refresh();

//回り続ける小山高専
let components = [];
for (let i = 0; i < 9; i++) {
  components[i] = new CanvasComponents({
    ctx: MainContext,
    img: "./assets/Oyama_logo.png",
    position: new Vector2(GameArea.x / 2 + 100 * i, GameArea.y / 4),
  });
  components[i].update = function () {
    this.rotate += 10;
    if (keyInput.IsPressed("ArrowLeft")){
      this.position.x -= 10;
    }
    if (keyInput.IsPressed("ArrowRight")){
      this.position.x += 10;
    }
    if (keyInput.IsPressed("ArrowUp")){
      this.position.y -= 10;
    }
    if (keyInput.IsPressed("ArrowDown")){
      this.position.y += 10;
    }
  };
}

function update() {
//ゲームループの定義・開始 
}
const GameLoop = new GameLoopManager(() => {
  update();
  MainContext.clearRect(0, 0, GameArea.x, GameArea.y);


  for (let i = 0; i < components.length; i++){
  components[i].render();
  components[i].update();
  }
}, 30);
GameLoop.start();
