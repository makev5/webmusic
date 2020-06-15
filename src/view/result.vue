<template>
  <div class="result">
    <div class="title-wrap">
        <h2 class="title">{{$route.query.keywords}}</h2>
        <span class="sub-title">找到{{count}}个结果</span>
    </div>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="changeTag">
        <el-tab-pane label="歌曲" name="song">
            <el-table
                :data="songs"
                style="width: 100%"
                @row-dblclick="play"
                >
                  <el-table-column
                    type="index"
                    label=""
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="音乐标题"
                    min-width="200">
                    <template slot-scope="scope">
                        <p>
                          {{scope.row.name}}
                          <i class="iconfont icon-shipin" v-if="scope.row.mvid!=0" @click="getmvDetail(scope.row.mvid)"></i>
                        </p>
                        <span class="sub-name" v-if="scope.row.alias.length!==0">{{ scope.row.alias[0] }} </span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="artists[0].name"
                    label="歌手"
                    min-width="150">
                  </el-table-column>
                  <el-table-column
                    prop="album.name"
                    label="专辑"
                    min-width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="duration"
                    min-width="60"
                    label="时长"
                    :formatter="filterTime"
                  >
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="songlist">
            <ul class="recommend">
                <li v-for="(item, index) in songList" :key="index">
                    <div>
                    <p class="desc">播放量:{{item.playCount | filterNum}}</p>
                    <img :src="item.coverImgUrl" alt="" srcset="">
                    <p class="name">{{item.name}}</p>
                    <i class="iconfont icon-bofang" @click="getsongList(item.id)"></i>
                    </div>
                </li>
            </ul>
        </el-tab-pane>
        <el-tab-pane label="MV" name="mv">
          <ul class="mv">
            <li v-for="(item,index) in mvs" :key="index" @click="getmvDetail(item.id)">
                <div class="img-wrap">
                <img :src="item.cover" alt="" srcset="">
                <i class="iconfont icon-bofang"></i>
                <div class="num-wrap">
                    <i class="iconfont icon-bofang"></i>{{item.playCount | filterNum}}
                </div>
                <i class="time">{{item.duration | filterTime}}</i>
                </div>
                <div class="info">
                    <p class="song-name">{{item.name}}</p>
                    <p class="singer">{{item.artistName}}</p>
                </div>
            </li>
          </ul>
        </el-tab-pane>
    </el-tabs>
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
  name: 'Result',
  created() {
    this.search()
  },
  data () {
    return {
      activeName: 'song',
      currentPage: 1,
      type: 1,
      limit: 15,
      total: 0,
      pageSize: 15,
      count: 0,
      songs: [],
      songList: [],
      mvs: []
    }
  },
  methods: {
    // 搜索
    search() {
      this.$axios.get('https://autumnfish.cn/search', {
        params: {
          keywords: this.$route.query.keywords,
          limit: this.limit,
          offset: (this.currentPage-1) * this.limit,
          type: this.type
        }
      }).then(res=> {
        console.log(res.data.result)
        if(res.data.result.songCount){
          this.count = res.data.result.songCount
          this.total = res.data.result.songCount
        }
        if(res.data.result.playlistCount){
          this.count = res.data.result.playlistCount
          this.total = res.data.result.playlistCount
        }
        if(res.data.result.mvCount){
          this.count = res.data.result.mvCount
          this.total = res.data.result.mvCount
        }
        this.songs = res.data.result.songs
        this.songList = res.data.result.playlists
        this.mvs = res.data.result.mvs
      })
    },
    // 切换type的值
    changeTag(e) {
      if(e.index==0){
        this.type = 1
        this.limit = 15
        this.currentPage = 1
      }else if(e.index==1){
        this.type = 1000
        this.limit = 15
        this.currentPage = 1
      }else{
        this.type = 1004
        this.limit = 12
        this.currentPage = 1
      }
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.search()
    },
    play(row) {
      console.log(row.id)
      this.$store.commit('getUrl', row.id)
    },
    // 得到歌单详情
    getsongList(id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    // MV详情
    getmvDetail(id){
      this.$router.push(`/mv?id=${id}`)
    },
    // 时长格式化
    filterTime(row, column, cellValue, index) {
      var mm = parseInt(cellValue / 1000 / 60)
      mm = mm >= 10? mm: '0' + mm
      var ss = parseInt(cellValue / 1000 % 60)
      ss = ss >= 10 ? ss : '0' + ss
      return mm+':'+ss
    }
  },
  // 监听数据发生改变
  watch: {
    type() {
      this.search()
    },
    '$route'(){
      this.search()
    }
  } 
}
</script>

<style scoped>
  .result{
      width: 100%;
  }
  .title-wrap{
      display: flex;
      align-items: flex-end;
      margin-bottom: 30px;
  }
  .title-wrap .title{
    margin-right: 10px;
  }
  .title-wrap .sub-title {
    font-size: 15px;
    color: #bebebe;
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
  .cell{
      display: flex;
      flex-direction: column;
  }
  .sub-name{
    margin-top: 20px;
    display: inline-block;
    color: #bebebe;
  }
  .icon-shipin{
      color: #DD6D60;
      padding-left: 10px;
  }
  .recommend{
    padding: 0;
    list-style: none;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
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
  .recommend .desc{
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    width: 100%;
    max-height: 50px;
    box-sizing: border-box;
    margin: 0;
    padding: 5px;
    font-size: 14px;
    overflow: hidden;
    text-align: right;
  }
  .recommend .icon-bofang{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
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
  /* mv */
  .mv{
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
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
  .time{
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: #fff;
      font-weight: normal;
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
