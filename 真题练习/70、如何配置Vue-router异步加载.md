```javascript
export default new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import('./../components/Navigator')
        }
    ]
})
```