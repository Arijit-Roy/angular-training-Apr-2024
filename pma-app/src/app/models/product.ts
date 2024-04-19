import { Observable } from "rxjs";

export interface Product {
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
}

export interface ApiResponse<T>{
  message: string;
  data: T | null;
}

export interface DataService {
  getProducts(): Observable<ApiResponse<Product[]>>;
  getProductById(id: number):Observable<ApiResponse<Product>>;
  addProduct(product: Product): Observable<ApiResponse<Product[]>>;
  updateProduct(product: Product, id: number): Observable<ApiResponse<Product[]>>;
  deleteProduct(id: number): Observable<ApiResponse<Product[]>>;
}