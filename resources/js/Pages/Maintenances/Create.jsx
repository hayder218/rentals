import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create({ cars }) {
    const { data, setData, post, processing, errors } = useForm({
        car_id: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        cost: '',
        status: 'pending',
    });

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
                <h2 className="text-3xl font-bold tracking-tight mt-4">Log Maintenance</h2>
                <p className="text-muted-foreground mt-1">Record a new service or repair for a vehicle.</p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Maintenance Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="car_id">Vehicle</Label>
                            <select
                                id="car_id"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={data.car_id}
                                onChange={e => setData('car_id', e.target.value)}
                            >
                                <option value="">Select a car...</option>
                                {cars.map(car => (
                                    <option key={car.id} value={car.id}>
                                        {car.make} {car.model} ({car.license_plate})
                                    </option>
                                ))}
                            </select>
                            {errors.car_id && <p className="text-xs text-red-500">{errors.car_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Service Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the work performed or needed..."
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="min-h-[120px]"
                            />
                            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={data.date}
                                    onChange={e => setData('date', e.target.value)}
                                />
                                {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cost">Cost ($)</Label>
                                <Input
                                    id="cost"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={data.cost}
                                    onChange={e => setData('cost', e.target.value)}
                                />
                                {errors.cost && <p className="text-xs text-red-500">{errors.cost}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                                {errors.status && <p className="text-xs text-red-500">{errors.status}</p>}
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
