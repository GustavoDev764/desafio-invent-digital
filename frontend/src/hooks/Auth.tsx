import React, {
    createContext,
    useState,
    useCallback,
    useContext,

} from 'react';

import api from '../services/api';

import { User } from '../interfaces'

interface AuthContexData {
    user: User;
    token: string;
    isAuth(): boolean;
    singnIn(email: string, password: string): Promise<any>;
    singnOut(): void;
    getStateAuth(): HandleUser;
}

interface HandleUser {
    user: User;
    token: string;
}

interface Response {
    status: boolean;
    messages: any;
    user?: User;
    token?: string;
}

interface Headers {
    Authorization: string;
}

const user: User = {
    id: '',
    name: '',
    email: '',
    created_at: '',
    updated_at: '',
    email_verified_at: ''
}

const AuthContext = createContext<AuthContexData>({} as AuthContexData);



export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<HandleUser>(() => {
        const token = localStorage.getItem('@AuthJWT:token');
        const user = localStorage.getItem('@AuthJWT:user');

        if (user && token) {
            return { user: JSON.parse(user), token: JSON.parse(token) };
        }
        return {} as HandleUser;
    });

    const getStateAuth = useCallback((): HandleUser => {
        return auth
    }, [auth])

    const getConfigHeaders = useCallback((): Headers => {
        const { token } = auth;
        console.log(`Bearer ${token}`);
        return { Authorization: `Bearer ${token}` };
    }, [auth])

    const setStorageUser = useCallback(({ user, token }: HandleUser): void => {
        localStorage.setItem('@AuthJWT:token', JSON.stringify({ token: token }));
        localStorage.setItem('@AuthJWT:user', JSON.stringify({ user: user }));
    }, []);
    const removeStorageUser = useCallback((): void => {
        localStorage.removeItem('@AuthJWT:token');
        localStorage.removeItem('@AuthJWT:user');
    }, []);

    const handleUser = useCallback(({ user, token }: HandleUser) => {
        setStorageUser({ user, token });
        setAuth({ ...auth, user, token });
    }, [auth, setStorageUser]);

    const isAuth = useCallback((): boolean => {
        const { token } = auth;
        return !!token;
    }, [auth])

    const singnIn = useCallback(async (email: string, password: string): Promise<any> => {
        const response = await api.post<Response>('users/login', {
            email,
            password
        });

        if (response.data.status) {
            const { user, token } = response.data;
            if (user && token) {
                handleUser({ user, token })
            }
        } else {
            return response.data.messages;
        }

        return null;

    }, [handleUser])

    const singnOut = useCallback(() => {
        removeStorageUser();
        setAuth({} as HandleUser);
    }, [removeStorageUser])


    return (
        <AuthContext.Provider value={{
            user, token: '', isAuth, singnIn, singnOut, getStateAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContexData {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}