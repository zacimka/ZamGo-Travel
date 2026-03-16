import React, { createContext, useContext, useEffect, useState } from 'react';
import { trpc } from '../lib/trpc';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const meQuery = trpc.auth.me.useQuery(undefined, {
        enabled: !!localStorage.getItem('token'),
        retry: false,
        onSuccess: (data) => {
            setUser(data as User);
            setIsLoading(false);
        },
        onError: () => {
            localStorage.removeItem('token');
            setUser(null);
            setIsLoading(false);
        }
    });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setIsLoading(false);
        }
    }, []);

    const login = (token: string, role: string) => {
        localStorage.setItem('token', token);
        // Navigate using react-router instead of full reload
        if (role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
