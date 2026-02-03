"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { exportToCSV } from "@/lib/admin/export-utils"
import { toast } from "sonner"

interface ExportButtonProps {
    data: any[]
    filename: string
    label?: string
    prepareData?: (data: any[]) => any[]
}

export function ExportButton({
    data,
    filename,
    label = "Export CSV",
    prepareData
}: ExportButtonProps) {
    const handleExport = () => {
        try {
            if (!data || data.length === 0) {
                toast.error("No data to export")
                return
            }

            const exportData = prepareData ? prepareData(data) : data
            exportToCSV(exportData, filename)
            toast.success(`Exported ${exportData.length} records`)
        } catch (error) {
            console.error('Export error:', error)
            toast.error("Failed to export data")
        }
    }

    return (
        <Button
            onClick={handleExport}
            variant="outline"
            className="gap-2"
            disabled={!data || data.length === 0}
        >
            <Download className="w-4 h-4" />
            {label}
        </Button>
    )
}
