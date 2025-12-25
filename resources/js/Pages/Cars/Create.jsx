import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        license_plate: '',
        status: 'available',
        daily_rate: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/cars');
    };

    return (
        <MainLayout>
            <Head title="Add New Car" />

            <div className="mb-8">
                <Link href="/cars" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Fleet
                </Link>
                <h2 className="text-3xl font-bold tracking-tight mt-4">Add New Car</h2>
                <p className="text-muted-foreground mt-1">Register a new vehicle in your fleet system.</p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Vehicle Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="make">Make</Label>
                                <Input
                                    id="make"
                                    placeholder="e.g. Toyota"
                                    value={data.make}
                                    onChange={e => setData('make', e.target.value)}
                                />
                                {errors.make && <p className="text-xs text-red-500">{errors.make}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="model">Model</Label>
                                <Input
                                    id="model"
                                    placeholder="e.g. Camry"
                                    value={data.model}
                                    onChange={e => setData('model', e.target.value)}
                                />
                                {errors.model && <p className="text-xs text-red-500">{errors.model}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    value={data.year}
                                    onChange={e => setData('year', e.target.value)}
                                />
                                {errors.year && <p className="text-xs text-red-500">{errors.year}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="license_plate">License Plate</Label>
                                <Input
                                    id="license_plate"
                                    placeholder="e.g. ABC-1234"
                                    value={data.license_plate}
                                    onChange={e => setData('license_plate', e.target.value)}
                                />
                                {errors.license_plate && <p className="text-xs text-red-500">{errors.license_plate}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="status">Initial Status</Label>
                                <select
                                    id="status"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="available">Available</option>
                                    <option value="rented">Rented</option>
                                    <option value="maintenance">Maintenance</option>
                                </select>
                                {errors.status && <p className="text-xs text-red-500">{errors.status}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="daily_rate">Daily Rate ($)</Label>
                                <Input
                                    id="daily_rate"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={data.daily_rate}
                                    onChange={e => setData('daily_rate', e.target.value)}
                                />
                                {errors.daily_rate && <p className="text-xs text-red-500">{errors.daily_rate}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="mr-2 h-4 w-4" />
                                Save Vehicle
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
