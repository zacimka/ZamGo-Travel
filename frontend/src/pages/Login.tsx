import { useForm } from "react-hook-form";
import { trpc } from "../lib/trpc";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const loginMutation = trpc.auth.login.useMutation();

    const onSubmit = async (data: any) => {
        try {
            const apiBase = import.meta.env.VITE_API_URL 
                ? import.meta.env.VITE_API_URL.replace('/api/trpc', '') 
                : '';
                
            const response = await fetch(`${apiBase}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email, password: data.password })
            });

            const res = await response.json();

            if (res.success && res.token) {
                toast.success("Login successful!");
                login(res.token, res.role);
            } else {
                toast.error(res.message || "Invalid credentials");
            }
        } catch (err: any) {
            console.error("Login component error:", err);
            toast.error("An error occurred during login. Please check if the server is running.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2" />

            <div className="bg-white p-10 rounded-3xl shadow-xl z-10 w-full max-w-md border border-slate-100 animate-fade-up">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="font-display text-3xl font-bold text-slate-800">Welcome Back</h1>
                    <p className="text-slate-500 font-body text-sm mt-2">Sign in to your ZamGo account</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 font-body">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-body text-sm"
                            placeholder="admin@zamgo.com"
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message as string}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 font-body">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-body text-sm"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message as string}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={loginMutation.isLoading}
                        className="w-full btn-primary py-3 rounded-xl font-semibold font-body text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-70 mt-4"
                    >
                        {loginMutation.isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
