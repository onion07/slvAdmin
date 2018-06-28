import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
            // redirect: '/login'
        },
        {
            path: '/home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',// 系统介绍
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/tagManeger', //有信直播间标签
                    component: resolve => require(['../components/page/uxTagManeger.vue'], resolve)
                },
                {
                    path: '/liveRoomTopTag', //有信推荐间标签
                    component: resolve => require(['../components/page/uxLiveRoomTopTag.vue'], resolve)
                },
                {
                    path: '/singlesList', // 晃脸-单曲榜
                    component: resolve => require(['../components/page/hlSinglesTable.vue'], resolve)
                },
                {
                    path: '/allRankList',// 晃脸-总榜
                    component: resolve => require(['../components/page/hlAllrankTable.vue'], resolve)
                },
                {
                    path: '/queryUser',// 基本用户-用户查询
                    component: resolve => require(['../components/page/queryUser.vue'], resolve)
                },
                {
                    path: '/auditing', // 有聊-未审核
                    component: resolve => require(['../components/page/audittingTable.vue'], resolve)
                },
                {
                    path: '/auditPass', // 有聊-审核通过
                    component: resolve => require(['../components/page/auditPassTable.vue'], resolve)
                },
                {
                    path: '/auditNopass', // 有聊-不通过
                    component: resolve => require(['../components/page/auditNopassTable.vue'], resolve)
                },
                {
                    path: '/backList', // 有聊-拉黑
                    component: resolve => require(['../components/page/backListTable.vue'], resolve)
                },
                {
                    path: '/logAudit', // 关键字与审计日志-审计日志
                    component: resolve => require(['../components/page/logAudit.vue'], resolve)
                },
                {
                    path: '/filterKeyword', // 关键字与审计日志-关键字
                    component: resolve => require(['../components/page/filterKeyword.vue'], resolve)
                },
                {
                    path: '/videoRoom', //多人视频-房间操作
                    component: resolve => require(['../components/page/videoRoom.vue'], resolve)
                },
                {
                    path: '/videoInform', // 多人视频-举报列表
                    component: resolve => require(['../components/page/videoInform.vue'], resolve)
                },
                {
                    path: '/videoBackList', // 多人视频-拉黑
                    component: resolve => require(['../components/page/videoBackList.vue'], resolve)
                },
                {
                    path: '/inform', // 有聊-举报列表
                    component: resolve => require(['../components/page/inform.vue'], resolve)
                },
                {
                    path: '/reportList', // 举报处理
                    component: resolve => require(['../components/page/reportList.vue'], resolve)
                },
                {
                    path: '/reportingDeal', // [举报]用户处理
                    component: resolve => require(['../components/page/reportingDeal.vue'], resolve)
                },
                {
                    path: '/queryUserHistory', // 用户处理历史
                    component: resolve => require(['../components/page/queryUserHistory.vue'], resolve)
                },
                {
                    path: '/personalData', // 用户资料处理
                    component: resolve => require(['../components/page/personalData.vue'], resolve)
                },
                {
                    path: '/userProcessingRecord', // 用户处理记录
                    component: resolve => require(['../components/page/userProcessingRecord.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
