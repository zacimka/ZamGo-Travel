import React, { useEffect, useState } from 'react';
import { toast } from "sonner";
import { CheckCircle2, XCircle, Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { REST_API_URL } from '../config';

export default function AdminDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchBookings = async () => {
        setIsLoading(true);
        const url = `${REST_API_URL}/admin/bookings`;
        console.log(`Fetching bookings from: ${url}`);
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(`Response status: ${response.status}`);
            
            if (!response.ok) throw new Error('Failed to fetch');
            
            const data = await response.json();
            setBookings(data.bookings || []);
            setIsError(false);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        const url = `${REST_API_URL}/admin/bookings/${id}/status`;
        console.log(`Updating booking ${id} status to ${status} at: ${url}`);
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            
            console.log(`Status update response: ${response.status}`);
            const resData = await response.json();
            
            if (resData.success) {
                toast.success("Booking status updated!");
                fetchBookings();
            } else {
                toast.error(resData.message || "Failed to update status");
            }
        } catch (err) {
            console.error('Error updating status:', err);
            toast.error("Failed to update booking status");
        }
    };

    const handleLogout = () => {
        logout();
    };

    const StatusIcon = ({ status }: { status: string }) => {
        switch (status) {
            case 'confirmed': return <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmed</span>;
            case 'cancelled': return <span className="flex items-center gap-1.5 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-semibold"><XCircle className="w-3.5 h-3.5" /> Cancelled</span>;
            default: return <span className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-xs font-semibold"><Clock className="w-3.5 h-3.5" /> Pending</span>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-800">Admin Dashboard</h1>
                        <p className="text-slate-500 font-body mt-2">Manage customer bookings and travel requests</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-slate-500 hover:text-red-500 font-body transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="hidden sm:inline">Sign Out</span>
                    </button>
                </div>

                {isLoading && <div className="p-10 text-center font-body text-slate-500">Loading bookings...</div>}
                {isError && <div className="p-10 text-center font-body text-red-500">Failed to load bookings. Are you logged in as admin?</div>}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-up">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider font-body">Customer</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider font-body">Service/Destination</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider font-body">Date</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider font-body">Status</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider font-body text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-body">
                                {bookings?.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-slate-500">No bookings found.</td>
                                    </tr>
                                ) : (
                                    bookings?.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-slate-800">{booking.fullName || booking.name || "Unknown"}</div>
                                                <div className="text-xs text-slate-500">{booking.email}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-slate-700">{booking.serviceName || booking.destination || "Trip Package"}</div>
                                                {booking.price && <div className="text-xs text-slate-500">${booking.price}</div>}
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-600">
                                                {new Date(booking.departureDate || booking.date || booking.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-6">
                                                <StatusIcon status={booking.status} />
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                {booking.status === 'pending' && (
                                                    <button
                                                        onClick={() => updateStatus(booking._id, 'confirmed')}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {booking.status !== 'cancelled' && (
                                                    <button
                                                        onClick={() => updateStatus(booking._id, 'cancelled')}
                                                        className="text-slate-500 hover:text-red-500 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors bg-white hover:bg-red-50 border border-slate-200"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
