const xhr = new XMLHttpRequest()
xhr.open('post', '/login', true)
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            alert(xhr.responseText)
        }
    }
}
const postData = {
    username: 'xxx',
    password: '123456'
}
xhr.send(JSON.stringify(postData))
