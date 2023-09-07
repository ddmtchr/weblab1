document.getElementById('mainForm').addEventListener('submit', async function (event) {
    event.preventDefault()

    // let xField = document.forms['main-form']['x_input']
    let yField = document.querySelector('#y_input')
    // let rField = document.forms['main-form']['r_input']

    // let x = document.forms['main-form']['x_input'].value
    // let y = document.forms['main-form']['y_input'].value
    let y = yField.value

    let table = document.querySelector('#resultTable')


    // let r = document.forms['main-form']['r_input'].value

    if (isNumeric(y) && parseFloat(y) >= -5 && parseFloat(y) <= 5) {
        const requestData = new FormData(this)

        const response = await fetch('../../pages/check-hit.php?' + new URLSearchParams(requestData))
        if (!response.ok) {
            throw new Error("Какая-то ашыбка")
        }
        const responseData = await response.text()
        const responseValues = responseData.split('&')

        // alert(responseValues)

        const newRow = table.insertRow()
        const resultCell = newRow.insertCell(0)
        const xCell = newRow.insertCell(1)
        const yCell = newRow.insertCell(2)
        const rCell = newRow.insertCell(3)
        const execTimeCell = newRow.insertCell(4)
        const currentTimeCell = newRow.insertCell(5)
        resultCell.innerHTML = responseValues[0]
        xCell.innerHTML = responseValues[1]
        yCell.innerHTML = responseValues[2]
        rCell.innerHTML = responseValues[3]
        execTimeCell.innerHTML = responseValues[4]
        currentTimeCell.innerHTML = responseValues[5]


        // yField.style.backgroundColor = 'white';

    } else {
        alert("Peace death")
        yField.style.backgroundColor = 'red'
    }
})

function isNumeric(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}