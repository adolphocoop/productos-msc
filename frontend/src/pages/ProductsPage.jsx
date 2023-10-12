import { useEffect } from "react";
import { useProducts} from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
  const { getProducts, products } = useProducts();

//Ejecutamos la funcion getProducts inmediatamente
//Despues de que se cargue el componente

useEffect( () =>{
  getProducts();
}, [])

if(products.length === 0)
  return (<h1>No hay productos para listar</h1>)


  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {
        products.map( (product) =>(
          <ProductCard product={product}
          key={product._id}
            
            />
           
        ))
      }

      
    </div>
)
}

export default ProductsPage