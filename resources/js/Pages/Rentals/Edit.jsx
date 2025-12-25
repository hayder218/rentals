import React, { useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { AvailabilityCalendar } from '@/Components/AvailabilityCalendar';
import { ArrowLeft, Save, Info, Calculator, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Edit({ rental, cars }) {
    const { data, setData, put, processing, errors } = useForm({
        car_id: rental.car_id,
        customer_name: rental.customer_name,
        customer_identification: rental.customer_identification,
        start_date: rental.start_date,
        end_date: rental.end_date,
        prepaid_amount: rental.prepaid_amount,
        status: rental.status,
    });

    const selectedCar = useMemo(() => cars.find(c => c.id == data.car_id), [data.car_id, cars]);

    const estimatedTotal = useMemo(() => {
        if (!data.start_date || !data.end_date || !selectedCar) return 0;
        const start = new Date(data.start_date);
        const end = new Date(data.end_date);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays * parseFloat(selectedCar.daily_rate);
    }, [data.start_date, data.end_date, selectedCar]);

    const submit = (e) => {
        e.preventDefault();
        put(`/rentals/${rental.id}`, {
            onSuccess: () => toast.success("Contract updated successfully!"),
            onError: () => toast.error("Update failed. Please check the errors."),
        });
    };

    return (
        <MainLayout>
            <Head title="Edit Rental" />

            <div className="mb-8 flex justify-between items-start">
                <div>
                    <Link href="/rentals" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Rentals
                    </Link>
                    <h2 className="text-3xl font-black tracking-tight mt-4 text-foreground">
                        Modify <span className="text-blue-600">Contract</span>
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">Update lease terms for <span className="text-foreground font-bold">{rental.customer_name}</span>.</p>
                </div>
                <div className="flex flex-col items-end">
                    <Badge className={cn(
                        "text-xs px-3 py-1 rounded-full",
                        data.status === 'active' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                            data.status === 'completed' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    )}>
                        {data.status.toUpperCase()}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="shadow-sm border-muted">
                        <CardHeader>
                            <CardTitle>Agreement Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="customer_name">Customer Full Name</Label>
                                        <Input
                                            id="customer_name"
                                            value={data.customer_name}
                                            onChange={e => setData('customer_name', e.target.value)}
                                            className="h-11"
                                        />
                                        {errors.customer_name && <p className="text-xs text-red-500 font-medium">{errors.customer_name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="customer_identification">ID / Driving License</Label>
                                        <Input
                                            id="customer_identification"
                                            value={data.customer_identification}
                                            onChange={e => setData('customer_identification', e.target.value)}
                                            className="h-11"
                                        />
                                        {errors.customer_identification && <p className="text-xs text-red-500 font-medium">{errors.customer_identification}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Contract Status</Label>
                                    <select
                                        id="status"
                                        className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                    >
                                        <option value="active">Active</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    {errors.status && <p className="text-xs text-red-500 font-medium">{errors.status}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="start_date">Start Date</Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={e => setData('start_date', e.target.value)}
                                            className="h-11"
                                        />
                                        {errors.start_date && <p className="text-xs text-red-500 font-medium">{errors.start_date}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="end_date">End Date</Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={e => setData('end_date', e.target.value)}
                                            className="h-11"
                                        />
                                        {errors.end_date && <p className="text-xs text-red-500 font-medium">{errors.end_date}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="prepaid_amount">Prepaid Amount ($)</Label>
                                    <Input
                                        id="prepaid_amount"
                                        type="number"
                                        value={data.prepaid_amount}
                                        onChange={e => setData('prepaid_amount', e.target.value)}
                                        className="h-11"
                                    />
                                    {errors.prepaid_amount && <p className="text-xs text-red-500 font-medium">{errors.prepaid_amount}</p>}
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700 h-11 px-8 rounded-xl shadow-lg shadow-blue-600/20">
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="shadow-sm border-muted overflow-hidden">
                        <CardHeader className="bg-muted/30 pb-4">
                            <CardTitle className="text-sm font-bold flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                                Payment Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Original Total:</span>
                                    <span className="font-medium line-through decoration-muted-foreground opacity-50">${parseFloat(rental.total_cost).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm border-t pt-3">
                                    <span className="text-muted-foreground font-semibold">Updated Estimate:</span>
                                    <span className="font-black text-lg text-foreground">${estimatedTotal.toFixed(2)}</span>
                                </div>
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 flex items-start space-x-2 mt-4">
                                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                                    <p className="text-[10px] text-blue-700 dark:text-blue-300 leading-relaxed font-medium">
                                        Changes to dates will affect the total revenue calculation. Ensure the customer is informed of price changes.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Schedule Context</Label>
                        <AvailabilityCalendar reservations={selectedCar?.active_rentals || []} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
