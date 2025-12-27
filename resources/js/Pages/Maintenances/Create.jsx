import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create({ cars, rules }) {
    const { data, setData, post, processing, errors } = useForm({
        car_id: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        cost: '',
        status: 'scheduled',
        type: 'repair',
        subtype: '',
        mileage: '',
    });

    const handleCarChange = (e) => {
        const carId = e.target.value;
        const car = cars.find(c => c.id == carId);
        setData(prev => ({
            ...prev,
            car_id: carId,
            mileage: car ? car.current_mileage : prev.mileage
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post('/maintenances');
    };

    return (
        <MainLayout>
            <Head title="Log Maintenance" />

            <div className="mb-8">
                <Link href="/maintenances" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Maintenance
                </Link>
                <div className="flex justify-between items-end mt-4">
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">
                            Record <span className="text-blue-600">Maintenance</span>
                        </h2>
                        <p className="text-muted-foreground mt-1">Log periodic services or unexpected repairs.</p>
                    </div>
                </div>
            </div>

            <Card className="max-w-3xl border-muted shadow-lg">
                <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="text-lg font-bold">Service Details</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="car_id" className="text-xs font-bold uppercase tracking-wider">Vehicle</Label>
                                <select
                                    id="car_id"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    value={data.car_id}
                                    onChange={handleCarChange}
                                >
                                    <option value="">Select a car...</option>
                                    {cars.map(car => (
                                        <option key={car.id} value={car.id}>
                                            {car.make} {car.model} ({car.license_plate}) - {car.current_mileage} km
                                        </option>
                                    ))}
                                </select>
                                {errors.car_id && <p className="text-xs text-red-500 font-medium">{errors.car_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mileage" className="text-xs font-bold uppercase tracking-wider">Odometer Reading (km)</Label>
                                <Input
                                    id="mileage"
                                    type="number"
                                    placeholder="Current mileage..."
                                    value={data.mileage}
                                    onChange={e => setData('mileage', e.target.value)}
                                    className="h-10"
                                />
                                {errors.mileage && <p className="text-xs text-red-500 font-medium">{errors.mileage}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="type" className="text-xs font-bold uppercase tracking-wider">Maintenance Type</Label>
                                <select
                                    id="type"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    value={data.type}
                                    onChange={e => setData(prev => ({ ...prev, type: e.target.value, subtype: e.target.value === 'repair' ? '' : prev.subtype }))}
                                >
                                    <option value="repair">Accident / Body Repair / General Fix</option>
                                    <option value="consumable">Periodic Consumables (Oil, Brakes, etc.)</option>
                                </select>
                                {errors.type && <p className="text-xs text-red-500 font-medium">{errors.type}</p>}
                            </div>

                            {data.type === 'consumable' && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                    <Label htmlFor="subtype" className="text-xs font-bold uppercase tracking-wider">Specific Service</Label>
                                    <select
                                        id="subtype"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        value={data.subtype}
                                        onChange={e => setData('subtype', e.target.value)}
                                    >
                                        <option value="">Select consumable...</option>
                                        {rules?.map(rule => (
                                            <option key={rule.subtype} value={rule.subtype}>{rule.label}</option>
                                        ))}
                                        <option value="other">Other Periodic Maintenance</option>
                                    </select>
                                    {errors.subtype && <p className="text-xs text-red-500 font-medium">{errors.subtype}</p>}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider">Service Task Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the specific work performed..."
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="min-h-[100px] bg-background"
                            />
                            {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={data.date}
                                    onChange={e => setData('date', e.target.value)}
                                    className="h-10"
                                />
                                {errors.date && <p className="text-xs text-red-500 font-medium">{errors.date}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cost" className="text-xs font-bold uppercase tracking-wider">Total Cost ($)</Label>
                                <Input
                                    id="cost"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={data.cost}
                                    onChange={e => setData('cost', e.target.value)}
                                    className="h-10"
                                />
                                {errors.cost && <p className="text-xs text-red-500 font-medium">{errors.cost}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-xs font-bold uppercase tracking-wider">Status</Label>
                                <select
                                    id="status"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="scheduled">Scheduled / Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                                {errors.status && <p className="text-xs text-red-500 font-medium">{errors.status}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                Record Maintenance
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
