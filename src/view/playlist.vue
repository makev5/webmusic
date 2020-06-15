<template>
<div>
  <!-- banner -->
  <div class="top-card" v-if="this.more">
      <div class="icon-wrap">
        <img :src="highquality.coverImgUrl" alt="">
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title"> {{ highquality.name }} </div>
        <div class="info">
          {{highquality.description}}
        </div>
      </div>
      <img :src="highquality.coverImgUrl" alt="" class="bg">
      <div class="topbg"></div>
  </div>
  <!-- tab -->
  <div class="tab-container">
    <div class="tab-bar">
      <ul class="tab-name">
        <li v-for="(item, index) in tablist" :key="index" :class="{active:item==tag}" @click="changeTag(item)">{{item}}</li>
      </ul>
    </div>
    <div class="tab-content">
      <ul class="recommend">
      <li v-for="(item, index) in songList" :key="index" @click="getsongList(item.id)">
        <div>
          <p class="desc">播放量：{{item.playCount | filterNum}}</p>
          <img :src="item.coverImgUrl" alt="" srcset="">
          <p class="name">
            {{item.name}}
          </p>
          <i class="iconfont icon-bofang"></i>
        </div>
      </li>
    </ul>
    </div>
  </div>
  <!-- 分页 -->
  <el-pagination
    background
    :current-page="currentPage"
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    @current-change="handleCurrentChange"
    >
  </el-pagination>
</div>
</template>

<script>
export default {
  name: 'playlist',
  created() {
    // 精品歌单
    this.getHighquality() 
    // 歌单列表
    this.getPlaylist()
  },
  data () {
    return {
      tag: '全部',
      tablist: ['全部', '欧美', '华语', '流行', '说唱', '摇滚', '民谣', '电子', '轻音乐', '影视原声', 'ACG', '怀旧', '治愈', '旅行'],
      songList: [],
      highquality:{},
      more: true, // 是否有精品歌单
      currentPage: 1,
      total: 0,
      pageSize: 10
    }
  },
  methods:{
    // 精品歌单
    getHighquality() {
      this.$axios.get('https://autumnfish.cn/top/playlist/highquality', {
        params: {
          limit: 1,
          cat: this.tag
        }
      }).then(res=>{
        this.more = res.data.more
        this.highquality = res.data.playlists[0]
      })
    },
    // 歌单列表
    getPlaylist() {
       this.$axios.get('https://autumnfish.cn/top/playlist', {
        params: {
          limit: 10,
          offset: (this.currentPage-1) * 10,
          cat: this.tag
        }
      }).then(res=>{
        this.total = res.data.total
        this.songList = res.data.playlists
      })
    },
    // 切换标签
    changeTag(val) {
      this.tag = val
      this.currentPage = 1
    },
    // 得到歌单详情
    getsongList(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    // 分页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getPlaylist()
    }
  },
  // 监听数据是否发生变化
  watch: {
    tag() {
      this.getHighquality()
      this.getPlaylist()
    }
  }
}
</script>

<style scoped>
  .top-card{
    padding: 20px;
    height: 200px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .topbg{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
  }
  .icon-wrap{
    margin-right: 20px;
    z-index: 1;
  }
  .icon-wrap img{
    width: 160px;
    height: 160px;
  }
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    filter: blur(20px);
  }
  .content-wrap{
    z-index: 1;
  }
  .tag{
    color: #dfac67;
    border: 1px solid #dfac67;
    width: 100px;
    height: 30px;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    line-height: 30px;
    cursor: pointer;
  }
  .title{
    color: #fff;
    padding-top: 10px;
  }
  .info{
    color: #888482;
    font-size: 14px;
    padding-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }
  .tab-container{
    padding-top: 30px;
  }
  .tab-name{
    list-style: none;
    margin: 0;
    display: flex;
    justify-content: flex-end;
  }
  .tab-name .active{
    color: #DD6D60 !important;
  }
  .tab-name li{
    margin-right: 20px;
    font-size: 15px;
    color: grey;
    margin-right: 20px;
    cursor: pointer;
  }

  .recommend{
    padding: 0;
    list-style: none;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
  }
  .recommend li:hover .desc{
    top: 0;
    transition: all .5s;
  }
  .recommend li{
    position: relative;
    width: 200px;
    margin: 10px;
    overflow: hidden;
  }
  .recommend li img{
    width: 200px;
    height: 200px;
    border-radius: 5px;
  }
  .name{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 14px;
    margin: 0;
  }
  .desc{
    position: absolute;
    top: -50px;
    left: 0;
    color: #fff;
    background: rgba(0, 0, 0, .5);
    width: 100%;
    max-height: 50px;
    box-sizing: border-box;
    margin: 0;
    padding: 5px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .recommend .icon-bofang{
      position: absolute;
      bottom: 40px;
      right: 20px;
      display: inline-block;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 40px;
      font-size: 22px;
      font-weight: 700;
      color: #dd6d60;
      border-radius: 50%;
      opacity: 0;
  }
  .recommend li:hover .icon-bofang{
    opacity: 1;
    background: hsla(0,0%,100%,0.8);
    transition: all ease-in-out .5s;
  }
  .el-pagination{
    margin-top: 50px;
    text-align: center;
  }
</style>

<style>
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #dd6d60 !important;
}
</style>
