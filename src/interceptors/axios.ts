import axios from "axios";
import { useUserStore } from "@/stores/user";
import router from "../router/index";
import { useToastStore } from "@/stores/toast";
import { useLoaderStore } from "../stores/loader";
import { isDev } from "@/composabels/utilities";


//;

if (isDev()) {
  axios.defaults.baseURL = "http://localhost:5000/api/";
} else {
axios.defaults.baseURL = "https://gc-rest-api.onrender.com/api/";
}
const axiosApiInstance = axios.create();


declare module 'axios' {
  export interface AxiosRequestConfig {
    _load?: boolean,
    _load2?: boolean,
    _loadSplash?: boolean,
    _showAllMessages?: boolean
    _showSuccessOnly?: boolean
    _showErrorOnly?: boolean,
    _onSuccessMessages?: { status: string, message: string }[]
    _onErrorMessages?: { status: string, message: string }[]
    _onMessages?: { status: string, message: string }[]
  }
}

axios.interceptors.request.use((req) => {
  const user = useUserStore();
  if (user.getAToken != undefined && user.getAToken != "") {
    req.headers.Authorization = "Bearer " + user.getAToken;
  } else {
    req.headers.Authorization = "";
  }

  if (req._load !== undefined) {
    if (req._load) {
      console.log("begin loading");
      const loader = useLoaderStore();
      loader.start();
    }
  }
  if (req._load2 !== undefined) {
    if (req._load2) {
      console.log("begin loading");
      const loader = useLoaderStore();
      loader.start2();
    }
  }

  if (req._loadSplash !== undefined) {
    if (req._loadSplash) {
      console.log("begin splash loading");
      const loader = useLoaderStore();
      loader.startSplash();
    }
  }

  return req;
});

let refresh = false;
let c = 0;
axios.interceptors.response.use(
  (response: any) => {
    if (response.data) {

      if (response.config._showAllMessages != undefined) {
        const alerts = useToastStore();
        alerts.addToast(
          response.data.message,
          response.data.status,
          "s"
        );
      }

      response.data.status == 'success' && response.config._onSuccessMessages != undefined && response.config._onSuccessMessages.forEach(
        (a: { message: string; status: string }) => {
          const alerts = useToastStore();
          alerts.addToast(a.message, a.status, "s");
        }
      );
    }


    if (response.config._load != undefined) {
      if (response.config._load) {
        console.log("loadend on success");
        const loader = useLoaderStore();
        loader.stop();
      }
    }
    if (response.config._load2 != undefined) {
      if (response.config._load2) {
        console.log("loadend on success");
        const loader = useLoaderStore();
        loader.stop2();
      }
    }
    return response;
  },

  async function (error: any) {


    const loader = useLoaderStore();
    loader.stop2();
    loader.stop();
    loader.stopSplash();


    const originalRequest = error.config;
    const user = useUserStore();
    const router1 = router;
    const alerts = useToastStore();

    if (error.response) {
      ((refresh && error.response.status == 401) || (error.response.status != 401)) && alerts.addToast(
        error.response.data.message,
        error.response.data.status,
        "s"
      );
      // window.alert(error.response.status)
      // throw error;
    }
    if (error.response && error.response.status === 401 && !refresh) {
      originalRequest._retry = true;
      c = c + 1;
      refresh = true;
      let url = "";
     
      url = "generate_new_access_token";
      return axios({
        url,
        method: "POST",
       withCredentials: true,
      })
        .finally(() => {
        })
        .then(function (res) {
          return res;
        })
        .then((res) => {
          user.SetTokens(null, res.data.data.accessToken);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.data.accessToken;
          originalRequest.headers.Authorization =
            axios.defaults.headers.common["Authorization"];
          refresh = false;
          return res;
        })

        .then(() => {
          return axiosApiInstance(originalRequest);
        })
        .catch((error) => {
          router1.push({ name: "login" });
          alerts.addToast(
            error.response.data.message + c,
            error.response.data.status,
            "s"
          );
          return;
        });
    } else if (error.response.status === 401 && refresh) {
      refresh = false;
      const alerts = useToastStore();
      const router1 = router;
      router1.push({ name: "login" });
      return;
    } 
    // else if (error.response.status == 403) {
    //   const router1 = router;
    //   router1.push({ name: "dashboard" });
    //   return;
    // }
    c = 0;
    return Promise.reject(error);
  }
);