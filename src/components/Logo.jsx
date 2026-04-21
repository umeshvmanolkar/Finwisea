import React from 'react';

export default function Logo({ className = "w-10 h-10" }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`shrink-0 drop-shadow-lg ${className}`}>
            <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" /> {/* indigo-600 */}
                    <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
                </linearGradient>
            </defs>
            <rect width="100" height="100" rx="24" fill="url(#logoGrad)" />
            {/* Dynamic trend line representing financial growth */}
            <path d="M 26 70 L 46 45 L 60 55 L 75 30" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Upward arrow head */}
            <path d="M 58 30 L 75 30 L 75 47" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            
            {/* Accent nodes */}
            <circle cx="26" cy="70" r="5" fill="white" />
            <circle cx="46" cy="45" r="4" fill="#a5b4fc" />
            <circle cx="60" cy="55" r="4" fill="#a5b4fc" />
        </svg>
    );
}
