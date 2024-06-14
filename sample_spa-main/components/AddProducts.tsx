'use client';

import { ProductContext } from '@/context/ProductsContex';
import React, { useContext, useState } from 'react';
import { request } from '@/services/request'; 

const AddProducts = () => {
    const { addProduct } = useContext(ProductContext);

    const [description, setDescription] = useState('');
    const [_id, setId] = useState();
    const [name, setName] = useState('');
    const [qtd, setQtd] = useState(0);
    const [category, setCategory] = useState(0);
    const [preco, setPreco] = useState(0);

    const Stage = {
        Frutas: 0,
        Verdura: 1,
        Doces: 2,
        Bebidas: 3,
        Mercearia: 4,
    };

    const handleSaveProduct = async () => {
        const product = {
            description,
            _id,
            name,
            qtd,
            category,
            preco
        };

        try {
            addProduct (_id, name, qtd, category, preco, description)
            const saveProduct = await request('http://127.0.0.1:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9pIiwiaWF0IjoxNzE4MzI0NjUzfQ.V6ewEFTfTdzoJf8DULI9yVE7c8WKI2fPoV5FE8xsqs0', 
                    'isAdmin': 'true'
                },
                referrerPolicy: 'no-referrer',
                cache: 'no-store',
                body: JSON.stringify(product)
            });

            if (saveProduct == true) {
              
                setDescription('');
                setId();
                setName('');
                setQtd(0);
                setCategory(0);
                setPreco(0);
            } else {
                console.error('Erro ao salvar o produto');
            }
        } catch (error) {
            console.error('Erro ao realizar a requisição', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Adicionar Novo Produto</h2>
        <form className="space-y-4">
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">

                    <label htmlFor="id" className="block text-gray-700 font-bold mb-1">Id</label>
                    <input 
                        type="string"
                        id="id"
                        value={_id}
                        onChange={(e) => setId(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Id do produto"
                    />
                </div>

                <div className="w-full md:w-1/2 px-2 mb-4">
                
                    <label htmlFor="nome" className="block text-gray-700 font-bold mb-1">Nome</label>
                    <input 
                        type="text"
                        id="nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Nome do produto"
                    />
                </div>


                <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="descricao" className="block text-gray-700 font-bold mb-1">Descrição</label>
                    <input 
                        type="text"
                        id="descricao"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Descrição do produto"
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="quantidade" className="block text-gray-700 font-bold mb-1">Quantidade</label>
                    <input 
                        type="number"
                        id="quantidade"
                        value={qtd}
                        onChange={(e) => setQtd(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Quantidade disponível"
                    />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="preco" className="block text-gray-700 font-bold mb-1">Preço</label>
                    <input 
                        type="number"
                        id="preco"
                        value={preco}
                        onChange={(e) => setPreco(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Preço do produto"
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-2">
                <div className="w-full px-2 mb-4">
                    <label htmlFor="categoria" className="block text-gray-700 font-bold mb-1">Categoria</label>
                    <select
                        id="categoria"
                        value={category}
                        onChange={(e) => setCategory(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option>Selecione a categoria</option>
                        <option value={Stage.Frutas}>Frutas</option>
                        <option value={Stage.Verdura}>Verdura</option>
                        <option value={Stage.Doces}>Doces</option>
                        <option value={Stage.Bebidas}>Bebidas</option>
                        <option value={Stage.Mercearia}>Mercearia</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <button 
                    type="button"
                    onClick={handleSaveProduct}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                >
                    Salvar Produto
                </button>
            </div>
        </form>
    </div>
    
    );
};

export default AddProducts;
