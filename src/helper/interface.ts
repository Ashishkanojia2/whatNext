//Home-screen
export interface Review {
  user: string;
  comment: string;
  rating: number;
}

export interface ProductProps {
  _id: string;
  productName: string;
  categories: string;
  numberOfReviews: number;
  reviews: Review[];
  createdAt: string; 
  category: string;
  description: string;
  image: string;
  price: number;
  rating?: {
    rate: number;
    count: number;
  };
  title: string;
  index: number;
  productLike?: boolean;
  onPress: () => void;
  tag?: 'Discount' | 'New';
  id?: string;
}
