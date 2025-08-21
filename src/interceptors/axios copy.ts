import axios from "axios";
import { useAuthStore } from "../stores/auth";
import router from "../router/index";
import { useToastStore } from "@/stores/toast";
import { useLoaderStore } from "../stores/loader";
import { isDev } from "@/composabels/utilities";


//;

if (isDev()) {
  axios.defaults.baseURL = "http://localhost:3000/";
} else {
  axios.defaults.baseURL = "https://ci-rest-api.onrender.com/api/"
}
const axiosApiInstance = axios.create();


declare module 'axios' {
  export interface AxiosRequestConfig {
    _load?: boolean,
    _load2?: boolean,
    _showAllMessages?: boolean
    _showSuccessOnly?: boolean
    _showErrorOnly?: boolean,
    _onSuccessMessages?: { status: string, message: string }[]
    _onErrorMessages?: { status: string, message: string }[]
    _onMessages?: { status: string, message: string }[]
  }
}

axios.interceptors.request.use((req) => {
  const user = useAuthStore();
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


    const originalRequest = error.config;
    const user = useAuthStore();
    const router1 = router;
    const alerts = useToastStore();

    if (error.response) {
      ((!refresh && error.response.status === 401 && (!user.getRToken || user.getRToken == '') ) || (refresh && error.response.status == 401) || (error.response.status != 401)) && alerts.addToast(
        error.response.data.message,
        error.response.data.status,
        "s"
      );
      // window.alert(error.response.status)
      // throw error;
    }
    if (error.response && error.response.status === 401 && !refresh) {
      refresh = true;
      // window.alert(user.getRToken)
      if (!user.getRToken) {
        // window.alert('r')
        return
      }
      if (user.getRToken == '') {
        // window.alert('r1')
        return
      }
      originalRequest._retry = true;
      c = c + 1;
      let url = "";
      let data = {
        refreshToken: user.getRToken,
      };
      url = "generate_new_access_token";
      return axios({
        url,
        method: "POST",
        data,
      })
        .finally(() => {
        })
        .then(function (res) {
          return res;
        })
        .then((res) => {
          // window.alert('o')

          if (res.data.status != 'success') {
            user.SetTokens(null, '')
            return
          }
          user.SetTokens(res.data.data.refreshToken, res.data.data.accessToken);
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
          // if (res.data.status != 'success') {
          user.SetTokens(null, '')
          // return
          // }
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
      // window.alert('o')

      router1.push({ name: "login" });
      return;
    } else if (error.response.status == 403) {
      const router1 = router;
      router1.push({ name: "dashboard" });
      return;
    }
    c = 0;
    return Promise.reject(error);
  }
);