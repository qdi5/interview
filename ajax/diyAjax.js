const xhr = new XMLHttpRequest()
xhr.open('GET', '/data', true)
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            alert(xhr.responseText)
        }
    }
}
xhr.send(null)