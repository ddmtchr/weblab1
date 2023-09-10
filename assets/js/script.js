const tableBody = document.querySelector('#result-table tbody')
const yError = document.querySelector('#y-error-label')
const rError = document.querySelector('#r-error-label')
const yField = document.querySelector('#y-input')
const mainForm = document.querySelector('#main-form')
const clearButton = document.querySelector('#clear-button')
const themeToggleButton = document.querySelector('#theme-toggle-button')
const uglyThemeButton = document.querySelector('#ugly-theme-button')


render(false)
mainForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    let y = yField.value
    let checkboxGroup = document.querySelectorAll('.checkbox-group .chb:checked')
    if (isNumeric(y) && parseFloat(y) >= -5 && parseFloat(y) <= 5 && checkboxGroup.length === 1) {
        const requestData = new FormData(this)

        const response = await fetch('../../pages/check-hit.php?' + new URLSearchParams(requestData))
        if (!response.ok) {
            console.log(`https://http.cat/${response.status}`)
            window.location.href = `https://http.cat/${response.status}`
        } else {

            const responseDataJSON = await response.text() // JSON
            const responseObject = JSON.parse(responseDataJSON)
            console.log(responseObject)

            const previousResultsJSON = getFromLocalStorage('previousResults')
            const previousResults = JSON.parse(previousResultsJSON)

            previousResults.push(responseObject)

            localStorage.setItem('previousResults', JSON.stringify(previousResults))

            render(true)

            yError.textContent = ''
            rError.textContent = ''

        }

    } else if (!(isNumeric(y) && parseFloat(y) >= -5 && parseFloat(y) <= 5)) {
        yError.textContent = 'Y must be a float between -5 and 5'
    } else if (checkboxGroup.length !== 1) {
        rError.textContent = 'Exactly 1 checkbox should be selected'

    }
})

clearButton.addEventListener('click', function () {
    localStorage.clear()
    render(false)
})

themeToggleButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme')
    if (document.body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = "To the light side"
    } else {
        themeToggleButton.textContent = "To the dark side"
    }
    render()
})

uglyThemeButton.addEventListener('click', function () {
    document.body.classList.toggle('ugly-theme')
    render()
})

yField.addEventListener('input', function () {
    const input = yField.value
    if (isNumeric(input) || input.trim() === '') {
        yField.classList.remove('invalid')
    } else {
        yField.classList.add('invalid')
    }
})

function render(drawLastPoint) {
    const resultsJSON = getFromLocalStorage('previousResults')
    const resultsObjects = JSON.parse(resultsJSON)

    tableBody.innerHTML = ''

    for (const result of resultsObjects) {
        const newRow = tableBody.insertRow()
        const resultCell = newRow.insertCell(0)
        const xCell = newRow.insertCell(1)
        const yCell = newRow.insertCell(2)
        const rCell = newRow.insertCell(3)
        const execTimeCell = newRow.insertCell(4)
        const currentTimeCell = newRow.insertCell(5)
        resultCell.innerHTML = result['result']
        xCell.innerHTML = +result['x']
        yCell.innerHTML = +result['y']
        rCell.innerHTML = +result['r']
        execTimeCell.innerHTML = result['exec_time']
        currentTimeCell.innerHTML = result['current_time']
        if (drawLastPoint) redrawPoint(result['x'] * 200 / result['r'], result['y'] * 200 / result['r'],
            getComputedStyle(document.body).getPropertyValue('--canvas-point-color'))
    }
    if (!drawLastPoint) redrawGraph()

}

function isNumeric(str) {
    //return !isNaN(parseFloat(str)) && isFinite(str)
    return /^\s*[+-]?([0-9]*[.])?[0-9]+\s*$/.test(str)
}

function getFromLocalStorage(key) {
    return localStorage.getItem(key) === null ? JSON.stringify([]) : localStorage.getItem(key)
}


