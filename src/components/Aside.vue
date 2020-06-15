<template>
  <el-aside width="200px">
    <ul class="nav">
      <router-link tag="li" :to="item.path" v-for="(item, index) in list" :key="index">
        <i :class="item.icon"></i>{{item.name}}
      </router-link>
    </ul>
  </el-aside>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      list: [
        {
          path: '/discovery',
          name: '发现音乐',
          icon: 'iconfont icon-CN_NetEasemusic'
        },
        {
          path: '/playlists',
          name: '推荐歌单',
          icon: 'iconfont icon-ic_queue_music_px'
        },
        {
          path: '/music',
          name: '最新音乐',
          icon: 'iconfont icon-audio'
        },
        {
          path: '/mvs',
          name: '最新MV',
          icon: 'iconfont icon-shipin'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .el-aside{
    background-color: #ededed;
  }
  .nav{
      margin: 0;
      padding: 0;
  }
  .nav li{
      list-style: none;
      font-size: 18px;
      height: 60px;
      line-height: 60px;
      text-align: center;
  }
  .nav li:hover{
      background-color: #e7e7e7;
      cursor: pointer;
  }
  .nav li .iconfont{
      font-size: 20px;
      margin-right: 10px;
  }
  .nav .router-link-active{
      color: #dd6d60;
  }
</style>
