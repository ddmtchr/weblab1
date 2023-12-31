class Drawer {
    #canvas
    #ctx
    #halfWidth
    #halfHeight
    #rDefault
    #canvasFont
    lastPoint
    lastPointIsDrawn
    drawOnlyLast // todo

    constructor(lastPointIsDrawn) {
        this.#canvas = document.getElementById('graph-canvas')
        this.#ctx = this.#canvas.getContext('2d')
        this.#halfWidth = this.#canvas.width / 2
        this.#halfHeight = this.#canvas.height / 2
        this.#rDefault = this.#canvas.width * 0.4
        this.#canvasFont = '16px sans-serif'

        this.#ctx.translate(this.#halfWidth, this.#halfHeight)
        this.#ctx.scale(1, -1)

        this.lastPointIsDrawn = lastPointIsDrawn;
    }

    drawPoint(point, color) { // todo modes
        // if (drawAllPoints) ...

        this.drawGraph(true)
        const scaledX = point['x'] * 200 / point['r']
        const scaledY = point['y'] * 200 / point['r']
        this.#ctx.fillStyle = color
        this.#ctx.beginPath()
        this.#ctx.moveTo(scaledX, scaledY)
        this.#ctx.arc(scaledX, scaledY, 2.5, 0, 2 * Math.PI, true)
        this.#ctx.closePath()
        this.#ctx.fill()
        this.lastPointIsDrawn = true
        this.lastPoint = {
            x: point['x'],
            y: point['y'],
            r: point['r'],
        }
    }

    drawGraph(reset) {
        if (reset) this.#ctx.clearRect(-this.#halfWidth, -this.#halfHeight, this.#canvas.width, this.#canvas.height)
        this.drawAxis()
        this.drawShapes(this.#rDefault)
    }

    drawShapes(r) {
        let x1 = r
        let y1 = 0
        let x2 = 0
        let y2 = 0
        let x3 = 0
        let y3 = r
        this.#ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--canvas-shapes-color')

        this.#ctx.beginPath() // Triangle
        this.#ctx.moveTo(x1, y1)
        this.#ctx.lineTo(x2, y2)
        this.#ctx.lineTo(x3, y3)
        this.#ctx.closePath()
        this.#ctx.fill()

        this.#ctx.beginPath() // Circle
        this.#ctx.moveTo(0, 0)
        this.#ctx.arc(0, 0, r / 2, 0, -Math.PI / 2, true)
        this.#ctx.closePath()
        this.#ctx.fill()

        this.#ctx.beginPath() // Rectangle
        this.#ctx.rect(-r, 0, r, -r / 2)
        this.#ctx.closePath()
        this.#ctx.fill()
    }

    drawAxis() {
        this.#ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--canvas-axis-color')
        this.#ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--canvas-axis-color')
        this.#ctx.font = this.#canvasFont

        this.drawHorizontalAxis()
        this.drawVerticalAxis()

        this.drawVerticalStroke(-this.#rDefault, 0, '-R')
        this.drawVerticalStroke(-this.#rDefault / 2, 0, '-R/2')
        this.drawVerticalStroke(this.#rDefault / 2, 0, 'R/2')
        this.drawVerticalStroke(this.#rDefault, 0, 'R')
        this.drawHorizontalStroke(0, -this.#rDefault, '-R')
        this.drawHorizontalStroke(0, -this.#rDefault / 2, '-R/2')
        this.drawHorizontalStroke(0, this.#rDefault / 2, 'R/2')
        this.drawHorizontalStroke(0, this.#rDefault, 'R')
    }

    drawVerticalAxis() {
        this.#ctx.beginPath()
        this.#ctx.moveTo(0, -this.#halfHeight)
        this.#ctx.lineTo(0, this.#halfHeight)
        this.#ctx.lineTo(-3, this.#halfHeight - 10)
        this.#ctx.lineTo(3, this.#halfHeight - 10)
        this.#ctx.lineTo(0, this.#halfHeight)
        this.#ctx.stroke()
        this.#ctx.fill()
        this.#ctx.scale(1, -1)
        this.#ctx.textAlign = 'left'
        this.#ctx.fillText('Y', -17, -this.#halfHeight + 14)
        this.#ctx.scale(1, -1)
    }

    drawHorizontalAxis() {
        this.#ctx.beginPath()
        this.#ctx.moveTo(-this.#halfWidth, 0)
        this.#ctx.lineTo(this.#halfWidth, 0)
        this.#ctx.lineTo(this.#halfWidth - 10, 3)
        this.#ctx.lineTo(this.#halfWidth - 10, -3)
        this.#ctx.lineTo(this.#halfWidth, 0)
        this.#ctx.stroke()
        this.#ctx.fill()
        this.#ctx.scale(1, -1)
        this.#ctx.textAlign = 'left'
        this.#ctx.fillText('X', this.#halfWidth - 12, 20)
        this.#ctx.scale(1, -1)
    }

    drawVerticalStroke(x, y, text) {
        this.#ctx.beginPath()
        this.#ctx.moveTo(x, y + 3)
        this.#ctx.lineTo(x, y - 3)
        this.#ctx.stroke()
        this.#ctx.scale(1, -1)
        this.#ctx.textAlign = 'center'
        this.#ctx.fillText(text, x, y + 20)
        this.#ctx.scale(1, -1)
    }

    drawHorizontalStroke(x, y, text) {
        this.#ctx.beginPath()
        this.#ctx.moveTo(x + 3, y)
        this.#ctx.lineTo(x - 3, y)
        this.#ctx.stroke()
        this.#ctx.scale(1, -1)
        this.#ctx.textAlign = 'right'
        this.#ctx.fillText(text, x - 5, -y + 5)
        this.#ctx.scale(1, -1)
    }

}