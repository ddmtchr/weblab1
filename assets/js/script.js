document.getElementById('mainForm').addEventListener('submit', async function (event) {
    event.preventDefault()

    let yField = document.querySelector('#y_input')
    let y = yField.value
    let table = document.querySelector('#resultTable')

    if (isNumeric(y) && parseFloat(y) >= -5 && parseFloat(y) <= 5) {
        const requestData = new FormData(this)

        const response = await fetch('../../pages/check-hit.php?' + new URLSearchParams(requestData))
        if (!response.ok) {
            throw new Error("Какая-то ашыбка")
        }

        const responseData = await response.text()
        const responseValues = JSON.parse(responseData)

        // alert(responseValues)

        const newRow = table.insertRow()
        const resultCell = newRow.insertCell(0)
        const xCell = newRow.insertCell(1)
        const yCell = newRow.insertCell(2)
        const rCell = newRow.insertCell(3)
        const execTimeCell = newRow.insertCell(4)
        const currentTimeCell = newRow.insertCell(5)
        resultCell.innerHTML = responseValues['result']
        xCell.innerHTML = responseValues['x']
        yCell.innerHTML = responseValues['y']
        rCell.innerHTML = responseValues['r']
        execTimeCell.innerHTML = responseValues['exec_time']
        currentTimeCell.innerHTML = responseValues['current_time']

        yField.style.backgroundColor = 'white';

    } else {
        alert("Peace death")
        yField.style.backgroundColor = 'red'
    }
})

function isNumeric(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}