import React, { useMemo, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { AvailabilityCalendar } from '@/Components/AvailabilityCalendar';
import { ArrowLeft, Save, Info, Calculator } from 'lucide-react';
import { toast } from 'sonner';

export default function Create({ cars }) {
    const { data, setData, post, processing, errors } = useForm({
        car_id: '',
        customer_name: '',
        customer_identification: '',
        start_date: '',
        end_date: '',
        prepaid_amount: 0,
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
        post('/rentals', {
            onSuccess: () => toast.success("Rental contract created successfully!"),
            onError: () => toast.error("Please correct the errors in the form."),
        });
    };

    return (
        <MainLayout>
            <Head title="Create Rental" />

            <div className="mb-8">
                <Link href="/rentals" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Rentals
                </Link>
                <h2 className="text-3xl font-black tracking-tight mt-4 text-foreground">
                    New <span className="text-blue-600">Lease Agreement</span>
                </h2>
                <p className="text-muted-foreground mt-1">Initialize a new vehicle rental contract.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="shadow-sm border-muted">
                        <CardHeader>
                            <CardTitle>Client & Vehicle Information</CardTitle>
                            <CardDescription>Enter the customer details and select an available vehicle.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="customer_name">Customer Full Name</Label>
                                        <Input
                                            id="customer_name"
                                            placeholder="John Doe"
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
                                            placeholder="License number..."
                                            value={data.customer_identification}
                                            onChange={e => setData('customer_identification', e.target.value)}
                                            className="h-11"
                                        />
                                        {errors.customer_identification && <p className="text-xs text-red-500 font-medium">{errors.customer_identification}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="car_id">Select Vehicle</Label>
                                    <select
                                        id="car_id"
                                        className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                        value={data.car_id}
                                        onChange={e => setData('car_id', e.target.value)}
                                    >
                                        <option value="">Choose a car...</option>
                                        {cars.map(car => (
                                            <option key={car.id} value={car.id}>
                                                {car.make} {car.model} ({car.license_plate}) - ${car.daily_rate}/day
                                            </option>
                                        ))}
                                    </select>
                                    {errors.car_id && <p className="text-xs text-red-500 font-medium">{errors.car_id}</p>}
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
                                        placeholder="0.00"
                                        value={data.prepaid_amount}
                                        onChange={e => setData('prepaid_amount', e.target.value)}
                                        className="h-11"
                                    />
                                    {errors.prepaid_amount && <p className="text-xs text-red-500 font-medium">{errors.prepaid_amount}</p>}
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700 h-11 px-8 rounded-xl shadow-lg shadow-blue-600/20">
                                        <Save className="mr-2 h-4 w-4" />
                                        Initialize Contract
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
                                <Calculator className="h-4 w-4 mr-2 text-blue-600" />
                                Payment Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Daily Rate:</span>
                                    <span className="font-semibold">{selectedCar ? `$${selectedCar.daily_rate}` : '$0.00'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Estimated Total:</span>
                                    <span className="font-bold text-lg text-foreground">${estimatedTotal.toFixed(2)}</span>
                                </div>
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 flex items-start space-x-2">
                                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                                    <p className="text-[10px] text-blue-700 dark:text-blue-300 leading-relaxed font-medium">
                                        Total is calculated based on days between start and end dates. Additional fees may apply.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Vehicle Availability</Label>
                        <AvailabilityCalendar reservations={selectedCar?.active_rentals || []} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
