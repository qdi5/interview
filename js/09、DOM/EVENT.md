# DOM事件体系
- DOM事件流
- 事件对象
- 事件代理
- 自定义事件

## DOM事件流

### 前置知识
1. `事件流：它描述的是事件在页面中传播的`顺序
2. `事件：它描述的是发生在浏览器里的动作`。这个动作可以是用户触发的，也可以是浏览器触发的。像点击（click）、鼠标悬停（mouseover）、鼠标移走（mousemove）这些都是事件。    
3. `事件监听函数：事件发生后，浏览器如何响应——用来应答事件的函数，就是事件监听函数，也叫事件处理程序。`    

### 一个事件的旅行
W3C标准约定了一个事件的传播过程要经过以下三个阶段：    
1. 事件捕获阶段
2. 目标阶段
3. 事件冒泡阶段

## 事件对象
### 1.currentTarget
**它记录了事件当下正在被哪个元素接收**，即"正在经过哪个元素"。这个元素是一直在改变的，因为事件的传播毕竟是个层层穿梭的过程。    

如果事件处理程序绑定的元素，与具体的触发元素是一样的，那么函数中的`this`、event.`currentTarget`和event.`target`三个值是相同的。

### 2.target
**指触发事件的具体目标，是事件的真正来源**    
就算事件处理程序没有绑定在目标元素上、而是绑定在了目标元素的父元素上，只要它是由内部的目标元素冒泡到父容器上触发的，那么我们仍然可以通过target来感知到目标元素才是事件真实的来源。    

### 3.preventDefault阻止默认行为
这个方法用于阻止特定事件的默认行为，如`a`变迁标签的跳转等。
```js
    e.preventDefault()
```    

### 4.stopPropagation不再派发事件
这个方法用于终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。
```js
e.stopPropagation()
```    

### 5.手动创建事件对象
方法一，使用Event构造函数    

```js
var event = new Event('build')
var elem = document.getElementById('elem')
elem.addEventListener('build', function (e) {
    console.log(`触发了build事件`)
}, false)
elem.dispatchEvent(event)
```    
方法二，使用CustomEvent构造函数，并给event对象添加数据
```js
var event2 = new CustomEvent('build2', {'detail': '2021-04-18' })
elem.addEventListener('build2', eventHandler, false)
function eventHandler(e) {
    console.log(e.detail); // '2021-04-18' 
}
elem.dispatchEvent(event2)
```

## 事件代理
利用事件的冒泡特性，把多个子元素的同一类型的监听逻辑，合并到父元素上通过一个监听函数来管理的行为，就是事件代理。通过事件代理，我们可以减少内存开销、简化注册步骤，大大提高开发效率。

谨记，一旦在 DOM 系列面试题中遇到符合下列三个特征的问题：

- 要你安装监听某一个事件的监听函数（事件相同）
- 监听函数是被安装在一系列具有相同特征的元素上（元素特征相同，一般来说就是具备同样的父元素）
- 这一系列相同特征元素上的监听函数还干的都是一样的事儿（监听逻辑相同/雷同）    

这时候你脑子里一定要冒出这四个大字——事件代理！

