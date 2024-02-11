
import api from '../api/axios';
import { EndPoints } from '../api/endPoints';

export async function getOrders() {
    try {
      const response = await api.get(EndPoints.order);
      return response.data;
    } catch (error) {
       return error;
    }
  }

export async function storeOrder(customer,book,quantity,total,address,zip,city,state,phonenumber)
{
  try {
    const response = await api.post(EndPoints.order,{customer,book,quantity,total,address,zip,city,state,phonenumber});
   console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getOrdersByCustomerId(customerId) {
  try {
    const response = await api.get(`${EndPoints.customer}/${customerId}/orders`);
    return response.data;
  } catch (error) {
    return error;
  }
}


export async function cancelOrder(orderId) {
  try {
    const response = await api.put(`${EndPoints.order}/${orderId}/`);
    return response;
  } catch (error) {
    return error;
  }
}


  

