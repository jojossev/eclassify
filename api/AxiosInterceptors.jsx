import { logoutSuccess } from "@/redux/reducer/authSlice";
import { setIsUnauthorized } from "@/redux/reducer/globalStateSlice";
import { getPublicApiBase } from "@/lib/publicApiBase";
import { store } from "@/redux/store";
import axios from "axios";

const getLangFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") || undefined;
};

const apiBase = getPublicApiBase();
const Api = axios.create({
  ...(apiBase ? { baseURL: apiBase } : {}),
});

let isUnauthorizedToastShown = false;
let missingApiBaseWarned = false;

Api.interceptors.request.use(function (config) {
  if (!getPublicApiBase()) {
    if (typeof window !== "undefined" && !missingApiBaseWarned) {
      missingApiBaseWarned = true;
      console.warn(
        "[eClassify] NEXT_PUBLIC_API_URL and NEXT_PUBLIC_END_POINT are not set; API requests are skipped. Add them to .env.local."
      );
    }
    return Promise.reject(
      new axios.AxiosError(
        "API base URL not configured",
        "ERR_NOT_CONFIGURED",
        config
      )
    );
  }

  let token = undefined;
  let langCode = process.env.NEXT_PUBLIC_DEFAULT_LANG_CODE;

  if (typeof window !== "undefined") {
    const state = store.getState();
    token = state?.UserSignup?.data?.token;
    langCode = getLangFromUrl() || langCode;
  }

  if (token) config.headers.authorization = `Bearer ${token}`;
  if (langCode) config.headers["Content-Language"] = langCode;

  return config;
});

// Add a response interceptor
Api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Call the logout function if the status code is 401
      logoutSuccess();
      if (!isUnauthorizedToastShown) {
        store.dispatch(setIsUnauthorized(true));
        isUnauthorizedToastShown = true;
        // Reset the flag after a certain period
        setTimeout(() => {
          isUnauthorizedToastShown = false;
        }, 3000); // 3 seconds delay before allowing another toast
      }
    }
    return Promise.reject(error);
  }
);

export default Api;
