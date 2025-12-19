<div>
    <!-- Header -->
    <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Todays Statistics</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ now()->format('D, d M, Y, h.i A') }}</p>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left Column (Stats Cards) -->
        <div class="lg:col-span-3 space-y-6">
            <!-- Income Card -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-gray-600 dark:text-gray-400 font-medium">Income</h3>
                    <span class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">Today</span>
                </div>
                <div class="flex items-end justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">${{ number_format($revenue_growth * 1000, 2) }}</h2> <!-- Mocking today's income relative to growth -->
                        <p class="text-xs text-gray-500 mt-1">Compared to Yesterday</p>
                    </div>
                    <div class="flex items-center text-red-500 text-sm font-bold">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        1.5%
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm">
                    <span class="text-gray-500">Last week Income</span>
                    <span class="font-semibold text-gray-700 dark:text-gray-300">${{ number_format($revenue_week) }}</span>
                </div>
            </div>

            <!-- Expenses Card -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                 <div class="flex justify-between items-center mb-4">
                    <h3 class="text-gray-600 dark:text-gray-400 font-medium">Expenses</h3>
                    <span class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">Today</span>
                </div>
                <div class="flex items-end justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">$5,660.00</h2> <!-- Mock Data -->
                        <p class="text-xs text-gray-500 mt-1">Compared to Yesterday</p>
                    </div>
                    <div class="flex items-center text-green-500 text-sm font-bold">
                         <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                        2.5%
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm">
                    <span class="text-gray-500">Last week expenses</span>
                    <span class="font-semibold text-gray-700 dark:text-gray-300">$22,658.00</span>
                </div>
            </div>

            <!-- Hire vs Cancel (Gauge Chart) -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
                 <div class="flex justify-between items-center mb-4">
                    <h3 class="text-gray-600 dark:text-gray-400 font-medium">Hire vs Cancel</h3>
                    <span class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">Today</span>
                </div>
                <div class="relative h-40">
                    <canvas id="hireVsCancelChart"></canvas>
                     <div class="absolute inset-x-0 bottom-0 flex justify-center">
                        <div class="text-center">
                             <span class="block text-2xl font-bold text-gray-900 dark:text-white">54%</span>
                             <span class="text-xs text-gray-500">Total Hired</span>
                        </div>
                     </div>
                </div>
                 <div class="flex justify-between mt-4 text-xs">
                     <div class="flex items-center">
                         <span class="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                         <span class="text-gray-500">Hired</span>
                     </div>
                      <div class="flex items-center">
                         <span class="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                         <span class="text-gray-500">Canceled</span>
                     </div>
                      <div class="flex items-center">
                         <span class="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                         <span class="text-gray-500">Pending</span>
                     </div>
                 </div>
            </div>
        </div>

        <!-- Right Column (Content) -->
        <div class="lg:col-span-9 space-y-6">
            
            <!-- Car Availability Filter Block -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Car Availability</h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                        </div>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Car Number">
                         <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    <div class="relative">
                         <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Nov 20, 2022">
                    </div>
                     <div class="relative">
                         <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="10 AM">
                         <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    <button class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                        Check
                    </button>
                </div>
            </div>

            <!-- Live Car Status -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">Live Car Status</h3>
                    <button class="flex items-center text-gray-500 hover:text-gray-700">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                        Filter
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-transparent dark:text-gray-400 border-b dark:border-gray-700">
                            <tr>
                                <th scope="col" class="px-4 py-3">No.</th>
                                <th scope="col" class="px-4 py-3">Car no.</th>
                                <th scope="col" class="px-4 py-3">Driver</th>
                                <th scope="col" class="px-4 py-3">Status</th>
                                <th scope="col" class="px-4 py-3">Earning</th>
                                <th scope="col" class="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($rentals->take(5) as $index => $rental)
                                <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-b dark:border-gray-700">
                                    <td class="px-4 py-4 font-medium text-gray-900 dark:text-white">{{ sprintf('%02d', $index + 1) }}</td>
                                    <td class="px-4 py-4 font-medium text-gray-900 dark:text-white">{{ $rental->car->license_plate }}</td>
                                    <td class="px-4 py-4">
                                        <div class="flex items-center">
                                            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                                                <img src="https://ui-avatars.com/api/?name={{ $rental->customer_name }}&background=random" alt="{{ $rental->customer_name }}">
                                            </div>
                                            <span class="font-medium text-gray-900 dark:text-white">{{ $rental->customer_name }}</span>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4">
                                         @php
                                            $statusColor = 'bg-gray-500';
                                            $statusText = 'Available';
                                            if($rental->status == 'active') { $statusColor = 'bg-green-500'; $statusText = 'Completed'; } // Mapping active to 'Completed' style for visual matching or 'In Route'
                                            if($rental->status == 'pending') { $statusColor = 'bg-blue-500'; $statusText = 'Pending'; }
                                            if($rental->status == 'completed') { $statusColor = 'bg-green-500'; $statusText = 'Completed'; }
                                         @endphp
                                         <div class="flex items-center">
                                            <span class="w-2.5 h-2.5 rounded-full {{ $statusColor }} mr-2"></span>
                                            {{ $statusText }}
                                         </div>
                                    </td>
                                    <td class="px-4 py-4 text-gray-900 dark:text-white">${{ number_format($rental->total_cost, 2) }}</td>
                                    <td class="px-4 py-4 text-right">
                                        <button class="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 text-xs">Details</button>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="6" class="px-4 py-4 text-center">No active rentals found.</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Earning Summary (Chart) -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white">Earning Summary</h3>
                     <div class="flex items-center space-x-4">
                         <select class="bg-transparent border-none text-sm text-gray-500 focus:ring-0">
                             <option>Mar 2022 - Oct 2022</option>
                         </select>
                         <div class="flex items-center space-x-2 text-xs">
                             <span class="w-2 h-2 rounded-full bg-blue-600"></span> <span class="text-gray-500">Last 6 months</span>
                             <span class="w-2 h-2 rounded-full bg-gray-300"></span> <span class="text-gray-500">Same period last year</span>
                         </div>
                     </div>
                </div>
                <div class="h-64">
                    <canvas id="earningSummaryChart"></canvas>
                </div>
            </div>

        </div>
    </div>

    <!-- Chart Setup -->
    <script>
        document.addEventListener('livewire:initialized', () => {
             const initDashboardCharts = () => {
                 // Hire vs Cancel / Fleet Status - Gauge/Doughnut
                 const gaugeCtx = document.getElementById('hireVsCancelChart');
                 if(gaugeCtx) {
                      if (Chart.getChart("hireVsCancelChart")) Chart.getChart("hireVsCancelChart").destroy();
                      new Chart(gaugeCtx, {
                        type: 'doughnut',
                        data: {
                            labels: ['Hired', 'Canceled', 'Pending'],
                            datasets: [{
                                data: [54, 20, 26], // Mock data as per visual
                                backgroundColor: ['#3B82F6', '#10B981', '#EF4444'],
                                borderWidth: 0,
                                cutout: '80%',
                                circumference: 180,
                                rotation: 270,
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: { enabled: false }
                            }
                        }
                    });
                 }

                 // Earning Summary - Line/Area Chart
                 const earningCtx = document.getElementById('earningSummaryChart');
                 if(earningCtx) {
                     if (Chart.getChart("earningSummaryChart")) Chart.getChart("earningSummaryChart").destroy();
                     
                     // Mock data for the curve
                     const labels = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
                     const dataCurrent = [12000, 19000, 15000, 22000, 28000, 24000];
                     const dataLast = [10000, 15000, 13000, 18000, 22000, 20000];

                     new Chart(earningCtx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Last 6 months',
                                    data: dataCurrent,
                                    borderColor: '#3B82F6',
                                    backgroundColor: (context) => {
                                        const ctx = context.chart.ctx;
                                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                                        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
                                        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
                                        return gradient;
                                    },
                                    borderWidth: 3,
                                    tension: 0.4,
                                    fill: true,
                                    pointRadius: 0
                                },
                                {
                                    label: 'Same period last year',
                                    data: dataLast,
                                    borderColor: '#D1D5DB', // gray-300
                                    borderWidth: 2,
                                    borderDash: [5, 5],
                                    tension: 0.4,
                                    pointRadius: 0
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            interaction: {
                                intersect: false,
                                mode: 'index',
                            },
                             scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: { borderDash: [2, 2], drawBorder: false, color: '#F3F4F6' },
                                    ticks: { display: false } 
                                },
                                x: {
                                    grid: { display: false },
                                    ticks: { color: '#9CA3AF' }
                                }
                            },
                            plugins: {
                                legend: { display: false }
                            }
                        }
                     });
                 }
             };

             initDashboardCharts();
        });
    </script>
</div>