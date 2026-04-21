import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { GOOGLE_SCRIPT_URL } from '../config';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify({
                    action: "signup",
                    name: name,
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                }
            });

            const data = await response.json();

            if (data.status === "success") {
                setLoading(false);
                navigate('/dashboard');
            } else {
                setError(data.message || "Registration failed. Please try again.");
                setLoading(false);
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError("Network error. Could not connect to the server.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 w-full p-4 font-sans text-slate-50 relative overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <div className="w-full max-w-md p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md relative z-10 my-8">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <Logo className="w-10 h-10" />
                    <h1 className="text-2xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">Finwisea</h1>
                </div>
                <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">Create Account</h2>

                {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white transition-all shadow-inner placeholder:text-slate-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                            disabled={loading}
                        />
                    </div>
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
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-white transition-all shadow-inner placeholder:text-slate-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-70 text-white font-bold rounded-xl transition-all mt-6 shadow-lg shadow-indigo-600/25 active:scale-[0.98]"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                
                <p className="mt-8 text-center text-slate-400 font-medium tracking-wide">
                    Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold ml-1 transition-colors underline decoration-indigo-400/30 underline-offset-4">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
