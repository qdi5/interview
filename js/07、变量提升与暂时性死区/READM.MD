# 变量提升与暂时性死区
## 从变量提升说起
在"var"时代，有一个特别的现象：**不管我们的变量声明是写在程序的哪个角落，最后都会被提到作用域的顶端去。**
```js
console.log(num) // undefined
var num = 1
```
以上代码等价于：
```js
var num 
console.log(num)
num = 1
```
在函数作用域里，也会有类似的现象发生：
```js
function getNum() {
    console.log(num) // undefined
    var num = 1
}
```
因为 **函数内部的变量声明会被提升至函数作用域的顶端**。上面这个例子其实等价于：
```js
function getNum() {
    var num
    console.log(num)
    num = 1
}
```    

## 变量提升的原理    

> 事实上，JS也是有编译阶段的，它和传统语言的区别在于，JS不会早早地把编译工作做完，而是一边编译一边执行。简单来说，所有的JS代码片段在执行之前都会被编译，只是这个编译的过程非常短暂（可能就只有几微妙、或者更短的时间），紧接着这段代码就会被执行。    

正是在这个短暂的**编译阶段**里，JS引擎会收集所有的变量声明，并且提前让声明生效。至于剩下的语句，则需要等到执行阶段、等到执行到具体的某一句的时候才会生效。这就是变量提升背后的机制。    

## 被禁用的变量提升

**let和const不存在变量提升。**
```js
console.log(num) // 报错
let num = 1
```
用let和const声明的变量，它们的声明生效时机和具体代码的执行时机保持一致。防止忘记被声明的变量无法在开发阶段被明显地察觉出来，而是以undefined这样危险的形式藏匿在你的代码里。为了减少运行时错误，防止暗中使坏的undefined带来不可预知的问题，ES6特意将"声明前不可用"这一点做了强约束。    

## 块作用域

我们把被一对花括号括起来的代码块称为一个代码块：
```js
    let me = 'xx'
    console.log(me) // 'xx'
```    

## let与const    
当我们用let声明变量时，变量会被绑定到块作用域上，而var是不感知块作用域的。    
```js
    {
        var me = 'xx'
        console.log(me) // 'xx'
    }
    console.log(me)  // 'xx'
```    

```js
{
    let me = 'xx'
    console.log(me) // 'xx'
}
console.log(me) // 报错
```    
## const关键字

const关键字和let具备相同的生命周期特性————用const声明的变量，也会被绑定到块作用域上。

```js
    {
        const me = 'xx'
        console.log(me) // 'xx'
    }
    console.log(me) // 报错
```    

**const声明的变量，必须在声明同时被初始化，**否则会报错：
```js
const a // 这样就会报错
```

**const声明的变量，在赋值过后，值不可以再被更改。**否则同样会报错：
```js
const me = 'xx'
me = 'Bear'
```

这个规则在声明引用类型时有点不同————引用类型的属性值（包括数组的元素）可以被更改，只要你不修改引用的指向。比如这样：
```js
const me = {
    name: 'xx'
}
me.name = 'Bear' // 没问题
```    

```js
const me = {
    name: 'xx'
}
me = {
    name: 'Bear'
} // 报错
```    

## 暂时性死区

```js
var me = 'xx'
{
    me = 'bear'
    let me 
}
```    
ES6中有明确的规定：如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。假如我们尝试在生命前去使用这类变量，就会报错。    

这一段会报错的危险区域，有一个专属的名字，叫**"暂时性死区"**;

在上面这个demo里，如果我们想成功引用全局的me变量，需要把let声明给去掉：
```js
var me = 'xx'
{
    me = 'bear'
}
console.log(me)
```    

