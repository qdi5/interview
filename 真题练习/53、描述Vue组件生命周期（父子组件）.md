## Vue组件的生命周期
**beforeCreate**

**created**

**beforeMounted**

**Mounted**

**beforeUpdate**

**updated**

**beforeDestroy**

**destroyed**


一、父子组件嵌套的情况
创建：父组件 - 子组件
渲染：子组件 - 父组件
父子嵌套组件的层级如下：（仅仅代表层级）
```javascript
    <App>
        <Input></Input>
        <List>
            <child-component/>
        </List>
    </App>
```
以上表示，app组件里包含了有Input和List组件，List组件包含了child-component组件；它们之间挂载、更新和销毁的钩子函数执行顺序如下：

**挂载阶段：**
- app created
- list created
- child-component created
- child-component mounted
- list mounted
- app mounted

**更新阶段：**

- app before update
- list before update
- list updated
- app updated

**List销毁阶段：**

- app before update
- list before destroy
- child-component beforeDestroy
- child-component destroyed
- list destroyed
- app updated

由于List组件是在App组件里销毁，所以触发了App的更新阶段的钩子函数
