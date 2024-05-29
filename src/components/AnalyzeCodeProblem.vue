<template>
    <div class="analyzer-data-view">
        <el-header>代码分析(由AI生成)</el-header>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="tag" label="tag" width="180" />
            <el-table-column prop="count" label="count" width="180" />
        </el-table>
    </div>
</template>


<script setup lang="ts">

const tableData = [
    {
        tag: '函数参数默认值位置错误',
        count: 114
    },
    {
        tag: '忘记添加分号',
        count: 514
    },
    {
        tag: '只声明不实现',
        count: 1919
    },
    {
        tag: '内存泄漏',
        count: 810
    },
    {
        tag: '数组越界',
        count: 467
    },
    {
        tag: '类型转换问题',
        count: 25
    },
    {
        tag: '循环条件错误',
        count: 911
    },
    {
        tag: '函数调用顺序错误',
        count: 1437
    },
    {
        tag: '占位符1',
        count: 138
    }
]

</script>

<style>

</style>