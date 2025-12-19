import './bootstrap';
import 'flowbite';
import { DataTable } from 'simple-datatables';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Chart from 'chart.js/auto';

// Custom Export function because simple-datatables 'export' plugin is deprecated or limited, 
// using manual CSV generation which is robust for this use case
const exportCSV = (dataTable, filename = 'export.csv') => {
    const data = dataTable.data;
    const headings = dataTable.headings;

    // Combine headings and data
    const csvContent = [
        Array.from(headings).map(th => th.textContent),
        ...data.data.map(row => Array.from(row.cells).map(cell => cell.textContent))
    ]
        .map(e => e.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// Enhance DataTable class to support export button injection
class EnhancedDataTable extends DataTable {
    constructor(table, options = {}) {
        super(table, options);
    }

    addExportButton(filename) {
        // Create container if not exists (usually top wrapper)
        const wrapper = this.wrapper.querySelector('.datatable-top');
        if (wrapper) {
            const btn = document.createElement('button');
            btn.innerHTML = `<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Export CSV`;
            btn.className = "ml-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex items-center";
            btn.onclick = () => exportCSV(this, filename);
            wrapper.appendChild(btn);
        }
    }
}

window.DataTable = EnhancedDataTable;
window.Editor = Editor;
window.StarterKit = StarterKit;
window.Chart = Chart;



