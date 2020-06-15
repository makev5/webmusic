<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel :interval="5000" type="card" height="230px">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <img class="banner" :src="item.imageUrl" alt="" srcset="">
        </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <h3 class="title">推荐歌单</h3>
    <ul class="recommend">
      <li v-for="(item, index) in recommend" :key="index" @click="getsongList(item.id)">
        <div>
          <p class="desc">{{item.copywriter}}</p>
          <img :src="item.picUrl" alt="" srcset="">
          <p class="name">{{item.name}}</p>
          <i class="iconfont icon-bofang"></i>
        </div>
      </li>
    </ul>

    <!-- 最新音乐 -->
    <h3 class="title">最新音乐</h3>
    <ul class="music">
      <li v-for="item in music" :key="item.id">
        <div class="img-wrap" @click="getUrl(item.id)">
          <img :src="item.picUrl" alt="" srcset="">
          <i class="iconfont icon-bofang"></i>
        </div>
        <div class="info">
          <p class="song-name">{{item.name}}</p>
          <p class="singer">{{item.song.artists[0].name}}</p>
        </div>
      </li>
    </ul>

    <!-- 最新MV -->
    <h3 class="title">最新MV</h3>
    <ul class="mv">
      <li v-for="(item,index) in mvs" :key="index" @click="getmvDetail(item.id)">
        <div class="img-wrap">
          <img :src="item.picUrl" alt="" srcset="">
          <i class="iconfont icon-bofang"></i>
          <div class="num-wrap">
            <i class="iconfont icon-bofang"></i>{{item.playCount}}
          </div>
        </div>
        <div class="info">
          <p class="song-name">{{item.name}}</p>
          <p class="singer">{{item.artistName}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'discovery',
  created() {
    // 轮播图
    this.$axios.get('https://autumnfish.cn/banner').then(res => {
      this.banners = res.data.banners
    })
    // 推荐歌单
    this.$axios.get('https://autumnfish.cn/personalized', {
      params:{
        limit: 10
      }
    }).then(res=> {
      this.recommend = res.data.result
    })
    // 最新音乐
    this.$axios.get('https://autumnfish.cn/personalized/newsong').then(res =>{
      this.music = res.data.result
    })
    // 最新mv
    this.$axios.get('https://autumnfish.cn/personalized/mv').then(res =>{
      this.mvs = res.data.result
    })
  },
  data() {
    return{
      banners:[],  // 轮播图
      recommend: [], // 推荐歌单
      music: [],  // 最新音乐
      mvs: [] // 最新mv
    }
  },
  methods:{
    // 得到歌曲链接
    getUrl(id) {
      this.$store.commit('getUrl', id)
    },
    // 得到歌单详情
    getsongList(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    // MV详情
    getmvDetail(id){
      this.$router.push(`/mv?id=${id}`)
    }
  }
}
</script>

<style scoped>
  /* 轮播图 */
  .banner{
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .title{
    margin-bottom: 20px;
    padding-left: 8px;
    font-weight: normal;
  }
  /* 推荐歌单 */
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
    -webkit-line-clamp: 1;
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
  /* 最新音乐 */
  .music{
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }
  .music .img-wrap{
    position: relative;
  }
  .music .img-wrap img{
    width: 80px;
    height: 80px;
    display: block;
  }
  .music li{
    width: 50%;
    height: 100px;
    padding-left: 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .music .info{
    box-sizing: border-box;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .music .info p{
    margin: 0;
  }
  .music .img-wrap .icon-bofang{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 30px;
    height: 30px;
    color: #dd6d60;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    opacity: 0;
  }
  .music .img-wrap:hover .icon-bofang{
    opacity: 1;
    background: hsla(0,0%,100%,.8);
    transition: all ease-in-out .5s;
  }
  /* mv */
  .mv{
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;
  }
  .mv li{
    width: 250px;
    cursor: pointer;
  }
  .mv .img-wrap{
    position:relative;
  }
  .mv .img-wrap img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .mv .info{
    padding: 5px;
  }
  .mv .info p{
    margin: 5px 0;
  }
  .mv .song-name{
    font-size: 15px;
    margin-bottom: 5px;
  }
  .mv .singer{
    font-size: 14px;
    color: #c5c5c5;
  }
  .mv .img-wrap> .icon-bofang{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 40px;
    height: 40px;
    color: #dd6d60;
    font-size: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
  }
  .mv .img-wrap:hover>.icon-bofang{
    opacity: 1;
    background: hsla(0,0%,100%,.8);
    transition: all ease-in-out .5s;
  }
  .num-wrap{
    position: absolute;
    right: 5px;
    top: 2px;
    color: #fff;
  }
  .num-wrap .icon-bofang{
    font-size: 14px;
    padding-right: 2px;
    opacity: 1;
  }
</style>
