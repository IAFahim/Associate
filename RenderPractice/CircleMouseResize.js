const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas)
let c = canvas.getContext("2d");

let colorArr = [
    '#f8f05c',
    '#ffaa33',
    '#658d54aa',
    '#34aa44dc',
    '#1b8cc9',
    '#e1cfbd'
]

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse)
})

window.addEventListener('resize',function (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})


function Circle(x, y, dx, dy, radius, field, dr, max) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = (radius * Math.random()) + 1;
    this.dr = dr;
    this.field = field;
    this.min = radius;
    this.max = max;
    this.color = colorArr[Math.floor(colorArr.length * Math.random())];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill();
    }
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (Math.abs(mouse.x - this.x) < this.field && Math.abs(mouse.y - this.y) < this.field) {
            if (this.max > this.radius) {
                this.radius += this.dr;

            }
        } else if (this.radius > this.min) {
            this.radius -= this.dr;
        }

        this.draw();
    }
}

let n = 800;
let circles
function init(){
    circles=[n]
    for (let i = 0; i < n; i++) {
        let radius = 30, speed = 4;
        let x = (Math.random() * (innerWidth - radius * 2)) + radius;
        let y = (Math.random() * (innerHeight - radius * 2)) + radius;
        let dx = (Math.random() - .5) * speed;
        let dy = (Math.random() - .5) * speed;
        circles[i] = new Circle(x, y, dx, dy, 3, 60, 1.5, 40);
    }
}
init();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}

animate();

