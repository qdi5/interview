function loadImg (src) {
    const success = []
    const failed = []
    const pmArr = []
    let sum = 0
    function getPromise(src) {
        if (typeof src !== 'string' || !/^http(s)?:/.test(src)) {
            return Promise.reject(`the url '${src}' is invalid`)
        }
        return new Promise((resolved, reject) => {
            const img = new Image()
            img.src = src
            img.onload = function(data) {
                resolved(img)
            }
            img.onerror = function(e) {
                reject(e)
            }
        })
    }
    if (typeof src === 'string') {
        pmArr.push(getPromise(src))
        sum = 1
    } else if (src instanceof Array) {
        sum = src.length
        if (!sum) {return Promise.reject('src must not empty')}
        for (let prop of src) {
            // [new Promise(), pmArr.push(Promise.resolve({success, failed}))]
            pmArr.push(getPromise(prop)) // 1、 pmArr.push(loadImg(src))
        }
        
    }
    return new Promise((resolve, reject) => {
        pmArr.forEach((element, index) => {
            element.then(img => {
                console.log(`第${index + 1}张图片加载成功了`)
                success.push({index: index + 1, img})
            }).catch(e => {
                console.error(e)
                failed.push({index: index + 1, src: src[index]})
                console.log(`第${index + 1}张图片加载失败了`)
            }).finally(() => {
                if (success.length + failed.length === sum) {
                    console.log('所有图片加载完啦')
                    resolve({success, failed})
                }
            })
        })
    })
    
}