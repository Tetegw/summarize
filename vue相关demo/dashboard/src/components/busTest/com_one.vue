<template>
  <input type="text" v-model="com1Value" @input="com1change">
</template>

<script>
import bus from '@/store/bus.js'
export default {
  data () {
    return {
      com1Value: ''
    }
  },
  methods: {
    com1change () {
      bus.$emit('com1change', this.com1Value)
    }
  }
}
</script>

<style>

</style>
