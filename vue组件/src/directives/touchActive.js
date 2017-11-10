// 点击态自定义指令
const touchActive = {
  inserted (el) {
    el.addEventListener('touchstart', function (e) {
      el.classList.add('touch-active')
    })
    el.addEventListener('touchmove', function (e) {
      var rect = el.getBoundingClientRect()
      // 移出元素时，取消active状态
      if (e.changedTouches[0].pageX < rect.left || e.changedTouches[0].pageX > rect.right || e.changedTouches[0].pageY < rect.top || e.changedTouches[0].pageY > rect.bottom) {
        el.classList.remove('touch-active')
      }
    })
    el.addEventListener('touchcancel', function (e) {
      el.classList.remove('touch-active')
    })
    el.addEventListener('touchend', function (e) {
      el.classList.remove('touch-active')
    })
  }
}

export default touchActive
