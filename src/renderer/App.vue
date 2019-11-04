<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'ff'
  }
</script>

<style>
@import url('//at.alicdn.com/t/font_1473779_rfdv3q5zzyh.css');

 *{
	 padding:0;
	 margin:0;
	 box-sizing:border-box;
 }
 ul,ol{
	 list-style:none;
 }
 body,html{
	 height:100vh;
	 width:100vw;
	 font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 }
 #app{
	 width:100%;
	 height:100%;
	 background:rgb(182, 182, 182);
	 display:flex;
	 justify-content:center;
	 align-items:center;
 }
</style>