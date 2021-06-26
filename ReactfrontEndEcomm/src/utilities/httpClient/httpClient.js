import axios from "axios";
const base_url = process.env.REACT_APP_BASE_URL;
const http = axios.create({
  baseURL: base_url,
  responseType: "json",
  timeout: 20000,
  timeoutErrorMessage: "server took too much time to respond",
});

const getHeaders = (isSecured = false) => {
  const option = {
    "Content-Type": "application/json",
  };
  if (isSecured) {
    option["Authorization"] = localStorage.getItem("token");
  }
  return option;
};

const GET = (url, isSecured = false, params = {}) => {
  return http.get(url, {
    headers: getHeaders(isSecured),
    params,
  });
};
const POST = (url, data, isSecured = false, params = {}) => {
  return http.post(url, data, {
    headers: getHeaders(isSecured),

    params,
  });
};
const PUT = (url, data, isSecured = false, params = {}) => {
  return http.put(url, data, {
    headers: getHeaders(isSecured),

    params,
  });
};
const DELETE = (url, isSecured = false, params = {}) => {
  return http.delete(url, {
    headers: getHeaders(isSecured),

    params,
  });
};

const UPLOAD = (method, url, data = {}, files = []) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    // append textual data in form data
    for (let key in data) {
      formData.append(key, data[key]);
    }
    // append files in form Data
    files.forEach((file, index) => {
      formData.append("image", file, file.name);
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };

    xhr.open(
      method,
      `${base_url}${url}?token=${localStorage.getItem("token")}`,
      true
    );
    xhr.send(formData);
  });
};

export const httpClient = {
  GET,
  PUT,
  POST,
  DELETE,
  UPLOAD,
};
