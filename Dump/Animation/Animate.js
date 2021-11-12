let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c = canvas.getContext("2d");

let theme = {
    button: {
        colorDefault: '#03A62C',
        colorClicked: '#8FD994',
        fontColor: '#F2F2F2',
        fontName: "Hack Regular",
        fontSize: 21
    },
    code: {
        highlightedColor: 'rgba(92,185,242,0.8)',
        nullColor: 'rgba(109,204,242,0.8)',
        fontName: "Hack Regular",
        fontSize: 21
    }
}

let elements = {
    buttons: [],
    buttonIntiSize: 3,
    highlight:null,
    bars: [],
    tick: 1
}


function Button(Text, X, Y, Width, Height) {
    this.text = Text;
    this.x = X;
    this.y = Y;
    this.width = Width;
    this.height = Height;

    this.inside = function (X, Y) {
        return (this.x < X && X < this.width + this.x && this.y < Y && Y < this.height + this.y)
    }

    const reactDraw = () => {
        c.beginPath();
        c.fillStyle = theme.button.colorDefault;
        c.fillRect(this.x, this.y, this.width, this.height);
    }

    const textDraw = () => {
        c.fillStyle = theme.button.fontColor;
        c.font = theme.button.fontSize + "px " + theme.button.fontName;
        c.textBaseline = 'middle'
        c.textAlign = 'center'
        c.fillText(this.text, this.x + ((this.width) / 2), this.y + (theme.button.fontSize / 2))
    }

    this.draw = function () {
        reactDraw();
        textDraw();
    }
}

function CodePrint(Code, Size, Font, X, Y, Width, LineSpace) {
    this.code = Code;
    this.size = Size;
    this.font = Font;
    this.x = X;
    this.y = Y;
    this.width = Width;
    this.lineSpace = LineSpace;

    this.draw = function () {
        c.font = this.size + "px " + this.font;
        for (let i = 0; i < this.code.length; i++) {
            c.fillText(this.code[i], this.x, this.y + this.lineSpace, this.width)
        }
    }
}

function Bar(X, Y, Width, Height,Color) {
    this.x = X;
    this.y = Y;
    this.width = Width;
    this.height = Height;
    this.len = Width / elements.tick;
    this.color=Color;
    this.c = this.len;
    this.start = true;

    this.draw = function () {
        c.beginPath();
        console.log(this.color)
        c.rect(this.x, this.y, this.len, this.height);
        c.fillStyle=this.color;
        c.fill();
    }

    this.update = function () {
        if (this.start) {
            if (this.c < this.width) {
                c.rect(this.x, this.y, (this.c += this.len) % this.width, this.height);
                console.log(this.c)
            } else {
                c.beginPath();
                this.c = this.len;
                c.fillStyle=this.color;
                c.fill();
                this.start = false;
            }
        }
    }
}

function Highlight(X, Y, Width, LineHeight, LineCount, LineSpace) {
    this.x = X - Width;
    this.y = Y;
    this.width = Width;
    this.lineHeight = LineHeight;
    this.lineCount = LineCount;
    this.lineSpace = LineSpace;
    this.end = Y;
    this.start = true;

    this.draw = function () {
        if (this.lineCount > 0) {
            elements.bars.push(new Bar(this.x, this.y, this.width, this.lineHeight,theme.code.nullColor))
            for (let i = 0; i < this.lineCount; i++) {
                elements.bars.push(new Bar(this.x, this.y += (this.lineHeight + this.lineSpace), this.width, this.lineHeight,theme.code.nullColor));
            }
        }
        for (let i = 0; i < elements.bars.length; i++) {
            elements.bars[i].draw();
        }
        this.end = this.y;
    }

    this.update = function () {
        c.beginPath();
        for (let i = 0; i < elements.bars.length; i++) {
            elements.bars[i].update();
        }
    }
}


function buttonSet(X, Y, W, H) {
    let x = X, w = W / elements.buttonIntiSize;
    let previous = new Button("Previous", x, Y, w, H);
    let play = new Button("Play", x += w + 5, Y, w - 5, H);
    let next = new Button("Next", x += w, Y, w - 5, H);
    elements.buttons = [previous, play, next];
    buttonDraw();
}


function buttonDraw() {
    for (let i = 0; i < elements.buttons.length; i++) {
        elements.buttons[i].draw();
    }
}

function inti() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    elements.highlight = new Highlight(innerWidth - 5, 70, canvas.width * (1 / 3.0), 18, 7, 5);
    elements.highlight.draw();
    buttonSet(elements.highlight.x, elements.highlight.y + 30, elements.highlight.width, elements.highlight.lineHeight);
}

canvas.addEventListener("mousedown", function (event) {
    if (event.buttons === 1) {
        for (let i = 0; i < elements.buttons.length; i++) {
            if (elements.buttons[i].inside(event.clientX, event.clientY)) {
                console.log(event)
            }
        }
    }
})

function animate() {
    elements.highlight.update();
    requestAnimationFrame(animate);

}

window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        inti();
    }
)

inti();
animate();