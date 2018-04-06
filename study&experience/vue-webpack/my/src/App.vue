<template>
<div id="app">


  <el-container>
    <el-aside width="200px">
    <el-menu default-active="">
      <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="/">选项1</el-menu-item>
      <el-menu-item index="/test2">选项2</el-menu-item>
      <el-menu-item index="/test3">选项3</el-menu-item>
      <el-menu-item index="/HelloWorld">Hell</el-menu-item>
    </el-submenu>
    </el-menu></el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
  <!-- <div class="">

    <router-link to="/HelloWorld">HelloWorld</router-link>
    <router-link to="/test1/test2">test2</router-link>
    <router-link to="/test1/test3">test3</router-link>
  </div>
  <router-view class="view one"></router-view>
  <router-view class="view two" name="a"></router-view>
  <router-view class="view three" name="b"></router-view> -->
  <el-container style="height: 100%; border: 0px solid #eee">
    <el-aside width="200px" style="background-color: #599ef8">
      <!--  router开启路由；；-->
      <el-menu background-color="#599ef8" text-color="white" default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
        <menu-f> </menu-f>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <head-top></head-top>
      </el-header>
      <el-main>
        <div class="">
        </div>
        <transition name="el-zoom-in-top">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  height: 100%;
  overflow-y: hidden;
}

.el-menu {
  border-right: none;
}

.el-menu-item {
  /* padding-left: 50px !important; */
}
</style>

<script>
import header from "./components/header/header"
import main from "./components/main/main"
import menu from "./components/menu/menu"
export default {
  components: {
    headTop: header,
    mainF: main,
    menuF: menu

  },
  name: 'App',
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      menu:null,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  beforeCreate: function() {
    console.group('beforeCreate 创建前状态===============》');
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log("%c%s", "color:red", "data   : " + this.$data); //undefined
    console.log("%c%s", "color:red", "message: " + this.message)
  },
  created: function() {
    console.group('created 创建完毕状态===============》');
    console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
  },
  beforeMount: function() {
    console.group('beforeMount 挂载前状态===============》');
    console.log("%c%s", "color:red", "el     : " + (this.$el)); //已被初始化
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
  },
  mounted: function() {
    console.group('mounted 挂载结束状态===============》');
    console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
    console.log(this.$el);
    console.log("url" + window.location.href);
    console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
    console.log("%c%s", "color:red", "message: " + this.message); //已被初始化

  },
  beforeUpdate: function() {
    console.group('beforeUpdate 更新前状态===============》');
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  updated: function() {
    console.group('updated 更新完成状态===============》');
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  beforeDestroy: function() {
    console.group('beforeDestroy 销毁前状态===============》');
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
  },
  destroyed: function() {
    console.group('destroyed 销毁完成状态===============》');
    console.log("%c%s", "color:red", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message)
  }

};
</script>
