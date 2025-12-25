import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import {
    Car,
    CalendarRange,
    Wrench,
    DollarSign,
    Plus,
    Download,
    TrendingUp,
    TrendingDown,
    CheckCircle2,
    Clock,
    Activity,
    ArrowUpRight
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import { cn } from '@/lib/utils';

export default function Dashboard({ stats, chartData, trendData, recentMaintenance }) {
    const fleetStatusData = [
        { name: 'Available', value: stats.available_cars, color: '#10B981' },
        { name: 'Rented', value: stats.rented_cars, color: '#3B82F6' },
        { name: 'Maintenance', value: stats.maintenance_cars, color: '#EF4444' },
    ];

    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-4xl font-black tracking-tight flex items-center text-foreground uppercase italic">
                        Fleet <span className="text-blue-600 ml-2">Intelligence</span>
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm font-medium">Real-time performance analytics and operations monitor.</p>
                </div>
                <div className="flex space-x-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none h-11 px-6 rounded-xl border-dashed">
                        <Download className="mr-2 h-4 w-4" />
                        Intelligence Report
                    </Button>
                    <Link href="/rentals/create" className="flex-1 md:flex-none">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11 px-8 rounded-xl shadow-lg shadow-blue-600/20">
                            <Plus className="mr-2 h-4 w-4" />
                            New Lease
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { title: "Total Fleet", value: stats.total_cars, icon: Car, trend: `${stats.available_cars} Available`, color: "blue" },
                    { title: "Active Rentals", value: stats.active_rentals, icon: CalendarRange, trend: `${stats.returning_today} Returning Today`, color: "emerald" },
                    { title: "Maintenance", value: stats.maintenance_cars, icon: Wrench, trend: `${stats.critical_repair} Critical Repair`, color: "orange" },
                    { title: "Rev. (Weekly)", value: `$${stats.revenue_week.toLocaleString()}`, icon: DollarSign, trend: `${stats.revenue_growth >= 0 ? '+' : ''}${stats.revenue_growth.toFixed(1)}% vs LW`, color: "indigo" }
                ].map((s, idx) => (
                    <Card key={idx} className="relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 border-muted">
                        <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-[0.03] rotate-12 transition-transform group-hover:scale-110", `text-${s.color}-600`)}>
                            <s.icon size={128} />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{s.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black tracking-tighter text-foreground">{s.value}</div>
                            <div className="flex items-center mt-2">
                                <span className={cn(
                                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter",
                                    s.color === 'emerald' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                                        s.color === 'blue' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                                            s.color === 'orange' ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                                                "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"
                                )}>
                                    {s.trend}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* 30 Day Revenue Trend */}
                <Card className="lg:col-span-2 shadow-sm border-muted">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold">Revenue Dynamics</CardTitle>
                            <CardDescription>Transactional volume trend over the last 30 intervals</CardDescription>
                        </div>
                        <Activity className="text-blue-600 h-5 w-5 opacity-50" />
                    </CardHeader>
                    <CardContent className="h-[350px] pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" opacity={0.5} />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 600 }}
                                    minTickGap={30}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 600 }}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        borderColor: 'hsl(var(--border))',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Fleet Status Pie Chart */}
                <Card className="shadow-sm border-muted">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Asset Allocation</CardTitle>
                        <CardDescription>Current utilization of total inventory</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px] flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height="70%">
                            <PieChart>
                                <Pie
                                    data={fleetStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {fleetStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-1 gap-3 w-full mt-6 px-4">
                            {fleetStatusData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                                    <div className="flex items-center">
                                        <div className="w-2.5 h-2.5 rounded-full mr-3 shadow-sm" style={{ backgroundColor: item.color }} />
                                        <span className="text-muted-foreground">{item.name}</span>
                                    </div>
                                    <span className="text-foreground">{item.value} Units</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Bar Chart */}
                <Card className="shadow-sm border-muted">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Current Cycle Performance</CardTitle>
                        <CardDescription>Week-to-date revenue by interval</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" opacity={0.3} />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="#3B82F6"
                                    radius={[6, 6, 0, 0]}
                                    barSize={32}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Operations Feed */}
                <Card className="shadow-sm border-muted">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold">Operations Logs</CardTitle>
                            <CardDescription>Latest maintenance and service events</CardDescription>
                        </div>
                        <Activity className="h-5 w-5 text-orange-600 opacity-50" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-5">
                            {recentMaintenance.map((maintenance) => (
                                <div key={maintenance.id} className="flex items-center justify-between group">
                                    <div className="flex items-start space-x-4">
                                        <div className="mt-1 bg-orange-50 dark:bg-orange-900/20 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
                                            <Wrench className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold tracking-tight text-foreground">
                                                {maintenance.car.make} {maintenance.car.model}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                                {maintenance.description}
                                            </p>
                                            <div className="flex items-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70 mt-2">
                                                <Clock className="mr-1.5 h-3 w-3" />
                                                {new Date(maintenance.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <Badge className={cn(
                                        "text-[10px] h-6 font-black uppercase tracking-tighter border-none px-3",
                                        maintenance.status === 'completed' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                                    )}>
                                        {maintenance.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
