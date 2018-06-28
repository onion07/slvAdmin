<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 多人视频</el-breadcrumb-item>
                <el-breadcrumb-item>房间操作</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
          房主UID：
            <el-input v-model="r_uid" placeholder="请输入房主UID" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData" border stripe style="width: 100%" ref="multipleTable" >
            <el-table-column prop="roomIdStr" label="房间ID" width="250">
            </el-table-column>
            <el-table-column prop="uidStr" label="房主UID" width="250">
            </el-table-column>
            <el-table-column prop="nickName" label="房主昵称">
            </el-table-column>
            <el-table-column prop="title" label="房间标题">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="handleCloseroom(scope.$index, scope.row)">关闭房间</el-button>
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
    import { getAxiosVdieoModuleData } from '../api/request';
    

    export default {

        data() {
            return {
                url: '',
                cl_url: '', //关闭房间
                tableData: [],
                r_uid:'',
                cur_page: 1,
                pg_total: 1000,
                multipleSelection: []
            }
        },
        computed: {
            data(){
                return this.tableData;
            }
        },
        created() {
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            //获取列表
            getData(){
                const _ts = this;
            
                _ts.url = '/h5/v1/multivideo/queryRoomList';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/multivideo/queryRoomList';
                };
                getAxiosVdieoModuleData(_ts.url,{uid: _ts.r_uid,business: 16,type: 1,pageNo: _ts.cur_page,pageSize: 20},function (retData,pgTotal) {
                    _ts.tableData = retData;
                    _ts.pg_total = pgTotal;
                });
                
                  
            },
            search(){
                this.getData();
            },
            handleTotop(index, row) {
                this.$message('pass'+(index+1)+'行');
            },
            //关闭房间
            handleCloseroom(index, row) {
                const _ts = this;

                _ts.cl_url = '/h5/v1/multivideo/closeRoom';
                if(process.env.NODE_ENV === 'development'){
                    _ts.cl_url = 'http://test.hongdoulive.com/h5/v1/multivideo/closeRoom';
                };
                _ts.$confirm('确定要关闭房间【'+row.roomIdStr+'】吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _ts.$axios.get(_ts.cl_url,{ params:{ roomId: row.roomIdStr} })
                        .then((res) => { 
                           const h = res.data.h;
                           _ts.$message({
                                duration: 2000,
                                message: h.msg,
                                onClose() {
                                    if ( h.code === 200 ) {
                                        _ts.getData();
                                    }
                                }
                            });
                        });

                }).catch(() => {});

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
</style>