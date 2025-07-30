import { defineStore } from 'pinia'
export const useLoaderStore = defineStore('loader', {
  state: () => ({
    loading: false,
    loading2: false,
    isUploading:false,
    uploadProgress:0,
    duration: 200,
    min: 'dsadas',
    showSuccess:false
  }),
  getters: {
    isLoading(): boolean {
      return this.loading
    },
    getIsUploading(): boolean {
      return this.isUploading
    },
    isLoading2(): boolean {
      return this.loading2
    },
    getDuration(): number {
      return this.duration
    },
  },
  actions: {
    showUploading(){
      this.isUploading = true
    },
    start() {
      this.loading = true
    },
    alertSuccess() {
      this.showSuccess = true
      setTimeout(()=>this.showSuccess = false, 2000)
    },
    start2() {
      this.loading2 = true
    },
    stop() {
      this.loading = false
    },
    stop2() {
      this.loading2 = false
    }
  }
})