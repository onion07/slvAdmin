<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 关键字与审计日志</el-breadcrumb-item>
                <el-breadcrumb-item>审计日志</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            时间范围：从 
            <el-date-picker
              @change="dateChange1"
              v-model="value1"
              align="right"
              type="date"
              placeholder="选择开始时间"
              :picker-options="pickerOptions1">
            </el-date-picker>
            到
            <el-date-picker
              @change="dateChange2"
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择结束时间"
              :picker-options="pickerOptions2">
            </el-date-picker>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table v-loading.body="loading" :data="tableData" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="uid" label="uid" width="120">
            </el-table-column>
            <el-table-column prop="time" label="时间">
            </el-table-column>
            <el-table-column prop="ip" label="IP">
            </el-table-column>
            <el-table-column prop="phone" label="phone">
            </el-table-column>
            <el-table-column prop="osVersion" label="osVersion" width="120">
            </el-table-column>
            <el-table-column prop="osType" label="osType" width="120">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
            </el-table-column>
            <el-table-column prop="flag" label="操作" width="100">
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
                multipleSelection: [],
                pg_total: 1000, //分页默认值
                value1: this.theDay(true), // 日期：明天
                value2: this.theDay(false), // 日期: 今天
                pickerOptions1: { //开始日期
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                          picker.$emit('pick', new Date());
                        }
                    }, 
                    {
                        text: '昨天',
                        onClick(picker) {
                          const date = new Date();
                          date.setTime(date.getTime() - 3600 * 1000 * 24);
                          picker.$emit('pick', date);
                        }
                    }, 
                    {
                        text: '一周前',
                        onClick(picker) {
                          const date = new Date();
                          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                          picker.$emit('pick', date);
                        }
                    }]
                },
                pickerOptions2: { //结束日期
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                          picker.$emit('pick', new Date());
                        }
                    }, 
                    {
                        text: '昨天',
                        onClick(picker) {
                          const date = new Date();
                          date.setTime(date.getTime() - 3600 * 1000 * 24);
                          picker.$emit('pick', date);
                        }
                    }, 
                    {
                        text: '一周前',
                        onClick(picker) {
                          const date = new Date();
                          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                          picker.$emit('pick', date);
                        }
                    }]
                }
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

                _ts.url = 'http://live.booksn.com/h5/v1/audit/getUserLoginList';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://live.booksn.com/h5/v1/audit/getUserLoginList';
                };

                getAxiosResponse(_ts.url,{start:_ts.value1,end:_ts.value2,pageNo:_ts.cur_page,pageSize:20,},function (retData,pgTotal) {
                    _ts.tableData = retData;
                    _ts.pg_total = pgTotal;
                    _ts.loading = false;
                });
            },
            theDay(b) {
                const now = new Date();
                const year = now.getFullYear(); 
                const month = now.getMonth()+1; 
                const date = b ? now.getDate() : now.getDate()+1; 
                return year+"-"+month+"-"+date; 
            },
            dateChange1 (v) {
                this.value1 = v;
            },
            dateChange2 (v) {
                this.value2 = v;
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
</style>