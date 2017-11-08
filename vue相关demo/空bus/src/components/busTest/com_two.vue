<template>
  <span>{{com2Value}}</span>
</template>

<script>
import bus from '@/store/bus.js'
export default {
  data () {
    return {
      com2Value: ''
    }
  },
  created () {
    bus.$on('com1change', (value) => {
      this.com2Value = value
    })
  }
}
</script>

<style>

</style>
