<template>
  <!-- 根标签 -->
  <div class="question-wrap">
    <!-- 顶部卡片 -->
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="formInline.region" placeholder="请选择学科">
            <el-option v-for="(item,index) in subjectList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="阶段">
          <el-select v-model="formInline.region" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业">
          <el-select v-model="formInline.region" placeholder="请选择企业">
            <el-option v-for="(item,index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
          
          </el-select>
        </el-form-item>

        <el-form-item label="题型">
          <el-select v-model="formInline.region" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>

        <br />

        <el-form-item label="难度">
          <el-select v-model="formInline.region" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="作者">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-input></el-input>
        </el-form-item>

        <br />

        <el-form-item label="标题" class="title-item">
          <el-input></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import { subjectList } from '@/api/subject.js'
import { businessList } from '@/api/business.js'

export default {
    name:"question",
  data() {
    return {
      formInline: {},
      subjectList:[],
      businessList:[]
    };
  },

  created(){

    //   获取学科数据
      subjectList({
          status:1
      }).then(res => {

          this.subjectList = res.data.data.items;
      })

    // 获取企业数据
    businessList({
        status:1
    }).then( res => {

        this.businessList = res.data.data.items;
        
    } )
  }
};
</script>

<style lang="less">
.question-wrap {

  /* 找到除了最后一个el-form-item下面的所有 el-form-item__content
    el-form-item代表的是每一项（代表除了最后一项以外的其他项里所有内容为宽150）
 */
  .el-form-item:not(:last-child) .el-form-item__content {
    width: 150px;
  }

  /* 找到标题那一栏里面的内容，设置他的内容为宽度388 */
  .el-form-item.title-item .el-form-item__content {
    width: 388px;
  }

  /* 设置每个表单元素前面文字的左右内间距 */
  .el-form-item__label {
    padding-right: 31px;
    padding-left: 30px;
  }

  /* 设置卡片的内间距 */
  .el-card__body {
    padding-left: 0;
  }
}
</style>