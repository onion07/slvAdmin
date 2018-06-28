<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 关键字与审计日志</el-breadcrumb-item>
                <el-breadcrumb-item>关键字过滤</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="testV" placeholder="关键字" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" >搜索</el-button>
            <el-button type="success" icon="plus" >新增</el-button>
        </div>
        <el-table :data="testD" border stripe style="width: 100%" ref="multipleTable" >
            <el-table-column type="index" label="序号" width="120">
            </el-table-column>
            <el-table-column prop="w" label="关键字">
            </el-table-column>
            <el-table-column prop="t" label="时间">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    layout="prev, pager, next"
                    page-size="20"
                    :total="20">
            </el-pagination>
        </div>
    </div>
</template>

<script>

    export default {

        data() {
            return {
                testV: '',
                testD: [
                    {
                      w:'蜻蜓',
                      t: '2017.08.20'
                    },{
                      w:'裸体',
                      t: '2017.08.20'
                    },{
                      w:'淫情',
                      t: '2017.08.21'
                    },{
                      w:'露胸',
                      t: '2017.08.23'
                    },{
                      w:'加微',
                      t: '2017.09.18'
                    },{
                      w:'人妻',
                      t: '2017.09.20'
                    },{
                      w:'私处',
                      t: '2017.09.22'
                    },{
                      w:'有福利',
                      t: '2017.09.26'
                    },{
                      w:'写真',
                      t: '2017.09.28'
                    }

                ]
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData() {
                return this.testD;
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