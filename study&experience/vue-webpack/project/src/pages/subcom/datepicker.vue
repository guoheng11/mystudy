<template>
  <div class="block" style="display: inline-block;">
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions0">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
//          return time.getTime() < Date.now() - 8.64e7;
          }
        },
        value1: Date.now(),
      };
    }
  };
</script>
<style scoped>
	.el-input {
		border: none;
		border-radius: 3px;
		/*width: 424px;*/
		height: 36px;
		margin-bottom: 10px;
		margin-left: 15px;
		padding-left: 10px;
	}
	
	.el-input__inner {
		width: 224px;
		height: 42px;
		border: 1px solid #ebf2f6;
	}
	.el-picker-panel {
		width: 255px!important;
	}
</style>