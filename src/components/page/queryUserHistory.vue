<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 基础列表</el-breadcrumb-item>
                <el-breadcrumb-item>用户处理历史</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="uidV" placeholder="请输入有信UID" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search" >搜索</el-button>
        </div>
        <div id="d-table">
            <el-table :data="tableData3" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            
                <el-table-column prop="reportUxinUid" label="用户有信UID" width="200">
                </el-table-column>
                <el-table-column prop="pageData" label="平台处理历史">
                    <template scope="scope">
                        <div class="btn-wrap bw2">
                            <span>{{scope.row.dealTime}}</span>
                        </div>
                        <div class="btn-wrap">
                            <span>{{scope.row.dealType}}{{scope.row.bannedDays}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="aaaaaa" label="直播处理历史">
                </el-table-column>
                <el-table-column prop="aaaaaa" label="动态处理历史">
                </el-table-column>
                <el-table-column prop="aaaaaa" label="轰趴处理历史">
                </el-table-column>
                <el-table-column prop="bbbbbb" label="有聊处理历史">
                </el-table-column>
               
            </el-table>

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
          <div class="mrt-10">
                <span>处理方式：</span>
                <el-select v-model="sle_value1" placeholder="处理原因" @change="handleSelect_1">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <div class="in-block">
                    <el-cascader placeholder="处理方式"
                        class="f-right mr10"
                        :options="optionsReport"
                        v-model="sle_value2"
                        expand-trigger="hover"
                        @change="handleSelect_2">
                    </el-cascader>
                </div>

                <el-button type="primary" @click="handleDeal">确定</el-button>
              
          </div>
        </div>
    </div>
</template>

<script>
    import {getAxios,postAxiosResponse} from '../api/request';

    export default {

        data() {
            return {
                url: '',
                uidV: '',
                tableData1: [], //liveinfo
                tableData2: [], //uxininfo
                tableData3: [], //表格
                multipleSelection: [],
                sle_value1: '',
                sle_value2: '',
                dev_disabled: true, //封禁设备是否禁用
                imei_ios: false, //是否有imei、ios
                options1: [
                    // {
                    //   value: '0',
                    //   label: '色情、低俗'
                    // },{
                    //   value: '1',
                    //   label: '广告、营销'
                    // },{
                    //   value: '2',
                    //   label: '骚扰、谩骂'
                    // },{
                    //   value: '3',
                    //   label: '资料作假'
                    // },{
                    //   value: '4',
                    //   label: '政治反动'
                    // },{
                    //   value: '5',
                    //   label: '其他'
                    // }
                ],
                optionsReport:[{
                        value: '0',
                        label: '未处理',
                        disabled: true
                    },{
                        value: '1',
                        label: '不予处理',
                        disabled: true
                    },{
                        value: '2',
                        label: '警告',
                        disabled: true
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
                        disabled: false,
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
                }]
            }
        },
        created(){
            // this.getData();
            this.getOptionArr();
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
            getOptionArr () {
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
                            let ren = b.reportType;
                            ren.map(function (v,i) {
                                _ts.options1.push({
                                    value: i,
                                    label: v
                                });
                                return v;
                            })
                        }
                  })               
            },
            getTabelList () {
                const _ts = this;
                _ts.url = '/h5/v1/report/getAllClosureRecordsByUxinUid';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/report/getAllClosureRecordsByUxinUid';
                };


                _ts.$axios.get(_ts.url,{ params:{uxinUid: _ts.uidV} })
                  .then((res) => {
              
                      if ( res.data.h.code === 200 ) {
                            const datas = res.data.b.pageData;
                            if (datas) {
                                datas.map(function (v) {

                                    // v.reportType = _ts.reportarr[v.reportType]; //举报类型
                                    v.bannedDays = v.bannedDays != 0 ? (v.bannedDays > 365 ? v.bannedDays / 365 + '年' : v.bannedDays+'天') : '';
                                    v.dealType = _ts.optionsReport[v.dealType].label; //举报处理

                                    return v;
                                });
                                _ts.tableData3 = datas;

                                console.info('++++++++++',_ts.tableData3)
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
            setDeviceDisable (v) {
                this.optionsReport[5].disabled = v;                
            },
            getIMEIS () {
                const _ts = this;
                 _ts.imei_url = '/h5/v1/report/getIMEIByUxinUid';
                if(process.env.NODE_ENV === 'development'){
                    _ts.imei_url = 'http://test.hongdoulive.com/h5/v1/report/getIMEIByUxinUid';
                };

                _ts.$axios.get(_ts.imei_url,{ params:{uxinUid: _ts.uidV} })
                  .then((res) => {
              
                      if ( res.data.h.code === 200 ) {

                        if (res.data.b.IMEI == 0) { // 待定????????????????????
                            _ts.imei_ios = true;
                            _ts.setDeviceDisable(true); //有IMEI,禁用“封禁设备” 
                            
                        }
                      }
                      else{
                         console.log('失败！！');
                      }
                  })
            },
            getData(){
                const _ts = this;
                _ts.getTabelList(); //顶部表格数据
                _ts.url = '/h5/v1/audit/queryUserById';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/audit/queryUserById';
                };


                _ts.$axios.get(_ts.url,{ params:{uid: _ts.uidV} })
                  .then((res) => {
              
                      if ( res.data.h.code === 200 ) {
                        if (res.data.b.liveinfo) {
                            _ts.tableData1 = res.data.b.liveinfo;
                            
                            _ts.getIMEIS(); //获取IMEI
                            // _ts.setDeviceDisable(true); // 禁用“封禁设备”
                        }
                        if (res.data.b.uxininfo) {
                            _ts.tableData2 = res.data.b.uxininfo;

                        }
                      }else{
                        _ts.$message({
                            duration: 2000,
                            message: res.h.msg,
                            onClose() {
                                
                            }
                        });
                      }
                  })
            },
            handleDeal (v) {
                const _ts = this;
                const h = _ts.sle_value2;
                let tp1 = h[0];
                let tp2 = h[1] ? h[1] : '';
                let tp2_plus = null;
                // console.info(tp1,_ts.optionsReport[tp1].label,tp2)

                let thetips = '【处理原因】'+_ts.options1[_ts.sle_value1].label+',【处理方式】'+_ts.optionsReport[tp1].label+','+tp2;
                if (tp2.match('三年')) {
                   tp2_plus = 3*365;
                }else if (tp2 == ''){
                    tp2_plus = 0;
                }else{
                    tp2_plus = tp2.replace(/[^0-9]/ig,'');
                }

                _ts.rp_url = '/h5/v1/report/closureByUxinUid';
                if(process.env.NODE_ENV === 'development'){
                    _ts.rp_url = 'http://test.hongdoulive.com/h5/v1/report/closureByUxinUid';
                };
                _ts.$confirm(thetips, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.info('=============',_ts.uidV,_ts.options1[_ts.sle_value1].value,tp1,tp2_plus)
                    getAxios(_ts.rp_url,{uxinUid:_ts.uidV,reportType:_ts.options1[_ts.sle_value1].value,closureType:tp1,bannedDays:tp2_plus},function (ret) { 
                    
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
.el-table--fit.blk,.table .el-table.el-table--fit{
  display: block;
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
.mrt-10{
    margin-top: 30px;
}
.in-block{
    display: inline-block;
}
.btn-wrap{
    padding: 5px;
}
</style>