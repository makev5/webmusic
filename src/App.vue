<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  updated() {
    window.scroll(0, 0);
  }
}
</script>

<style>
 *{
    padding: 0;
    margin: 0;
 }
  html{
    overflow-y: scroll;
  }
  :root{
    overflow-x: auto;
    overflow-y: hidden;
  }
  :root body{
    position: absolute;

  }
  body{
    width: 100vw;
    overflow: hidden;
  }
  html,body{
    height: 100%;
  }
  #app{
    height: 100%;
  }
</style>
