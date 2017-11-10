<template>
  <div class="hello">
    <ul>
      <li><a href="javascript:void(0)" @click="changeCom('alert')">Alert</a></li>
    </ul>
    <fepawn-alert 
    :show="alertShow" 
    :title="alertTitle"
    :content="alertContent" 
    :confirmValue="alertConfirmValue"
    @confirm="alertConfirm">
    </fepawn-alert>
  </div>
</template>

<script>
import Alert from '@/components/Alert'
export default {
  name: 'HelloWorld',
  data () {
    return {
      alertShow: false,
      alertTitle: '错误信息',
      alertContent: '对不起，您的账号不存在！',
      alertConfirmValue: '确定'
    }
  },
  methods: {
    changeCom (params) {
      switch (params) {
        case 'alert':
          this.alertShow = true
          break
        default:
          break
      }
    },
    alertConfirm () {
      this.alertShow = false
    }
  },
  components: {
    'fepawn-alert': Alert
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
