import React, { useState } from 'react';
import { X, User, LogIn, UserPlus, KeyRound } from 'lucide-react';
import { INITIAL_USERS } from '../data/users';

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onRegister
}) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('customer');
  const [fullName, setFullName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleManualLogin = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setErrorMsg('Please enter your email or phone number.');
      return;
    }

    const matched = INITIAL_USERS.find(
      u => u.email.toLowerCase() === emailOrPhone.trim().toLowerCase() || u.phone === emailOrPhone.trim()
    );

    if (matched) {
      onLogin(matched);
      onClose();
    } else {
      const newUser = {
        id: `user-${Date.now()}`,
        name: emailOrPhone.split('@')[0] || 'Customer',
        email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@phone.eth`,
        phone: emailOrPhone,
        role: 'customer',
        avatar: '👤',
        roleTitle: 'Customer / Client'
      };
      onLogin(newUser);
      onClose();
    }
  };

  const handleManualRegister = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneInput.trim()) {
      setErrorMsg('Please enter your full name and phone number.');
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: fullName,
      email: emailOrPhone || `${phoneInput}@ethioprint.com`,
      phone: phoneInput,
      role: selectedRole,
      avatar: selectedRole === 'admin' ? '👑' : selectedRole === 'receiver' ? '🖨️' : '👤',
      roleTitle: selectedRole === 'admin' ? 'Store Admin' : selectedRole === 'receiver' ? 'Workshop Order Receiver' : 'Customer'
    };

    onRegister(newUser);
    onClose();
  };

  const handleQuickDemoLogin = (demoUser) => {
    onLogin(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header (Clean Light) */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Account Sign In
            </h3>
            <p className="text-xs text-slate-500">
              Select a role or log in with your details
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1-Click Demo Account Switcher */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Quick 1-Click Role Switcher:
          </span>

          <div className="grid grid-cols-3 gap-2 text-xs">
            {/* Customer */}
            <button
              type="button"
              onClick={() => handleQuickDemoLogin(INITIAL_USERS[0])}
              className={`p-2.5 rounded-xl border text-left transition ${
                currentUser?.role === 'customer'
                  ? 'border-blue-600 bg-white shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="text-sm mb-0.5">👤</div>
              <p className="font-bold text-slate-900 truncate">Customer</p>
              <span className="text-[10px] text-slate-500 block">Abebe</span>
            </button>

            {/* Receiver */}
            <button
              type="button"
              onClick={() => handleQuickDemoLogin(INITIAL_USERS[1])}
              className={`p-2.5 rounded-xl border text-left transition ${
                currentUser?.role === 'receiver'
                  ? 'border-blue-600 bg-white shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="text-sm mb-0.5">🖨️</div>
              <p className="font-bold text-slate-900 truncate">Receiver</p>
              <span className="text-[10px] text-slate-500 block">Dawit</span>
            </button>

            {/* Admin */}
            <button
              type="button"
              onClick={() => handleQuickDemoLogin(INITIAL_USERS[2])}
              className={`p-2.5 rounded-xl border text-left transition ${
                currentUser?.role === 'admin'
                  ? 'border-blue-600 bg-white shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="text-sm mb-0.5">👑</div>
              <p className="font-bold text-slate-900 truncate">Admin</p>
              <span className="text-[10px] text-slate-500 block">Meron</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 px-6 bg-white text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setTab('login'); setErrorMsg(''); }}
            className={`py-3 border-b-2 transition ${
              tab === 'login'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => { setTab('register'); setErrorMsg(''); }}
            className={`py-3 border-b-2 transition ml-6 ${
              tab === 'register'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'login' ? (
            <form onSubmit={handleManualLogin} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Phone Number or Email:
                </label>
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="e.g. 0911234567 or abebe@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs bg-white"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-xs"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleManualRegister} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Full Name:
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Almaz Bekele"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Phone (Mobile / Telebirr):
                </label>
                <input
                  type="tel"
                  required
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="0911 23 45 67"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Account Role:
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="customer">Customer (Order custom products)</option>
                  <option value="receiver">Order Receiver (Workshop staff)</option>
                  <option value="admin">Store Admin</option>
                </select>
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-xs"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
