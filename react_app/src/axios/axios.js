import axios from "axios";

const BASE_URL = "http://localhost:80";

export const apiCall = (endpoint) => {
  let url = BASE_URL + endpoint + "/";
  return {
    fetchById: (id) => axios.get(url + id),
    fetchToken: () => axios.get(url),
    fetchByName: (name) => axios.get(url + name),
    fetchAll: () => axios.get(url),
    logout: () => axios.get(url),
    create: (inserted) => axios.post(url, inserted),
    put: (updated, id) => axios.put(url + id, updated),
    deleted: (id) => axios.put(url + id),
    complexQuery: (request, method) => {
      let args = "";
      request.forEach((arg) => {
        args += arg + "/";
      });
      //args = args.slice(0, -1);
      switch (method) {
        case "GET":
          return axios.get(url + args);
          break;
        case "POST":
          return axios.post(url + args);
          break;
        case "PUT":
          return axios.put(url + args);
          break;
        case "DELETE":
          return axios.delete(url + args);
          break;
      }
    },
  };
};
/*



*/
