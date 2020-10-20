import React, { createContext, useCallback, useContext, useState } from 'react';
import { AxiosResponse } from 'axios';

import api from '../services/api';
import { Produto } from '../interfaces';
import { useAuth } from './Auth';
import { Category } from '../interfaces'

interface ProdutoCreateDTO {
    name: string,
    description: string,
    price: number,
    id_category?: string,
}

interface ProdutoUpdateDTO extends ProdutoCreateDTO {
    id: string;
}

interface ProdutoDeleteDTO {
    id: string;
}

interface ListOrFind {
    name?: string;
    page?: number;
}

interface ProdutosContext {
    created(data: ProdutoCreateDTO): Promise<AxiosResponse>;
    updated(data: ProdutoUpdateDTO): Promise<AxiosResponse>;
    deleted(data: ProdutoDeleteDTO): Promise<AxiosResponse>;
    list(data: ListOrFind): Promise<AxiosResponse>;
    handleModal(): void;
    getIsModal(): boolean;
    setProdutoNoModal(produto: Produto): void;
    getProdutoNoModal(): Produto;
    setName(name: string): void;
    setDescricao(description: string): void;
    setCategoria(category: Category): void;
    setPrice(price: number): void;
}

const ProdutoContext = createContext<ProdutosContext>({} as ProdutosContext);

export const ProdutoProvider: React.FC = ({ children }) => {
    const { getStateAuth } = useAuth();
    const [isModal, setIsModal] = useState<boolean>(false);
    const [produtoModal, setProdutoModal] = useState<Produto>({} as Produto);

    const handleModal = useCallback(() => {
        setIsModal(!isModal);
    }, [isModal]);

    const getIsModal = useCallback((): boolean => {
        return isModal;
    }, [isModal]);

    const setProdutoNoModal = useCallback((produto: Produto) => {
        setProdutoModal(produto);
    }, []);

    const getProdutoNoModal = useCallback((): Produto => {
        return produtoModal;
    }, [produtoModal]);



    const created = useCallback(async (data: ProdutoCreateDTO): Promise<any> => {

        const {
            name,
            description,
            price,
            id_category
        } = data;

        const response = await api.post('products/create', {
            name, description, price, id_category
        });

        return response;
    }, []);

    const updated = useCallback(async (data: ProdutoUpdateDTO): Promise<AxiosResponse> => {

        const {
            name,
            description,
            price,
            id_category,
            id
        } = data;

        const response = await api.put('products/edit', {
            name, description, price, id_category, id
        });

        return response;
    }, []);

    const deleted = useCallback(async (data: ProdutoDeleteDTO): Promise<AxiosResponse> => {
        const { id } = data;

        const response = await api.delete('products/delete/' + id);

        return response;
    }, []);

    const list = useCallback(async (data: ListOrFind): Promise<AxiosResponse> => {
        const { name, page } = data;

        let url = 'products/list';

        if (!!name) {
            url = url + '/' + name;
        }

        if (!!page) {
            url = url + '/?page=' + page;
        }

        const { token } = getStateAuth();

        const response = await api.get(url);
        console.log(response);
        return response;
    }, [getStateAuth]);

    const setName = useCallback((name: string) => {
        setProdutoModal({ ...produtoModal, name })
    }, [produtoModal]);

    const setDescricao = useCallback((description: string) => {
        setProdutoModal({ ...produtoModal, description })
    }, [produtoModal]);

    const setCategoria = useCallback((category: Category) => {
        setProdutoModal({ ...produtoModal, category })
    }, [produtoModal]);

    const setPrice = useCallback((price: number) => {
        setProdutoModal({ ...produtoModal, price })
    }, [produtoModal]);


    return (
        <ProdutoContext.Provider value={{
            created,
            updated,
            deleted,
            list,
            handleModal,
            getIsModal,
            setProdutoNoModal,
            getProdutoNoModal,
            setName,
            setDescricao,
            setCategoria,
            setPrice
        }}>
            { children}
        </ProdutoContext.Provider>

    )
}

export function useProduto(): ProdutosContext {
    const context = useContext(ProdutoContext);
    if (!context) {
        throw new Error("useProduto must be used within an ProdutoProvider");
    }
    return context;
}