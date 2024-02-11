import { useParams } from 'react-router-dom';

const getPageTitle = () => {
  const { categoryId } = useParams();

  switch (categoryId) {
    case 'fictions':
      return 'fiction books';
    case 'science':
      return 'science books';
    case 'gadgets':
      return 'comedy';
    default:
      return 'Books List';
  }
};

export default getPageTitle;
