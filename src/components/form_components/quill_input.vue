<script setup lang='ts'>
import { onMounted, ref, type PropType } from 'vue';
import Quill, { type QuillOptions } from 'quill';

const descriptoin = ref('')

const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  placeholder: {
    type: String,
    default: 'Placeholder'
  },
  value: {
    type: Object as PropType<string | null>,
    default: null
  }
})
const quillEl = ref(null)
let quill: Quill
onMounted(() => {
  
  if (!quillEl.value) {
    return
  }

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': ['red', 'yellow', '#ff9999'] }, { 'background': ['blue', 'red', 'yellow', '#ff9999'] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];
  const value = ref('')
  const options: QuillOptions = {
    debug: false,
    modules: {
      toolbar: toolbarOptions
    },
    placeholder: props.placeholder,
    theme: 'snow'
  };
  quill = new Quill(quillEl.value, options);
  quill.on('text-change', (delta, oldDelta, source) => {
    if (source == 'user') {
      emit('inputed', quill.getSemanticHTML())
    }
  });
  const toolbar:any = quill.getModule('toolbar');
  toolbar.addHandler('image', () => {
    window.alert('Image upload not supported')
  });
  if (props.value) {
    const delta = quill.clipboard.convert({ html: props.value })
    quill.setContents(delta, 'silent')
  }
})

const emit = defineEmits(['inputed'])
</script>

<template>
  <div class=" w-full theme1cont p-1  inputel not-darkmode:bg-[#f5f5f5]!">
    
    <div class=" w-full ">
      <div ref="quillEl" class="quill  quillccc w-full p-1">

      </div>
    </div>
  </div>
</template>
<style>
.inputel {
    box-shadow: 0px 1px 5px 2px rgba(57, 57, 57, 0.15);
}
</style>