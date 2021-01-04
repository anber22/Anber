# WebWechatMPEnd

物联网分布式 前端项目微信公众号端

# Git Tag发布方案

#### **!!!release为主发布分支!!!**

#### **!!!release为主发布分支!!!**

#### **!!!release为主发布分支!!!**

---

#### **!!!test为测试分支!!!**

#### **!!!test为测试分支!!!**

#### **!!!test为测试分支!!!**

---

## 产品版本号

功能开发版本号基本分为三个级别. 例如: v1.2.3

第一个数字为大功能版本代码, 基本为一个整个功能模块的迭代或者一个完整的功能逻辑和流程的迭代.

第二个数字为基本功能迭代代码, 基本为一个业务流程或者比较小模块的任务描述. 并且不同第二级版本之间的业务逻辑和模块应互不影响和干扰. (若有相关的, 应告知产品修改)

第三个数字为功能内部细节需求代码, 基本为每一个小需求和要求点. 必须要有清晰的功能描述, 和业务流程以及逻辑.

![版本号](http://hezijian6338.ddns.net:8999/blog/TJMHMw.png)



## 功能流程

1. 清空本地 git修改状态

   ```
   git checkout .
   ```

   

2. 切换 release分支

   ```
   git checkout release
   ```

   

3. 拉取最新版本

   ```
   git pull origin release
   ```

   

4. 本地构建当前版本的分支 (假设现在 v1.2.3)

   ```
   git checkout -b rv1.2.3
   ```

   

5. (开发完成后) 确认本地代码

   ```
   (git add .)
   git commit -m "ZW-777 注释完整内容"
   (ZW-777 为 Jira的任务标识)
   (!!!不要提交!!!)
   ```

   

### 发布

   6. 回到 release分支且合并代码

       ```
       git checkout release
       git merge rv1.2.3
       ```
       
       
   
   7. 提交代码并且标注版本 tag
   
      ```
      git tag v1.2.3 -m "版本内容简介"
      (删除标签: git tag -d v1.2.3)
      (删除远程标签: git push origin --delete <tagname>)
      git push origin release
      git push origin v1.2.3
      ```

   

   ### 测试

   6. 回到 test分支且合并代码

      ```
      git checkout test
      git merge rv1.2.3
      ```

      

   7. 提交代码

      ```
      git push origin test
      ```

      

### 多人协同

1. 谁版本号小, 谁先合并到 test分支 (v1.2.1 > v1.2.2)
2. (若代码冲突) 版本号大则兼容版本号的小代码
3. (代码通过后) 小版本号先合并到 release并且打 tag
4. (正式版测试通过后) 大版本号拉取 release最新分支与本地开发分支合并后, 发布到 test分支进行测试
5. (测试版本通过后) 走 3.



![流程图](http://hezijian6338.ddns.net:8999/blog/jgnfDH.png)

## 修复流程

**功能修复拥有自己的分支, 与开发分支互不干涉 !!! **



1. 清空本地 git修改状态

   ```
   git checkout .
   ```

   

2. 切换 release分支

   ```
   git checkout release
   ```

   

3. 拉取最新版本

   ```
   git pull origin release
   ```

   

4. 本地构建当前版本的分支 (假设现在 b1.2.3)

   ```
   git checkout -b rb1.2.3
   ```

   

5. (开发完成后) 确认本地代码

   ```
   (git add .)
   git commit -m "ZW-777 注释完整内容"
   (ZW-777 为 Jira的 BUG任务标识)
   (!!!不要提交!!!)
   ```




### 发布

   6. 回到 release分支且合并代码

      ```
      git checkout release
      git merge rb1.2.3
      ```

      

   7. 提交代码并且标注版本 tag

      ```
      git tag b1.2.3 -m "版本内容简介"
      (删除标签: git tag -d b1.2.3)
      (删除远程标签: git push origin --delete <tagname>)
      git push origin release
      git push origin b1.2.3
      ```

   

   ### 测试

   6. 回到 test分支且合并代码

      ```
      git checkout test
      git merge rb1.2.3
      ```

      

   7. 提交代码

      ```
      git push origin test
      ```




### 多人协同

1. 谁版本号小, 谁先合并到 test分支 (b1.2.1 > b1.2.2)

2. (若代码冲突) 版本号大则兼容版本号的小代码

3. (代码通过后) 小版本号先合并到 release并且打 tag

4. (正式版测试通过后) 大版本号拉取 release最新分支与本地开发分支合并后, 发布到 test分支进行测试

5. (测试版本通过后) 走 3.

   

![流程图](http://hezijian6338.ddns.net:8999/blog/m10WZf.png)


