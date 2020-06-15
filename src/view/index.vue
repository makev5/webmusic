<template>
  <div class="index">
    <!-- 头部 -->
    <Header />
    <el-container>
      <!-- 侧边栏 -->
      <Aside />
      <!-- 主体内容 -->
      <Main />
    </el-container>
    <!-- 尾部 -->
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header'
import Aside from '../components/Aside'
import Main from '../components/Main'
import Footer from '../components/Footer'
export default {
  components: {
    Header,
    Aside,
    Main,
    Footer
  }
}
</script>

<style scoped>
  .index{
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .el-container{
    flex: 1;
    overflow: auto;
  }
</style>
