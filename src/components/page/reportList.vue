<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>举报</el-breadcrumb-item>
                <el-breadcrumb-item>举报查询</el-breadcrumb-item>
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

            <el-button type="primary" icon="search" class="f-right" @click="search">搜索</el-button>
            <el-input v-model="obj_id" placeholder="被举报人有信UID" class="handle-input mr10 f-right"></el-input>
        </div>
        <el-table v-loading.body="loading" :data="tableData" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="reportUxinUid" label="被举报人UID" width="140">
            </el-table-column>
            <el-table-column prop="description" label="被举报理由" width="140">
            </el-table-column>
            <el-table-column prop="reportType" label="举报类型" width="120">
                <!-- <template scope="prop">
                    <div>{{_reporttype[prop.row.reportType]}}</div>
                </template> -->
            </el-table-column>
            <el-table-column prop="pictureUrl" label="举报当时截图">
                <template scope="scope">
                       <a class="a-img" :href="item" target="_blank"  v-for="item in scope.row.pictureUrl">
                            <img :src="item" :key="item.id" class="user-img" v-for="item in scope.row.pictureUrl">
                       </a>                    
                </template>
            </el-table-column>
            <el-table-column prop="dealTime" label="处理时间" width="120">
            </el-table-column>
            <el-table-column prop="dealType" label="举报处理" width="150">
                <template scope="scope">
                    <div>{{scope.row.dealType}}</div>
                    <div>{{scope.row.bannedDays}}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="history" label="历史处理">
                <template scope="prop">
                    <div v-if="prop.row.history.length > 0">{{prop.row.history[0].dealTime}}</div>
                    <div v-if="prop.row.history.length > 0">{{prop.row.history[0].dealType}}</div>
                    <div v-if="prop.row.history.length > 0">{{prop.row.history[0].reportType}}</div>
                </template>
            </el-table-column> -->
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <!-- <el-button size="small" type="danger" :disabled="handleCancel(scope.$index, scope.row)"
                            @click="handleBackList(scope.$index, scope.row)">解除处理</el-button> -->
                    <el-button size="small" type="danger" :disabled="scope.row.isCancel"
                            @click="handleBackList(scope.$index, scope.row)">解除处理</el-button>
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
    import {getAxios,postAxiosResponse} from '../api/request';
    import {getDateFormat,getDateString} from '../filters/';

    export default {

        data() {
            return {
                url: '', // 获取未审核的数据接口
                ad_url: '', // 拉黑操作接口
                thetips: '',
                tableData: [],
                loading: true, //加载遮罩层
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                pg_total: 1000,
                obj_id: '',
                // value1: this.theDay(true), // 日期：明天
                // value2: this.theDay(false), // 日期: 今天
                value1: '', // 开始时间
                value2: '', // 开始时间
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
                },
                sle_value1: '', //下拉选择
                sle_value2: '多人视频', //下拉选择
                reportarr:[ //举报类型
                    '色情、低俗',
                    '广告、营销',
                    '骚扰、谩骂',
                    '资料作假',
                    '政治反动',
                    '其他'
                ],
                dealarr:[
                    '未处理',
                    '不予处理',
                    '警告',
                    '封禁社交功能',
                    '封禁账号',
                    '封禁设备'
                ]
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
            // handleCancel (i,r) {
            //     let iscancel = r.isCancel; //服务器返回isCancel 是true,禁用
            //     // console.info('当前isCancale= ',r.isCancel,'过期时间= ',r.expireTime)
            //     // console.info('当前时间戳= ',getDateString(),'expire的时间戳', getDateString(r.expireTime))
            //     // console.info('是否过期：',getDateString() > getDateString(r.expireTime));
            //     if (!r.isCancel && r.expireTime) { //服务器返回isCancel 是false,如果过期（expireTime），禁用
            //         if ( getDateString() > getDateString(r.expireTime) ) {
            //             console.log('过期。。。。。');
            //             iscancel = true;
            //         }
            //     }
            //     return iscancel;
            // },
            getData(){
                const _ts = this;
                const ot_value = _ts.sle_value2.match(/\d/) == null ? 4 : _ts.sle_value2; //默认加载 4:‘多人视频’
           
                _ts.url = '/h5/v1/report/getAllTreatedReports';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/report/getAllTreatedReports';
                }

                getAxios(_ts.url,{beginDate:_ts.value1,endDate:_ts.value2,reportUid:_ts.obj_id,pageNo:_ts.cur_page,pageSize:20,},function (ret) {

                    if (ret.h.code == 200) {
                            let retData = ret.b.pageData;
                            let pgTotal = ret.b.dataTotal;
                            retData.map(function (v) {
                                v.reportType = _ts.reportarr[v.reportType];
                                v.dealType = _ts.dealarr[v.dealType];
                                // v.bannedDays = v.bannedDays > 0 ? (v.bannedDays + '天') : '';
                                v.bannedDays = v.bannedDays != 0 ? (v.bannedDays > 365 ? v.bannedDays / 365 + '年' : v.bannedDays+'天') : '';
                                

                                if ( !v.isCancel && v.expireTime ) { //服务器返回isCancel 是false,如果过期（expireTime），禁用
                                    if ( getDateString() > getDateString(v.expireTime) ) {
                                        console.log('过期。。。。。');
                                        v.isCancel = true;
                                    }
                                }
                                if (v.history.length > 0) {
                                    v.history.map(function (m) {
                                        m.reportType = _ts.reportarr[m.reportType];
                                        m.dealType = _ts.dealarr[m.dealType];
                                        return m;
                                    })
                                }
                                return v;
                            });
                            _ts.tableData = retData;
                            _ts.pg_total = pgTotal;
                            _ts.loading = false;
                    }else{
                        _ts.$message({
                            duration: 2000,
                            message: ret.h.msg,
                            onClose() {

                            }
                        });
                    }

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
            handleSelect_1 (v) {
                this.sle_value1 = v;
            },
            handleSelect_2 (v) {
                this.sle_value2 = v;
            },
            search(){
                this.getData();
            },
            auditsCheck (index,row) {
                const _ts = this;
    
                
                _ts.ad_url = '/h5/v1/report/cancelReport';
                if(process.env.NODE_ENV === 'development'){
                   _ts.ad_url = 'http://test.hongdoulive.com/h5/v1/report/cancelReport';
                }
                 _ts.thetips = '此操作会对用户【uid: '+row.uid+'】进行解除，确定吗?';
      
                _ts.$confirm(_ts.thetips, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    getAxios(_ts.ad_url,{id:row.id},function (ret) { 
                        console.info(ret)
                        _ts.$message({
                            duration: 2000,
                            message: ret.h.msg,
                            onClose() {
                                if ( ret.h.code === 200 ) {
                                    _ts.getData();
                                }
                            }
                        });
                    });

                }).catch(() => {});
            },
            //拉黑
            handleBackList(index,row) {
                this.auditsCheck(index,row)
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
.el-input{
    width: 200px;
}
.el-select{
    width: 140px;
}
.el-date-editor--date{
    width: 160px;
}
.f-right{
    float: right;
}
.mr10.f-right{
    margin-right: 10px;
}
.wrapper .el-table .cell{
    padding: 0;
}
</style>