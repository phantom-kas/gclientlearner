import { useUserStore } from "@/stores/user";
import axios from "axios";




export const base64ToBlob = (base64: string, mime: string | null) => {
  // Remove the data URL prefix (if present)
  const byteString = atob(base64.split(",")[1]);
  const arrayBuffer = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    arrayBuffer[i] = byteString.charCodeAt(i);
  }
  if (mime) return new Blob([arrayBuffer], { type: mime });
};


export const isDev = () => import.meta.env.MODE === 'development'

export const getImageUrl = (name: string) => {
  if (!name) return '';
  if (isDev() && !name.includes('http')) {
    const base = new URL(axios.defaults.baseURL as string).origin
    return base + name
  }
  return name
}


export function anyCurrency(
  v: number | string,
  rate: number = 1,
  currenys: string | null = null
) {
  v = v ? Number(v) : 0
  // v= v/100
  rate = rate ?? 1
  if (v == null) {
    return "$ 0.00";
  }
  v = v + ''
  let n = parseFloat(v) * rate;
  n = n / 100;
  n = parseFloat(n + '');
  if (!currenys) {
    currenys = "$";
  }
  if (isNaN(n)) {
    n = 0
  }
  return currenys + ` ${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

export const urlAuthUnAuth = (gestUrl: string, authUrl: string | null = null) => {
  const user = useUserStore()
  if (user.isLoggedIn() && authUrl) {
    return authUrl
  }
  return gestUrl
}