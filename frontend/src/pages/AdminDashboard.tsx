import { trpc } from "../lib/trpc";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { data: bookings, refetch, isLoading, isError } = trpc.bookings.getAllBookings.useQuery();
    const updateStatus = trpc.bookings.updateBookingStatus.useMutation({
        onSuccess: () => {
            toast.success("Booking status updated!");
            refetch();
        },
        onError: (err) => {
            toast.error(err.message || "Failed to update booking status");
        }
    });

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (isLoading) return <div className="p-10 text-center font-body text-slate-500">Loading bookings...</div>;
    if (isError) return <div className="p-10 text-center font-body text-red-500">Failed to load bookings. Are you logged in as admin?</div>;

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
                                                        onClick={() => updateStatus.mutate({ id: booking._id, status: 'confirmed' })}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {booking.status !== 'cancelled' && (
                                                    <button
                                                        onClick={() => updateStatus.mutate({ id: booking._id, status: 'cancelled' })}
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
