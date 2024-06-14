"use client";

import React, { useContext, useState, useEffect } from 'react';
import { ProductContext, Products, Stage } from "@/context/ProductsContex";

const ListProduct = () => {
    const { produtos, removeProduct, deleteProduct, updateProducts } = useContext(ProductContext);
    const [selectedTab, setSelectedTab] = useState(Stage.Bebidas);

    const options = Object.keys(Stage)
        .filter((item) => isNaN(Number(item)))
        .map((item) => ({
            label: item,
            value: Stage[item as keyof typeof Stage]
        }));

    updateProducts();
    
    return (
        <div className="text-center">
            <h2 className="mb-4 text-xl font-semibold text-gray-600">
                Lista de Produtos
            </h2>
            <div className='flex gap-2 text-gray-700 mb-4'>
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTab(option.value)}
                        className={selectedTab === option.value ? 'active-tab' : ''}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <ul className="max-w-md space-y-1 text-gray-700 text-center mb-4">

                {produtos.map((product: Products, index: number) => (
                    
                    <>{product.category == selectedTab && 
                        <li className='font-light mt-3'> Nome: {product.name} | Preço: {product.preco} | Descrição: {product.description}

                    {"   "}   <button className= "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" 
                            onClick={() => {
                            removeProduct(index);
                            deleteProduct(product._id);
                            }}>
                            Deletar
                        </button>
                    
                        </li>
                    }</>
                    
                ))}

            </ul>
            
        </div>
    );
};

export default ListProduct;
