function ajax ({url, type, params, isAsync = true }) {
    return new Promise((resolved, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(type, url, isAsync)
        xhr.onreadystatechange = function(event) {
            console.log([...arguments])
            const res = event.target
            if (res.readyState === 4) {
                if (res.status === 200) {
                    let result = null
                    try {
                        result = JSON.parse(res.responseText)
                        resolved(result)
                    } catch(e) {
                        reject(e)
                        console.error(e)
                    }
                    console.log(result)
                }
            }
        }
        if (type.toLowerCase() === 'get') {
            xhr.send(null)
        } else {
            xhr.send(JSON.stringify(params))
        }
    })
}