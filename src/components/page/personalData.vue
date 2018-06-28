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
            <el-button type="primary" icon="search" @click="search" >查询</el-button>
        </div>
        <div id="d-table">
          <el-table :data="tableData1" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="uid" label="UID" width="200">
            </el-table-column>
            <el-table-column prop="headPic" label="用户头像">
                <template scope="scope">
                    <div class="btn-wrap">
                        <img :src="userHeadPic" class="user-img">
                    </div>
                    <div class="btn-wrap">
                        <el-button type="primary" @click="toChange1" >更换为默认</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
                <template scope="scope">
                    <div class="btn-wrap bw2">
                        <span>{{scope.row.nickname}}</span>
                    </div>
                    <div class="btn-wrap">
                        <el-button type="primary" @click="toChange2" >更换昵称</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
          
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
                multipleSelection: [],
                userHeadPic: '',
                userUid: ''
            }
        },
        created(){
            // this.getData();
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
            getData(){
                const _ts = this;
                let pram = _ts.uidV ? _ts.uidV : '1';
                _ts.url = '/h5/v1/report/queryUserById';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/report/queryUserById';
                };

                _ts.$axios.get(_ts.url,{ params:{uid: pram} })
                  .then((res) => {
              
                      if ( res.data.h.code === 200 ) {
                        if (res.data.b) {
                            this.userHeadPic = res.data.b.headPic; //头像
                            this.userUid = res.data.b.uid;
                            _ts.tableData1 = [];
                            _ts.tableData1.push(res.data.b); //转换数组
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
            // post更新头像
            gotoUpdate (prams) {
                const _ts = this;                
                _ts.url = '/h5/v1/report/updateUserInfo';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/report/updateUserInfo';
                };
                postAxiosResponse(_ts.url,prams,function (h) { 
                    _ts.$message({
                    duration: 2000,
                    message: h.msg,
                    onClose() {
                        // console.info('onClose....& h.code== ',h.code)
                        if ( h.code === 200 ) {
                            _ts.getData();
                        }
                    }
                    });
                });
            },
            // 按下更换头像
            toChange1 () {
                const _ts = this;
                _ts.$confirm('确定对该用户更换默认头像吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // const newPic =  'https://img.hongrenshuo.com.cn/default_slive_headpic.png';
                    const newPic =  'default_slive_headpic.png';
                    
                    
                    _ts.gotoUpdate({headPortraitUrl:newPic,outerId:_ts.userUid});

                }).catch(() => {});
            },
             // 按下更换昵称
            toChange2 () {
                const _ts = this;
                this.$prompt('请新的昵称', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /^.{1,10}$/,
                        inputErrorMessage: '请输入1-10个字符'
                    })
                    .then(({ value }) => {
                        // this.$message({
                        //     type: 'success',
                        //     message: '新的昵称是: ' + value
                        // });
                        _ts.gotoUpdate({nickname:value,outerId:_ts.userUid});
                        
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });       
                    });
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
.btn-wrap{
    min-height: 200px;
    text-align: center;
}
.bw2{
    line-height: 200px;    
}
.user-img{
    /* float: left; */
    display: inline-block;
    max-width: 135px;
    max-height: 200px;
    margin: 4px;
}
.el-table.el-table--fit{
  display: block;
}
.el-table--fit.blk,.table .el-table.el-table--fit{
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
</style>