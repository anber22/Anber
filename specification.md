===============================================================================
## 项目规范文档
## 看这里 ⬇️⬇️ ## 
 - 该文档是在项目中期开始定义编写，用于基于eslint的基础上补充的一些代码或者编程习惯的规范
 - 有些已经存在于项目且不符合规范的问题，如果各位同事发现请及时通知梁工，对其按照规范进行修改
 - 前端项目会不定期进行 code review ，我们可以通过审查代码来讨论并检查我们的代码，可以总结出更优秀的代码规范
 - 我们可以对其他同事的代码进行提出疑问，对该文档进行规范补充
 - ⬅️⬅️ 整洁优秀的代码
 - 各位前端同事加油
## 命名规范 ##
0. 所有的命名必须为英文命名，必须能自解释（即看名字能大概知道他的作用），禁止拼音，禁止加数字
1. 在config里面的组件名需要大写开头 用-表示从属关系  
   示例
   父-子
2. 图片的命名用-隔开，全小写
3. css的class命名用-隔开，全小写
4. 组件 components 文件夹下面的文件夹命名是小驼峰
   文件名的命名是 大驼峰
5. 页面文件夹 views 下的文件夹和文件名都是小驼峰
6. 命名缩写  可用单词 ['button','message','image','background'] => ['btn','msg','img','bg']
7. 除了以上之外的命名都要遵循小驼峰命名
8. 涉及到资源的关键字命名 用 resource  不是 resourse
9. prop内的参数命名不可以命名为data
## 开发规范 ##
1. 在utils文件在下面的工具js文件，需要用class的格式来编写
   不是在项目中特别频繁用到的工具，不允许直接暴露并且new 出来，需要用到的时候再new
   禁止在vue实例中引入工具
2. 禁止使用switch
3. 在协同开发的页面内，先开发者需要写好布局，再开始开发
   在页面的每个dom的大节点（功能块）需要用 注释上模块名称 开始 和结束位置
   示例：
      <!-- 中间 地图 start -->
      <div class="homepageScreen-center">
        <!-- 统计 start-->
        <div class="homepageScreen-statistics">
          <div class="statistics-content">
            <Statistics :data="equipCountings" />
          </div>
          <div class="statistics-content">
            <Statistics :data="branchesCountings" />
          </div>
          <div class="statistics-content">
            <Statistics :data="equipTrouble" />
          </div>
        </div>
        <!-- 统计 end -->
      </div>
      <!-- 地图 end -->
4. 如果需要在dom里面的值需要调用methods的方法进行处理
   不能直接调用methods的方法
   需要在computed进行处理调用methods的方法
   computed: {
      changeDate: function() {
         return function(val) {
         // 日期格式转换
         return this.dateFormat(val)
         }
      }
   },
5. 在编写表单页面的时候，无论几个操作项，都是采用多个dom的方案来编写，不采用定义在data用遍历的方式来构建页面

## 引入文件 ##
1. 在<script>标签内引入文件用 import，不用 require
   加载文件的路径用@开头 表示在 ../src 文件夹下
   加载组件需要用cmp开头 表示在 ../src/components 文件夹下

## 组件使用规范 ##
1. 页面引入组件规范：组件名用大写
   示例
   import Search from 'cmp/search/Search'

## css规范 ##
1. 引入css文件在style引入
   示例
   <style scoped src='./login.css'>
   这样的话在dom树渲染的时候再加载css，不需要进到页面就加载
   在开发过程中css可以先写在vue页面的style标签内，
   开发调试完成后需要转移到vue文件的同级css文件内
2. 在组件或者页面内使用的样式需要在<style>标签内加上 scoped  
   传送门：https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles
   如果需要影响到UI框架的的样式则新开一个<style>标签
   如果只需要影响到本页面的UI组件，需要在UI组件的class前加上本页面的class名，或者是UI组件的父元素的class名，前提是这个class名必须是在父页面或者子组件唯一
3. 非动态行内样式不可以写在行内，，需要对应class在<style>标签内

## video视频组件使用方法
1. 引入组件 import Video from 'cmp/video/video.vue'
2. 在dom上使用组件，传入imei：'123456',imei为String类型
   <Video :imei="imei" /> 

## socket使用说明 ## /src/utils/socket.js  示例： /src/components/globalWarning/GlobalWarning
1. 在construct里面定好开发环境和正式环境的用户名跟用户密码，用于连接socket
2. 开启socket需要传入 订阅频道，订阅频道的dom订阅着对象（订阅频道消息触发会把消息分发给订阅的dom订阅着对象）
3. 退出页面 ， 需要退订socket的对应频道的dom订阅者 ， 如果退订之后这个频道的dom订阅者数组为空，就直接将这个频道删除