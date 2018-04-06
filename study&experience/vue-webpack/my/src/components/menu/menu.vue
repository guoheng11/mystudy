<template lang="html">
  <div class="">
    <el-submenu v-for="(item,index) in menu" :key="item.index" :index="index+''">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.name}}{{item.index}}</span>
      </template>
      <el-menu-item v-for="a in item.menus" :key="a.id"  :index="a.page_url">{{a.name}}</el-menu-item>
    </el-submenu>
    <!-- index没什么意义 -->
    <!-- <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="/">选项1</el-menu-item>
      <el-menu-item index="/test2">选项2</el-menu-item>
      <el-menu-item index="/test3">选项3</el-menu-item>
      <el-menu-item index="/HelloWorld">Hell</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航er</span>
        </template>
      <el-menu-item index="/">选项1</el-menu-item>
      <el-menu-item index="/test2">选项2</el-menu-item>
      <el-menu-item index="/test3">选项3</el-menu-item>
      <el-menu-item index="/HelloWorld">HelloWorld</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航er</span>
        </template>
      <el-menu-item index="/">选项1</el-menu-item>
      <el-menu-item index="/test2">选项2</el-menu-item>
      <el-menu-item index="/test3">选项3</el-menu-item>
      <el-menu-item index="/HelloWorld">HelloWorld</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航er</span>
        </template>
      <el-menu-item index="/">选项1</el-menu-item>
      <el-menu-item index="/test2">选项2</el-menu-item>
      <el-menu-item index="/test3">选项3</el-menu-item>
      <el-menu-item index="/HelloWorld">HelloWorld</el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航er</span>
        </template>
      <el-menu-item index="/">选项1</el-menu-item>
      <el-menu-item index="/test2">选项2</el-menu-item>
      <el-menu-item index="/test3">选项3</el-menu-item>
      <el-menu-item index="/HelloWorld">Hell</el-menu-item>
    </el-submenu> -->

  </div>
</template>

<script>
export default {
  data(){
    return{
        menu : null,
    }
  },
  beforeCreate:function(){
      this.axios.get('../static/data/menu.json').then(response => {
        console.log(response.data);
        this.menu = response.data.Message;
        console.log(this);
        // get body data
        // this.someData = response.body;
      }, response => {
        console.log("error");
      });
  }
}
</script>

<style lang="css">
</style>
