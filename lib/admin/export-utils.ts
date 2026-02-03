import { UserProfile } from "@/lib/types"

export function exportToCSV(data: any[], filename: string) {
    if (!data || data.length === 0) {
        console.warn('No data to export')
        return
    }

    // Get headers from first object
    const headers = Object.keys(data[0])

    // Create CSV content
    const csvContent = [
        headers.join(','), // Header row
        ...data.map(row =>
            headers.map(header => {
                const value = row[header]
                // Handle values that might contain commas or quotes
                if (value === null || value === undefined) return ''
                const stringValue = String(value)
                if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                    return `"${stringValue.replace(/"/g, '""')}"`
                }
                return stringValue
            }).join(',')
        )
    ].join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export function prepareUserDataForExport(users: UserProfile[]) {
    return users.map(user => ({
        'Full Name': user.full_name || '',
        'Email': user.email || '',
        'Phone': user.phone_number || user.phone || '',
        'Anonymous ID': user.anon_id || '',
        'District': user.district || user.location || '',
        'Education Level': user.education_level || user.highest_education || '',
        'Career Goal': user.career_goal || '',
        'Interests': Array.isArray(user.interests) ? user.interests.join('; ') : '',
        'Skills': Array.isArray(user.skills) ? user.skills.join('; ') : '',
        'Status': (user.is_complete || user.profile_completed) ? 'Onboarded' : 'Incomplete',
        'WhatsApp Opt-in': user.whatsapp_opt_in ? 'Yes' : 'No',
        'Created At': user.created_at ? new Date(user.created_at).toLocaleString() : '',
        'Last Updated': user.updated_at ? new Date(user.updated_at).toLocaleString() : ''
    }))
}

export function prepareFeedbackForExport(feedback: any[]) {
    return feedback.map(item => ({
        'User ID': item.user_id || item.anon_id || '',
        'Name': item.name || '',
        'Email': item.email || '',
        'Message': item.message || item.feedback || '',
        'Type': item.type || 'General',
        'Status': item.status || 'New',
        'Created At': item.created_at ? new Date(item.created_at).toLocaleString() : ''
    }))
}

export function filterByDateRange(
    data: any[],
    dateField: string,
    startDate?: Date,
    endDate?: Date
) {
    if (!startDate && !endDate) return data

    return data.filter(item => {
        const itemDate = item[dateField] ? new Date(item[dateField]) : null
        if (!itemDate) return false

        if (startDate && itemDate < startDate) return false
        if (endDate && itemDate > endDate) return false
        return true
    })
}
