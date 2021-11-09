let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c = canvas.getContext("2d");

let theme = {
    highlightedColor : '#5CB9F2',
    nullColor : '#6DCCF2',
    buttonsColorDefault:'#03A62C',
    buttonsColorClicked:'#8FD994',
    buttonsTextColor:'#F2F2F2',
    font:"Hack Regular",
    fontSize:18
}

window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        inti();
    }
)

function Button(text,x, y, width, height) {
    this.text=text;
    this.x = x;
    this.y = y;
    this.width=width;
    this.height=height;

    this.inside=function (X,Y){
        return (this.x<X && X<this.width+this.x && this.y<Y && Y< this.height+this.y)
    }

    this.draw=function (){
        c.beginPath();
        c.fillStyle=theme.buttonsColorDefault;
        c.fillRect(this.x, this.y, this.width, this.height);
        c.fillStyle=theme.buttonsTextColor;
        c.font = theme.fontSize+"px"+theme.font;
        let size= c.measureText(this.text);
        c.fillText(this.text,this.x+(size.width/2),this.y+(theme.fontSize/2))


    }
}


canvas.addEventListener("mousedown",function (event){
    if(event.buttons===1)
    console.log(event)
})



function CodePrint(code, size ,font, x, y, width, lineSpace) {
    this.code = code;
    this.size=size;
    this.font = font;
    this.x = x;
    this.y = y;
    this.width = width;
    this.lineSpace = lineSpace;

    this.draw = function () {
        c.font = this.size+"px"+this.font;
        for (let i = 0; i < this.code.length; i++) {
            c.fillText(this.code[i], this.x, this.y + this.lineSpace, this.width)
        }
    }
}


function Highlight(x, y, width, lineHeight, lineCount, lineSpace) {
    this.x = x-width;
    this.y = y;
    this.width = width;
    this.lineHeight = lineHeight;
    this.lineCount = lineCount;
    this.lineSpace = lineSpace;

    this.draw = function () {
        c.beginPath();
        if (this.lineCount > 0) {
            c.rect(this.x, this.y, this.width, this.lineHeight);
            for (let i = 0; i < this.lineCount; i++) {
                c.rect(this.x, this.y += (this.lineHeight + lineSpace), this.width, this.lineHeight);
            }
            c.fillStyle =theme.nullColor;
            c.fill();
        }

    }
}

function inti() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    let h = new Highlight(innerWidth-5, 70, canvas.width * (1 / 3.0), 18, 7, 9);
    let t=h.width/3;
    let n= new Button("Next",h.x,h.y,t,20);

    h.draw();
    n.draw();
}

inti();