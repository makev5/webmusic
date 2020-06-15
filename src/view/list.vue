<template>
  <div class="list">
    <!-- 歌单banner -->
    <div class="top-wrap">
        <div class="img-wrap">
            <img :src="playlist.coverImgUrl" alt="">
        </div>
        <div class="info-wrap">
            <p class="title">{{playlist.name}}</p>
            <div class="author-wrap">
                <img :src="creator.avatarUrl" alt="" class="avatar">
                <span class="name">{{creator.nickname}}</span>
                <span class="time">{{playlist.createTime | formatDate1}} 创建</span>
            </div>
            <div class="tag-wrap">
                <span class="title">标签:</span>
                <span>{{tags | tag}}</span>
            </div>
            <div class="desc-wrap">
                <span class="title">
                    简介:
                </span>
                <span class="desc">
                    {{creator.signature}}
                </span>
            </div>
        </div>
    </div>
    <!-- 标签页 -->
    <el-tabs v-model="activeName">
      <!-- 歌曲列表 -->
        <el-tab-pane label="歌曲列表" name="list">
            <el-table
                :data="playlist.tracks"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label=""
                    min-width="50">
                </el-table-column>
                <el-table-column
                    prop="cover"
                    label=""
                    min-width="100"
                >
                    <template slot-scope="scope">
                      <img :src="scope.row.al.picUrl" alt="" srcset="" width="80" height="80" style="display: block;">
                      <i class="iconfont icon-bofang" @click="getUrl(scope.row.id)"></i>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="音乐标题"
                    min-width="250"
                >
                <template slot-scope="scope">
                    <p>{{scope.row.name}}</p>
                    <i class="iconfont icon-shipin" v-if="scope.row.mv!=0" @click="getmvDetail(scope.row.mv)"></i>
                </template>
                </el-table-column>
                <el-table-column
                    prop="ar[0].name"
                    label="歌手"
                    min-width="250"
                >
                </el-table-column>
                <el-table-column
                    prop="al.name"
                    label="专辑"
                    min-width="350"
                >
                </el-table-column>
                <el-table-column
                    prop="dt"
                    label="时长"
                    max-width="60"
                    :formatter="filterTime"
                >
                </el-table-column>
                </el-table>
        </el-tab-pane>
        <!-- 评论 -->
        <el-tab-pane :label="'评论('+(total+hotComments.length)*1+')'" name="commend">
            <div class="comment-wrap" v-if="hotComments.length!=0">
                <p class="title">热门评论
                    <span class="number">({{hotComments.length}})</span>
                </p>
                <div class="commnts-wrap">
                    <ul>
                        <li class="item" v-for="(item,index) in hotComments" :key="index">
                            <div class="icon-wrap">
                                <img :src="item.user.avatarUrl" alt="">
                            </div>
                            <div class="content-wrap">
                                <div class="content">
                                    <span class="name">{{item.user.nickname}}:</span>
                                    <span class="comment">{{item.content}}</span>
                                </div>
                                <div class="re-content" v-if="item.beReplied.length!=0">
                                    <span class="name">{{item.beReplied[0].user.nickname}}:</span>
                                    <span class="comment">
                                        {{item.beReplied[0].content}}
                                    </span>
                                </div>
                                <div class="date">{{item.time | formatDate}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="comment-wrap">
                <p class="title">最新评论
                    <span class="number">({{total}})</span>
                </p>
                <div class="commnts-wrap">
                    <ul>
                        <li class="item" v-for="(item,index) in comments" :key="index">
                            <div class="icon-wrap">
                                <img :src="item.user.avatarUrl" alt="">
                            </div>
                            <div class="content-wrap">
                                <div class="content">
                                    <span class="name">{{item.user.nickname}}:</span>
                                    <span class="comment">{{item.content}}</span>
                                </div>
                                <div class="re-content" v-if="item.beReplied.length!=0">
                                    <span class="name">{{item.beReplied[0].user.nickname}}:</span>
                                    <span class="comment">
                                        {{item.beReplied[0].content}}
                                    </span>
                                </div>
                                <div class="date">{{item.time | formatDate}}</div>
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
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'list',
  created() {
    // 歌单详情
    this.getsongList()
    // 最新评论
    this.getNewComment(this.$route.query.id)  
    // 热门评论
    this.getHotComment()
  },
  data () {
    return {
      playlist: {},
      creator: {},
      tags: [],
      activeName: 'list',
      comments: [],
      hotComments: [],
      total: 0,
      currentPage: 1,
      pageSize: 5
    }
  },
  methods: {
    // 歌单列表
    getsongList() {
      this.$axios.get('https://autumnfish.cn/playlist/detail', {
        params: {
          id: this.$route.query.id
        }
      }).then(res=>{
        this.playlist = res.data.playlist
        this.creator = res.data.playlist.creator
        this.tags = res.data.playlist.tags
      })
    },
    // 最新评论
    getNewComment(id) {
      this.$axios.get('https://autumnfish.cn/comment/playlist', {
        params: {
          id: this.$route.query.id,
          limit: 5,
          offset: (this.currentPage - 1) * 5
        }
      }).then(res=>{
        this.comments = res.data.comments
        this.total = res.data.total
      })
    },
    // 热门评论
    getHotComment(id) {
      this.$axios.get('https://autumnfish.cn/comment/hot', {
        params: {
          id: this.$route.query.id,
          type: 2
        }
      }).then(res=>{
        this.hotComments = res.data.hotComments
      })
    },
    // 得到歌曲链接
    getUrl(id) {
      this.$store.commit('getUrl', id)
    },
    // MV详情
    getmvDetail(id){
      this.$router.push(`/mv?id=${id}`)
    },
    // 分页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getNewComment()
    },
    // 时长格式化
    filterTime(row, column, cellValue, index) {
      var mm = parseInt(cellValue / 1000 / 60)
      mm = mm >= 10? mm: '0' + mm
      var ss = parseInt(cellValue/1000%60)
      ss = ss >= 10 ? ss : '0' + ss
      return mm+':'+ss
    }
  }
}
</script>

<style scoped>
  .list{
      width: 100%;
  }
  .top-wrap{
      display: flex;
  }
  .img-wrap {
    margin-right: 30px;
  }
  .img-wrap img {
      width: 230px;
      height: 230px;
  }
  .info-wrap .title{
    margin-bottom: 20px;
  }
  .author-wrap{
      display: flex;
      align-items: center;
      margin-bottom: 25px;
  }
  .author-wrap img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .author-wrap .name {
    margin-right: 10px;
  }
  .top-wrap span {
    font-size: 17px;
  }
  .author-wrap .time {
    font-size: 14px;
  }
  .tag-wrap{
      display: flex;
      margin-bottom: 15px;
  }
  .info-wrap .tag-wrap ul{
      list-style: none;
      display: flex;
      align-content: center;
  }
  .info-wrap .tag-wrap ul li{
      font-size: 15px;
  }
  .cell{
      position: relative;
  }
  .el-table .cell{
      display: flex !important;
  }
  .icon-bofang{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 25px;
      height: 25px;
      color: #DD6D60;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transform: translate(-50%,-50%);
      background: hsla(0,0%,100%,0.8);
  }
  .item{
      display: flex;
      padding-top: 20px;
  }
  .item .icon-wrap {
    margin-right: 15px;
  }
  .commnts-wrap .icon-wrap img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .comment-wrap .item:not(:last-child) .content-wrap {
    border-bottom: 1px solid #f2f2f1;
  }
  .comment-wrap .item .content-wrap {
    padding-bottom: 20px;
    flex: 1;
  }
  .item .content-wrap .content, .playlist-container .comment-wrap .item .content-wrap .re-content {
    margin-bottom: 10px;
  }
  .comment-wrap .item .content-wrap .name {
    color: #517eaf;
    font-size: 14px;
  }
  .item .content-wrap .comment {
    font-size: 14px;
  }
  .comment-wrap .item .content-wrap .re-content {
    padding: 10px;
    background-color: #e6e5e6;
    border-radius: 5px;
  }
  .comment-wrap .item .date {
    color: #bebebe;
    font-size: 14px;
    padding-top: 10px;
  }
</style>

<style>
/* 标签页 */
  .el-tabs__item {
    font-size: 18px;
  }
  .el-tabs__item:hover {
    color: #c3473a;
    cursor: pointer;
  }
  .el-tabs__item.is-active {
    color: #c3473a;
  }
  .el-tabs__active-bar {
    background-color: #c3473a;
  }

  .el-table .cell{
      display: flex;
  }
  .cell .icon-shipin{
      color: #DD6D60;
      padding-left: 10px;
  }
  .el-pagination{
    margin-top: 50px;
    text-align: center;
  }
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #dd6d60 !important;
}
</style>
