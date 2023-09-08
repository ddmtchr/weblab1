let table = document.querySelector('#resultTable')

render()
document.getElementById('mainForm').addEventListener('submit', async function (event) {
    event.preventDefault()

    let yField = document.querySelector('#y_input')
    let y = yField.value

    if (isNumeric(y) && parseFloat(y) >= -5 && parseFloat(y) <= 5) {
        const requestData = new FormData(this)

        const response = await fetch('../../pages/check-hit.php?' + new URLSearchParams(requestData))
        if (!response.ok) {
            throw new Error("Какая-то ашыбка")
        }

        const responseDataJSON = await response.text() // JSON
        const responseObject = JSON.parse(responseDataJSON)

        const previousResultsJSON = localStorage.getItem('previousResults') === null ? JSON.stringify([]) : localStorage.getItem('previousResults')
        const previousResults = JSON.parse(previousResultsJSON)

        previousResults.push(responseObject)

        localStorage.setItem('previousResults', JSON.stringify(previousResults))

        render()

        // const newRow = table.insertRow()
        // const resultCell = newRow.insertCell(0)
        // const xCell = newRow.insertCell(1)
        // const yCell = newRow.insertCell(2)
        // const rCell = newRow.insertCell(3)
        // const execTimeCell = newRow.insertCell(4)
        // const currentTimeCell = newRow.insertCell(5)
        // resultCell.innerHTML = responseValues['result']
        // xCell.innerHTML = responseValues['x']
        // yCell.innerHTML = responseValues['y']
        // rCell.innerHTML = responseValues['r']
        // execTimeCell.innerHTML = responseValues['exec_time']
        // currentTimeCell.innerHTML = responseValues['current_time']

        yField.style.backgroundColor = 'white'

    } else {
        alert("Peace death")
        yField.style.backgroundColor = 'red'
    }
})

function render() {

    const resultsJSON = localStorage.getItem('previousResults')
    const resultsObjects = JSON.parse(resultsJSON)
    console.log(resultsObjects)
    console.log(resultsObjects.length)

    table.innerHTML = ''

    for (const result of resultsObjects) {

        const newRow = table.insertRow()
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
    }


}

function isNumeric(str) {
    return !isNaN(parseFloat(str)) && isFinite(str)
}