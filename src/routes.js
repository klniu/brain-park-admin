import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import operaSitua from './views/operaSer/operaSitua.vue'
import circle from './views/operaSer/circle.vue'
import topic from './views/operaSer/topic.vue'
import adConfig from './views/operaSer/adConfig.vue'
import pushConfig from './views/operaSer/pushConfig.vue'
import financialSer from './views/operaSer/financialSer.vue'
import merchants from './views/operaSer/merchants.vue'
import information from './views/operaSer/information.vue'
import userFeedback from './views/operaSer/userFeedback.vue'

import serEffect from './views/employers/serEffect.vue'
import corporationHome from './views/employers/corporationHome.vue'
import businessProcess from './views/employers/businessProcess.vue'
import leaseContract from './views/employers/leaseContract.vue'

Vue.use(Router)
let routes = [
    // {
    //     path: '/login',
    //     component: Login,
    //     name: '',
    //     hidden: true
    // },
    {
        path: '*',
        hidden: true,
        // redirect: { path: '/circle' }
        redirect: { path: '/404' }
    },
    {
        path: '/',
        component: Home,
        name: '企业管理',
        iconCls: 'el-icon-service',
        children: [
            {
                path: '/busiAdmin',
                component: resolve => require(['./views/businessAdmin/busiAdmin.vue'], resolve),
                name: '企业操作'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        redirect:'/circle',
        name: '运营服务',
        iconCls: 'el-icon-document',
        children: [
            // { path: '/operaSitua', component: operaSitua, name: '运营概况' },
            { path: 'circle', component: circle, name: '圈子' },
            { path: '/topic', component: topic, name: '话题' },
            { path: '/adConfig', component: adConfig, name: '广告配置' },
            // { path: '/pushConfig', component: pushConfig, name: '推送配置' },
            { path: '/financialSer', component: financialSer, name: '金融服务' },
            // { path: '/merchants', component: merchants, name: '商家联盟' },
            { path: '/userFeedback', component: userFeedback, name: '用户反馈处理' },
            { path: '/information', component: information, name: '信息公告' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '企业服务',
        iconCls: 'el-icon-message',
        children: [
            // { path: '/serEffect', component: serEffect, name: '服务效能概况' },
            { path: '/corporationHome', component: corporationHome, name: '企业之家' },
            { path: '/businessProcess', component: businessProcess, name: '流程业务' },
            // { path: '/leaseContract', component: leaseContract, name: '租赁合同管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '物业服务',
        iconCls: 'el-icon-printer',
        children: [
            {
                path: '/compRepair',
                component: resolve => require(['./views/properSer/compRepair.vue'], resolve),
                name: '投诉建议&报修处理'
            },
            {
                path: '/proAnnounce',
                component: resolve => require(['./views/properSer/proAnnounce.vue'], resolve),
                name: '物业公告'
            },
            {
                path: '/release',
                component: resolve => require(['./views/properSer/release.vue'], resolve),
                name: '放行申请'
            },
            {
                path: '/equipInspect',
                component: resolve => require(['./views/properSer/equipInspect.vue'], resolve),
                name: '设备巡检'
            }
         ]
    },
    {
        path: '/',
        component: Home,
        name: '办公服务',
        iconCls: 'el-icon-news',
        children: [
            {
                path: '/attendance',
                component: resolve => require(['./views/officeSer/attendance.vue'], resolve),
                name: '考勤'
            },
            {
                path: '/examine',
                component: resolve => require(['./views/officeSer/examine.vue'], resolve),
                name: '审批'
            },
            {
                path: '/schedule',
                component: resolve => require(['./views/officeSer/schedule.vue'], resolve),
                name: '排班'
            },
            {
                path: '/workBook',
                component: resolve => require(['./views/officeSer/workBook.vue'], resolve),
                name: '工作手册'
            },
            {
                path: '/contacts',
                component: resolve => require(['./views/officeSer/contacts.vue'], resolve),
                name: '通讯录'
            }
         ]
    },
    {
        path: '/',
        component: Home,
        name: '运维管理',
        iconCls: 'el-icon-sold-out',
        children: [
            {
                path: '/districtMg',
                component: resolve => require(['./views/operationMg/districtMg.vue'], resolve),
                name: '区域管理'
            }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '树形组件',
    //     children: [
    //         {
    //             path: '/tree',
    //             component: resolve => require(['./components/tree.vue'], resolve),
    //             name: 'tree'
    //         }
    //     ]
    // },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // }

];

export default routes;