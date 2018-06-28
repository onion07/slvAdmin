<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>举报</el-breadcrumb-item>
                <el-breadcrumb-item>举报查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!-- 时间范围：从 
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
            </el-date-picker> -->

            <el-button type="primary" icon="search" class="f-right" @click="search">搜索</el-button>
            <el-input v-model="uidV" placeholder="被举报人有信UID" class="handle-input mr10 f-right"></el-input>
        </div>
        <el-table :data="tableData" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="reportUxinUid" label="用户UID" width="200">
                </el-table-column>
                <el-table-column prop="pageData" label="平台处理历史" width="200">
                    <template scope="scope">
                        <div class="outer" v-show=" !scope.row.isCancel ">
                            <div class="btn-wrap bw2">
                                <span>{{scope.row.dealTime}}</span>
                            </div>
                            <div class="btn-wrap">
                                <span>{{scope.row.dealType}}{{scope.row.bannedDays}}</span>
                            </div>
                            <div class="btn-wrap bordt-10">
                                <el-button type="danger" class="little-btn" @click="handleCancalDeal(scope.$index, scope.row)">解除处理</el-button>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="aaaaaa" label="直播处理">
                </el-table-column>
                <el-table-column prop="aaaaaa" label="动态处理">
                </el-table-column>
                <el-table-column prop="aaaaaa" label="轰趴处理">
                </el-table-column>
                <el-table-column prop="bbbbbb" label="有聊处理">
                </el-table-column>
                <el-table-column prop="bbbbbb" label="处理历史" width="220">
                    <template scope="scope">
                        <div class="outer" v-show="scope.row.isCancel">
                        <!-- <div class="outer" v-show="handleCancel(scope.$index, scope.row)"> -->
                            
                            <div class="btn-wrap bw2">
                                <span>{{scope.row.dealTime}}</span>
                            </div>
                            <div class="btn-wrap">
                                <span>{{scope.row.dealType}}{{scope.row.bannedDays}}</span>
                            </div>
                        </div>
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

    // 时间戳 转 yyyy-MM-dd hh:mm:ss
    // function getDateFormat (dayString) {
    //     return dateFormat( new Date().setTime(dayString * 1000),'yyyy-MM-dd hh:mm:ss' );
    // }
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
                pg_total: 0,
                uidV: '',
                obj_id: '',
                value1: this.theDay(true), // 日期：明天
                // value1: '2018-03-02', // test
                value2: this.theDay(false), // 日期: 今天
                // value1: '', // 开始时间
                // value2: '', // 开始时间
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
                hasdeal: false, //已经解除处理
                sle_value1: '', //下拉选择
                sle_value2: '多人视频', //下拉选择
                dialogTableVisible: false, //解除处理弹窗
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
                ],
                optionsReport:[{
                        value: '0',
                        label: '未处理',
                        disabled: true
                    },{
                        value: '1',
                        label: '不予处理'
                    },{
                        value: '2',
                        label: '警告'
                    },{
                        value: '3',
                        label: '封禁社交功能',
                        children: [{  //封禁时长
                                value: '3天',
                                label: '3天'
                            },{
                                value: '7天',
                                label: '7天'
                            },{
                                value: '14天',
                                label: '14天'
                            },{
                                value: '三年',
                                label: '三年'
                        }]
                    },{
                        value: '4',
                        label: '封禁账号',
                        children: [{  //封禁时长
                                value: '3天',
                                label: '3天'
                            },{
                                value: '7天',
                                label: '7天'
                            },{
                                value: '14天',
                                label: '14天'
                            },{
                                value: '三年',
                                label: '三年'
                        }]
                    },{
                        value: '5',
                        label: '封禁设备',
                        children: [{  //封禁时长
                                value: '3天',
                                label: '3天'
                            },{
                                value: '7天',
                                label: '7天'
                            },{
                                value: '14天',
                                label: '14天'
                            },{
                                value: '三年',
                                label: '三年'
                        }]
                }],
                platfom_history: []
            }
        },
        created(){
            // console.info( getDateFormat(1528976232) )
            // console.info(getDateString())
            // console.info( getDateString()>1528976232 )
            // this.getData();
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
            //     if (!r.isCancel && r.expireTime) { //服务器返回isCancel 是false,如果过期（expireTime），禁用
            //         if ( getDateString() > getDateString(r.expireTime) ) {
            //             // console.log('过期。。。。。');
            //             iscancel = true;
            //         }
            //     }
            //     return iscancel;
            // },
            getData(){
                 const _ts = this;
                _ts.url = '/h5/v1/report/getAllClosureRecordsByUxinUid';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/report/getAllClosureRecordsByUxinUid';
                };


                _ts.$axios.get(_ts.url,{ params:{uxinUid: _ts.uidV} })
                  .then((res) => {
              
                      if ( res.data.h.code === 200 ) {
                            const datas = res.data.b.pageData;
                            let pgTotal = res.data.b.dataTotal;
                            
                            if (datas) {
                                datas.map(function (v) {
                                    // v.reportType = _ts.reportarr[v.reportType]; //举报类型
                                    // v.bannedDays = v.bannedDays != 0 ? (v.bannedDays+'天') : '';
                                    v.bannedDays = v.bannedDays != 0 ? (v.bannedDays > 365 ? v.bannedDays / 365 + '年' : v.bannedDays+'天') : '';
                                    
                                    v.dealType = _ts.optionsReport[v.dealType].label; //举报处理
                                    if ( !v.isCancel && v.expireTime ) { //服务器返回isCancel 是false,如果过期（expireTime），禁用
                                        if ( getDateString() > getDateString(v.expireTime) ) {
                                            console.log('过期。。。。。');
                                            v.isCancel = true;
                                        }
                                    }
                                    return v;
                                });
                                _ts.tableData = datas;
                                _ts.pg_total = pgTotal;
                                _ts.loading = false;
                                console.info('++++++++++',_ts.tableData)
                            }
                      }else{
                        _ts.$message({
                            duration: 2000,
                            message: res.data.h.msg,
                            onClose() {
                                
                            }
                        });
                      }
                  })

            },
            auditsCheck (index,row) {
                const _ts = this;
                let dtime = row.dealTime;
                let dtype = row.dealType;
                let banday = row.bannedDays;
                _ts.ad_url = '/h5/v1/report/cancelClosureRecord';
                if(process.env.NODE_ENV === 'development'){
                   _ts.ad_url = 'http://test.hongdoulive.com/h5/v1/report/cancelClosureRecord';
                }
                // console.info(dtime,dtype,banday)
                 _ts.thetips = '【'+dtime+'】 | 【'+dtype+banday+'】';
      
                _ts.$confirm(_ts.thetips, '解除处理', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    getAxios(_ts.ad_url,{id:row.id},function (ret) { 
                        console.info(ret)
                        _ts.$message({
                            duration: 2500,
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
            handleCancalDeal(index,row) {
                this.auditsCheck(index,row)
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    overflow: hidden;
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
.bordt-10{
    margin: 10px auto;
    border-top: 1px solid #ddd;
    text-align: center;
}
.btn-wrap{
    margin-top: 5px;
    text-align: center;
}
.little-btn{
    display: inline-block;
    margin: 10px;
    width: 100px;
    height: 34px;
}
.outer{
    min-height: 114px;
}
</style>