<template>
  <el-footer>
      <audio :src="musicUrl" controls autoplay loop></audio>
  </el-footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    musicUrl() {
      return this.$store.state.musicUrl
    }
  }
}
</script>

<style scoped>
  .el-footer{
    background: #F1F3F4;
  }
  audio{
    width: 100%;
    height: 60px;
    line-height: 60px;
  }
</style>
