import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../ui/LoadingSpinner";
import { getBookById } from "../../services/BookService";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();

  useEffect(async () => {
    try {
      const response = await getBookById(itemId);
      if (response.result === true && response.data) {
        setItem(response.data);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [itemId]);

  return item ? <ItemDetail {...item} /> : <LoadingSpinner />;
};

export default ItemDetailContainer;
