const type = {loop: 0, compare: 1, create: 2, swap: 3, ignore: 4};
var order = []

const bubbleSortCode = [
    ["for(var i = 0; i < arr.length; i++){", type.loop],
    ["   for(var j = 0; j < ( arr.length - i -1 ); j++){", type.loop],
    ["       if(arr[j] > arr[j+1]){", type.compare],
    ["           var temp = arr[j]", type.create],
    ["           arr[j] = arr[j + 1]", type.swap],
    ["           arr[j+1] = temp", type.swap],
    ["       }", type.ignore],
    ["   }", type.ignore],
    ["}", type.ignore]
]

const bubbleSort = (arr) => {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {
                order.push([2, [j, j + 1]]);
                var temp = arr[j];
                order.push([3, [j]]);
                arr[j] = arr[j + 1];
                order.push([4, [j, j + 1]]);
                arr[j + 1] = temp;
                order.push([5, [j + 1]]);
            }
        }
    }
}


let at = 0;

function nextLine(code) {
    if (at + 1 < order.length) {
        console.log(code[order[at++][0]][0].toString());
    }
}

function previousLine(code) {
    if (0 < at - 1) {
        console.log(code[order[at--][0]][0].toString());
    }
}

bubbleSort([10, 5, 4]);

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas)
let c = canvas.getContext("2d");
let x=500,y=50;
for (let i = 0; i < bubbleSortCode.length; i++) {
    c.font='25px Arial';
    c.fillText(bubbleSortCode[i][0],x,y*i+200,innerWidth);
    console.log()
}