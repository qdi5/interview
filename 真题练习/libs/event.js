 /*  
考虑事件代理
bindEvent(el, 'click', function(e){}, false)
bindEvent(el,'click', '.item', function(e){}, false)
*/
function bindEvent(el, eventName, selector, fn, isCapture){
    // 传入四个参数的情况（第四个参数可能没传入）
    if (typeof isCapture === 'undefined' && (typeof fn === 'boolean' || typeof fn === 'undefined')) {
        const temp = fn
        fn = selector
        selector = void (0)
        isCapture = typeof temp === void (0) ? isCapture : temp
    } else {
        isCapture = typeof isCapture === 'undefined' ? false : isCapture 
    }
    let els = []
    if (typeof el === 'string') {
        els = document.querySelectorAll(el)
    } else if (typeof el === 'object' && !(el instanceof Array)) {
        if (el instanceof HTMLDocument || el instanceof Window) {
            els.push(el)
        } else {
            return
        }
    }
    
    
    
    els.forEach(el => {
        el.addEventListener(eventName, function(e) {
            const target = e.target
            /* 
                e.target： 事件触发的元素
                e.currentTarget：事件正在经过的元素
                console.log(this, target, e.currentTarget, this === target && this === e.currentTarget)
                e.target === e.currentTarget 说明当前触发的元素，就是绑定事件的元素
            */
            /*  如果是事件代理，则判断触发事件的元素，是否是指定的选择器selector；
                只有匹配指定的选择器，才触发事件的回调函数（不可能el的任意一个子元素触发事件都执行回调）；
            */
            if (selector) {
                /*
                当前元素是否被指定的选择器字符串选择;
                意思就是，selector作为选择器的时候，能否选中target元素
                */
                if (target.matches(selector)) {
                    fn.call(target, e)
                }
            } else {
                fn.call(target, e)
            }
        }, isCapture)
    })
}