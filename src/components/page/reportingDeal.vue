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
            <el-table-column prop="reportUxinUid" label="被举报人有信UID" width="150">
            </el-table-column>
            <el-table-column prop="description" label="被举报理由" width="140">
            </el-table-column>
            <el-table-column prop="reportType" label="举报类型" width="140">
                <!-- <template scope="prop">
                    <div>{{_reporttype[prop.row.reportType]}}</div>
                </template> -->
            </el-table-column>
            <el-table-column prop="pictureUrl" label="举报截图" width="360">
                <template scope="scope">
                       <a class="a-img" :href="item" target="_blank"  v-for="item in scope.row.pictureUrl">
                           <img :src="item" class="user-img"> 
                        </a>
                </template>
            </el-table-column>
            <el-table-column prop="dealType" label="举报处理" width="380">
                <template scope="scope">
                    <el-button type="primary" class="f-right" :disabled="clickLock[scope.$index].lock" @click="handleCheck(scope.$index, scope.row)">确定</el-button>
                    <!-- 处理天数 -->
                    <select class="f-right select-36" v-show="dealbig3[scope.$index].isshow" v-model="slectoptions_day[scope.$index]" @change="setTheSelect_day(scope.$index,scope.row)">
                        <option :key="item.value" :value="item.value" v-for="item in options2">{{item.label}}</option>
                    </select>
                    <!-- 处理方式 -->
                    <select class="f-right select-36" v-model="slectoptions[scope.$index]" @change="handleTheSelect(scope.$index,scope.row)">
                        <option :key="item.value" :disabled="item.value == 0" :value="item.value" v-for="item in options1">{{item.label}}</option>
                    </select>
                    <span class="f-right">请选择处理方式：</span>
                    <!-- <el-cascader 
                        class="f-right mr10"
                        :options="optionsReport" 
                        v-model="scope.row.select_arr"
                        expand-trigger="hover"
                        @change="handleSelect_1">
                    </el-cascader> -->

                </template>
            </el-table-column>
            <el-table-column prop="history" label="举报历史" width="180">
                <template scope="prop">
                    <div class="mb-1" v-if="prop.row.history.length > 0"  :key="item.id" v-for="item in prop.row.history">
                        <div>{{item.dealTime}}</div>
                        <div>{{item.dealType}}</div>
                        <div>{{item.reportType}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="reportEntry" label="举报入口" width="180">
                <template scope="prop">
                    <div>
                        <div>{{prop.row.reportEntry}}{{prop.row.reportUrl_extra}}</div>
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

    export default {

        data() {
            return {
                url: '', // 获取未审核的数据接口
                ad_url: '', // 拉黑操作接口
                thetips: '',
                selecttips: '', //举报处理提示
                tableData: [],
                loading: true, //加载遮罩层
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                pg_total: 1000,
                obj_id: '',
                // value1: this.theDay(true), // 日期：明天
                // value2: this.theDay(false), // 日期: 今天
                value1: '', // 开始时间（所有数据）
                value2: '', // 结束时间（所有数据）
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
                sle_value2: '', //下拉选择
                theId: '', //id
                dealbig3: [],
                slectoptions_day: [], //【辅助属性】，封禁天数
                slectoptions: [ // 【辅助属性】 封禁方式
                    // {
                    //     id: '43'
                    // }
                ],
                clickLock: [],
                selectDisabled: false,
                slectoptions_index: 0,
                the_selection: [
                    {
                        value: '0',
                        label: 'aaaaa'
                    },
                    {
                        value: '1',
                        label: 'bbbbb'
                    },
                    {
                        value: '2',
                        label: 'vvvvvv'
                    }
                ],
                options1: [{
                        value: '0',
                        label: '未处理'
                    },{
                        value: '1',
                        label: '不予处理'
                    },{
                        value: '2',
                        label: '警告'
                    },{
                        value: '3',
                        label: '封禁社交功能'
                    },{
                        value: '4',
                        label: '封禁账号'
                    },{
                        value: '5',
                        label: '封禁设备'
                }],
                options2: [{  //封禁时长
                        value: '0',
                        label: '3天'
                    },{
                        value: '1',
                        label: '7天'
                    },{
                        value: '2',
                        label: '14天'
                    },{
                        value: '3',
                        label: '三年'
                }],
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
                }

                ],
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
                report_enterarr:[
                    // '个人主页',
                    // '小资料卡（除轰趴)',
                    // '动态',
                    // '轰趴',
                    // '有聊'
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
            getReportEnterArr () {
                const _ts = this;
                let enter_url = '/h5/v1/report/queryAllEnums';
                if(process.env.NODE_ENV === 'development'){
                    enter_url = 'http://test.hongdoulive.com/h5/v1/report/queryAllEnums';
                }
                _ts.$axios.get(enter_url,{ params:{} })
                  .then((res) => {
                      let h = res.data.h;
                      let b = res.data.b;
                        if (h.code == 200) {
                            _ts.report_enterarr = b.reportEntry;
                        }
                  })               
            },
            getData(){
                const _ts = this;
                _ts.getReportEnterArr();

                _ts.url = '/h5/v1/report/getAllUntreatedReports';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/report/getAllUntreatedReports';
                }

                getAxios(_ts.url,{beginDate:_ts.value1,endDate:_ts.value2,reportUid:_ts.obj_id,pageNo:_ts.cur_page,pageSize:20,},function (ret) {

                    if (ret.h.code == 200) {

                        let retData = ret.b.pageData;
                        let pgTotal = ret.b.dataTotal;
                        retData.map(function (v,i) {
                            v.reportType = _ts.reportarr[v.reportType]; //举报类型
                            v.dealType_extr = v.dealType; //辅助dealType,举报处理需要用到

                            const h = _ts.dealarr[v.dealType];
                            const d = v.bannedDays+'天';

                            v.select_deal = ''; // 设置select 默认值
                            v.select_dealday = ''; // 设置select 默认值

                            _ts.slectoptions.push(v.id.select_deal); //辅助属性
                            // _ts.slectoptions[0].disabled = true;
                            // console.info(JSON.stringify(_ts.slectoptions))
                            _ts.slectoptions_day.push(v.id.select_dealday); //辅助属性
                            _ts.dealbig3.push({isshow:false}); //辅助属性
                            _ts.clickLock.push({lock:true}); //辅助属性
                            
                            // console.info('__________',JSON.stringify(_ts.dealbig3))
                            
                            v.dealType = _ts.dealarr[v.dealType]; //举报处理
                            v.reportUrl_extra = v.reportUrl ? v.reportUrl : '';
                            v.reportEntry = _ts.report_enterarr[v.reportEntry]; //举报入口

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
            handleCheck (i,r) {
                const _ts = this;

                _ts.ad_url = '/h5/v1/report/dealReport';
                if(process.env.NODE_ENV === 'development'){
                    _ts.ad_url = 'http://test.hongdoulive.com/h5/v1/report/dealReport';
                }
                console.info('sleletoption_index,',this.slectoptions_index,i)
                console.info('sleletoption,',this.slectoptions[this.slectoptions_index])

                this.setSelectIndex(i); //设置index
                this.setTheSelect_day(i); //设置s_day
                let ops = this.slectoptions[this.slectoptions_index] ? this.slectoptions[this.slectoptions_index] : ''; //处理方式
                let day_value = this.s_day ? this.s_day : ''; //天数
                let days = null;
                let day_label = day_value ? _ts.options2[day_value].label : ''; //天数label

                _ts.selecttips = '确定要对该用户进行：'+day_label+'【'+_ts.options1[ops].label+'】吗?';

               if (day_value == 3) { // 三年
                   days = 3*365;
               }else if (!day_value) { // 空字符串
                   days = 0;
                   if (ops > 2) { //封禁xxx
                        this.$alert('请选择处理时长(天数)', '警告', {
                            confirmButtonText: '确定',
                            callback: action => {
                        
                            }
                        });
                        return false;
                   }
               }else{
                   days = day_label.replace(/[^0-9]/ig,'');
               }
                console.info(r.id,this.s_day,'ops=== ',ops,days)
               _ts.$confirm(_ts.selecttips, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    getAxios(_ts.ad_url,{id:r.id,dealType:ops,bannedDays:days},function (ret) { 
                        console.info(ret)
                        _ts.$message({
                            duration: 2000,
                            message: ret.h.msg,
                            onClose() {
                                if ( ret.h.code === 200 ) {
                                    // _ts.getData();
                                    location.reload();
                                }
                            }
                        });
                    });

                }).catch(() => {});
            
            },
            // handleCheck_v2 (i,r) {
            //     const _ts = this;
            //     const v = this.theId;
            //     _ts.ad_url = '/h5/v1/report/dealReport';
            //     if(process.env.NODE_ENV === 'development'){
            //         _ts.ad_url = 'http://test.hongdoulive.com/h5/v1/report/dealReport';
            //     }
            //     let tp1 = v[0];
            //     let tp2 = v[1] ? v[1] : '';
                
            //     let tp2_plus = null;
            //     _ts.selecttips = '确定要对该用户进行【'+_ts.optionsReport[tp1].label+'】'+tp2+'吗?';

            //    if (tp2.match('三年')) {
            //        tp2_plus = 50*365;
            //    }else if (tp2 == ''){
            //        tp2_plus = 0;
            //    }else{
            //        tp2_plus = tp2.replace(/[^0-9]/ig,'');
            //    }
            //    _ts.$confirm(_ts.selecttips, '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         console.info('=============',r.id,tp1,tp2_plus)
            //         getAxios(_ts.ad_url,{id:r.id,dealType:tp1,bannedDays:tp2_plus},function (ret) { 
            //             console.info(ret)
            //             _ts.$message({
            //                 duration: 2000,
            //                 message: ret.h.msg,
            //                 onClose() {
            //                     if ( ret.h.code === 200 ) {
            //                         _ts.getData();
            //                     }
            //                 }
            //             });
            //         });

            //     }).catch(() => {});
            // },
            setIds (v){
                this.theId = v;
                return v;
            },
            handleSelect_1 (v) {
                const _ts = this;
                console.info('v:',v)
                this.setIds(v);
            },
            setSday (d) {
                this.s_day = d;
                console.info('setSday::',this.s_day);
            },
            setSelectIndex (i) {
                this.slectoptions_index = i;    
                console.info('setSelectIndex::',this.slectoptions_index)             
            },
            setSelectDaysNull () {
                this.s_day = '';
                console.info('setSelectDaysNull::',this.s_day)                          
            },
            handleTheSelect (i,r) {

                this.setSelectIndex(i);
                this.setSelectDaysNull();
                this.clickLock[i].lock = false;
                if (this.slectoptions[i] > 2) {
                    this.dealbig3[i].isshow = true;
                    this.setTheSelect_day(i);
                }else{
                    this.dealbig3[i].isshow = false;
                    this.s_day = 0;
                }
                console.info('处理方式：',this.slectoptions[i],r)
            },
            setTheSelect_day (i,r) {
                // this.slectoptions_index = i;
                this.s_day = this.slectoptions_day[i];    
                console.info('天数：',this.slectoptions_day[i],r)
                             
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
.a-img{
    float: left;
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
body .el-table .cell{
    padding: 0;
}
.select-36{
    margin-right: 6px;
    height: 36px; 
}
.mb-1{
    border-bottom: 1px solid #ddd;
}
</style>