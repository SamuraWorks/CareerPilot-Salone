
import { useState, useEffect } from 'react';
import { getExchangeRate, formatSalaryRange } from '@/lib/currency';

export function useExchangeRate() {
    const [rate, setRate] = useState<number>(22.5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRate() {
            try {
                const currentRate = await getExchangeRate();
                setRate(currentRate);
            } catch (error) {
                console.error("Failed to load exchange rate", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRate();
    }, []);

    const convertToSLE = (usdAmount: number) => {
        return Math.round(usdAmount * rate);
    };

    const convertToUSD = (sleAmount: number) => {
        return Math.round(sleAmount / rate);
    };

    return {
        rate,
        loading,
        convertToSLE,
        convertToUSD,
        formatSalaryRange: (minUSD: number, maxUSD: number) => formatSalaryRange(minUSD, maxUSD, rate)
    };
}
