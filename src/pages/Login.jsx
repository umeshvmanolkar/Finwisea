import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Temporary mock for API login
        setTimeout(() => {
            setLoading(false);
            navigate('/');
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 w-full p-4 font-sans text-slate-50 relative overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md relative z-10">
                <div className="flex items-center justify-center gap-3 mb-10">
                    <Logo className="w-12 h-12" />
                    <h1 className="text-3xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">Finwisea</h1>
                </div>
                <h2 className="text-2xl font-bold text-center text-slate-100 mb-8">Welcome Back</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white transition-all shadow-inner placeholder:text-slate-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="hello@example.com"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white transition-all shadow-inner placeholder:text-slate-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-70 text-white font-bold rounded-xl transition-all mt-4 shadow-lg shadow-indigo-600/25 active:scale-[0.98]"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
                
                <p className="mt-8 text-center text-slate-400 font-medium tracking-wide">
                    New to Finwisea? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold ml-1 transition-colors underline decoration-indigo-400/30 underline-offset-4">Create account</Link>
                </p>
            </div>
        </div>
    );
}
