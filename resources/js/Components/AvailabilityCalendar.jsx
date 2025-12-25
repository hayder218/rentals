import React, { useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameDay,
    isWithinInterval,
    isBefore,
    startOfToday,
    addMonths,
    subMonths,
    isSameMonth
} from 'date-fns';

export function AvailabilityCalendar({ reservations = [] }) {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());
    const today = startOfToday();

    const days = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentMonth));
        const end = endOfWeek(endOfMonth(currentMonth));

        return eachDayOfInterval({ start, end });
    }, [currentMonth]);

    const isReserved = (day) => {
        return reservations.some(res => {
            const start = new Date(res.start_date);
            const end = new Date(res.end_date);
            return isWithinInterval(day, { start, end });
        });
    };

    return (
        <div className="bg-card rounded-xl border p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h3 className="font-bold text-sm tracking-tight">{format(currentMonth, 'MMMM yyyy')}</h3>
                </div>
                <div className="flex space-x-1">
                    <button
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="p-1 hover:bg-muted rounded-md transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="p-1 hover:bg-muted rounded-md transition-colors"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-[10px] font-bold text-muted-foreground text-center uppercase py-1">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {days.map((day, idx) => {
                    const reserved = isReserved(day);
                    const isOutside = !isSameMonth(day, currentMonth);
                    const isPast = isBefore(day, today) && !isSameDay(day, today);

                    return (
                        <div
                            key={idx}
                            className={cn(
                                "h-8 sm:h-10 border rounded-md flex flex-col items-center justify-center text-xs relative overflow-hidden transition-all",
                                isOutside && "opacity-30 border-transparent",
                                !reserved && !isPast && !isOutside && "bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300",
                                reserved && "bg-red-50 text-red-700 border-red-100 font-bold",
                                isPast && !reserved && "bg-muted/50 text-muted-foreground border-transparent",
                                isSameDay(day, today) && "ring-2 ring-blue-500 ring-offset-1 z-10"
                            )}
                        >
                            <span>{format(day, 'd')}</span>
                            {reserved && (
                                <div className="absolute bottom-1 w-1 h-1 bg-red-400 rounded-full" />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] border-t pt-3">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-100 border border-emerald-200 rounded-sm mr-2" />
                    <span className="text-muted-foreground uppercase font-semibold">Available</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-100 border border-red-200 rounded-sm mr-2" />
                    <span className="text-muted-foreground uppercase font-semibold">Booked</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 ring-2 ring-blue-500 rounded-sm mr-2" />
                    <span className="text-muted-foreground uppercase font-semibold">Today</span>
                </div>
            </div>
        </div>
    );
}

// Helper icons internal to avoid imports if possible, but let's just use lucide
import { ChevronLeft, ChevronRight } from 'lucide-react';
