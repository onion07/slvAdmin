<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 有聊举报</el-breadcrumb-item>
                <el-breadcrumb-item>举报列表</el-breadcrumb-item>
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
            <el-input v-model="obj_id" placeholder="被举报人UID" class="handle-input mr10"></el-input>
            <el-select v-model="sle_value1" placeholder="举报类型" @change="handleSelect_1">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="sle_value2" placeholder="业务类型" @change="handleSelect_2">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table v-loading.body="loading" :data="tableData" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="objId" label="被举报人UID" width="150">
            </el-table-column>
            <el-table-column prop="descriptionInfo.text" label="被举报理由" width="250">
            </el-table-column>
            <el-table-column prop="exposeTime" label="举报时间" width="170">
            </el-table-column>
            <el-table-column prop="descriptionInfo.picture" label="举报当时截图">
                <template scope="scope">
                        <img :src="scope.row.descriptionInfo.picture" class="user-img">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" type="danger" :disabled="scope.row.processedResult===3?true:false"
                            @click="handleBackList(scope.$index, scope.row)">拉黑</el-button>
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
    import {getAxiosResponse,postAxiosResponse} from '../api/request';

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
                value1: this.theDay(true), // 日期：明天
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
                options1: [{
                      value: '',
                      label: '全部'
                    },{
                      value: '1124',
                      label: '言语暴力'
                    },{
                      value: '1125',
                      label: '广告欺诈'
                    },{
                      value: '1126',
                      label: '性别欺骗'
                    },{
                      value: '1127',
                      label: '淫秽色情'
                    },{
                      value: '1128',
                      label: '形象不雅'
                    },{
                      value: '1129',
                      label: '政治反动'
                    },{
                      value: '1130',
                      label: '其他内容'
                }],
                options2: [{
                    //   value: '1',
                    //   label: '动态'
                    // },{
                    //   value: '2',
                    //   label: '评论'
                    // },{
                      value: '4',
                      label: '多人视频'
                }],
                sle_value1: '', //下拉选择
                sle_value2: '多人视频', //下拉选择
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
                const ot_value = _ts.sle_value2.match(/\d/) == null ? 4 : _ts.sle_value2; //默认加载 4:‘多人视频’
           
                _ts.url = '/h5/v1/expose/getExposesByPage';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/expose/getExposesByPage';
                }
                if(process.env.NODE_ENV === 'development' || window.location.host === 'test.hongdoulive.com'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/expose/getExposesByPage';
                    _ts.options1 = [{ //测试环境和线上环境不一样
                          value: '',
                          label: '全部'
                        },{
                          value: '448',
                          label: '言语暴力'
                        },{
                          value: '449',
                          label: '色情'
                        },{
                          value: '450',
                          label: '毒品'
                        },{
                          value: '451',
                          label: '赌博'
                        },{
                          value: '453',
                          label: '恶心'
                        },{
                          value: '452',
                          label: '其他非法'
                    }];
                }
            
                getAxiosResponse(_ts.url,{start:_ts.value1,end:_ts.value2,objId:_ts.obj_id,objType:ot_value,type:_ts.sle_value1,pageNo:_ts.cur_page,pageSize:20,},function (retData,pgTotal) {
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
            handleSelect_1 (v) {
                this.sle_value1 = v;
            },
            handleSelect_2 (v) {
                this.sle_value2 = v;
            },
            search(){
                this.getData();
            },
            auditsCheck (row,status) {
                const _ts = this;
                const busi = 4; // 多人视频
                const rel = 3; // 拉黑
                const args = '?business=' +busi+ '&result=' +rel+ '&objId=' + row.objId;  //与后端协定
                
                _ts.ad_url = '/h5/v1/expose/processExpose' + args;
                // if(process.env.NODE_ENV === 'development'){
                //    _ts.ad_url = '/api/h5/v1/expose/processExpose';
                // }
                 _ts.thetips = '此操作会对用户【uid: '+row.objId+'】进行拉黑，确定吗?';
      
                _ts.$confirm(_ts.thetips, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //business: 4 表示多人视频 ， result: 3 表示拉黑
                    postAxiosResponse(_ts.ad_url,{business: busi,result: rel,objId: row.objId},function (h) { 
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
            //拉黑
            handleBackList(index,row) {
                const _ts = this;
                _ts.auditsCheck(row,3)
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
</style>