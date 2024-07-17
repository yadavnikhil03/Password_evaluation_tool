// pattern.js
const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawPattern();
});

const hexagons = [];
const hexagonSize = 20;
const hexagonSpacing = 5;

class Hexagon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = hexagonSize;
        this.angle = 0;
    }

    draw() {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3 + this.angle;
            const x = this.x + this.size * Math.cos(angle);
            const y = this.y + this.size * Math.sin(angle);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    update() {
        this.angle += 0.01;
        this.draw();
    }
}

function createHexagons() {
    hexagons.length = 0;
    const hexagonWidth = Math.sqrt(3) * hexagonSize;
    const hexagonHeight = 2 * hexagonSize;
    const rows = Math.ceil(canvas.height / (hexagonHeight * 0.75));
    const cols = Math.ceil(canvas.width / (hexagonWidth + hexagonSpacing));
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * (hexagonWidth + hexagonSpacing) + (row % 2) * (hexagonWidth / 2);
            const y = row * (hexagonHeight * 0.75);
            hexagons.push(new Hexagon(x, y));
        }
    }
}

function drawPattern() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hexagons.forEach(hexagon => hexagon.update());
    requestAnimationFrame(drawPattern);
}

createHexagons();
drawPattern();
