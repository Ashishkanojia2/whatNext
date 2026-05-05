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
  qty: number;
  imageUrl: {
    public_id: string;
    url: string;
  };
  price: number;
  rating?: number;
  title: string;
  index: number;
  productLike?: boolean;
  onPress: () => void;
  tag?: 'Discount' | 'New';
  id?: string;
  size: string[];
  color: string[];
  companyName?: string;
}
export interface CustomerReviewProps {
  _id: String;
  productId: String;
  userId: String;
  name: String;
  comment: String;
  rating: Number;
}
