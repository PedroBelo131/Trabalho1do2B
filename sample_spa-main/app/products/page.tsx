import React from 'react';
import { ProductContextProvider } from "@/context/ProductsContex";
import ListProduct from '@/components/Products';
import AddProducts from '@/components/AddProducts';

const Tasks = () => {
  return (
    <main className="h-screen">
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        Gerenciamento de Mercado
      </h1>

      <div className="grid place-items-center">
        <ProductContextProvider>
          
        <AddProducts/>

        <ListProduct/>
       
        </ProductContextProvider>
      </div>
    </main>
  );
};

export default Tasks;
