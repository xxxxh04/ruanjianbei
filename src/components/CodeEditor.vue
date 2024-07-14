<template>
    <div class="editorBox" ref="editorBox" />
</template>

<script setup lang="ts">
import { options } from 'axios';
import { onMounted, type PropType, ref, watch, onBeforeUnmount } from 'vue';
import * as monaco from 'monaco-editor';
import "../hooks/useMonacoWorker";

interface options {
    readOnly: {
        type: boolean,
        default: false
    }
}

const props = defineProps({
    value: {
        type: String as PropType<string>,
        default: null
    },
    language: {
        type: String as PropType<string>,
        default: "cpp"
    },
    width: {
        type: [String, Number] as PropType<string | number>,
        default: "100%"
    },
    height: {
        type: [String, Number] as PropType<string | number>,
        default: "100%"
    },
    options: {
        type: Object as PropType<options>,
        default: () => ({
            readOnly: false
        })
    }
});

const emit = defineEmits(['update:modelValue']);

let editor: monaco.editor.IStandaloneCodeEditor;

const editorBox = ref();

onMounted(() => {
    //初始化编辑器
    editor = monaco.editor.create(editorBox.value, {
        value: props.value,
        language: props.language,
        automaticLayout: true,
        lineNumbers: "on", // 显示行号
        wordWrap: "on", // 自动换行
        lineDecorationsWidth: 20, // 行装饰宽度
        lineNumbersMinChars: 3, // 最小行号字符数
        minimap: {
            enabled: false // 禁用小地图
        }
    });

    //监听值的变化
    editor.onDidChangeModelContent(() => {
        //向上级组件传递更新后的值
        emit('update:modelValue', editor.getValue());
    });
});

//监听上级传入的代码
watch(() => props.value, (newValue) => {
    if (newValue != editor.getValue()) {
        editor.setValue(newValue);
    }
});

onBeforeUnmount(() => {
    editor.dispose();
});
</script>

<style>
.editorBox {
    width: 100%;
    height: 95%;
    text-align: left; /* 设置文本左对齐 */
}
</style>
