const app = new PIXI.Application({ backgroundColor: 0x272b34, resizeTo:window});
document.querySelector("#left").appendChild(app.view);

const rect = new PIXI.Graphics()
    .beginFill(0x55faaf)
    .drawRect(-50, -50, 100, 100);

app.stage.addChild(rect);

window.addEventListener('resize', resize);

function resize() {

    const parent = app.view.parentNode;

    app.renderer.resize(parent.clientWidth, parent.clientHeight);

    rect.position.set(
        app.screen.width / 2 ,
        app.screen.height / 2
    );
}

window.onload = function(){
    resize();
};

CodeMirror(document.querySelector('#right'), {
    lineNumbers: true,
    tabSize: 2,
    value: 'console.log("Hello, World");'
});

