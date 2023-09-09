const tableBody = document.querySelector('#resultTable tbody')
const yError = document.querySelector('#y_error')
const rError = document.querySelector('#r_error')
const yField = document.querySelector('#y_input')


render(false)
document.querySelector('#mainForm').addEventListener('submit', async function (event) {
    event.preventDefault()

    let y = yField.value
    let checkboxGroup = document.querySelectorAll('div.checkbox-group.required .chb:checked')
    if (isNumeric(y) && parseFloat(y) >= -5 && parseFloat(y) <= 5 && checkboxGroup.length === 1) {
        const requestData = new FormData(this)

        const response = await fetch('../../pages/check-hit.php?' + new URLSearchParams(requestData))
        if (!response.ok) {
            console.log(`https://http.cat/${response.status}`)
            window.location.href = `https://http.cat/${response.status}`
        } else {

            const responseDataJSON = await response.text() // JSON
            const responseObject = JSON.parse(responseDataJSON)

            const previousResultsJSON = getFromLocalStorage('previousResults')
            const previousResults = JSON.parse(previousResultsJSON)

            previousResults.push(responseObject)

            localStorage.setItem('previousResults', JSON.stringify(previousResults))

            render(true)

            yField.style.backgroundColor = 'white'
            yError.textContent = ''
            rError.textContent = ''

        }

    } else if (!(isNumeric(y) && parseFloat(y) >= -5 && parseFloat(y) <= 5)) {
        yError.textContent = 'Y must be a float between -5 and 5'
        yField.style.backgroundColor = 'red'
    } else if (checkboxGroup.length !== 1) {
        rError.textContent = 'Exactly 1 checkbox should be selected'

    }
})

document.querySelector('#clearButton').addEventListener('click', function () {
    localStorage.clear()
    render(false)
})

// yField.oninput = function () {
//     const input = yField.value
//     if (!isNumeric(input)) {
//         yField.style.backgroundColor = '#ff8888' // todo change to css
//     } else {
//         yField.style.backgroundColor = '#ffffff' // todo change to css
//     }
// }

yField.addEventListener('input', function () {
    const input = yField.value
    if (isNumeric(input) || input.trim() === '') {
        console.log('Введено число')
        yField.style.backgroundColor = '#ffffff' // todo change to css
    } else {
        console.log('Введена хуйня')
        yField.style.backgroundColor = '#ff8888' // todo change to css
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
        if (drawLastPoint) redrawPoint(result['x'] * 200 / result['r'], result['y'] * 200 / result['r'], 'black')
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


