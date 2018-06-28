<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 晃脸</el-breadcrumb-item>
                <el-breadcrumb-item>单曲榜</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="crumbs">
            音乐名：
            <el-select v-model="value" placeholder="请选择" @change="handleChangeSl">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>

        </div>
        <el-table v-loading.body="loading" :data="tableData" border stripe style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="did" label="视频did" width="150">
            </el-table-column>
            <el-table-column prop="cover" label="用户封面"  width="160">
                <template scope="scope">
                        <img :src="scope.row.cover" class="user-img" />
                </template>
            </el-table-column>
            <el-table-column prop="musicId" label="音乐ID" width="120">
            </el-table-column>
            <el-table-column prop="category" label="分类" width="120">
            </el-table-column>
            <el-table-column prop="url" label="视频" width="300">
                <template scope="scope">
                    <video :idd="scope.row.index" width="260" height="200" controls>
                      <source :src="scope.row.url" type="video/mp4">
                      <source :src="scope.row.url" type="video/ogg">
                      Your browser does not support the video tag.
                    </video>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="status" width="100">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    import {getAxiosHlrankData,postAxiosResponse} from '../api/request';

    export default {

        data() {
            return {
                url: '',
                del_url: '', //删除操作
                music_url: '',
                tableData: [],
                loading: true, //加载遮罩层
                cur_page: 1,
                multipleSelection: [],
                pg_total: 1000,
                is_search: false,
                options1: [
                    {
                      value: '',
                      label: ''
                    }
                ],
                value: ''
            }
        },
        created(){
            // 获取音乐ID
            this.getMusicIdList();

            // this.getData(); // 转140行
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
            handleChangeSl(v) { 
                this.value = v;
            },
            //获取晃脸音乐ID,渲染select列表
            getMusicIdList() {
                const _ts = this;

                _ts.music_url = '/h5/v1/facedance/getMaterielList';
                if(process.env.NODE_ENV === 'development'){
                    _ts.music_url = 'http://test.hongdoulive.com/h5/v1/facedance/getMaterielList';
                }
                _ts.$axios.get(_ts.music_url,{ params:{type:15} }) //获取晃脸音乐，type=15
                    .then((res) => {

                      if ( res.data.h.code === 200 ) {
                        const rData = res.data.b.data;
                        const oData = [];

                        if ( rData.length ) {
                            rData.map(function (v) {
                                oData.push({value: v.id,label: v.title});
                            });

                            _ts.value = oData[0].value; // select初始化加载第一个ID
                            _ts.options1 = oData; //填充
                        }
                      }
                      else{
                         console.log('失败！！');
                      }
                    })
                    .then(() => {  // 加载完音乐id，渲染Selcet完成,再加载列表数据
                        _ts.getData();
                    });

            },
            //获取列表
            getData() {
                const _ts = this;
            
                _ts.url = '/h5/v1/facedance/leaderboard/music';
                if(process.env.NODE_ENV === 'development'){
                    _ts.url = 'http://test.hongdoulive.com/h5/v1/facedance/leaderboard/music';
                };

                getAxiosHlrankData(_ts.url,{musicId:_ts.value,pageNo:_ts.cur_page,pageSize:20,},function (retData,pgTotal) {
                    _ts.tableData = retData;
                    _ts.pg_total = pgTotal;
                    _ts.loading = false;
                });

            },
            //删除
            deleteCheck (row,status) {
                const _ts = this;
                const theStatus = status; // 4：删除

                const args = '?did=' + row.did + '&status=' + theStatus;

                _ts.del_url = '/h5/v1/facedance/setStatus' + args;
                // _ts.del_url = '/h5/v1/facedance/setStatus';
                switch ( theStatus ) {
                    case 4:
                      _ts.thetips = '删除目标【did: '+row.did+'】，确定?';
                      break;
                    default:
                      _ts.thetips = '错误';
                }

                _ts.$confirm(_ts.thetips, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    postAxiosResponse(_ts.del_url,{did: row.did,status: theStatus},function (h) {
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
            search(){
                // this.is_search = true;
                this.getData();
            },
            // 删除
            handleDelete(index, row) {
                const _ts = this;
                _ts.deleteCheck(row,4)
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
/*不显示chrome 的下载按钮*/
video::-internal-media-controls-download-button {
    display:none;
}

video::-webkit-media-controls-enclosure {
    overflow:hidden;
}

video::-webkit-media-controls-panel {
    width: calc(100% + 30px); 
}
</style>