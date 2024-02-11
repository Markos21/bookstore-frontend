
import React,{useContext} from 'react';

import api from '../api/axios';
import { EndPoints } from '../api/endPoints';


export async function login(email,password) {
    try {
      const response = await api.post(EndPoints.login,{email,password});
      return response.data;
    } catch (error) {
       return error;
    }
  }

export async function signUp(name,email,password)
{
  try {
    const response = await api.post(EndPoints.customer,{name,email,password});
    return response.data;
  } catch (error) {
    return error;
  }
}

export function logout()  {
 
  // Clear user data from local storage
  localStorage.removeItem("userData");

};



  


