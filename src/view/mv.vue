<template>
  <div>
    <!-- 筛选 -->
    <div class="filter-wrap">
      <div class="section-wrap">
        <span class="section-type">地区:</span>
        <ul>
          <li v-for="(item,index) in area" :key="index" :class="{active:areaVal==item}" @click="changeArea(item)">{{item}}</li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul>
          <li v-for="(item,index) in type" :key="index" :class="{active:typeVal==item}" @click="changeType(item)">{{item}}</li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul>
          <li v-for="(item,index) in order" :key="index" :class="{active:orderVal==item}" @click="changeOrder(item)">{{item}}</li>
        </ul>
      </div>
    </div>
    <!-- mv -->
    <div class="mvs">
      <ul class="mv">
      <li v-for="item in mvs" :key="item.id" @click="getmvDetail(item.id)">
        <div class="img-wrap">
          <img :src="item.cover" alt="" srcset="">
          <div class="num-wrap">
            <i class="iconfont icon-bofang"></i>{{item.playCount | filterNum}}
          </div>
        </div>
        <div class="info">
          <p class="song-name">{{item.name}}</p>
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
</template>

<script>
export default {
  name: 'mv',
  created() {
    this.getMv()
  },
  data () {
    return {
      area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      type: ['全部', '官方版', '原声', '现场版', '网易出品'],
      order: ['上升最快', '最热', '最新'],
      areaVal: '全部',
      typeVal: '全部',
      orderVal: '上升最快',
      mvs: [],
      currentPage: 1,
      total: 0,
      pageSize: 12
    }
  },
  methods: {  
    // MV
    getMv() {
      this.$axios.get('https://autumnfish.cn/mv/all' ,{
        params: {
          limit: 12,
          offset:(this.currentPage-1) * 12,
          area: this.areaVal,
          type: this.typeVal,
          order: this.orderVal
        }
      }).then(res=>{
        this.mvs = res.data.data
        if(res.data.count) {
          this.total = res.data.count
        }
      })
    },
    // 切换地区
    changeArea(item) {
      this.areaVal = item
      this.getMv()
      this.currentPage = 1
    },
    // 切换类型
    changeType(item) {
      this.typeVal = item
      this.getMv()
      this.currentPage = 1
    },
    // 切换排序
    changeOrder(item) {
      this.orderVal = item
      this.getMv()
      this.currentPage = 1
    },
    // 分页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getMv()
    },
    // MV详情
    getmvDetail(id){
      this.$router.push(`mv?id=${id}`)
    },
  }
}
</script>

<style scoped>
  .active{
    color: #DD6D60 !important;
  }
  .filter-wrap>div{
    display: flex;
    align-content: center;
    margin: 30px 10px;
    font-size: 14px;
  }
  .filter-wrap ul{
    padding: 0;
    list-style: none;
    display: flex;
  }
  .filter-wrap li{
    color: grey;
    cursor: pointer;
    padding: 5px 20px;
  }
  .filter-wrap span{
    display: flex;
    align-items: center;
  }
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
