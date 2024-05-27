<template>
    <div class="analyzer-data-view">
        <el-container>
            <el-header>提交结果</el-header>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="8" class="analyzer-data-label">
                        <div class="grid-content ep-bg-purple">
                            <span>运行超时</span>
                        </div>
                    </el-col>
                    <el-col :span="16" class="analyzer-data-value">
                        <div class="grid-content ep-bg-purple">
                            <span>{{ count.timeOut }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8" class="analyzer-data-label">
                        <div class="grid-content ep-bg-purple">
                            <span>答案正确</span>
                        </div>
                    </el-col>
                    <el-col :span="16" class="analyzer-data-value">
                        <div class="grid-content ep-bg-purple">
                            <span>{{ count.correct }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8" class="analyzer-data-label">
                        <div class="grid-content ep-bg-purple">
                            <span>内存超限</span>
                        </div>
                    </el-col>
                    <el-col :span="16" class="analyzer-data-value">
                        <div class="grid-content ep-bg-purple">
                            <span>{{ count.outOfMem }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8" class="analyzer-data-label">
                        <div class="grid-content ep-bg-purple">
                            <span>编译错误</span>
                        </div>
                    </el-col>
                    <el-col :span="16" class="analyzer-data-value">
                        <div class="grid-content ep-bg-purple">
                            <span>{{ count.complieErr }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8" class="analyzer-data-label">
                        <div class="grid-content ep-bg-purple">
                            <span>其他</span>
                        </div>
                    </el-col>
                    <el-col :span="16" class="analyzer-data-value">
                        <div class="grid-content ep-bg-purple">
                            <span>{{  count.other }}</span>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue';


const count = reactive({
    timeOut: 123,
    correct: 114,
    outOfMem: 514,
    complieErr: 1919,
    other: 810
})

</script>

<style>
@import '../assets/AnalyzerDataComponents.css'
</style>