<div class="max-w-2xl mx-auto">
    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Add New Car</h2>

        <form wire:submit="save">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="make" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Make</label>
                    <input type="text" id="make" wire:model="make" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Toyota" required>
                    @error('make') <span class="text-red-600 text-xs">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label for="model" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
                    <input type="text" id="model" wire:model="model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Camry" required>
                    @error('model') <span class="text-red-600 text-xs">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label for="year" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                    <input type="number" id="year" wire:model="year" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2023" required>
                    @error('year') <span class="text-red-600 text-xs">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label for="license_plate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">License Plate</label>
                    <input type="text" id="license_plate" wire:model="license_plate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC-1234" required>
                    @error('license_plate') <span class="text-red-600 text-xs">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                    <select id="status" wire:model="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="available">Available</option>
                        <option value="rented">Rented</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                    @error('status') <span class="text-red-600 text-xs">{{ $message }}</span> @enderror
                </div>
                <div>
                    <label for="daily_rate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Daily Rate ($)</label>
                    <input type="number" step="0.01" id="daily_rate" wire:model="daily_rate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="50.00" required>
                    @error('daily_rate') <span class="text-red-600 text-xs">{{ $message }}</span> @enderror
                </div>
            </div>

            <div class="flex items-center space-x-4">
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Car</button>
                <a href="{{ route('cars.index') }}" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</a>
            </div>
        </form>
    </div>
</div>