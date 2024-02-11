import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";
import ItemList from "./ItemList";
import { getBooks } from "../../services/BookService";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { categoryId, term } = useParams();

  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;

    const body = document.body;
    const html = document.documentElement;

    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const scrollPercentage = (window.scrollY + windowHeight) / documentHeight;

    // Check if the user has scrolled to 80% of the page
    if (scrollPercentage >= 0.8) {
      // Load more data when 80% of the page is reached
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await getBooks(currentPage);
        if (response.result === true && response.data) {
          const allBooks = response.data.books;

          // Filter the items based on the search term
          const filteredItems = term
            ? allBooks.filter((item) =>
                item.title.toLowerCase().includes(term.trim().toLowerCase())
              )
            : allBooks;
          term
            ? setItems(filteredItems)
            : setItems((prevItems) => [...prevItems, ...filteredItems]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, term, currentPage]);

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <ItemList items={items} />
      {loading && <LoadingSpinner text="Loading products..." />}
    </div>
  );
};

export default ItemListContainer;
