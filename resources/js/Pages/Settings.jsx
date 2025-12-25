import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Save, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Settings({ contractTerms }) {
    const { flash } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        contract_terms: contractTerms || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put('/settings');
    };

    return (
        <MainLayout>
            <Head title="System Settings" />

            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
                <p className="text-muted-foreground mt-1">Configure global application parameters and contract templates.</p>
            </div>

            {flash?.status && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center text-emerald-700 animate-in fade-in slide-in-from-top-4">
                    <CheckCircle2 className="h-5 w-5 mr-3" />
                    {flash.status}
                </div>
            )}

            <div className="max-w-3xl">
                <form onSubmit={submit} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <CardTitle>Contract Template</CardTitle>
                                    <CardDescription>These terms will be automatically included in all generated rental contracts.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="contract_terms">Standard Terms & Conditions</Label>
                                <Textarea
                                    id="contract_terms"
                                    placeholder="Enter the default terms and conditions..."
                                    value={data.contract_terms}
                                    onChange={e => setData('contract_terms', e.target.value)}
                                    className="min-h-[400px] font-serif leading-relaxed text-zinc-700"
                                />
                                {errors.contract_terms && <p className="text-xs text-red-500">{errors.contract_terms}</p>}
                            </div>

                            <div className="flex justify-end border-t pt-6">
                                <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </MainLayout>
    );
}
