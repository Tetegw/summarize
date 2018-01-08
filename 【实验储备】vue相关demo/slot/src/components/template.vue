<template>
  <div class="content">
    <div class="header"><slot name="header">我是默认标题</slot></div>
    <div class="container"><slot>我是默认内容</slot></div>
    <div class="footer"><slot name="footer">我是默认底部</slot></div>
  </div>
</template>

<style>
.content{
  margin: 0 auto;
  width: 200px;
}
.header{
  height: 40px;
  line-height: 40px;
  border: 1px solid #999;
}
.container{
  height: 140px;
  padding: 20px 0;
  border: 1px solid #999;
}
.footer{
  height: 40px;
  line-height: 40px;
  border: 1px solid #999;
}
</style>
