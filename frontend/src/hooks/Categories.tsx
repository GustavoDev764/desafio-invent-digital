import React, { createContext, useCallback, useContext } from 'react';
import { AxiosResponse } from 'axios';
import api from '../services/api';

import { useAuth } from './Auth';

interface CategoriaCreateDTO {
    name: string,
}

interface CategoriaUpdateDTO extends CategoriaCreateDTO {
    id: string;
}

interface CategoriaDeleteDTO {
    id: string;
}

interface ListOrFind {
    name?: string;
    page?: number;
}

interface CategoriaContext {
    created(data: CategoriaCreateDTO): Promise<AxiosResponse>;
    updated(data: CategoriaUpdateDTO): Promise<AxiosResponse>;
    deleted(data: CategoriaDeleteDTO): Promise<AxiosResponse>;
    list(data: ListOrFind): Promise<AxiosResponse>;
}

const CategoriaContext = createContext<CategoriaContext>({} as CategoriaContext);

export const CategoriaProvider: React.FC = ({ children }) => {
    const { getStateAuth } = useAuth();

    const created = useCallback(async (data: CategoriaCreateDTO): Promise<any> => {

        const { name } = data;

        const response = await api.post('categories/create', {
            name
        });

        return response;
    }, []);

    const updated = useCallback(async (data: CategoriaUpdateDTO): Promise<AxiosResponse> => {

        const { name, id } = data;

        const response = await api.put('categories/edit', {
            name, id
        });

        return response;
    }, []);

    const deleted = useCallback(async (data: CategoriaDeleteDTO): Promise<AxiosResponse> => {
        const { id } = data;

        const response = await api.delete('categories/delete/' + id);

        return response;
    }, []);

    const list = useCallback(async (data: ListOrFind): Promise<AxiosResponse> => {
        const { name, page } = data;

        let url = 'categories/list';

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

    return (
        <CategoriaContext.Provider value={{ created, updated, deleted, list }}>
            {children}
        </CategoriaContext.Provider>
    );
};

export function useCategori(): CategoriaContext {
    const context = useContext(CategoriaContext);
    if (!context) {
        throw new Error("useCategori must be used within an CategoriaCProvider");
    }
    return context;
}