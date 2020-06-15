<template>
  <el-main>
    <el-container>
      <router-view />
    </el-container>
  </el-main>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style scoped>
  .el-container{
    max-width: 1100px;
    margin: 0 auto;
    padding: 0;
    background-color: #f9f9f9;
  }
</style>
