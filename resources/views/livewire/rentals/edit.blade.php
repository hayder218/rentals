<div class="max-w-2xl mx-auto">
    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Manage Rental</h2>

        <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-700">Rental Details</h3>
            <p class="text-gray-600"><strong>Customer:</strong> {{ $rental->customer_name }}</p>
            <p class="text-gray-600"><strong>Car:</strong> {{ $rental->car->make }} {{ $rental->car->model }}</p>
            <p class="text-gray-600"><strong>Dates:</strong> {{ $rental->start_date->format('M d, Y') }} -
                {{ $rental->end_date->format('M d, Y') }}</p>
            <p class="text-gray-600"><strong>Total Cost:</strong> ${{ number_format($rental->total_cost, 2) }}</p>
        </div>

        <form wire:submit="update">
            <div class="mb-4">
                <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Status</label>
                <select id="status" wire:model="status"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                @error('status') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
            </div>

            <div class="flex items-center justify-between">
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Update Status
                </button>
                <a href="{{ route('rentals.index') }}"
                    class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                    Cancel
                </a>
            </div>
        </form>
    </div>
</div>