<template>
<div>
    <!-- 标签 -->
    <div class="tab-bar">
      <ul class="tab-name">
        <li v-for="(item, index) in tablist" :key="index" :class="{active:item.name==tag}" @click="changeTag(item.name,item.type)">{{item.name}}</li>
      </ul>
    </div>
    <!-- 歌曲内容 -->
    <el-table
      :data="musicData"
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
          <img :src="scope.row.album.picUrl" alt="" srcset="" width="80" height="80" style="display: block;" @click="getUrl(scope.row.id)">
          <i class="iconfont icon-bofang" @click="getUrl(scope.row.id)"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="音乐标题"
        width="300"
      >
      <template slot-scope="scope">
          <p>
            {{scope.row.name}}
            <i class="iconfont icon-shipin" v-if="scope.row.mvid!=0" @click="getmvDetail(scope.row.mvid)"></i>
          </p>
          <span class="sub-name" v-if="scope.row.alias.length!==0">{{ scope.row.alias[0] }} </span>
      </template>
      </el-table-column>
      <el-table-column
        prop="album.artists[0].name"
        label="歌手"
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="album.name"
        label="专辑"
        min-width="300"
      >
      </el-table-column>
      <el-table-column
        prop="bMusic.playTime"
        label="时长"
        max-width="60"
        :formatter="filterTime"
      >
      </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  name: 'music',
  created() {
    this.getmusicList()
  },
  data () {
    return {
      tag: '全部',
      type: 0,
      tablist: [
        {
          type: '0',
          name: '全部'
        },
        {
          type: 7,
          name: '华语'
        },
        {
          type: 96,
          name: '欧美'
        },
        {
          type: 8,
          name: '日本'
        },
        {
          type: '16',
          name: '韩国'
        }
      ],
      musicData: []
    }
  },
  methods: {
    // 得到音乐列表
    getmusicList() {
      this.$axios.get('https://autumnfish.cn/top/song', {
        params: {
          type: this.type
        }
      }).then(res=>{
        this.musicData = res.data.data
      })
    },
    // 切换标签
    changeTag(name, type){
      this.tag = name,
      this.type = type
      this.getmusicList()
    },
    // 得到歌曲链接
    getUrl(id) {
      this.$store.commit('getUrl', id)
    },
    // MV详情
    getmvDetail(id){
      this.$router.push(`/mv?id=${id}`)
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
  .tab-bar,div{
    width: 100%;
  }
  .tab-bar{
    display: flex;
    justify-content: flex-end;
  }
  .tab-name{
    list-style: none;
    margin: 0;
    display: flex;
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
  .cell{
    position: relative;
  }
  .cell .icon-bofang{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 25px;
    height: 25px;
    color: #dd6d60;
    font-size: 12px;
    border-radius: 50%;
    background: hsla(0,0%,100%,.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
