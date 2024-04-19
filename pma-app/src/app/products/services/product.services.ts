import { Inject, Injectable } from "@angular/core";
import { PRODUCT_URL_TOKEN } from "../../config/constant";
import { ApiResponse, DataService, Product } from "../../models/product";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable()
export class ProductService implements DataService {
    //private url: string = ''

    constructor(
        @Inject(PRODUCT_URL_TOKEN) private _url: string,
        private _http: HttpClient
    ) {
        //this.url = _url
        console.log('service created')
    }

    getProducts(): Observable<ApiResponse<Product[]>> {
        const obs: Observable<ApiResponse<Product[]>> = this._http.get<ApiResponse<Product[]>>(this._url)
        return obs;
    }
    getProductById(id: number): Observable<ApiResponse<Product>> {
        return this._http.get<ApiResponse<Product>>(`${this._url}/${id}`)
    }
    addProduct(product: Product): Observable<ApiResponse<Product[]>> {
        return this._http.post<ApiResponse<Product[]>>(this._url, product)
    }
    updateProduct(product: Product, id: number) : Observable<ApiResponse<Product[]>>{
        return this._http.put<ApiResponse<Product[]>>(`${this._url}/${id}`, product)
    }
    deleteProduct(id: number) : Observable<ApiResponse<Product[]>>{
        return this._http.delete<ApiResponse<Product[]>>(`${this._url}/${id}`)

    }
}