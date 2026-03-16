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
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const PROD_API_URL = 'https://zamgo-travel-8.onrender.com';

function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    // Use the direct absolute URL to bypass Vercel proxy issues entirely
                    url: `${PROD_API_URL}/api/trpc`,
                    async fetch(url, options) {
                        console.log(`tRPC Request URL: ${url}`);
                        const response = await fetch(url.toString(), options);
                        
                        // Detect if we hit a 404 page (HTML) instead of the API
                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.includes('text/html')) {
                            console.error('API Error: Received HTML instead of JSON from:', url);
                            throw new Error('Server returned HTML (likely a 404 page). Check your API proxy settings.');
                        }
                        
                        // If it's a 204 or empty, tRPC might be okay, but "Unexpected end of JSON" usually means it wasn't.
                        // We clone the response to read it if we suspect an error.
                        if (!response.ok) {
                            const clone = response.clone();
                            try {
                                const text = await clone.text();
                                console.error(`API Error ${response.status}:`, text.substring(0, 200));
                            } catch (e) {
                                // ignore
                            }
                        }
                        
                        return response;
                    },
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
                    <AuthProvider>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route 
                                path="/admin" 
                                element={
                                    <ProtectedRoute adminOnly>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route path="/destinations" element={<Destinations />} />
                            <Route path="/packages" element={<Packages />} />
                            <Route path="/why-zamgo" element={<WhyZamGo />} />
                            <Route path="/reviews" element={<Reviews />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </AuthProvider>
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
