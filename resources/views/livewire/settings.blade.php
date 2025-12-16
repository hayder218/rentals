<div class="max-w-2xl mx-auto space-y-6">
    <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p class="text-gray-500">Manage your application settings and contract terms.</p>
    </div>

    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
        <form wire:submit="save" class="space-y-4">
            <div class="mb-4">
                <label for="contractTerms" class="block text-gray-700 text-sm font-bold mb-2">Contract Terms & Conditions</label>
                <textarea wire:model="contractTerms" id="contractTerms" rows="15" 
                    placeholder="Enter the standard terms and conditions for rental contracts..."
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                <p class="text-sm text-gray-500 mt-1">
                    These terms will be included in every generated rental contract.
                </p>
            </div>

            <div class="flex justify-end">
                <button type="submit" wire:loading.attr="disabled"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
                    <span wire:loading.remove>Save Settings</span>
                    <span wire:loading class="ml-2">Saving...</span>
                </button>
            </div>

            @if (session('status'))
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center" role="alert">
                    <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    <span class="block sm:inline">{{ session('status') }}</span>
                </div>
            @endif
        </form>
    </div>
</div>
