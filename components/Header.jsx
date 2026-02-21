import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header({ currentTab, setCurrentTab, setShowModal }) {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const tabStyle = tab => ({
    color: currentTab === tab ? '#00a3bf' : '#4a5568',
    borderBottom: currentTab === tab ? '2px solid #00a3bf' : 'none',
  });

  return (
    <header className="w-full border-b border-[#e1e4e8] bg-white shadow-sm">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex h-[64px] items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <h1 className="text-[24px] font-semibold text-[#2d3748]">
              TurnQuest
            </h1>
            {isAdmin && (
              <span className="text-[16px] text-[#718096]">(Admin)</span>
            )}
          </div>

          <nav className="flex gap-6">
            <button
              onClick={() => setCurrentTab('board')}
              className="px-4 py-2 font-medium"
              style={tabStyle('board')}
            >
              Board
            </button>

            <button
              onClick={() => setCurrentTab('points')}
              className="px-4 py-2 font-medium"
              style={tabStyle('points')}
            >
              Points
            </button>

            {isAdmin ? (
              <button
                onClick={() => setCurrentTab('users')}
                className="px-4 py-2 font-medium"
                style={tabStyle('users')}
              >
                Manage Users
              </button>
            ) : (
              <button
                onClick={() => setCurrentTab('profile')}
                className="px-4 py-2 font-medium"
                style={tabStyle('profile')}
              >
                Profile
              </button>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="rounded-[4px] bg-[#00a3bf] px-4 py-2 font-medium text-white"
            >
              Create Ticket
            </button>

            <button
              onClick={logout}
              className="rounded-[4px] border border-[#e1e4e8] px-3 py-2 text-sm text-[#4a5568] hover:bg-[#f7fafc]"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
