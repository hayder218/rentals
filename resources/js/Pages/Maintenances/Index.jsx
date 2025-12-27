import React, { useMemo, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';
import { DataTable } from '@/Components/DataTable';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import {
    Plus,
    Wrench,
    Trash2,
    Calendar,
    Car as CarIcon,
    AlertTriangle,
    CheckCircle2,
    Clock,
    History,
    CalendarDays,
    Milestone,
    ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Index({ maintenances, cars }) {
    const [activeTab, setActiveTab] = useState('history');

    const handleDelete = (id) => {
        toast.confirm("Delete Record?", {
            description: "Are you sure you want to delete this maintenance record?",
            action: {
                label: "Delete",
                onClick: () => {
                    router.delete(`/maintenances/${id}`, {
                        onSuccess: () => toast.success("Record deleted"),
                    });
                }
            }
        });
    };

    const columns = useMemo(() => [
        {
            accessorKey: "type",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
            cell: ({ row }) => {
                const type = row.getValue("type");
                const subtype = row.original.subtype;
                return (
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest mb-1",
                            type === 'consumable' ? "text-blue-600" : "text-amber-600"
                        )}>
                            {type}
                        </span>
                        <span className="text-sm font-bold flex items-center">
                            {type === 'consumable' ? <Clock className="mr-1.5 h-3 w-3" /> : <ShieldAlert className="mr-1.5 h-3 w-3" />}
                            {subtype || "General Repair"}
                        </span>
                    </div>
                );
            }
        },
        {
            accessorKey: "description",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Service Details" />,
            cell: ({ row }) => (
                <div className="max-w-[300px]">
                    <div className="text-sm text-muted-foreground line-clamp-2">{row.getValue("description")}</div>
                    {row.original.mileage && (
                        <div className="flex items-center text-[10px] font-bold text-muted-foreground mt-1 uppercase">
                            <Milestone className="h-2.5 w-2.5 mr-1" />
                            At {row.original.mileage.toLocaleString()} km
                        </div>
                    )}
                </div>
            )
        },
        {
            accessorKey: "car.make",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Vehicle" />,
            cell: ({ row }) => {
                const car = row.original.car;
                return (
                    <div className="flex items-center space-x-2">
                        <div className="bg-muted p-1.5 rounded-md">
                            <CarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-bold">{car.make} {car.model}</span>
                    </div>
                )
            }
        },
        {
            accessorKey: "date",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
            cell: ({ row }) => (
                <div className="flex items-center text-xs font-medium text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 mr-2" />
                    {new Date(row.getValue("date")).toLocaleDateString()}
                </div>
            )
        },
        {
            accessorKey: "status",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status = row.getValue("status");
                const variants = {
                    scheduled: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400 capitalize",
                    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 capitalize",
                };
                return <Badge variant="outline" className={cn("font-bold text-[10px] tracking-tight", variants[status])}>{status}</Badge>;
            }
        },
        {
            accessorKey: "cost",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Cost" />,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("cost"))
                return <div className="font-bold text-red-600 dark:text-red-400">-${amount.toLocaleString()}</div>
            }
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => handleDelete(row.original.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ], [])

    // Aggregate all due/overdue items from all cars
    const schedules = useMemo(() => {
        const list = [];
        cars.forEach(car => {
            car.maintenance_status.forEach(status => {
                if (status.status !== 'ok') {
                    list.push({
                        ...status,
                        car: {
                            id: car.id,
                            name: `${car.make} ${car.model}`,
                            plate: car.license_plate,
                            mileage: car.current_mileage
                        }
                    });
                }
            });
        });
        return list.sort((a, b) => b.status === 'overdue' ? 1 : -1);
    }, [cars]);

    return (
        <MainLayout>
            <Head title="Vehicle Maintenance" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">
                        Service <span className="text-orange-600">& Repairs</span>
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm font-medium">Manage consumable schedules and accident history.</p>
                </div>
                <Link href="/maintenances/create">
                    <Button className="bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-600/20 h-11 px-8 rounded-xl text-white font-bold tracking-tight">
                        <Plus className="mr-2 h-4 w-4" />
                        Log New Service
                    </Button>
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 p-1 bg-muted/30 rounded-xl mb-8 w-fit border border-muted">
                <button
                    onClick={() => setActiveTab('history')}
                    className={cn(
                        "flex items-center space-x-2 px-6 py-2 rounded-lg text-sm font-bold transition-all",
                        activeTab === 'history' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50"
                    )}
                >
                    <History className="h-4 w-4" />
                    <span>Service History</span>
                </button>
                <button
                    onClick={() => setActiveTab('schedules')}
                    className={cn(
                        "flex items-center space-x-2 px-6 py-2 rounded-lg text-sm font-bold transition-all relative",
                        activeTab === 'schedules' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50"
                    )}
                >
                    <CalendarDays className="h-4 w-4" />
                    <span>Service Schedules</span>
                    {schedules.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                            {schedules.length}
                        </span>
                    )}
                </button>
            </div>

            {activeTab === 'history' ? (
                <div className="animate-in fade-in duration-500">
                    <DataTable
                        data={maintenances}
                        columns={columns}
                        searchPlaceholder="Search services, vehicles..."
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {schedules.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 bg-muted/20 border-2 border-dashed rounded-3xl">
                            <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-4 opacity-50" />
                            <h3 className="text-xl font-bold uppercase tracking-tight">All clear</h3>
                            <p className="text-muted-foreground text-sm">All vehicles are up to date with their maintenance.</p>
                        </div>
                    ) : (
                        schedules.map((task, idx) => (
                            <Card key={idx} className={cn(
                                "border-none shadow-lg overflow-hidden relative group",
                                task.status === 'overdue' ? "bg-red-50 dark:bg-red-950/20" : "bg-orange-50 dark:bg-orange-950/20"
                            )}>
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start">
                                        <div className={cn(
                                            "p-2 rounded-xl",
                                            task.status === 'overdue' ? "bg-red-600" : "bg-orange-500"
                                        )}>
                                            <Wrench className="h-5 w-5 text-white" />
                                        </div>
                                        <Badge className={cn(
                                            "border-none shadow-none font-black text-[10px] uppercase tracking-widest",
                                            task.status === 'overdue' ? "bg-red-200 text-red-700" : "bg-orange-200 text-orange-700"
                                        )}>
                                            {task.status}
                                        </Badge>
                                    </div>
                                    <CardTitle className="mt-4 text-xl font-black uppercase tracking-tighter">
                                        {task.label}
                                    </CardTitle>
                                    <CardDescription className="font-bold flex items-center">
                                        <CarIcon className="h-3 w-3 mr-1.5" />
                                        {task.car.name} ({task.car.plate})
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-background/50 p-3 rounded-xl border border-muted/50">
                                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Current</p>
                                                <p className="text-sm font-bold">{task.car.mileage.toLocaleString()} km</p>
                                            </div>
                                            <div className="bg-background/50 p-3 rounded-xl border border-muted/50">
                                                <p className="text-[9px] font-black uppercase text-muted-foreground mb-1">Due At</p>
                                                <p className="text-sm font-bold">{task.next_due_mileage.toLocaleString()} km</p>
                                            </div>
                                        </div>

                                        <div className="bg-background p-4 rounded-xl shadow-inner border border-muted/50 flex items-center">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full mr-3 shrink-0",
                                                task.status === 'overdue' ? "bg-red-600 animate-ping" : "bg-orange-500"
                                            )} />
                                            <p className="text-xs font-bold leading-tight">
                                                {task.remaining_mileage <= 0
                                                    ? `${Math.abs(task.remaining_mileage).toLocaleString()} km overdue`
                                                    : `${task.remaining_mileage.toLocaleString()} km remaining`
                                                }
                                            </p>
                                        </div>

                                        <Link href="/maintenances/create" className="w-full">
                                            <Button className="w-full font-bold uppercase text-[10px] tracking-widest" variant="secondary">
                                                Schedule Now
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </MainLayout>
    );
}
