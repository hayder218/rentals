import React, { useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';
import { DataTable } from '@/Components/DataTable';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import {
    Plus,
    Edit2,
    Trash2,
    Car as CarIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Index({ cars }) {
    console.log('Cars Index rendering, cars:', cars);
    const handleDelete = (id) => {
        toast.confirm("Delete Car?", {
            description: "Are you sure you want to remove this vehicle from the fleet? This action cannot be undone.",
            action: {
                label: "Delete",
                onClick: () => {
                    router.delete(`/cars/${id}`, {
                        onSuccess: () => toast.success("Car deleted successfully"),
                    });
                }
            },
            cancel: {
                label: "Cancel",
            }
        });
    };

    const columns = useMemo(() => [
        {
            accessorKey: "make",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Make & Model" />
            ),
            cell: ({ row }) => {
                const car = row.original;
                return (
                    <div className="flex items-center space-x-3">
                        <div className="bg-muted p-2 rounded-lg group-hover:bg-background transition-colors">
                            <CarIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                            <div className="text-foreground font-medium">{car.make}</div>
                            <div className="text-xs text-muted-foreground">{car.model}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "year",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Year" />
            ),
        },
        {
            accessorKey: "license_plate",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="License Plate" />
            ),
            cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("license_plate")}</span>
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = row.getValue("status");
                const variants = {
                    available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                    rented: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                    maintenance: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                };
                return (
                    <Badge className={cn("capitalize border-none shadow-none font-medium", variants[status])}>
                        {status}
                    </Badge>
                );
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            accessorKey: "daily_rate",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Daily Rate" />
            ),
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("daily_rate"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount)
                return <div className="font-semibold text-blue-600 dark:text-blue-400">{formatted}</div>
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const car = row.original
                return (
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/cars/${car.id}/edit`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                <Edit2 className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => handleDelete(car.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )
            },
        },
    ], [])

    return (
        <MainLayout>
            <Head title="Fleet Inventory" />

            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-black tracking-tight flex items-center">
                        Fleet <span className="text-blue-600 ml-2">Inventory</span>
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">Real-time overview of your vehicle collection.</p>
                </div>
                <Link href="/cars/create">
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 h-11 px-6 rounded-xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Vehicle
                    </Button>
                </Link>
            </div>

            <DataTable
                data={cars}
                columns={columns}
                searchPlaceholder="Search by make, model, plate..."
            />
        </MainLayout>
    );
}
