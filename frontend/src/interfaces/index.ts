export interface User {
    id: string;
    email: string | null;
    name: string;
    email_verified_at: string | null;
    updated_at: string;
    created_at: string | null;
}

export interface Token {
    token: string;
}

export interface ResponseApi {
    status?: boolean;
    messages?: any;
    permision?: boolean;
    current_page?: string;
    first_page_url?: string;
    from?: string;
    last_page?: string;
    last_page_url?: string;
    next_page_url?: string;
    path?: string;
    per_page?: number;
    prev_page_url?: number;
    to?: number;
    total?: number;
}

export interface ResponseList extends ResponseApi {
    data: Produto[];
}

export interface Produto {
    id: string;
    name: string;
    description: string;
    price: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    id_category?: string;
    category?: Category;
}

export interface Category {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}