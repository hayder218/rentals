<div class="max-w-2xl mx-auto">
    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">New Rental</h2>

        <form wire:submit="save">
            <div class="mb-4">
                <label for="car_id" class="block text-gray-700 text-sm font-bold mb-2">Select Car</label>
                <select id="car_id" wire:model.live="car_id"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select a car</option>
                    @foreach($cars as $car)
                        <option value="{{ $car->id }}">{{ $car->make }} {{ $car->model }} - ${{ $car->daily_rate }}/day
                        </option>
                    @endforeach
                </select>
                @error('car_id') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label for="customer_name" class="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
                    <input type="text" id="customer_name" wire:model="customer_name"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    @error('customer_name') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label for="customer_identification" class="block text-gray-700 text-sm font-bold mb-2">ID Card / License No.</label>
                    <input type="text" id="customer_identification" wire:model="customer_identification"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    @error('customer_identification') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label for="start_date" class="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                    <input type="date" id="start_date" wire:model.live="start_date"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    @error('start_date') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label for="end_date" class="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                    <input type="date" id="end_date" wire:model.live="end_date"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    @error('end_date') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
                </div>
            </div>

            <div class="mb-4">
                <label for="prepaid_amount" class="block text-gray-700 text-sm font-bold mb-2">Prepaid Amount ($)</label>
                <input type="number" step="0.01" id="prepaid_amount" wire:model="prepaid_amount"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                @error('prepaid_amount') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
            </div>

            <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-700">Estimated Total Cost:</span>
                    <span class="text-xl font-bold text-gray-900">${{ number_format($total_cost, 2) }}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700">Remaining Balance:</span>
                    <span class="text-xl font-bold text-blue-600">${{ number_format(max(0, $total_cost - (float)$prepaid_amount), 2) }}</span>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create Rental
                </button>
                <a href="{{ route('rentals.index') }}"
                    class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                    Cancel
                </a>
            </div>
        </form>
    </div>
</div>