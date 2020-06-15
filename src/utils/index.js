import Vue from 'vue'

// 播放量
Vue.filter('filterNum', val => {
    return val / 10000 > 10 ? parseInt(val/10000) + "万":val
})

// 歌曲时长
Vue.filter('filterTime', cellValue => {
    var mm = parseInt(cellValue / 1000 / 60)
    mm = mm >= 10? mm: '0' + mm
    var ss = parseInt(cellValue/1000%60)
    ss = ss >= 10 ? ss : '0' + ss
    return mm+':'+ss
})

// 年月日
Vue.filter('formatDate1', now=>{
    var d = new Date(now)
    var year = d.getFullYear()
    var month = d.getMonth()+1
    var date = d.getDate()
    var hour = d.getHours()
    var minute = d.getMinutes()
    var second = d.getSeconds()
    if(month<10) {
      month = '0' + month
    }
    if(date<10){
      date = '0' + date
    }
    return year + '-' + month + '-' + date
})

// 年月日时分秒
Vue.filter('formatDate',now=>{
    var d = new Date(now)
    var year = d.getFullYear()
    var month = d.getMonth()+1
    var date = d.getDate()
    var hour = d.getHours()
    var minute = d.getMinutes()
    var second = d.getSeconds()
    if(month<10) {
      month = '0' + month
    }
    if(date<10){
      date = '0' + date
    }
    if(hour<10) {
      hour = '0' + hour
    }
    if(minute<10){
      minute = '0' + minute
    }
    if(second<10){
      second = '0' + second
    }
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
})

//数组转字符串用/分隔
Vue.filter('tag', val=>{
    return val.join('/')
})