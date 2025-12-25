import React, { useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';
import { DataTable } from '@/Components/DataTable';
import { DataTableColumnHeader } from '@/Components/DataTableColumnHeader';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import {
    Plus,
    FileText,
    Edit2,
    Trash2,
    User,
    Calendar,
    Car as CarIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Index({ rentals }) {
    const handleDelete = (id) => {
        toast.confirm("Delete Rental Record?", {
            description: "Are you sure? This will remove the historical record of this rental.",
            action: {
                label: "Delete",
                onClick: () => {
                    router.delete(`/rentals/${id}`, {
                        onSuccess: () => toast.success("Rental deleted successfully"),
                    });
                }
            },
        });
    };

    const columns = useMemo(() => [
        {
            accessorKey: "customer_name",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-full">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="font-semibold">{row.getValue("customer_name")}</div>
                </div>
            ),
        },
        {
            accessorKey: "car.make",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Car" />,
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
            accessorKey: "start_date",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Period" />,
            cell: ({ row }) => {
                const start = new Date(row.original.start_date).toLocaleDateString();
                const end = new Date(row.original.end_date).toLocaleDateString();
                return (
                    <div className="flex flex-col text-xs text-muted-foreground">
                        <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {start} - {end}
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "status",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status = row.getValue("status");
                const variants = {
                    active: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                };
                return <Badge className={cn("capitalize border-none shadow-none", variants[status])}>{status}</Badge>;
            },
        },
        {
            accessorKey: "total_cost",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Revenue" />,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("total_cost"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount)
                return <div className="font-black text-foreground">{formatted}</div>
            }
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const rental = row.original
                return (
                    <div className="flex justify-end space-x-2">
                        <a href={`/rentals/${rental.id}/contract`} target="_blank">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                                <FileText className="h-4 w-4" />
                            </Button>
                        </a>
                        <Link href={`/rentals/${rental.id}/edit`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                <Edit2 className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => handleDelete(rental.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )
            }
        }
    ], [])

    return (
        <MainLayout>
            <Head title="Rentals" />

            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-black tracking-tight flex items-center text-foreground">
                        Rental <span className="text-blue-600 ml-2">Contracts</span>
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">Manage active leases and client records.</p>
                </div>
                <Link href="/rentals/create">
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 h-11 px-6 rounded-xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Lease
                    </Button>
                </Link>
            </div>

            <DataTable
                data={rentals}
                columns={columns}
                searchPlaceholder="Search customers, cars..."
                exportHref="/reports/rentals"
            />
        </MainLayout>
    );
}
