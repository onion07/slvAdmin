<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 有信标签</el-breadcrumb-item>
                <el-breadcrumb-item>直播间置顶标签列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="success" icon="plus" @click="handleAdd()">置顶直播间</el-button>
        </div>
        <el-table v-loading.body="loading" :data="tableData" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="resourceId" label="直播间ID" width="186">
            </el-table-column>
            <el-table-column prop="title" label="直播间标题">
            </el-table-column>
            <el-table-column prop="nickName" label="主播昵称">
            </el-table-column>
            <el-table-column prop="tag" label="标签ID" width="80">
            </el-table-column>
            <el-table-column prop="tagName" label="标签名称" width="100">
            </el-table-column>
            <el-table-column prop="effectTime" label="生效时间" width="160">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button size="small" type="primary" @click="cancelTop(scope.row)">取消置顶</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="直播间ID" :label-width="formLabelWidth">
              <input :class="['el-input', 'el-input__inner', {'is-disabled':dialogInpdisable}]" v-model="form.resourceId" :disabled="dialogInpdisable" type="number" auto-complete="off" placeholder="请输入数字" />
            </el-form-item>
            <el-form-item label="置顶标签" :label-width="formLabelWidth" >
              <el-select v-model="form.tag" placeholder="请选择标签" :disabled="dialogInpdisable" @change="handleSelect_1">
                <el-option
                  v-for="item in form.selTagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生效时间" :label-width="formLabelWidth">
              从
              <el-date-picker
                @change="startTimeChange"
                v-model="form.startTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
              到
              <el-date-picker
                @change="endTimeChange"
                v-model="form.endTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrUpdateTag()">确 定</el-button>
          </div>
        </el-dialog>

    </div>
</template>

<script>
    import {getAxios, postAxiosResponse} from '../api/request';
    import {dateFormat, dateGetTime, nickNameFormat} from '../filters/index.js';

    export default {
        data() {
            return {
                url: '/h5/v1/slive/search/top/list', // 获取列表数据接口
                ad_url: '/h5/v1/slive/search/top/add', //新增接口
                cansel_url: '/h5/v1/slive/search/top/remove', //取消置顶接口
                selTagList_url: '/h5/v1/appconfig/queryTagList',
                tableData: [],
                loading: true, //加载遮罩层
                multipleSelection: [],
                dialogFormVisible: false,
                dialogFormTitle: '置顶直播间',
                dialogInpdisable: false,
                dialogSureBtnLock: false,
                form: {
                  resourceId: '',
                  resourceType: '1',//目前只有1有，1：直播间,2：小视频,3：短语音
                  startTime: '',
                  endTime: '',
                  tag: {
                    name: '',
                    id: '',
                    index: ''
                  },
                  selTagOptions: []
                },
                formLabelWidth: '120px'
            }
        },
        created(){
            this.getData();
            this.getSelTaglist();
        },
        computed: {
            data(){
                const _ts = this;
                return _ts.tableData;
            },
        },
        methods: {
            getData(){
                const _ts = this;
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com'+_ts.url;
                }
                _ts.loading = true;
                const sendData = {
                  appId: '82', 
                  resourceType: 1 //目前只有1有，1：直播间,2：小视频,3：短语音,
                };
                
                getAxios(_ts.url, sendData, function (retData) {
                  if(retData.h.code == 200){
                    const data = retData.b;
                    const listData = [];
                    let now = new Date().getTime();
                    data.map(function(item) {
                      let effectTime = '',startTime = item.startTime || '', endTime = item.endTime || '';
                      if( endTime && now > endTime){
                        effectTime = "已过期";
                      }else{
                        effectTime = (startTime ? dateFormat(startTime) : '') +'~'+(endTime ? dateFormat(endTime) : '');
                      }
                      let listItem = {
                        resourceId: item.resourceStrId,
                        resourceType: item.resourceTypeIndex,
                        title: item.title || '',
                        nickName: item.nickName || '',
                        tag: item.tag,
                        tagName: item.name, //tagName,
                        effectTime: effectTime
                      };
                      listData.push(listItem);
                    });
                    _ts.tableData = listData;
                  }else{
                    _ts.$message({
                      duration: 2000,
                      type: 'error',
                      message: retData.h.msg,
                    });
                  }
                  _ts.loading = false;
                });
            },
            getSelTaglist(){
              const _ts = this;
              if(process.env.NODE_ENV === 'development'){
                  _ts.selTagList_url = 'http://test.hongdoulive.com'+_ts.selTagList_url;
              }
              const sendData = {
                appId: '82', 
                tagType: '1', //'1:置顶使用;0:用户创建直播间使用'
                tagStatus: '1', //默认全部,'0:不可用;1:可用'
                order: 'id' //默认id，按id排序
              };
              
              getAxios(_ts.selTagList_url, sendData, function (retData) {
                if(retData.h.code == 200){
                  const opts = [];
                  retData.b.forEach(function (v) {
                    opts.push({
                       value: v.id,
                       label: v.name,
                       index: v.index
                    });
                  });
                  _ts.form.selTagOptions = opts;
                }else{
                  _ts.$message({
                    duration: 2000,
                    type: 'error',
                    message: retData.h.msg,
                  });
                }
                _ts.loading = false;
              });
              
            },
            handleSelect_1 (v) {
//            console.dir(v);
                this.form.tag = v;
            },
            startTimeChange (v) {
              this.form.startTime = dateGetTime(v);
            },
            endTimeChange (v) {
              this.form.endTime = dateGetTime(v);
            },
            addOrUpdateTag () {
                const _ts = this;
                if(_ts.dialogSureBtnLock) return ;
                _ts.dialogSureBtnLock = true;
                
                if(process.env.NODE_ENV === 'development'){
                    _ts.ad_url = 'http://test.hongdoulive.com' + _ts.ad_url;
                }
                if(!_ts.form.resourceId){
                  this.$message({
                    showClose: true,
                    message: '标签ID不能为空！',
                    type: 'warning'
                  });
                  _ts.dialogSureBtnLock = false;
                  return ;
                }
                
                if( !_ts.form.tag.value ){
                  this.$message({
                    showClose: true,
                    message: '请选择标签类型！',
                    type: 'warning'
                  });
                  _ts.dialogSureBtnLock = false;
                  return ;
                }
                
                if( !_ts.form.startTime || !_ts.form.endTime || _ts.form.startTime >_ts.form.endTime){
                  this.$message({
                    showClose: true,
                    message: '请选择生效时间，结束时间不能小于开始时间！',
                    type: 'warning'
                  });
                  _ts.dialogSureBtnLock = false;
                  return ;
                }
                
                const postData = {
                    appId: '82',
                    resourceId: _ts.form.resourceId,
                    resourceType: _ts.form.resourceType,
                    tag: _ts.form.tag.value,
                    index: _ts.form.tag.index,
                    startTime: _ts.form.startTime,
                    endTime: _ts.form.endTime
                };
                postAxiosResponse(_ts.ad_url,postData,function (h) { 
                  if ( h.code === 200 ) {
                    _ts.dialogFormVisible = false;
                    _ts.getData();
                    
                  }
                  _ts.$message({
                    duration: 2000,
                    message: h.msg,
                  });
                  _ts.dialogSureBtnLock = false;
                   _ts.loading = false;
                  
                },function(err){
                  _ts.$message({
                    duration: 2000,
                    type: 'error',
                    message: err,
                  });
                  _ts.dialogSureBtnLock = false;
                });

            },
            //新建标签
            handleAdd() {
                const _ts = this;
                _ts.form.resourceId = '',
                _ts.form.resourceType = '1',//目前只有1有，1：直播间,2：小视频,3：短语音
                _ts.form.startTime = '',
                _ts.form.endTime = '',
                _ts.form.tag = '',
                  
                _ts.dialogInpdisable = false;
                _ts.dialogFormVisible = true;
            },
            //取消置顶
            cancelTop(row) {
                const _ts = this;
//              if(_ts.dialogSureBtnLock) return ;
//              _ts.dialogSureBtnLock = true;
                
                if(process.env.NODE_ENV === 'development'){
                    _ts.cansel_url = 'http://test.hongdoulive.com' + _ts.cansel_url;
                }
                const postData = {
                    appId: '82',
                    resourceId: row.resourceId,
                    resourceType: row.resourceType
                };
                postAxiosResponse(_ts.cansel_url,postData,function (h) { 
                  if ( h.code === 200 ) {
                    _ts.getData();
                  }
                  
                  _ts.$message({
                    duration: 2000,
                    message: h.msg,
                  });
//                _ts.dialogSureBtnLock = false;
                  
                },function(err){
                  _ts.$message({
                    duration: 2000,
                    type: 'error',
                    message: err,
                  });
//                _ts.dialogSureBtnLock = false;
                });
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
    width: 80%;
}
.el-date-editor.el-input{
  width: auto;
  padding-bottom: 5px;
}
.el-input.is-disabled{
    background-color: #eef1f6;
    border-color: #d1dbe5;
    color: #bbb;
    cursor: not-allowed;
}
input[type=number] {  
    -moz-appearance:textfield;  
}  
input[type=number]::-webkit-inner-spin-button,  
input[type=number]::-webkit-outer-spin-button {  
    -webkit-appearance: none;  
    margin: 0;  
} 
</style>