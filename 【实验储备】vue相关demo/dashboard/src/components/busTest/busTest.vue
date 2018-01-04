<template>
  <div class="hello">
    <div>我是组件1：<com-one></com-one></div>
    <div>我是组件2：<com-two></com-two></div>
  </div>
</template>

<script>
import ComOne from './com_one'
import ComTwo from './com_two'
export default {
  name: 'HelloWorld',
  components: {
    'com-one': ComOne,
    'com-two': ComTwo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
