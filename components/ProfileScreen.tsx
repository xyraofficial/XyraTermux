import React, { useState } from 'react';
import { User, LogOut, Mail, Settings, Shield, Calendar, Copy, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const { user, logout } = useAuth();
  const [copied, setCopied] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!user) return null;

  const createdDate = user.metadata?.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
          <User size={24} className="text-primary-400" />
          Your Profile
        </h2>
        <p className="text-sm text-slate-400 mt-2">Manage your account settings and information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8 shadow-2xl mb-6">
        {/* Avatar & Name */}
        <div className="flex items-start gap-6 mb-8 pb-8 border-b border-slate-700/30">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={40} className="text-white" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-1">
              {user.displayName || 'User'}
            </h3>
            <p className="text-sm text-slate-400 mb-3">Active since {createdDate}</p>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-400" />
              <span className="text-xs text-green-300 font-semibold">Verified Account</span>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="space-y-4 mb-8">
          {/* Email */}
          <div className="bg-slate-700/30 rounded-2xl p-4 flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-primary-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                <p className="text-white font-medium">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(user.email || '', 'email')}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied === 'email' ? (
                <CheckCircle size={18} className="text-green-400" />
              ) : (
                <Copy size={18} className="text-slate-400 hover:text-white" />
              )}
            </button>
          </div>

          {/* User ID */}
          <div className="bg-slate-700/30 rounded-2xl p-4 flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <Settings size={18} className="text-primary-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">User ID</p>
                <p className="text-white font-mono text-sm break-all">{user.uid.substring(0, 16)}...</p>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(user.uid, 'uid')}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied === 'uid' ? (
                <CheckCircle size={18} className="text-green-400" />
              ) : (
                <Copy size={18} className="text-slate-400 hover:text-white" />
              )}
            </button>
          </div>

          {/* Account Created */}
          <div className="bg-slate-700/30 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-primary-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Member Since</p>
                <p className="text-white font-medium">{createdDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-slate-700/50 rounded-2xl p-4 mb-8">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Account Status</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Email Verified</p>
              <p className="text-sm text-slate-400">{user.emailVerified ? '✓ Yes' : 'Pending'}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-xs font-semibold ${
              user.emailVerified 
                ? 'bg-green-500/20 text-green-300' 
                : 'bg-yellow-500/20 text-yellow-300'
            }`}>
              {user.emailVerified ? 'Active' : 'Pending'}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      {/* Security Info */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
        <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <Shield size={16} className="text-primary-400" />
          Security Tips
        </h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>• Keep your password secure and unique</li>
          <li>• Verify your email address regularly</li>
          <li>• Enable two-factor authentication when available</li>
          <li>• Review account activity periodically</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileScreen;
