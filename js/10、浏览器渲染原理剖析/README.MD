# 浏览器渲染原理剖析
## 1、从输入URL到页面加载完成，发生了什么？
域名解析-dns查询-服务器响应-浏览器接收资源-解析资源-渲染页面

## 2、浏览器的组成
![alt '浏览器组成'](https://cdn.ahafe.tech/github/5eba87ef00015a1e13141002.png '浏览器零部件')
浏览器的用户界面将用户的"指令"转交给浏览器引擎，浏览器引擎解析用户的"指令"，最终渲染引擎执行"解析后的指令"，呈现出可交互的网页；

## 3、浏览器内核分类
- Trident（IE）
- Gecko（火狐）
- Blink（Chrome、Opera）
- Webkit （Safari）

Blink也是基于WebKit内核衍生出来的分支。因此，WebKit是占据份额最大的浏览器内核，也是最具有学习意义的材料。

## 4、渲染引擎工作流解析
浏览器的渲染引擎承载着把静态资源转换为可视化界面的任务：
![](https://cdn.ahafe.tech/github/5eba8a370001156813220256.png)
渲染引擎的处理过程，主要包括以下几个具体流程：
![](https://cdn.ahafe.tech/github/5eba8a2e0001c87011440168.png)

整体来看，这五个过程分别完成了以下任务：

### 4.1、HTML解析 （生成DOM树）
在这一步浏览器对HTML文档进行解析，并在解析HTML的过程中发出了页面渲染所需的各种外部资源请求。

### 4.2、CSS解析 （生成CSSOM树）
浏览器将识别并加载所有的CSS样式信息

### 4.3、样式与结构合并（生成渲染树）
将样式信息和文档结构合并，最终生成页面render树（:after :before这样的伪元素会在这个环节被构建到DOM树中）；在这个过程中，浏览器还做了以下几件事：
- 1: 从DOM树的根节点开始遍历，筛选出所有**可见**的节点
- 2: 仅针对可见节点，为其匹配CSSOM中的CSS规则
- 3: 发射可见节点（连同其内容和计算的样式）
### 4.4、布局阶段（盒模型）
浏览器对渲染树进行遍历，将元素间嵌套关系以盒子模型的形式写入文档流。盒模型在布局过程中会计算出元素确切的大小和定位。计算完毕后，相应的信息被写回渲染树上，就形成了"布局渲染树"。同时，每一个元素盒子也都携带者自身的样式信息，作为后续绘制的依据。

### 4.5、页面绘制（目标界面）
在这一步中浏览器会根据我们前面处理出来的结果，把每一个页面图层转换为像素，并对所有媒体文件进行解码。

## 5、重排与重绘
### 5.1、重排    
当我们的操作引发了DOM几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是重排（也叫回流）。

简而言之，重排多数情况下是由**对元素几何属性的修改引发的**。
比如修改某个元素的宽度：
```js
var targetDom = document.getElementById('target');
targetDom.style.width = '200px';
```
这样的一个修改宽度的动作，不仅影响了盒模型本身的"占地面积"、还会影响整个页面中其他元素的布局形式。浏览器不得不重新针对布局信息进行计算，这就是典型的重排过程。    

当重排发生时，"重新来过"的流程如下所示：    
修改CSSOM —— 更新渲染树 —— 重布局 —— 重绘制；

### 还有什么动作会触发重排？
### 改变DOM树的结构
这里主要指的是节点的增减、移动等操作。
### 获取一些特定属性的值（重要）
如 `offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`、`scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`、`clientTop`、`clientLeft`、`clientWidth`、`clientHeight`等属性.    
这些属性有一个共性，就是需要通过**即时计算**得到。因此浏览器为了获取这些值，也会进行回流。    

当我们调用了**getComputedStyle**方法，或者IE里的**currentStyle**时，也会触发回流。原理是一样的，都为求一个"及时性"和"准确性"。   

```js
var targetDom = document.getElementById('target')
targetDom.style.width = '200px'
```    

## 5.2、什么是重绘
当我们对DOM的修改导致了样式的变化、却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（跳过了上图所示的回流环节）。这个过程叫做重绘。    
简而言之，重绘是由对元素绘制属性的修改引发的。
当重绘发生时，"重新来过"的流程图如下：    
修改CSSOM - 更新渲染树 - 重绘制

```js
var targetDom = document.getElementById('targetText')
targetDom.style.color = 'red'
```    
浏览器想要改变文字的颜色，只需要去变更像素点的色值即可，不涉及任何布局计算。因此，这是一个典型的重绘过程。    


