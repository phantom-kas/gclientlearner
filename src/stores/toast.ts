// import { ref, computed } from 'vue'
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref, computed } from "vue";
export const useToastStore = defineStore("Toasts", () => {
  interface Toast {
    status: string;
    message: string;
    type: string;
    key: number;
    lgo: string | undefined;
  }
  const Toasts = ref<Toast[]>(
    <Toast[]>(<unknown>useLocalStorage("Toasts", []))
  );

  const showPop = ref(false)
  const popMsg = ref('')
  const opentPop = (msg:string)=>{
    popMsg.value = msg
    showPop.value = true
  }

  const closePop = ()=>{

    showPop.value = false
    popMsg.value = ''
  }
  const Toasts_id = ref(useLocalStorage("Toasts_id", 0));

  const getToasts = computed(() => Toasts.value);

  const addToast = (
    message: string,
    status: string,
    type: string = "s",
    lgo?: string
  ) => {
    const id = ++Toasts_id.value;
    if (id > 100000000000) {
      Toasts_id.value = 0;
    }
    Toasts.value.unshift({
      status: status,
      message: message,
      type: type,
      key: id,
      lgo: "d",
    });
  };

  const remove = (index: number) => {
    Toasts.value.splice(index, 1);
  };
  return {opentPop,closePop,popMsg, showPop, Toasts, remove, getToasts, addToast, Toasts_id };
});