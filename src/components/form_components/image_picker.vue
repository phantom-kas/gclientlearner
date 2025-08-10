<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted, watch, type PropType } from "vue"
import Cropper from 'cropperjs'

import type CropperCanvas from '@cropper/element-canvas';
import type CropperImage from '@cropper/element-image';
import type CropperSelection from '@cropper/element-selection';
import type CropperHandle from '@cropper/element-handle';
import { useLoaderStore } from "@/stores/loader";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { base64ToBlob } from "@/composabels/utilities";
// import type CropperImage from '@cropper/element-image';

const preview = ref(false)

const props = defineProps({
  uid: {
    type: String,
    default: ''
  },
  submitText: {
    type: String,
    default: 'Submit'
  },
  image: {
    type: Object as PropType<any>,
    default: null
  },
  index: {
    type: Number,
    default: null
  },
  aspectRatio: {
    type: Number,
    default: 1
  }
})




const emit = defineEmits(['crop', 'rm'])


const loaderStore = useLoaderStore();
const selectedFile = ref<any>(null);
const imageInput = ref<HTMLInputElement | null>(null);
const imageSrc = ref<string | ArrayBuffer | null | undefined>(null);
const img = ref<HTMLImageElement | null>(null)
const fileReader = new FileReader();
let cropper: Cropper | null = null;

fileReader.onload = (event) => {
  imageSrc.value = event?.target?.result;
  // window.alert('opo')
  // if (img.value)
  //   img.value.src = event?.target?.result ;
}



const fileChange = (e: Event | DragEvent) => {
  const files = (e.target as HTMLInputElement).files || (e as DragEvent).dataTransfer?.files;
  if (files?.length) {
    selectedFile.value = files[0]
  }
}



const finalImg = ref<any | null>(null);
const ImgData = ref<any | null>(null)





watchEffect(() => {
  if (selectedFile.value) {
    fileReader.readAsDataURL(selectedFile.value);
  } else {
    imageSrc.value = null
  }
})

watch(imageSrc, () => {
  if (imageSrc.value) {
    // cropper?.element.src(imageSrc.value as string)


    // console.log(imageSrc.value)
    //   cropper?.element.
  }
}, { flush: 'post' })

onMounted(() => {
  // let image = new Image()
  if (!img.value) return
  if (props.image) {
    selectedFile.value = props.image
    console.log(props.image)
  }
  img.value.src = props.image as string
  cropper = new Cropper(img.value)

})

onUnmounted(() => {
  // cropper?.destroy();
})
const clearFile = () => {
  selectedFile.value = null
  // cropper?.destroy();
  emit('rm', { index: props.index })
}



const cropperCanvasp = ref<CropperCanvas | null>(null)
const cropperImagep = ref<HTMLElement | null>(null)
const cropperSelectionp = ref<CropperSelection | null>(null)



const tocanv = async (event: CustomEvent) => {
  if (!cropperSelectionp.value) {
    return
  }
  const canvas = await cropperSelectionp.value.$toCanvas() as HTMLCanvasElement
  let blob = base64ToBlob(canvas.toDataURL(), "image/jpeg")

  ImgData.value = { "img": blob, index: props.index }

  emit('crop', ImgData.value)
}
const handlepreview = async () => {
  if (!cropperSelectionp.value) {
    return
  }
  const canvas = await cropperSelectionp.value.$toCanvas() as HTMLCanvasElement
  let image = canvas.toDataURL()
  finalImg.value = image;
  preview.value = true
}

</script>
<template>
  <section class="flex flex-col items-center w-full pt-8 theme1cont"  v-bind="$attrs">
    <div class="w-full flex justify-center " v-show="imageSrc">
      <!-- <img ref="img" class=" hidden w-0 h-0" alt="" /> -->

      <cropper-canvas scale-step="0.1" theme-color="#39f" :key="imageSrc" background class="  h-[50vh] w-min495">
        <cropper-image :src="imageSrc" alt="Picture" rotatable scalable skewable translatable />
        <cropper-shade hidden></cropper-shade>

        <cropper-handle action="select" plain />
        <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0)" />

        <cropper-selection :aspectRatio :width="200" :height="200" :initialAspectRatio="aspectRatio" ref="cropperSelectionp"
          movable resizable outlined>
          <cropper-handle action="sw-resize" />
          <cropper-handle action="se-resize" />
          <cropper-handle action="ne-resize" />
          <cropper-handle action="nw-resize" />
          <cropper-handle action="e-resize" />
          <cropper-handle action="w-resize" />
          <cropper-handle action="s-resize" />
          <cropper-handle action="n-resize" />
          <cropper-grid role="grid" covered />
          <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)" />
        </cropper-selection>
      </cropper-canvas>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap justify-center items-center gap-2 mt-4 relative z-[100] ">
      <button v-if="!imageSrc" @click="imageInput?.click()" type="button"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Select Image
      </button>

      <button v-else @click="e => tocanv(e as any)" type="button"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" v-html="submitText"></button>

      <button @click="clearFile()" type="button"
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1">
        Clear
        <FontAwesomeIcon :icon="['far', 'trash-can']" />
      </button>

      <button @click="handlepreview()" type="button" class="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
        v-if="imageSrc">
        Preview
      </button>

      <input type="file" ref="imageInput" @change="fileChange($event)"
        accept=".jpg,.jpeg,.png,.avif,.pjpeg,.pjp,.webp,.tiff,.tif" class="hidden" />
    </div>

    <!-- Filename Info -->
    <div class="mt-4 text-sm text-gray-600">
      <span v-if="selectedFile">Selected Filename: {{ selectedFile.name }}</span>
      <span v-else>No file selected</span>
    </div>
  </section>

  <!-- Modal Preview -->
  <Teleport v-if="preview" to="#modal2">
    <div class="fixed inset-0 bg-black/60 z-[9000] flex justify-center items-center" @click="preview = false">
      <div @click.stop class="rounded-xl p-4 max-w-[1000px] w-full shadow-xl theme1cont">
        <div class="flex justify-end mb-4">
          <font-awesome-icon @click="preview = false" class="text-red-500 cursor-pointer" :icon="['fas', 'xmark']"
            size="2xl" />
        </div>
        <div class="flex justify-center items-center text-3xl pt-4 pb-2">
          <img :src="finalImg" class="max-w-full max-h-[80vh] rounded" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
