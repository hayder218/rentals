import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Home, AlertCircle, RotateCcw } from 'lucide-react';

export default function Error({ status }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status] || 'Error';

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status] || 'An unexpected error occurred.';

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
            <Head title={title} />

            <div className="w-full max-w-md text-center space-y-8">
                <div className="flex justify-center">
                    <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-3xl animate-pulse">
                        <AlertCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
                        {status}
                    </h1>
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
                        {title.split(': ')[1]}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-xl font-bold gap-2">
                            <Home className="w-4 h-4" />
                            Return Home
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                        className="w-full sm:w-auto h-12 px-8 rounded-xl font-medium gap-2 border-zinc-200 dark:border-zinc-800"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                    </Button>
                </div>

                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                    FleetWise Engineering
                </div>
            </div>
        </div>
    );
}
