import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Car,
    CalendarRange,
    Wrench,
    Settings,
    LogOut,
    Menu,
    ChevronLeft,
    ChevronRight,
    Search,
    Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { Button } from '@/Components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainLayout({ children }) {
    const { url } = usePage();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/', active: url === '/' },
        { name: 'Fleet Inventory', icon: Car, href: '/cars', active: url.startsWith('/cars') },
        { name: 'Rentals', icon: CalendarRange, href: '/rentals', active: url.startsWith('/rentals') },
        { name: 'Maintenance', icon: Wrench, href: '/maintenances', active: url.startsWith('/maintenances') },
        { name: 'Settings', icon: Settings, href: '/settings', active: url === '/settings' },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-background transition-colors duration-300">
            {/* Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col bg-zinc-950 text-white transition-all duration-300 ease-in-out relative border-r border-zinc-900",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                <div className={cn("p-6 flex items-center h-20", isCollapsed ? "justify-center" : "space-x-3")}>
                    <div className="bg-blue-600 p-2 rounded-xl">
                        <Car className="w-6 h-6 text-white" />
                    </div>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="overflow-hidden whitespace-nowrap"
                        >
                            <h1 className="text-xl font-bold tracking-tight">FleetWise</h1>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Management</p>
                        </motion.div>
                    )}
                </div>

                <nav className="flex-1 px-3 py-6 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative",
                                item.active
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
                                isCollapsed && "justify-center px-0"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
                            {!isCollapsed && (
                                <span className="font-medium whitespace-nowrap">{item.name}</span>
                            )}
                            {isCollapsed && item.active && (
                                <motion.div
                                    layoutId="active-nav"
                                    className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-900">
                    <button className={cn(
                        "flex items-center px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl w-full transition-colors group",
                        isCollapsed && "justify-center px-0"
                    )}>
                        <LogOut className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
                        {!isCollapsed && <span className="font-medium">Sign Out</span>}
                    </button>
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-24 bg-zinc-900 border border-zinc-800 rounded-full p-1 text-zinc-400 hover:text-white transition-colors z-20"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 border-b bg-card flex items-center justify-between px-8 z-10">
                    <div className="md:hidden flex items-center">
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(true)}>
                            <Menu />
                        </Button>
                    </div>

                    <div className="flex-1 flex justify-end items-center space-x-4">
                        <div className="relative hidden sm:block max-w-sm w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                placeholder="Search everything..."
                                className="w-full bg-muted/50 border-none rounded-full pl-10 h-10 text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                        </div>
                        <ThemeToggle />
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
                        </Button>
                        <div className="h-8 w-px bg-border mx-2" />
                        <div className="flex items-center space-x-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold leading-none">Admin User</p>
                                <p className="text-[10px] text-muted-foreground mt-1">Super Administrator</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                                JD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-zinc-50/50 dark:bg-zinc-950/50">
                    {children}
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            className="fixed inset-y-0 left-0 w-72 bg-zinc-950 text-white z-50 p-6 md:hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-600 p-2 rounded-xl">
                                        <Car className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold tracking-tight">FleetWise</h1>
                                        <p className="text-[10px] text-zinc-400 capitalize tracking-widest font-semibold">Management</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
                                    <ChevronLeft />
                                </Button>
                            </div>
                            <nav className="flex-1 space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={cn(
                                            "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all",
                                            item.active
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                        )}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
