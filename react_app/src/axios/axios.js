import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const apiCall = (endpoint) => {
  let url = BASE_URL + endpoint + "/";
  return {
    fetchById: (id) => axios.get(url + id),
    fetchAll: () => axios.get(url),
    create: (id, inserted) => axios.post(url + id, inserted),
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
//apiCall("/companies/farms/panels").complexQuery([1, 1],"GET");

/*
EXAMPLE 

import React, { useState } from "react";

import { apiCall } from "../axios/axios";
const object = {
  text: ``,
};
let itterate = 1;
const Form = () => {
  const [state, setState] = useState(object);
  const onSubmit = async (e) => {
    e.preventDefault();
    //how to insert data to database
    const object = {
      name: state.text,
    };
    const response = await apiCall("/create-company").create(itterate, object);
    itterate++;
    const data = response.data;

    console.log("testing api response", data);

    //console.log("lot");
    // console.log([e.target.name]);
  };
  const handleChange = (e) => {
    console.log("lot1");
    setState({ ...state, [e.target.name]: e.target.value });
    //  console.log(state);
  };
  return (
    <div>
      <form className="form-todo">
        <input
          type="text"
          className="text"
          placeholder="Item"
          name="text"
          onChange={handleChange}
          value={state.text}
        />
        <button type="submit" onClick={onSubmit}>
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;




*/
