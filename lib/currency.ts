
// Currency utilities for CareerPilot Salone

// Default fallback rate (approximate market rate)
// 1 USD = 22.5 SLE (New Leones)
const DEFAULT_EXCHANGE_RATE = 22.5;

export type Currency = 'USD' | 'SLE';

interface ExchangeRateResponse {
    rates: {
        SLE: number;
        [key: string]: number;
    };
    time_last_update_utc: string;
}

// Cache for exchange rate to avoid spamming APIs
let cachedRate: number | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

/**
 * Fetches the current USD to SLE exchange rate.
 * Uses a free API and falls back to a default constant if it fails.
 */
export async function getExchangeRate(): Promise<number> {
    // Return cached rate if valid
    if (cachedRate && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        return cachedRate;
    }

    try {
        // Using open.er-api.com which is free and doesn't require a key
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data: ExchangeRateResponse = await response.json();

        if (data && data.rates && data.rates.SLE) {
            cachedRate = data.rates.SLE;
            lastFetchTime = Date.now();
            return cachedRate;
        }
    } catch (error) {
        console.error('Failed to fetch real-time exchange rate:', error);
    }

    // Fallback
    return DEFAULT_EXCHANGE_RATE;
}

/**
 * Formats a specific amount in the given currency
 */
export function formatCurrency(amount: number, currency: Currency): string {
    if (currency === 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    } else {
        return new Intl.NumberFormat('en-SL', {
            style: 'currency',
            currency: 'SLE', // Note: Browser might not fully support SLE symbol yet, so falling back to 'SLE' text or code might be needed if "Le" isn't auto-used for SLE.
            currencyDisplay: 'narrowSymbol', // Tries to use "Le"
            maximumFractionDigits: 0
        }).format(amount);
    }
}

/**
 * Formats a salary range string dynamically.
 * Input expected: "$150-400" or similar numbers. 
 * This is a helper to parse existing static strings if needed, 
 * but our database now has pre-formatted strings. 
 * This functions helps if we want real-time conversion of a base USD number.
 */
export function formatSalaryRange(minUSD: number, maxUSD: number, rate: number): string {
    const minSLE = minUSD * rate;
    const maxSLE = maxUSD * rate;

    // Round to nearest 100 or 1000 for cleaner numbers
    const roundClean = (num: number) => {
        if (num > 10000) return Math.round(num / 1000) * 1000;
        if (num > 1000) return Math.round(num / 100) * 100;
        return Math.round(num / 10) * 10;
    };

    const minSLEClean = roundClean(minSLE);
    const maxSLEClean = roundClean(maxSLE);

    return `SLE ${minSLEClean.toLocaleString()} - ${maxSLEClean.toLocaleString()} (approx. $${minUSD} - $${maxUSD})`;
}
