## Promise
Promise会接收一个执行器，在这个执行器里，我们需要把目标的异步任务给“填进去”。
在Promise实例创建后，执行器里的逻辑会立即执行，在执行的过程中，根据异步返回的结果，决定如何使用resolve或reject来改变Promise实例的状态。Promise实例有三种状态：
- pending状态，表示进行中。这是Promise实例创建后的一个初始态；
- fulfilled状态，表示成功完成。这是我们在执行器中调用resolve后，达成的状态；
- rejected状态，表示操作失败、被拒绝。这是我们在执行器中调用reject后，达成的状态。