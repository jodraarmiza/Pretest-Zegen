import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  description: string;
  thumbnail: string;
};

const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`http://localhost:5000/products`);
  if (!res.ok) throw new Error("Failed to fetch data");
  const products: Product[] = await res.json();
  return products.find((product) => product.id === parseInt(id))!;
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data: product, isLoading, error } = useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId!),
    enabled: !!productId,
  });

  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="product-detail">
      <h1>{product?.title}</h1>
      <img src={product?.thumbnail} alt={product?.title} />
      <p>
        <strong>Price:</strong> ${product?.price}
      </p>
      <p>
        <strong>Category:</strong> {product?.category}
      </p>
      <p>
        <strong>Rating:</strong> {product?.rating}
      </p>
      <p>
        <strong>Description:</strong> {product?.description}
      </p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
