const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const halfWidth = canvas.width / 2
const halfHeight = canvas.height / 2
const rDefault = canvas.width * 0.4;
const canvasFont = '16px sans-serif'

context.translate(halfWidth, halfHeight)
context.scale(1, -1)


drawShapes(rDefault)
drawAxis()


function drawPoint(x, y, color) {
    context.fillStyle = color
    context.beginPath()
    context.moveTo(x, y)
    context.arc(x, y, 2.5, 0, 2 * Math.PI, true)
    context.closePath()
    context.fill()
}

function redrawPoint(x, y, color) {
    context.clearRect(-halfWidth, -halfHeight, canvas.width, canvas.height)
    drawShapes(rDefault)
    drawAxis()
    drawPoint(x, y, color)
}

function drawShapes(r) {
    let x1 = r;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;
    let x3 = 0;
    let y3 = r;
    context.fillStyle = '#9999ff'

    context.beginPath(); // Triangle
    context.moveTo(x1, y1)
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();
    context.fill()

    context.beginPath() // Circle
    context.moveTo(0, 0)
    context.arc(0, 0, r / 2, 0, -Math.PI / 2, true)
    context.closePath()
    context.fill()

    context.rect(-r, 0, r, -r / 2) // Rectangle
    context.fill()
}

function drawAxis() {
    context.fillStyle = '#000000c0'
    context.strokeStyle = '#000000c0'
    context.font = canvasFont;

    drawHorizontalAxis()
    drawVerticalAxis()

    drawVerticalStroke(-rDefault, 0, '-R')
    drawVerticalStroke(-rDefault / 2, 0, '-R/2')
    drawVerticalStroke(rDefault / 2, 0, 'R/2')
    drawVerticalStroke(rDefault, 0, 'R')
    drawHorizontalStroke(0, -rDefault, '-R')
    drawHorizontalStroke(0, -rDefault / 2, '-R/2')
    drawHorizontalStroke(0, rDefault / 2, 'R/2')
    drawHorizontalStroke(0, rDefault, 'R')
}

function drawVerticalAxis() {
    context.beginPath()
    context.moveTo(0, -halfHeight)
    context.lineTo(0, halfHeight)
    context.lineTo(-3, halfHeight - 10)
    context.lineTo(3, halfHeight - 10)
    context.lineTo(0, halfHeight)
    context.stroke()
    context.fill()
    context.scale(1, -1)
    context.fillText('Y', -17, -halfHeight + 14);
    context.scale(1, -1)
}

function drawHorizontalAxis() {
    context.beginPath()
    context.moveTo(-halfWidth, 0)
    context.lineTo(halfWidth, 0)
    context.lineTo(halfWidth - 10, 3)
    context.lineTo(halfWidth - 10, -3)
    context.lineTo(halfWidth, 0)
    context.stroke()
    context.fill()
    context.scale(1, -1)
    context.fillText('X', halfWidth - 12, 20);
    context.scale(1, -1)
}

function drawVerticalStroke(x, y, text) {
    context.beginPath()
    context.moveTo(x, y + 3)
    context.lineTo(x, y - 3)
    context.stroke()
    context.scale(1, -1)
    context.textAlign = 'center'
    context.fillText(text, x, y + 20);
    context.scale(1, -1)

}

function drawHorizontalStroke(x, y, text) {
    context.beginPath()
    context.moveTo(x + 3, y)
    context.lineTo(x - 3, y)
    context.stroke()
    context.scale(1, -1)
    context.textAlign = 'right'
    context.fillText(text, x - 5, -y + 5);
    context.scale(1, -1)
}