<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 多人视频</el-breadcrumb-item>
                <el-breadcrumb-item>房间操作</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
          用户UID：
            <el-input v-model="v_uid" placeholder="请输入用户UID" class="handle-input mr10 midl-inp"></el-input>
          拉黑原因：
            <el-input v-model="v_reason" placeholder="请输入拉黑原因" class="handle-input mr10"></el-input>
            <el-button type="danger" @click="toBack">拉黑</el-button>
        </div>
        <el-table :data="tableData" border stripe style="width: 100%" ref="multipleTable" >
            <el-table-column prop="uid" label="用户UID" width="250">
            </el-table-column>
            <el-table-column prop="time" label="操作时间">
            </el-table-column>
            <el-table-column prop="info" label="备注">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="relieveBlack(scope.$index, scope.row)">解除拉黑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    page-size="20"
                    :total="pg_total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getAxiosVdieoModuleData} from '../api/request';
    
    export default {

        data() {
            return {
                url: '', // 获取列表url
                add_url: '', // 拉黑url
                re_url: '', //解除拉黑url
                tableData: [],
                v_uid: '', //用户uid
                v_reason: '', //拉黑原因
                cur_page: 1,
                pg_total: 1000,
                multipleSelection: []
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data(){
                return this.tableData;
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            //获取拉黑列表
            getData(){
                const _ts = this;
            
                _ts.url = '/h5/v1/whitelist/getList';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/whitelist/getList';
                };
                //type:0表示白名单、1表示黑名单 ； business: 16表示多人视频
                getAxiosVdieoModuleData(_ts.url,{uid: _ts.v_uid,business: 16,type: 1,pageNo: _ts.cur_page,pageSize: 20},function (retData,pgTotal) {
                    _ts.tableData = retData;
                    _ts.pg_total = pgTotal;
                });


            },
            // 拉黑
            toBack(){ 
                const _ts = this;

                //不能为空
                if (!_ts.v_reason || !_ts.v_uid) {

                  _ts.$message({
                      duration: 2000,
                      message: '用户UID和拉黑原因,不能为空'
                  });
                  return;
                }
                // get方式 拉黑
                _ts.url = '/h5/v1/whitelist/add'; 
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/whitelist/add';
                };

                _ts.$confirm('确定要拉黑吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //type:0表示白名单、1表示黑名单 ； business: 16表示多人视频
                    _ts.$axios.get(_ts.url,{ params:{business: 16,type: 1,uid: _ts.v_uid,info: _ts.v_reason} })
                      .then((res) => { 
                          const h = res.data.h;
                          _ts.$message({
                              duration: 2000,
                              message: res.data.h.msg,
                              onClose() {
                                  if ( h.code === 200 ) {
                                    _ts.v_reason = '';
                                    _ts.v_uid = '';
                                      _ts.getData();
                                  }
                              }
                          });
                      });
                }).catch(() => {});

            },
            //解除拉黑
            relieveBlack(index,row) {
                const _ts = this;
                // get方式 解除拉黑
                _ts.re_url = '/h5/v1/whitelist/del'; 
                if(process.env.NODE_ENV === 'development'){
                    _ts.re_url = 'http://test.hongdoulive.com/h5/v1/whitelist/del';
                };

                _ts.$confirm('确定要对【'+row.uid+'】 解除拉黑吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //type:0表示白名单、1表示黑名单 ； business: 16表示多人视频
                    _ts.$axios.get(_ts.re_url,{ params:{business: 16,type: 1,uid: row.uid} })
                      .then((res) => { 
                          const h = res.data.h;
                          _ts.$message({
                              duration: 2000,
                              message: res.data.h.msg,
                              onClose() {
                                  if ( h.code === 200 ) {
                                      _ts.getData();
                                  }
                              }
                          });
                      });
                }).catch(() => {});
            },
            handleTotop(index, row) {
                this.$message('pass'+(index+1)+'行');
            },
            handleCloseroom(index, row) {
                this.$message.error('Nopass'+(index+1)+'行');
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
.midl-inp{
    width: 200px;
    margin-right: 20px;
}
</style>