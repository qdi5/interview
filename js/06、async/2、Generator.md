# Generator
调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。以后，每次调用遍历器对象的`next`方法，就会返回一个有着`value`和`done`两个属性的对象。`value`属性表示当前的内部状态的值，是`yield`表达式后面那个表达式的值；`done` 属性是一个布尔值，表示是否遍历结束。

## yield表达式    
`yield`表达式就是暂停标志。
遍历器对象的`next`方法的运行逻辑如下：
1. 遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。
2. 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield表达式`。
3. 如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。
4. 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

### 生成器函数Generator
```js
    const https = require('https')

    function httpPromise(url) {
        return new Promise(function(resolve, reject){
            https.get(url, res => {
                resolve(data)
            }).on('error', err => {
                reject(error)
            })
        })
    }
```
```js
    function* httpGenerator () {
        let res1 = yield httpPromise(url1)
        console.log(res1)
        let res2 = yield httpPromise(url2)
        console.log(res2)
        let res3 = yield httpPromise(url3)
        console.log(res3)
        let res4 = yield httpPromise(url4)
        console.log(res4)
    }
```    
封装一个运行生成器的简单版函数；标准版的封装，可以查看[co](https://github.com/tj/co)库。反复调用调用迭代器的next方法、直到返回值中的done为true为止。
```js
    function runGenerator (gen) {
        var it = gen(), ret

        (function iterate(val) {
            ret = it.next(val)

            if (!ret.done) {
                if ('then' in ret.value) {
                    ret.value.then(iterate)
                }
            }
        })()
    }
    runGenerator(httpGenerator)
```    
当我们把httpGenerator传进去后，会发生如下过程：
1. 为传入的Generator创建它对应的迭代器it。然后，我们第一次调用iterate函数，入参为空。
2. iterate函数内部，调用it的next方法，生成器函数开始执行，执行到第一个yield关键字处的逻辑执行完后暂停。它会返回一个包含了httpPromise(url1)这个调用返回的promise对象（我们下文称promise1）、以及一个done:false的标识，用来表示当前生成器函数内部的逻辑还没执行完（大致如下）：
```js
    value:
      Promise {
          <pending>
      },
      done: false
```    
因为done为false，所以我们会进一步判断当前拿到的是否是一个promise对象（根据它有没有then属性）。判断为真后，我们在promise1的then方法里传入iterate函数本身。
3. promise1的then方法里的iterate函数调用，拿到了promise1的返回结果（即针对url1的请求结果）作为入参。it.next被第二次调用，生成器函数被"唤醒"了。注意，被"唤醒"后的生成器函数，按照流程走，它执行的第一个语句就是：
```js
let res1 = yield httpPromise(url1)
```    
这一步会把next(val)中的val传给res1,而val，恰恰就是promise1的返回结果。
而后，生成器函数会继续执行到第二个yield关键字处，执行完后暂停。    
此时next方法返回一个包含了httpPromise(url2)这个调用返回的promise对象（我们下文称promise2）、以及一个done:false的标识（用来表示当前生成器函数内部的逻辑还没执行完）。因为done为false，所以我们进一步判断当前拿到的是否是一个promise对象（根据它有没有then属性）。判断为真后，我们在promise2的then方法里传入iterate函数本身。    

4.循环上述过程，直到生成器内部逻辑执行完为止。    
通过"自动执行"生成器函数对应迭代器的next方法，我们把异步的写法进一步优化了。它不再需要地狱般的回调，甚至不再需要Promise长长的链式调用，而是可以像写同步代码一样简单、清晰地实现异步特性！    
