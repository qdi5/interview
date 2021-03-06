# DOM
## 理解DOM
> 文档对象模型（DOM）是HTML和XML文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使程序中对该结构进行访问，从而改变文档结构，样式和内容。DOM将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。简言之，它会将web页面和脚本或程序语言链接起来。    ————MDN    

DOM实际上只是把HTML中各个标签定义出的元素以对象的形式包装起来。这样做的目的，就是确保开发者可以通过JS脚本来操作HTML。

## DOM不仅是一套接口，更是一套规范

DOM作为W3C规范的一部分，约束了浏览器中JS与HTML间交互的方式。使得我们可以在不同浏览器上用同一套API去操作HTML，而不必关系浏览器底层的实现差异。

## DOM树的解析
**DOM结构以树的形态存在**。
DOM中的元素节点:

### Document
Document就是指这份文件，也就是这份HTML文档的开端。当浏览器载入HTML文档，它就会成为**Document对象**

### Element
Element就是指HTML文件内的各个标签，像`<div>、<span>`这样的各种HTML标签定义的元素都属于Element类型。

### Text

Text就是指被各个标签包起来的文字，举个例子：
```html
<span>哈哈哈</span>
```
这里的"哈哈哈"被`<span>`标签包了起来，它就是这个Element的Text。

### Attribute
Attribute类型表示元素的特性。从技术角度讲，这里的特性就是说各个标签里的属性。

## 解析一棵DOM树

## DOM事件
- DOM事件流
- 事件对象
- 事件代理
- 自定义事件

### DOM事件流
#### 前置知识
1. `事件流：它描述的是事件在页面中传播的`顺序
2. `事件：它描述的是发生在浏览器里的动作`。这个动作可以是用户触发的，也可以是浏览器触发的。像点击（click）、鼠标悬停（mouseover）、鼠标移走（mousemove）这些都是事件。
3. `事件监听函数：事件发生后，浏览器如何相应——用来应答事件的函数，就是事件监听函数，也叫事件处理程序，`

**DOM2事件流**
### 一个事件的旅行
W3C标准约定了一个事件的传播过程要经过以下三个阶段：    
1. 事件捕获阶段
2. 目标阶段
3. 事件冒泡阶段

### 事件对象考点梳理
#### 1. currentTarget
**它记录了事件当下正在被哪个元素接收**，即"正在经过哪个元素"。这个元素是一直在改变的，因为事件的传播毕竟是个层层穿梭的过程。    

如果事件处理程序绑定的元素，与具体的触发元素是一样的，那么函数中的`this`、`event.currentTarget`和`event.target`三个值是相同的。我们可以以此为依据，判断当前的元素是否就是目标元素。

#### 2.target
指触发事件的具体目标，也就是最具体的那个元素，是事件的真正来源。

#### 3.preventDefault阻止默认行为
```js
e.preventDefault()
```
#### 4.stopPropagation不再派发事件
这个方法用于终止事件在传播过程的捕获、目标处理或冒泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。
```js
e.stopPropagation();
```    

#### 事件对象，是可以手动创建的
事件对象不一定需要你通过触发某个具体的事件来让它"自然发生"，它也可以手动创建：    
我们可以借助Event()构造函数，来创建一个新的事件对象Event。
```js
event = new Event(typeArg, eventInit)
```






