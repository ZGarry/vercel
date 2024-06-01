"use client";

import React, {useEffect} from 'react';
import * as echarts from 'echarts';
import {rpc, rpc2} from "@/app/lib/fetch";
import Search from "@/app/ui/search";

// 这是客户端的组件
// 操作起来稍微缓慢一些，但是没有显著问题
export default function Page({
                                 searchParams,
                             }: {
    searchParams?: {
        query?: string;
    };
}) {
    useEffect(() => {
        const fetchDataAndDrawChart = async () => {
            // 模拟从接口获取股票数据
            const query = searchParams?.query || '';
            console.log(query);
            const all_data: any[] = await rpc2("/api/pe", query);
            console.log(all_data);

            // 从接口数据中提取股票PE数据
            // 刚开始没有对应的数据
            const peData = all_data.map((item: any) => ({
                date: item.date,
                value: item.value
            }));

            // 获取包裹 ECharts 图表的 DOM 元素
            const chartContainer = document.getElementById('pe-chart');

            // 销毁之前的实例
            if (chartContainer != null) {
                echarts.dispose(chartContainer);
            }
            // 初始化 ECharts 实例
            const chart = echarts.init(chartContainer);

            // 配置图表
            const option = {
                title: {
                    text: '股票PE走势图'
                },
                xAxis: {
                    type: 'category',
                    data: peData.map(item => item.date),
                    axisPointer: {
                        show: true,
                        type: 'line'
                    }
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                series: [{
                    data: peData.map(item => item.value),
                    type: 'line'
                }]
            };

            // 使用配置项显示图表
            chart.setOption(option);

            // 在组件卸载时销毁图表
            return () => {
                chart.dispose();
            };
        };

        fetchDataAndDrawChart();
    }, [searchParams?.query]);

    return (
        <div>
            <p>自定义个股内容</p>
            <Search placeholder={"股票名称"}></Search>
            <div id="pe-chart" style={{width: '100%', height: '400px'}}></div>
        </div>
    );
}
