<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 有信标签</el-breadcrumb-item>
                <el-breadcrumb-item>标签管理列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select v-model="tag_order.value" placeholder="排序" @change="handleSelect_3">
                <el-option
                  v-for="item in tag_order.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="tag_status.value" placeholder="标签状态" @change="handleSelect_1">
                <el-option
                  v-for="item in tag_status.options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="tag_type.value" placeholder="标签类型" @change="handleSelect_2">
                <el-option
                  v-for="item in tag_type.options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
            
            <el-button type="success" icon="plus" @click="handleAdd()">新增</el-button>
        </div>
        <el-table v-loading.body="loading" :data="tableData" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="id" label="ID" width="150">
            </el-table-column>
            <el-table-column prop="name" label="标签名">
            </el-table-column>
            <el-table-column prop="index" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="statusName" label="状态" width="140">
            </el-table-column>
            <el-table-column prop="typeName" label="类型">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="标签ID" :label-width="formLabelWidth">
              <input :class="['el-input', 'el-input__inner', {'is-disabled':dialogInpdisable}]" v-model="form.id" :disabled="dialogInpdisable" type="number" auto-complete="off" placeholder="请输入数字，不能与现有id重复" />
              <!--<el-input v-model="form.id" auto-complete="off" placeholder="不能与现有id重复"></el-input><!--@change="handleinput_1"-->
            </el-form-item>
            <el-form-item label="标签类型" :label-width="formLabelWidth" >
              <el-select v-model="form.typeName" placeholder="请选择标签类型" :disabled="dialogInpdisable" @change="handleSelect_4">
                <el-option
                  v-for="item in tag_type.options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                  v-if="item.value!='全部'">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签状态" :label-width="formLabelWidth">
              <el-select v-model="form.statusName" placeholder="请选择标签状态" @change="handleSelect_5">
                <el-option
                  v-for="item in tag_status.options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                  v-if="item.value!='全部'">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签序号" :label-width="formLabelWidth">
              <input class="num-inp el-input el-input__inner" v-model="form.index" type="number" auto-complete="off" placeholder="请输入数字" />
              
              <!--<el-input v-model="form.index" auto-complete="off"></el-input>-->
            </el-form-item>
            <el-form-item label="标签名称" :label-width="formLabelWidth" >
              <el-input v-model="form.name" auto-complete="off"></el-input>
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

    export default {
        data() {
            return {
                url: '', // 获取数据接口
                tableData: [],
                loading: true, //加载遮罩层
                multipleSelection: [],
                select_cate: '',
                tag_status: {
                  value: '全部', //下拉选择，默认全部,'0:不可用;1:可用'
                  status: '',
                  options: [{
                       value: '全部',
                       label: '全部'
                     },{
                       value: '不可用',
                       label: '不可用'
                     },{
                       value: '可用',
                       label: '可用'
                  }]
                },
                tag_type: {
                  value: '全部', //下拉选择，默认全部,'1:置顶使用;0:用户创建直播间使用'
                  type: '',
                  options: [{
                       value: '全部',
                       label: '全部'
                     },{
                      value: '置顶使用',
                      label: '置顶使用'
                    },{
                      value: '用户创建直播间使用',
                      label: '用户创建直播间使用'
                  }]
                },
                tag_order:{
                  value: 'id', //下拉选择，默认id，按id排序
                  options: [{
                       value: 'id',
                       label: '按id排序'
                     },{
                       value: '其他',
                       label: '按index排序'
                  }]
                },
                dialogFormVisible: false,
                dialogFormTitle: '新建标签',
                dialogInpdisable: false,
                dialogSureBtnLock: false,
                form: {
                  id: '',
                  type: '',
                  typeName: '',
                  status: '',
                  statusName: '',
                  index: '',
                  name: ''
                },
                formLabelWidth: '120px'
            }
        },
        created(){
            this.getData();
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
                _ts.url = '/h5/v1/appconfig/queryTagList';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/appconfig/queryTagList';
                }
                _ts.loading = true;
                const sendData = {
                  appId: '82', 
                  tagType: _ts.tag_type.type,
                  tagStatus: _ts.tag_status.status,
                  order: _ts.tag_order.value
                };
                getAxios(_ts.url, sendData, function (retData) {
                  if(retData.h.code == 200){
                    const data = retData.b;
                    data.map(function (v) {
                        v.statusName = v.status === 'undefined' ? '' : (v.status === 1 ? '可用' : '不可用');
                        v.typeName = v.type === 'undefined' ? '' : (v.type === 1 ? '置顶使用' : '用户创建直播间使用');
                        return v;
                    });
                    _ts.tableData = data;
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
                this.tag_status.value = v;
                this.tag_status.status = v == '可用' ? 1 : (v=='不可用' ? 0 : '');
            },
            handleSelect_5 (v) { 
                this.form.statusName = v;
                this.form.status = v == '可用' ? 1 : (v=='不可用' ? 0 : '');
            },
            handleSelect_2 (v) {
                this.tag_type.value = v;
                this.tag_type.type = v == '置顶使用' ? 1 : (v=='用户创建直播间使用' ? 0 : '');
            },
            handleSelect_4 (v) {
                this.form.typeName = v;
                this.form.type = v == '置顶使用' ? 1 : (v=='用户创建直播间使用' ? 0 : '');
            },
            handleSelect_3 (v) {
                this.tag_order.value = v;
                this.getData();
            },
            search(){
                this.getData();
            },
            handleinput_1 (v){
              for(var i = 0; i< v.length; i++){
                if(! /\d+/.test(v[i])){
                  this.form.id += '';
                }
              }
            },
            addOrUpdateTag () {
                const _ts = this;
                if(_ts.dialogSureBtnLock) return ;
                _ts.dialogSureBtnLock = true;
                
                let req_url = '';
                if(_ts.dialogFormTitle === '新建标签'){
                  req_url = '/h5/v1/appconfig/addTag';
                }else{//编辑标签
                  req_url = '/h5/v1/appconfig/updateTag';
                }
                
                if(process.env.NODE_ENV === 'development'){
                    req_url = 'http://test.hongdoulive.com' + req_url;
                }
                if(!_ts.form.id){
                  this.$message({
                    showClose: true,
                    message: '标签ID不能为空！',
                    type: 'warning'
                  });
                  _ts.dialogSureBtnLock = false;
                  return ;
                }
                
                if(typeof _ts.form.type === 'string'){
                  this.$message({
                    showClose: true,
                    message: '请选择标签类型！',
                    type: 'warning'
                  });
                  _ts.dialogSureBtnLock = false;
                  return ;
                }
                if(typeof _ts.form.status === 'string'){
                  this.$message({
                    showClose: true,
                    message: '请选择标签状态！',
                    type: 'warning'
                  });
                  _ts.dialogSureBtnLock = false;
                  return ;
                }
                if(!_ts.form.index){
                  this.$message({
                    showClose: true,
                    message: '标签序号不能为空！',
                    type: 'warning'
                  });
                  _ts.dialogSureBtnLock = false;
                  return ;
                }
                if(!_ts.form.name){
                  this.$message({
                    showClose: true,
                    message: '标签名称不能为空！',
                    type: 'warning'
                  });
                  _ts.dialogSureBtnLock = false;
                  return;
                }
                
                _ts.loading = true;
                const postData = {
                    appId: '82',
                    id: _ts.form.id,
                    type: _ts.form.type,
                    status: _ts.form.status,
                    index: _ts.form.index,
                    name: _ts.form.name
                };
                postAxiosResponse(req_url,postData,function (h) { 
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
                  _ts.loading = false;
                });

            },
            //新建标签
            handleAdd() {
                const _ts = this;
                _ts.dialogFormTitle = '新建标签';
                _ts.form = {
                  id: '',
                  type: '',
                  typeName: '',
                  status: '',
                  statusName: '',
                  index: '',
                  name: ''
                };
                _ts.dialogInpdisable = false;
                _ts.dialogFormVisible = true;
            },
            //编辑标签
            handleUpdate(row) {
                const _ts = this;
                _ts.dialogFormTitle = '编辑标签';
                _ts.form = row;
                _ts.dialogInpdisable = true;
                _ts.dialogFormVisible = true;
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