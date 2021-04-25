=========================================================================================
## 命名规范 ##
1. 在config里面的组件名需要大写开头 用-表示从属关系  
   示例
   父-子
2. 除了1.之外的命名都要遵循驼峰命名

## 组件使用规范 ##
1. 页面引入组件规范：组件名用大写
   示例
   import Search from 'cmp/search/Search'



## css规范 ##
1. 引入css文件在style引入
   示例
  <style scoped src='./login.css'>

## nav 编辑按钮使用方法 ##
1. 在@/router/index.js 找到要加按钮的页面，在meta 里面的 edit : true 不需要则为false
2. 在对应页面的methods里面加上 toeEdit(){} 
3. end