<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'home',
                        title: '系统自述'
                    },
                    {
                        icon: 'el-icon-document',
                        index: '2',
                        title: '基本用户',
                        subs: [
                            // {
                            //     index: 'queryUser',
                            //     title: '用户处理'
                            // },
                            {
                                index: 'queryUserHistory',
                                title: '用户查询及处理'
                            },
                            {
                                index: 'personalData',
                                title: '用户资料处理'
                            },
                            {
                                index: 'userProcessingRecord',
                                title: '用户处理记录'
                            }
                            
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '3',
                        title: '有聊',
                        subs: [
                            {
                                index: 'auditing',
                                title: '未审核'
                            },
                            {
                                index: 'auditPass',
                                title: '审核通过'
                            },
                            {
                                index: 'auditNopass',
                                title: '未通过'
                            },
                            {
                                index: 'backList',
                                title: '拉黑'
                            },
                            {
                                index: 'inform',
                                title: '举报列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-share',
                        index: '4',
                        title: '多人视频',
                        subs: [
                            {
                                index: 'videoBackList',
                                title: '拉黑用户'
                            },
                            {
                                index: 'videoRoom',
                                title: '房间操作'
                            },
                            {
                                index: 'videoInform',
                                title: '举报列表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '5',
                        title: '晃脸',
                        subs: [
                            {
                                index: 'singlesList',
                                title: '单曲榜'
                            },
                            {
                                index: 'allRankList',
                                title: '总榜'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '6',
                        title: '有信标签',
                        subs: [
                            {
                                index: 'tagManeger',
                                title: '标签管理'
                            },
                            {
                                index: 'liveRoomTopTag',
                                title: '直播间置顶标签'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '7',
                        title: '举报处理',
                        subs: [
                            {
                                index: 'reportList',
                                title: '举报处理历史'
                            },
                            {
                                index: 'reportingDeal',
                                title: '待处理举报'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-edit',
                        index: '8',
                        title: '关键字与审计日志',
                        subs: [
                            {
                                index: 'logAudit',
                                title: '审计日志'
                            },
                            {
                                index: 'filterKeyword',
                                title: '关键字过滤'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
