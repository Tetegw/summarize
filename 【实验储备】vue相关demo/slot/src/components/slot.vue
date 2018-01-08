<template>
  <v-template>
    <div slot="header">我是修改后的头部</div>
    <div>我是修改后的内容</div>
  </v-template>
</template>

<script>
import Template from './template.vue'
export default {
  components: {
    'v-template': Template
  }
}
</script>
