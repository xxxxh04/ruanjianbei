<template>
    <div class="editorBox" ref="editorBox" />
</template>

<script setup lang="ts">
import { options } from 'node_modules/axios/index.cjs';
import { onMounted, type PropType, ref, watch, onBeforeUnmount } from 'vue';
import * as monaco from 'monaco-editor'
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
        default: {
            readOnly: false
        }
    }
})

const emit = defineEmits(['update:modelValue'])

let editor: monaco.editor.IStandaloneCodeEditor;

const editorBox = ref()

onMounted(() => {
    //初始化编辑器
    editor = monaco.editor.create(editorBox.value, {
        value: props.value,
        language: props.language,
        automaticLayout: true,
    });

    //监听值的变化
    editor.onDidChangeModelContent(() => {
        //向上级组件传递更新后的值
        emit('update:modelValue', editor.getValue())
    })
})

//监听上级传入的代码
watch(() => props.value, (newValue) => {
    if (newValue != editor.getValue()) {
        editor.setValue(newValue)
    }
})

onBeforeUnmount(() => {
    editor.dispose
})


</script>

<style>
.editorBox {
    width: v-bind('props.width');
    height: v-bind('props.height');
}
</style>