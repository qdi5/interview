# this
## this的指向
**this的指向是在调用时决定的，而不是在书写时决定的。这点和闭包恰恰相反**

### 区分"声明位置"与"调用位置"

## 特殊情境下的this指向
在三种特殊情境下，this会100%指向window：    
- 立即执行函数（IIFE）
- setTimeout中传入的函数
- setInterval中传入的函数 

在做this指向题的时候，第一步其实倒不该是老老实实去看this所在的函数属于哪个对象，而是应该**先定位this是否出现在了以上三种类型的函数里面**，如果是，那么**this就是指向window**

## 严格模式下的this指向
### 1、普通函数中的this在严格模式下的表现
```js
    'use strict'
    function showThis () {
        console.log(this)
    }
    showThis()  // undefined
```    
### 2、全局代码中的this在严格模式下的表现
```js
    'use strict'
        console.log(this) // window
        var name = 'bigbear'
        var me = {
            name: 'xiuyan',
            hello: function () {
                setTimeout(function(){
                    console.log(this) // window
                    console.log(`你好，我是${this.name}`)
                })
            }
        }
        me.hello()
```
**像以上这样处于全局代码中的this，不管它是否处于严格模式下，它的this都指向window**.setTimeout是在全局作用域下实现的，它的回调函数会首先被交付到全局对象手上。因此，函数中this的值，会被自动指向window

## 3、箭头函数的this指向
箭头函数中的this比较特别，它和严格模式、非严格模式啥的都没关系。它和闭包很相似，都是认"词法作用域"的家伙，由我们书写它的位置决定。

```js
var a = 1
var obj = {
  a: 2,
  func2: () => {
    console.log(this.a)
  },
  
  func3: function() {
    console.log(this.a)
  }
}

// func1
var func1  = () => {
  console.log(this.a)
}

// func2
var func2 = obj.func2
// func3
var func3 = obj.func3

func1() // 1
func2() // 1
func3() // 1
obj.func2() // 1
obj.func3() // 2
```
