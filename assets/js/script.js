const tableBody = document.querySelector('#resultTable tbody')

render()
document.querySelector('#mainForm').addEventListener('submit', async function (event) {
    event.preventDefault()

    let yField = document.querySelector('#y_input')
    let y = yField.value
    let checkboxGroup = document.querySelectorAll('div.checkbox-group.required .chb:checked')
    if (isNumeric(y) && parseFloat(y) >= -5 && parseFloat(y) <= 5 && checkboxGroup.length === 1) {
        const requestData = new FormData(this)

        const response = await fetch('../../pages/check-hit.php?' + new URLSearchParams(requestData))
        if (!response.ok) {
            throw new Error("Какая-то ашыбка")
        }

        const responseDataJSON = await response.text() // JSON
        const responseObject = JSON.parse(responseDataJSON)

        const previousResultsJSON = getFromLocalStorage('previousResults')
        const previousResults = JSON.parse(previousResultsJSON)

        previousResults.push(responseObject)

        localStorage.setItem('previousResults', JSON.stringify(previousResults))

        render()

        yField.style.backgroundColor = 'white'

    } else {
        alert("Peace death")
        yField.style.backgroundColor = 'red'
    }
})

document.querySelector('#clearButton').onclick = function () {
    localStorage.clear()
    render()
}

function render() {

    const resultsJSON = getFromLocalStorage('previousResults')
    const resultsObjects = JSON.parse(resultsJSON)
    // console.log(resultsObjects)
    // console.log(resultsObjects.length)

    tableBody.innerHTML = ''

    // drawShapes(200)
    // drawAxis()

    for (const result of resultsObjects) {

        const newRow = tableBody.insertRow()
        const resultCell = newRow.insertCell(0)
        const xCell = newRow.insertCell(1)
        const yCell = newRow.insertCell(2)
        const rCell = newRow.insertCell(3)
        const execTimeCell = newRow.insertCell(4)
        const currentTimeCell = newRow.insertCell(5)
        resultCell.innerHTML = result['result']
        xCell.innerHTML = result['x']
        yCell.innerHTML = result['y']
        rCell.innerHTML = result['r']
        execTimeCell.innerHTML = result['exec_time']
        currentTimeCell.innerHTML = result['current_time']
        redrawPoint(result['x'] * 200 / result['r'], result['y'] * 200 / result['r'], 'black')
    }


}

function isNumeric(str) {
    return !isNaN(parseFloat(str)) && isFinite(str)
}

function getFromLocalStorage(key) {
    return localStorage.getItem(key) === null ? JSON.stringify([]) : localStorage.getItem(key)
}

