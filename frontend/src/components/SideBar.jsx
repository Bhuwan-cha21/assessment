import React from 'react';
import {
  LayoutDashboard,
  School,
  BookOpen,
  Users,
  GraduationCap,
  User,
} from "lucide-react";
import { useNavigate } from 'react-router-dom'; 

const navItems = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/" },
  { icon: <School size={18} />, label: "Course Centers", path: "/centers" },
  { icon: <BookOpen size={18} />, label: "Courses", path: "/courses" },
  { icon: <Users size={18} />, label: "Teachers", path: "/teachers" },
  { icon: <GraduationCap size={18} />, label: "Students", path: "/students" }, 
  { icon: <User size={18} />, label: "Users", path: "/users" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const user = {
    name: "Full Name",
    role: "Admin",
    imageUrl: "https://i.pravatar.cc/40"
  };

  return (
    <main>
      <aside className="w-64 fixed h-screen bg-white border-r border-slate-200 font-sans flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 px-6 py-6">
            <div className="bg-blue-800 text-white rounded-full p-2">
              <School size={24} />
            </div>
            <span className="text-lg font-bold text-blue-800">Logoipsum</span>
          </div>
          <nav className="flex flex-col px-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)} 
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                  item.label === "Students"
                    ? "bg-blue-800 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 px-4 py-4 border-t border-slate-200">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-medium text-slate-900">{user.name}</div>
            <div className="text-xs text-slate-500">{user.role}</div>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default Sidebar;
