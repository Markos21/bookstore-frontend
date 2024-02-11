
import api from '../api/axios';
import { EndPoints } from '../api/endPoints';

export async function getBooks() {
    try {
      const response = await api.get(EndPoints.book);
      return response.data;
    } catch (error) {
       return error;
    }
  }

export async function storeBook(title,writer,coverImageUrl,price,tags)
{
  try {
    const response = await api.post(EndPoints.book,{title,writer,coverImageUrl,price,tags});
    return response;
  } catch (error) {
    return error;
  }
}

export async function getBookById(bookId) {
  try {
    const response = await api.get(`${EndPoints.book}/${bookId}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getBookByTitle(bookTitle) {
  try {
    const response = await api.get(`${EndPoints.book}/search?title=${encodeURIComponent(bookTitle)}`);
    return response.data;
  } catch (error) {
    return error;
  }
}




  


