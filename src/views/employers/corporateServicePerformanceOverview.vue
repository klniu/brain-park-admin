<template>
    <section>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content  userProfile">
                            <div class="grid-title">服务效能概况
                            </div>
                            <div class="user-data">
                                <div class="data-item">
                                    <div class="data-num">{{serviceSituation.todayServiceApplication}}</div>
                                    <div class="data-title">今日服务申请</div>
                                </div>
                                <div class="data-item">
                                    <div class="data-num">{{serviceSituation.todayDealServiceApplication}}</div>
                                    <div class="data-title">已处理服务</div>
                                </div>
                                <div class="data-item">
                                    <div class="data-num">{{serviceSituation.todayNotDealServiceApplication}}</div>
                                    <div class="data-title">未处理服务</div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">
                            <div class="grid-title">当前未处理服务</div>
                            <div class="content">
                                <div style="width:100%;height:520px; margin: 0 auto;">
                                    <div id="unDealServiceChart" style="width:100%;height:100%;"></div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content  ">
                            <div class="grid-title">本月热门高端活动</div>
                            <div class="content">
                                <div style="width:100%;height:260px;padding:20px;box-sizing: border-box;">
                                    <el-table :data="monthHotHighActivity" border>
                                        <el-table-column type="index" label="排名" align="center">
                                        </el-table-column>
                                        <el-table-column prop="title" label="活动名称" align="center">
                                        </el-table-column>
                                        <el-table-column prop="count" label="报名人数" align="center">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content  ">
                            <div class="grid-title">本月热门商务服务</div>
                            <div class="content">
                                <div style="width:100%;height:260px;padding:20px;box-sizing: border-box;">
                                    <el-table :data="monthHotBusinessService" border>
                                        <el-table-column type="index" label="排名" align="center">
                                        </el-table-column>
                                        <el-table-column prop="title" label="活动名称" align="center">
                                        </el-table-column>
                                        <el-table-column prop="count" label="报名人数" align="center">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content  ">
                            <div class="grid-title">近一周服务申请分布</div>
                            <div class="content">
                                <div id="serviceDistributionChart" style="width:100%;height:200px"></div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div class="grid-content  ">
                            <div class="grid-title">本月高频受理服务</div>
                            <div class="content">
                                <div id="MonthHighAcceptanceServiceChart" style="width:100%;height:350px"></div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    const publicURL = require('../../../config/urlConfig');
    import echarts from 'echarts/lib/echarts';
    import axios from 'axios';
    import publicFunction from '../../api/publicFunction';
    export default {
        data() {
            return {
                url: '',
                serviceSituation: {
                    todayServiceApplication: 0,
                    todayDealServiceApplication: 0,
                    todayNotDealServiceApplication: 0,
                },
                monthHotHighActivity: [],
                monthHotBusinessService: [],
                unDealServiceOption: {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)",
                    }, //设置饼图的颜色
                    color: ['#f19a5f', '#ffc30d', '#7ED321'],
                    legend: {
                        orient: 'horizontal',
                        left: 'center',
                        data: ['政务服务', 'IT服务', '人才服务']
                    },
                    series: [{
                        type: 'pie',
                        radius: '40%',
                        center: ['50%', '50%'],
                        data: [{
                                value: 5485,
                                name: '政务服务'
                            },
                            {
                                value: 4778,
                                name: 'IT服务'
                            },
                            {
                                value: 1334,
                                name: '人才服务'
                            }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            normal: {
                                formatter: '{b|{b}}\n{c|{c}} {per|{d}%}',
                                rich: {
                                    b: {
                                        color: '#9B9B9B',
                                        fontSize: 16,
                                        lineHeight: 24,
                                        align: 'left'
                                    },
                                    c: {
                                        color: '#9B9B9B',
                                        fontSize: 14,
                                        lineHeight: 24,
                                        align: 'left'
                                    },
                                    per: {
                                        color: '#9B9B9B',
                                        fontSize: 14,
                                        padding: [2, 4],
                                        align: 'left'
                                    }
                                }
                            }
                        },
                    }]
                },

                serviceDistributionOption: {
                    color: ['#ed7d31'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '10%',
                        top: '10%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                        name: '数量',
                        type: 'bar',
                        barWidth: '60%',
                        data: [],
                         label: {
                            normal: {
                                show: true,
                                formatter: '{c}',
                                position: 'top'
                            },
                        }
                    }]
                },

                //  本月高频受理服务
                MonthHighAcceptanceServiceOption: {
                    color: ['#70ad47'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: []
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '10%',
                        top: '10%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            interval: 'auto',
                            formatter: '{value}'
                        },
                    },
                    yAxis: {
                        type: 'category',
                        data: []
                    },
                    series: [{
                        name: '数量',
                        type: 'bar',
                        data: [],
                        label: {
                            normal: {
                                show: true,
                                formatter: '{c}',
                                position: 'right'
                            },
                        }
                    }]
                },
            };
        },
        methods: {
            // 服务效能概况
            getServiceSituation() {
                this.$get(this.url + 'serviceSituation').then(res => {
                    this.serviceSituation.todayDealServiceApplication = res.todayDealServiceApplication;
                    this.serviceSituation.todayNotDealServiceApplication = res.todayNotDealServiceApplication;
                    this.serviceSituation.todayServiceApplication = res.todayServiceApplication;
                });
            },
            // 本月热门高端活动
            getMonthHotHighActivity() {
                this.$get(this.url + 'monthHotHighActivity').then(res => {
                    this.monthHotHighActivity = res.monthHotList;
                });
            },
            // 本月热门商业服务
            getMonthHotBusinessService() {
                this.$get(this.url + 'monthHotBusinessService').then(res => {
                    this.monthHotBusinessService = res.monthHotList;
                });
            },
            // 当前未处理服务
            getUnDealService() {
                this.$get(this.url + 'unDealService').then(res => {
                    this.unDealServiceOption.series[0].data = [{
                            value: res.policyService,
                            name: '政务服务'
                        },
                        {
                            value: res.ITService,
                            name: 'IT服务'
                        },
                        {
                            value: res.talentsService,
                            name: '人才服务'
                        }
                    ]
                    let unDealServiceChart = echarts.init(document.getElementById('unDealServiceChart'));
                    unDealServiceChart.setOption(this.unDealServiceOption);
                    window.addEventListener("resize", unDealServiceChart.resize);
                });
            },
            // 近一周服务申请分布
            getServiceDistribution() {
                this.$get(this.url + 'serviceDistribution').then(res => {
                    let xAxisData = [];
                    let seriesData = [];
                    for (let item of res.talentsServiceList) {
                        xAxisData.push(item.subtype);
                        seriesData.push(item.count);
                    }
                    for (let item of res.policyServiceList) {
                        xAxisData.push(item.subtype);
                        seriesData.push(item.count);
                    }
                    for (let item of res.ITServiceList) {
                        xAxisData.push(item.subtype);
                        seriesData.push(item.count);
                    }
                    for (let item of res.highActivityList) {
                        xAxisData.push(item.subtype);
                        seriesData.push(item.count);
                    }
                    for (let item of res.businessServiceList) {
                        xAxisData.push(item.subtype);
                        seriesData.push(item.count);
                    }
                    this.serviceDistributionOption.xAxis[0].data = xAxisData;
                    this.serviceDistributionOption.series[0].data = seriesData;
                    let serviceDistributionChart = echarts.init(document.getElementById(
                        'serviceDistributionChart'));
                    serviceDistributionChart.setOption(this.serviceDistributionOption);
                    window.addEventListener("resize", serviceDistributionChart.resize);
                });
            },
            // 本月高频受理服务
            getMonthHighAcceptanceService() {
                this.$get(this.url + 'monthHighAcceptanceService').then(res => {
                    let arr = res.rankList;
                    let len = arr.length;
                    for (let i = 0; i < len; i++) {
                        for (let j = 0; j < len - 1 - i; j++) {
                            if (arr[j].count > arr[j + 1].count) { //相邻元素两两对比
                                let temp = arr[j + 1]; //元素交换
                                arr[j + 1] = arr[j];
                                arr[j] = temp;
                            }
                        }
                    }
                    let yAxisData = [];
                    let seriesData = [];
                    for (let i = 0; i < arr.length; i++) {
                        yAxisData.push(arr[i].subtype);
                        seriesData.push(arr[i].count);
                    }
                    this.MonthHighAcceptanceServiceOption.yAxis.data = yAxisData;
                    this.MonthHighAcceptanceServiceOption.series[0].data = seriesData;
                    let MonthHighAcceptanceServiceChart = echarts.init(document.getElementById(
                        'MonthHighAcceptanceServiceChart'));
                    MonthHighAcceptanceServiceChart.setOption(this.MonthHighAcceptanceServiceOption);
                    window.addEventListener("resize", MonthHighAcceptanceServiceChart.resize);
                });
            },
        },
        mounted() {
            this.url = publicURL.chartsURL + 'enterpriseService/';
            this.getServiceSituation();
            this.getMonthHotHighActivity();
            this.getMonthHotBusinessService();
            this.getUnDealService();
            this.getServiceDistribution();
            this.getMonthHighAcceptanceService();
        }
    };
</script>


<style lang="scss" scoped>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        background-color: #f4f4f4;
    }

    .el-col {
        border-radius: 4px;
        .grid-title {
            font-size: 14px;
            color: #4a4a4a;
            letter-spacing: 0;
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
            border-bottom: 1px solid #d5d5d5;
            span {
                font-size: 12px;
                color: #757575;
                letter-spacing: 0;
                margin-left: 5px;
            }
        }
    }

    .userProfile {
        .user-data {
            display: flex;
            justify-content: space-around;
            text-align: center;
            align-items: center;
            height: 150px;
            .data-item {
                .data-num {
                    background: linear-gradient(135deg, #f53252, #ec67c1);
                    font-weight: bold;
                    -webkit-background-clip: text;
                    color: transparent;
                    font-size: 32px;
                    line-height: 55px;
                }
                .data-title {
                    font-size: 12px;
                    color: #757575;
                    letter-spacing: 0;
                    line-height: 14px;
                }
            }
        }
    }
</style>