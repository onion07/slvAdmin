<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 有聊</el-breadcrumb-item>
                <el-breadcrumb-item>审核通过</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      <!--   <div class="handle-box">
            <el-select v-model="select_cate" placeholder="筛选" class="handle-select mr10">
                <el-option key="1" label="123" value="123"></el-option>
                <el-option key="2" label="456" value="456"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div> -->
        <el-table v-loading.body="loading" :data="tableData" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="nickname" label="用户昵称" width="150">
            </el-table-column>
            <el-table-column prop="uid" label="用户uid" width="120">
            </el-table-column>
            <el-table-column prop="headPic" label="用户头像" width="170">
                <template scope="scope">
                    <img :src="scope.row.headPic"/>
                </template>
            </el-table-column>
            <el-table-column prop="urls" label="用户图片">
                <template scope="scope">
                        <img :src="item" class="user-img" v-for="item in scope.row.urls">
                </template>
            </el-table-column>
            <el-table-column prop="qsStatus" label="答题状态" width="100">
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
    import {getAxiosResponse} from '../api/request';
    

    export default {

        data() {
            return {
                url: '',
                tableData: [],
                loading: true, //加载遮罩层
                cur_page: 1,
                cur_status: 2,// 0：审核未通过，1未审核，2审核通过，3拉黑
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                pg_total: 1000,
                is_search: false
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const _ts = this;
                return _ts.tableData;
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                const _ts = this;
            
                _ts.url = '/h5/v1/randomvideo/auditpiclist';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/randomvideo/auditpiclist';
                };

                
                getAxiosResponse(_ts.url,{pageNo:_ts.cur_page,status:_ts.cur_status,pageSize:20,},function (retData,pgTotal) {
                    _ts.tableData = retData;
                    _ts.pg_total = pgTotal;
                    _ts.loading = false;
                });
            },
            search(){
                this.is_search = true;
            },
            handlePass(index, row) {
                this.$message('pass'+(index+1)+'行');
            },
            handleNopass(index, row) {
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
</style>