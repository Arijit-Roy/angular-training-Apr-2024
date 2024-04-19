import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../../models/product";

@Pipe({
  name: 'productsfilter'
})

export class ProductsFilterPipe implements PipeTransform{
  transform(value: Product[], ...args: any[]): Product[] {
    // throw new Error("Method not implemented.");
    let filterText = args[0];
    let products = value;
    // let filteredProducts:Product[] = [];
    if(!value.length){
      return products;
    }
    return products.filter(product=> product.productName.toUpperCase().includes(filterText.toUpperCase()))
  }
   
}