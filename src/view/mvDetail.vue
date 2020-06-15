<template>
  <div class="mvdetail">
    <!-- mv详情 -->
    <div class="left">
      <h3 class="title">mv详情</h3>
      <div class="video-wrap">
        <video controls="controls" :src="mvUrl"></video>
      </div>
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="artist.img1v1Url" alt="">
          </div>
          <span class="name">{{artist.name}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvDetail.name}}</h2>
          <span class="date">发布：{{mvDetail.publishTime}}</span>
          <span class="number">播放：{{mvDetail.playCount | filterNum}}次</span>
          <p class="desc">{{mvDetail.desc}}</p>
        </div>
        <!-- 热门评论 -->
        <div class="comment-wrap" v-if="hotComments.length!=0">
          <p class="title"> 热门评论<span class="number">({{hotComments.length}})</span></p>
          <ul>
            <li class="comments-wrap" v-for="(item,index) in hotComments" :key="index">
              <div class="item">
                <div class="icon-wrap">
                  <img :src="item.user.avatarUrl" alt="">
                </div>
                <div class="content-wrap">
                  <div class="content">
                    <span class="name">{{item.user.nickname}}：</span>
                    <span class="comment">{{item.content}}</span>
                  </div>
                  <div class="re-content" v-if="item.beReplied.length!=0">
                    <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                    <span class="comment">{{item.beReplied[0].content}}</span>
                  </div>
                  <div class="date">{{item.time | formatDate}}</div>
                  </div>
                </div>
            </li>
          </ul>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title"> 最新评论<span class="number">({{total}})</span></p>
          <ul class="comments-wrap">
            <li class="item" v-for="(item,index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="">
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                    <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                    <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                  <div class="date">{{item.time | formatDate}}</div>
                </div>
            </li>
          </ul>
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
    </div>
    <!-- 相关推荐 -->
    <div class="right">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <ul class="items">
          <li class="item" v-for="(item,index) in mvs" :key="index" @click="getRelevantMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="">
              <span class="iconfont icon-bofang"></span>
              <div class="num-wrap">
                <div class="iconfont icon-bofang"></div>
                <div class="num">{{item.playCount | filterNum}}</div>
              </div>
              <span class="time">{{item.duration | filterTime}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mvDetail',
  created() {
    this.id = this.$route.query.id
    this.getData()
  },
  data() {
    return{
      id: '',  // mvid
      mvUrl: '',
      artist: {},
      mvDetail: {},
      hotComments: [],
      comments: [],
      pageSize: 5,
      total:0,
      currentPage: 1,
      // 相关mv
      mvs: []
    }
  },
  methods: {
    // 相关mv
    getRelevantMv(id) {
      this.id = id
      this.getData()
    },
    // 获取mv详情
    getData() {
      this.$axios.get('https://autumnfish.cn/mv/url', {
            params:{
                id: this.id
            }
        }).then(res=>{
          this.mvUrl = res.data.data.url
        })
      // mv详情
      this.$axios.get('https://autumnfish.cn/mv/detail', {
        params: {
          mvid: this.id
        } 
      }).then(res=>{
        this.mvDetail = res.data.data
         // 获取歌手头像
        this.$axios.get('https://autumnfish.cn/artists', {
          params: {
            id: res.data.data.artistId
          }
        }).then(res=>{
          this.artist = res.data.artist
        })
      })
      // 评论
      this.$axios.get('https://autumnfish.cn/comment/mv', {
        params: {
          id: this.id,
          limit: 5,
          offset: (this.currentPage - 1) * 5
        }
      }).then(res=> {
        if(res.data.hotComments){
          this.hotComments = res.data.hotComments
        }
        this.comments = res.data.comments
        this.total = res.data.total
        console.log(this.comments)
      })
      // 相关MV
      this.$axios.get('https://autumnfish.cn/simi/mv', {
        params: {
          mvid: this.id
        }
      }).then(res=> {
        this.mvs = res.data.mvs
      })
    },
    // 分页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getData()
    }
  }
}
</script>

<style scoped>
  .mvdetail{
    max-width: 1100px;
    display: flex;
  }
  .left {
    width: 700px;
    margin-right: 35px;
  }
  .left .title{
    margin-bottom: 20px;
  }
  .left .video-wrap{
    width: 100%;
    height: 390px;
    margin-bottom: 20px;
  }
  .video-wrap video {
    border-radius: 5px;
    height: 100%;
    width: 100%;
    outline: none;
  }
  .left .mv-info {
    margin-bottom: 50px;
  }
  .left .info-wrap .singer-info {
    display: flex;
    align-items: center;
    margin-bottom: 35px;
  }
  .left .info-wrap .singer-info .avatar-wrap {
    border-radius: 50%;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    margin-right: 10px;
    overflow: hidden;
  }
  .left .info-wrap .singer-info .avatar-wrap img {
    height: 100%;
    width: 100%;
  }
  .left .info-wrap .mv-info .title {
    font-size: 30px;
  }
  .left .date, .mv-container .mv-wrap .number {
    color: #bebebe;
    font-size: 14px;
  }
  .left .date {
    margin-right: 25px;
  }
  .left .info-wrap .mv-info .desc {
    font-size: 15px;
    margin-top: 20px;
  }
  .left .comment-wrap {
    margin-bottom: 70px;
  }
  .left .comment-wrap .title {
    font-size: 25px;
    margin-bottom: 20px;
  }
  .left .comment-wrap .title .number {
    color: #000;
    font-size: 20px;
  }
  .left .comment-wrap ul{
    list-style: none;
  }
  .left .comment-wrap .item {
    display: flex;
    padding-top: 20px;
  }
  .left .comment-wrap .item .icon-wrap {
    margin-right: 15px;
  }
  .left .comment-wrap .item .icon-wrap img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .left .comment-wrap .item .content-wrap {
    padding-bottom: 20px;
    flex: 1;
  }
  .left .content{
    margin-bottom: 10px;
  }
  .left .comment-wrap .item .content-wrap .name {
    color: #517eaf;
    font-size: 14px;
  }
  .left .comment-wrap .item .content-wrap .comment {
    font-size: 14px;
  }
  .left .re-content {
    padding: 10px;
    background-color: #e6e5e6;
    border-radius: 5px;
  }
  .right{
    flex: 1;
    max-width: 365px;
  }
  .right .mvs .items {
    display: flex;
    flex-wrap: wrap;
  }
  .right .mvs .items .item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    overflow: hidden;
  }
  .right .mvs .items .item .img-wrap {
    width: 180px;
    position: relative;
    margin-right: 10px;
    flex: 1;
  }
  .right .mvs .items .item .img-wrap img {
    width: 100%;
    border-radius: 5px;
  }
  .right .mvs .items .item .img-wrap>.icon-bofang {
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
    background: hsla(0,0%,100%,.8);
    opacity: 0;
  }
  .right .mvs .items .item:hover .icon-bofang{
    opacity: 1;
    transition: all .5s;
  }
  .right .mvs .items .item .img-wrap .num-wrap {
    position: absolute;
    color: #fff;
    top: 0;
    right: 0;
    display: flex;
    align-content: center;
    font-size: 15px;
    padding-right: 5px;
    padding-top: 2px;
  }
  .right .mvs .items .item .img-wrap .num-wrap .icon-bofang {
    font-size: 12px;
    display: -webkit-box;
    display: flex;
    align-items: center;
    margin-right: 5px;
  }
  .right .mvs .items .item .img-wrap .time {
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: #fff;
    font-size: 15px;
  }
  .right .mvs .items .item .info-wrap .singer {
    font-size: 14px;
    color: #c5c5c5;
    margin-top: 5px;
  }
  .right .mvs .info-wrap{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    flex: 1;
  }
  .right .mvs .name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-pagination{
    text-align: center;
  }
</style>
