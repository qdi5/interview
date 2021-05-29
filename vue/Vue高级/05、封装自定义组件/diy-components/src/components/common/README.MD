# h5移动端上传组件
1、自定义组件使用v-model；
  a、在组件上设置model属性为一个对象，将这个对象的prop属性设置为变量a
  b、在props里，设置与变量a同名的属性
  c、同步数据；使用Vue.$emit('input', data) 将数据同步给v-model绑定的变量b
  d、由于Vue组件单向数据流的特点，父组件的值变化，会同步给子组件，所以当变量b改变后，也会同步更改变量a
2、FileReader读取文件；reader.readAsDataURL();reader.readAsText()
- reader.readAsDataURL
读取指定的`Blob`或`File`的内容，返回一个base64编码的字符串

3、render函数；createElement()
`createElement(tag, attr, children)`    
`tag`：一个HTML标签名、组件选项对象，或者resolve了上述任何一种的一个async函数。必填项。    
`attr`：一个与模板中attribute对应的数据对象。可选 
```javascript
  { 
    // 与'v-bind:class'的API相同
    // 接受一个字符串、对象或字符串和对象组成的数组
    'class': {
      foo: true,
      bar: false
    },
    // 接受一个字符串、对象，或对象组成的数组
    style: {
      color: 'red',
      fontSize: '14px'
    },
    // 普通的HTML attribute
    attrs: {
      id: 'foo'
    },
    // 组件 prop
    props: {
      myProp: 'bar'
    },
    // DOM property
    domProps: {
      innerHTML: 'baz'
    },
    // 事件监听器在`on`内，但不再支持修饰器
    on: {
      click: this.clickHandler
    },
    // 仅用于组件，用于监听原生事件，而不是组件内部使用 vm.$emit触发的事件
    nativeOn: {
      click: this.nativeClickHandler
    },
    // 自定义指令
    directives: [
      {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],
    scopedSlots: {
      default: props => createElement('span', props.text)
    },
    // 插槽
    slot: 'name-of-slot',
    // 其他特殊顶层  property
    key: 'myKey',
    ref: 'myRef',
    // 如果在渲染函数中给多个元素应用了相同的ref名，那么$refs.myRef会变成一个数组
    refInFor: true

  }  
```
`children`：子级虚拟节点，由createElement()构建而成，也可以使用字符串来生成"文本虚拟节点"