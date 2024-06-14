"use client";

import React, { createContext, useState } from 'react';
import { request } from '@/services/request';


export enum Stage {
    Frutas,
    Verdura,
    Doces,
    Bebidas,
    Mercearia,
}

export type Products = {
_id : number
description : string
name : string
qtd : number
category : Stage
preco : number
}

type ContextProducts = {
    produtos: Products[];
    addProduct: (_id:number, name:string, qtd:number, category:Stage, preco:number, description:string) => void;

    updateProducts: () => void;

    updatedProducts: boolean;

    removeProduct: (index: number) => void;
    changeCategory: (index: number, newStage: Stage) => void;
    deleteProduct : (index: number) => void;
};

export const ProductContext = createContext({} as ContextProducts);

export const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [produtos, setProdutos] = useState<Products[]>([]);

    const [loadingProducts, setLoadingProducts] = useState(false);

    const [updatedProducts, setUpdatedProducts] = useState(false);


    const addProduct = (_id:number, name:string, qtd:number, category:Stage, preco:number, description:string) => {
        let newProduct = {
            _id: _id,
            name: name,
            qtd: qtd,
            category: category,
            preco: preco,
            description: description
        }
        setProdutos([...produtos, newProduct]);
    };


    //remove da lista do navegador
    const removeProduct = (index: number) => {
        setProdutos(produtos.filter((_, idx) => idx !== index));
    };

    //remove do banco de dados
    const deleteProduct = async (_id : number) => {
        try {
            const response = await request(`http://127.0.0.1:5000/products/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9pIiwiaWF0IjoxNzE4MzI0NjUzfQ.V6ewEFTfTdzoJf8DULI9yVE7c8WKI2fPoV5FE8xsqs0'
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            });

        } catch (error) {
            console.error('Erro ao realizar a requisição', error);
        }
    };

    const updateProducts = async () => {
        if(!updatedProducts){
            let res = await request<Products[]>('http://127.0.0.1:5000/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store'
            },
        );
            setProdutos(res);
            setUpdatedProducts(true);
        }
    }



    const changeCategory = (index: number, newStage: Stage) => {
        let updatedProducts = [...produtos];
        updatedProducts[index].category = newStage;
        setProdutos(updatedProducts);
    };

    return (
        <ProductContext.Provider value={{ produtos, addProduct, removeProduct, changeCategory, deleteProduct, updateProducts, updatedProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
