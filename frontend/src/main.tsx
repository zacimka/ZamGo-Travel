import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './lib/trpc';
import { Toaster } from 'sonner';

import Destinations from './pages/Destinations';
import Packages from './pages/Packages';
import WhyZamGo from './pages/WhyZamGo';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';

function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:3000/api/trpc',
                    headers() {
                        const token = localStorage.getItem('token');
                        return {
                            ...(token && { authorization: `Bearer ${token}` }),
                        };
                    },
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/destinations" element={<Destinations />} />
                        <Route path="/packages" element={<Packages />} />
                        <Route path="/why-zamgo" element={<WhyZamGo />} />
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </BrowserRouter>
                <Toaster position="bottom-right" />
            </QueryClientProvider>
        </trpc.Provider>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
