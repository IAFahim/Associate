const app = new PIXI.Application({backgroundColor: 0x272b34, resizeTo: window, antialias: true});
document.body.appendChild(app.view);

class CodeViewer extends PIXI.Container{
    constructor(X, Y, Width, Height, Padding) {
        super();
        this.X = X;
        this.Y = Y;
        this.Width = Width;
        this.Height = Height;
        this.Padding = Padding;
        this.Box = new PIXI.Graphics();
        this.Box.interactive = true;
        this.Box.buttonMode = true;
        this.Box.on('pointerdown', function (e) {
            this.x=e.data.global.x-this.width/2;
            this.y=e.data.global.y-this.height/2;
        });
    }

    draw = function (stage) {
        this.Box.beginFill(0xFFFFFF)
            .drawRect(this.X, this.Y, this.Width, this.Height)
            .endFill();
        stage.addChild(this.Box);
    }
}


let codeViewer = new CodeViewer(0, 0, 100, 100, 0);

codeViewer.draw(app.stage);




