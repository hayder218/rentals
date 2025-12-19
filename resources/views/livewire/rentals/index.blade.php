<div>
    <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
            <div class="mb-4">
                <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Rentals</h1>
            </div>
            <div class="sm:flex">
                <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
                    <a href="{{ route('rentals.create') }}" class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        New Rental
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col">
        <div class="overflow-x-auto">
            <div class="inline-block min-w-full align-middle">
                <div class="overflow-hidden shadow">
                    <table id="rentals-table" class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead class="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Customer
                                </th>
                                <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Car
                                </th>
                                <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Dates
                                </th>
                                <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Total Cost
                                </th>
                                <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Status
                                </th>
                                <th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                            @foreach($rentals as $rental)
                                <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        <div class="text-base font-semibold text-gray-900 dark:text-white">{{ $rental->customer_name }}</div>
                                    </td>
                                    <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ $rental->car->make }} {{ $rental->car->model }} <span class="text-gray-500 dark:text-gray-400">({{ $rental->car->license_plate }})</span>
                                    </td>
                                    <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ $rental->start_date->format('M d, Y') }} - {{ $rental->end_date->format('M d, Y') }}
                                    </td>
                                    <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        ${{ number_format($rental->total_cost, 2) }}
                                    </td>
                                    <td class="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                         <span class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium
                                            @if($rental->status === 'active') bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300
                                            @elseif($rental->status === 'completed') bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300
                                            @else bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 @endif">
                                            {{ ucfirst($rental->status) }}
                                        </span>
                                    </td>
                                    <td class="p-4 space-x-2 whitespace-nowrap">
                                        <a href="{{ route('rentals.edit', $rental) }}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 9.414 2.586 5a2 2 0 00-2.828 2.828l9 9a2 2 0 002.828 0l11-11a2 2 0 000-2.828z"></path></svg>
                                            Manage
                                        </a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        const initTable = () => {
            const table = document.getElementById("rentals-table");
            if (table && typeof window.DataTable !== 'undefined') {
                 if (table.dataTable) {
                    table.dataTable.destroy();
                }
                const dataTable = new window.DataTable("#rentals-table", {
                    searchable: true,
                    sortable: true,
                    perPage: 10
                });
                dataTable.addExportButton('rentals-export.csv');
                table.dataTable = dataTable;
            }
        };

        document.addEventListener('livewire:navigated', initTable);
        document.addEventListener('DOMContentLoaded', initTable);
    </script>
</div>