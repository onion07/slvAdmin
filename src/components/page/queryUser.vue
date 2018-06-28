<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 基础列表</el-breadcrumb-item>
                <el-breadcrumb-item>用户查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="uidV" placeholder="请输入有信号" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search" >搜索</el-button>
        </div>
        <div id="d-table">
          <h3>基本信息</h3>
          <div id="liveinfo" v-for="(val, key) in tableData2">
            <label>{{key}}</label>
            <label>{{val}}</label>
          </div>

          <h3>直播信息</h3>
          <div id="liveinfo" v-for="(val, key) in tableData1">
            <label>{{key}}: </label>
            <label>{{val}}</label>
          </div>
          
        </div>
    </div>
</template>

<script>

    export default {

        data() {
            return {
                url: '',
                uidV: '',
                tableData1: [], //liveinfo
                tableData2: [], //uxininfo
                multipleSelection: []
            }
        },
        created(){
            // this.getData();
        },
        computed: {
            // data(){
            //     return this.tableData1;
            // }
        },
        methods: {
            handleCurrentChange(val){
                this.getData();
            },
            getData(){
                const _ts = this;

                _ts.url = '/h5/v1/audit/queryUserById';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/audit/queryUserById';
                };


                _ts.$axios.get(_ts.url,{ params:{uid: _ts.uidV} })
                  .then((res) => {
              
                      if ( res.data.h.code === 200 ) {
                        if (res.data.b.liveinfo) {
                            _ts.tableData1 = res.data.b.liveinfo;
                        }
                        if (res.data.b.uxininfo) {
                            _ts.tableData2 = res.data.b.uxininfo;

                        }
                      }
                      else{
                         console.log('失败！！');
                      }
                  })
            },
            search(){
                this.getData();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
/*自定义新增*/
.user-img{
    float: left;
    display: inline-block;
    max-width: 135px;
    max-height: 200px;
    margin: 4px;
}
.el-table.el-table--fit{
  display: none;
}
.el-table--fit.blk{
  display: block;
}
#d-table h3{
  margin-top: 30px;
  border-bottom: 1px solid #ddd;
}
#d-table label{
  display: inline-block;
  margin-right: 8px;
  color: #797979;
}
#uxininfo{
  margin-top: 20px;
}
</style>