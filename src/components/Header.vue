<template>
  <el-header>
    <div class="left">
      <i class="iconfont icon-home" @click="toHome"></i>
      <i class="iconfont icon-quanping_huaban" @click="getFullCreen"></i>
      <div class="history">
        <span class="iconfont icon-Left" @click="$router.go(-1)"></span>
        <span class="iconfont icon-right" @click="$router.forward()"></span>
      </div>
    </div>
    <!-- 搜索 -->
    <div class="search-wrap">
      <el-input
        v-model="searchValue"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        size="mini"
        @change="search"
      >
      </el-input>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      searchValue: '',
      n: 0
    }
  },
  methods: {
    // 返回首页
    toHome() {
      if(this.$route.path === '/discovery') return
      this.$router.push('/discovery')
    },
    // 点击实现全屏和退出全屏
    getFullCreen() {
      this.n++
      this.n % 2 == 0 ? this.outFullCreen(document) : this.inFullCreen(document.documentElement)
    },  

    inFullCreen(element) {
        let el = element
        let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
        if (typeof rfs != 'undefined' && rfs) {
            rfs.call(el)
        } else if (typeof window.ActiveXObject != 'undefined') {
            let wscript = new ActiveXObject('WScript.Shell')
            if (wscript != null) {
            wscript.SendKeys('{F11}')
            }
        }   
    },

    outFullCreen(element) {
        let el = element
        let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
        if (typeof cfs != 'undefined' && cfs) {
            cfs.call(el)
        } else if (typeof window.ActiveXObject != 'undefined') {
            let wscript = new ActiveXObject('WScript.Shell')
            if (wscript != null) {
            wscript.SendKeys('{F11}')
            }
        }
    },
    search () {
      this.$router.push(`result?keywords=${this.searchValue}`)
    }
  }
}
</script>

<style scoped>
  .el-header{
    background-color: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .iconfont{
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    border-radius: 50%;
    background-color: #dd6d60;
  }
  .icon-home{
    margin-right: 10px;
  }
  .iconfont.icon-quanping_huaban{
    background-color: #84bb58;

  }
  .history{
    height: 30px;
    float: right;
    margin-left: 130px;
  }
  .history .iconfont{
    display: inline-block;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    line-height: 30px;
  }
  .history .iconfont:hover{
    background-color: #ebebeb;
    border-radius: 50%;
  }
  .history span{
    background-color: #f9f9f9;
    font-size: 20px;
    color: grey;
  }
  .el-input{
    outline: none;
  }
</style>
