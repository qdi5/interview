/**
 * 
 * @param {*} {
 *   url:   string 请求路径,
 *   callbackName：string 回调函数名称,
 *   callbackParam：string 后端接收回调函数名称的参数名（由后端定义）
 *   params：Object 传递给后端的参数对象；如：{name: 'xx', age:  12}
 * } 
 * @param {*} callback：加载完服务端返回的脚本后，执行的回调函数
 */
function jsonp ({url, callbackName = 'callback', callbackParam = 'callback', params}, callback) {
    if (!callback || typeof callback !== 'function') {
        console.error(`the second argument callback is undefined, or not a function`)
        return
    }
    if (!url || !/^http(s)?:/.test(url)) {
        console.error(`${ url } is a invalid url` )
        return
    }
    
    // 保证回调函数名唯一
    while(window[callbackName]) {
        const dateStr = String(Date.now())
        callbackName += dateStr.substring(dateStr.length - 6)
    }
    window[callbackName] = callback
    const script = document.createElement('script')
    const anchorIndex = url.lastIndexOf('#')
    url = ~anchorIndex ? url.substring(0, anchorIndex) : url 
    const concatStr = ~url.indexOf('?') ? '&' : '?'
    // 参数处理；将对象转换为查询字符串
    let paramStr = ''
    if (params && typeof params === 'object') {
        const arr = Object.entries(params)
        console.log('arr:\r\n', arr)
        for (const [key ,value] of arr) {
            paramStr += `${ key }=${ value }&`
        }
    }
    script.src = `${ url + concatStr + paramStr + callbackParam }=${ callbackName }`
    script.onload = function (data) {
        document.body.removeChild(script)
        delete window[callbackName]
    }
    script.onerror = function (e) {
        delete window[callbackName]
    }
    document.body.appendChild(script)
}