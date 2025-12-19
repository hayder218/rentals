<div class="max-w-4xl mx-auto space-y-6">
    <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
        <p class="text-gray-500 dark:text-gray-400">Manage your application settings and contract terms.</p>
    </div>

    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
        <form wire:submit="save" class="space-y-6">
            <div x-data="{
                content: @entangle('contractTerms'),
                editor: null,
                init() {
                    this.editor = new window.Editor({
                        element: this.$refs.editor,
                        extensions: [
                            window.StarterKit,
                        ],
                        content: this.content,
                        editorProps: {
                            attributes: {
                                class: 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none',
                            },
                        },
                        onUpdate: ({ editor }) => {
                            this.content = editor.getHTML();
                        },
                    });

                    this.$watch('content', (value) => {
                        if (this.editor.getHTML() !== value) {
                            this.editor.commands.setContent(value, false);
                        }
                    });
                }
            }" wire:ignore class="mb-4">
                <label for="contractTerms" class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Contract Terms & Conditions</label>
                
                <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div class="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                         <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                            <div class="flex items-center space-x-1 sm:pr-4">
                                <!-- Toolbar buttons (simplified for brevity, can expand) -->
                                <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="{ 'text-gray-900 bg-gray-200 dark:bg-gray-600': editor.isActive('bold') }" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0h6a3.5 3.5 0 1 1 0 7H8m0-7v7"/></svg>
                                    <span class="sr-only">Bold</span>
                                </button>
                                <button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'text-gray-900 bg-gray-200 dark:bg-gray-600': editor.isActive('italic') }" class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                     <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5h4m-2 0l-4 14m2 0h4"/></svg>
                                    <span class="sr-only">Italic</span>
                                </button>
                            </div>
                         </div>
                    </div>
                    <div class="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                        <div x-ref="editor"></div>
                    </div>
                </div>

                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    These terms will be included in every generated rental contract.
                </p>
            </div>

            <div class="flex justify-end">
                <button type="submit" wire:loading.attr="disabled"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center">
                    <span wire:loading.remove>Save Settings</span>
                    <span wire:loading class="ml-2">Saving...</span>
                </button>
            </div>

            @if (session('status'))
                <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 flex items-center" role="alert">
                    <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                        <span class="font-medium">Success!</span> {{ session('status') }}
                    </div>
                </div>
            @endif
        </form>
    </div>
</div>
