import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Download,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Wrench,
    BarChart3,
    Calendar,
    ArrowUpRight,
    Loader2
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    AreaChart,
    Area,
    ComposedChart,
    Line
} from 'recharts';
import { cn } from '@/lib/utils';
import axios from 'axios';

export default function Index() {
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
    });
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ chartData: [], summary: { total_revenue: 0, total_maintenance: 0, net_profit: 0 } });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/reports/data', {
                params: {
                    start_date: dateRange.start,
                    end_date: dateRange.end,
                }
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching report data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDownload = () => {
        window.open(`/reports/download?start_date=${dateRange.start}&end_date=${dateRange.end}`, '_blank');
    };

    return (
        <MainLayout>
            <Head title="Financial Reports" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground uppercase italic">
                        Financial <span className="text-blue-600">Reporting</span>
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm font-medium">Analyze revenue vs maintenance costs and fleet profitability.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-end gap-3 w-full md:w-auto">
                    <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                        <div className="space-y-1">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">From</Label>
                            <Input
                                type="date"
                                value={dateRange.start}
                                onChange={e => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                                className="h-9 text-xs"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] uppercase font-bold text-muted-foreground">To</Label>
                            <Input
                                type="date"
                                value={dateRange.end}
                                onChange={e => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                                className="h-9 text-xs"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button onClick={fetchData} disabled={loading} variant="secondary" className="h-9 text-xs font-bold px-4">
                            {loading ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : "Refresh"}
                        </Button>
                        <Button onClick={handleDownload} className="h-9 text-xs font-bold px-4 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                            <Download className="mr-2 h-3 w-3" />
                            Export PDF
                        </Button>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-muted shadow-sm overflow-hidden group">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Revenue</p>
                                <h3 className="text-2xl font-black tracking-tighter text-emerald-600 dark:text-emerald-400">
                                    ${data.summary.total_revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </h3>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-xl">
                                <DollarSign className="h-5 w-5 text-emerald-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-muted shadow-sm overflow-hidden group">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Maintenance Costs</p>
                                <h3 className="text-2xl font-black tracking-tighter text-red-600 dark:text-red-400">
                                    -${data.summary.total_maintenance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </h3>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-xl">
                                <Wrench className="h-5 w-5 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-blue-500/20 shadow-blue-500/5 shadow-lg overflow-hidden group">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Net Performance</p>
                                <h3 className={cn(
                                    "text-2xl font-black tracking-tighter",
                                    data.summary.net_profit >= 0 ? "text-blue-600 dark:text-blue-400" : "text-red-600"
                                )}>
                                    ${data.summary.net_profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </h3>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-xl">
                                <TrendingUp className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Comparison Chart */}
            <div className="grid grid-cols-1 gap-6">
                <Card className="border-muted shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-8">
                        <div>
                            <CardTitle className="text-lg font-bold">Performance Comparison</CardTitle>
                            <CardDescription>Visualizing revenue inflow vs service expenditure over time</CardDescription>
                        </div>
                        <BarChart3 className="h-5 w-5 text-blue-600 opacity-50" />
                    </CardHeader>
                    <CardContent className="h-[450px]">
                        {loading ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={data.chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" opacity={0.3} />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                                            backgroundColor: 'hsl(var(--card))',
                                            padding: '12px'
                                        }}
                                    />
                                    <Legend
                                        verticalAlign="top"
                                        align="right"
                                        iconType="circle"
                                        wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: 600 }}
                                    />
                                    <Bar
                                        dataKey="revenue"
                                        name="Revenue"
                                        fill="#3b82f6"
                                        radius={[4, 4, 0, 0]}
                                        barSize={20}
                                    />
                                    <Bar
                                        dataKey="maintenance"
                                        name="Maintenance"
                                        fill="#ef4444"
                                        radius={[4, 4, 0, 0]}
                                        barSize={20}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        dot={false}
                                        name="Revenue Trend"
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Performance Insights */}
            <div className="mt-8">
                <Card className="bg-muted/30 border-dashed">
                    <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-blue-600 p-2 rounded-lg mt-1">
                                <ArrowUpRight className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-foreground">Operational Intelligence</h4>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    The data above aggregates all <span className="text-emerald-600 font-bold">completed rentals</span> and <span className="text-red-600 font-bold">logged maintenance</span> within the selected window.
                                    Use these metrics to identify patterns in vehicle wear-and-tear vs profitability. If maintenance costs frequently spike on specific dates, review the "Operations Log" in the Dashboard for vehicle-specific correlations.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
