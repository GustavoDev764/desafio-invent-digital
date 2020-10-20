import React, { createContext, useCallback, useState, useContext } from 'react';

interface AuthContexData {
    getIsOpen(): boolean;
    handleMenu(): void;
}

const MenuContext = createContext<AuthContexData>({} as AuthContexData);

export const MenuProvider: React.FC = ({ children }) => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const getIsOpen = useCallback((): boolean => {
        return isOpen;
    }, [isOpen])

    const handleMenu = useCallback((): void => {
        setIsOpen(!isOpen);
    }, [isOpen])

    return (
        <MenuContext.Provider value={{ getIsOpen, handleMenu }}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu(): AuthContexData {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within an MenuProvider");
    }
    return context;
}