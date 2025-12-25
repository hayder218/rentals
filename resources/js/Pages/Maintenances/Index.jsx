import React, { useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';
import { DataTable } from '@/Components/DataTable';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import {
    Plus,
    Wrench,
    Trash2,
    Calendar,
    Car as CarIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Index({ maintenances }) {
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
            accessorKey: "description",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Service Details" />,
            cell: ({ row }) => (
                <div className="flex items-start space-x-3">
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg mt-0.5">
                        <Wrench className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="max-w-[400px]">
                        <div className="font-medium text-sm">{row.getValue("description")}</div>
                    </div>
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
                        <CarIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{car.make} {car.model}</span>
                    </div>
                )
            }
        },
        {
            accessorKey: "date",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Log Date" />,
            cell: ({ row }) => (
                <div className="flex items-center text-xs text-muted-foreground">
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
                    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                };
                return <Badge className={cn("capitalize border-none shadow-none", variants[status])}>{status}</Badge>;
            }
        },
        {
            accessorKey: "cost",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Service Cost" />,
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

    return (
        <MainLayout>
            <Head title="Maintenance" />

            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-black tracking-tight flex items-center">
                        Vehicle <span className="text-orange-600 ml-2">Maintenance</span>
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">Monitor repairs and preventative service logs.</p>
                </div>
                <Link href="/maintenances/create">
                    <Button className="bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/20 h-11 px-6 rounded-xl text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Log New Service
                    </Button>
                </Link>
            </div>

            <DataTable
                data={maintenances}
                columns={columns}
                searchPlaceholder="Search descriptions, cars..."
            />
        </MainLayout>
    );
}
