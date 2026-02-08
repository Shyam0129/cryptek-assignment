import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://api.cryptik.tech';
const POLL_INTERVAL = 30000; // 30 seconds

/**
 * Custom hook to fetch satellite positions from Cryptik API
 * Polls every 30 seconds and handles errors gracefully
 */
export const usePositions = () => {
    const [satellites, setSatellites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const fetchPositions = useCallback(async () => {
        try {
            const apiKey = import.meta.env.VITE_CRYPTIK_API_KEY;

            if (!apiKey) {
                throw new Error('API key not configured. Please set VITE_CRYPTIK_API_KEY in your .env file');
            }

            const response = await axios.get(`${API_BASE_URL}/positions`, {
                headers: {
                    'X-API-Key': apiKey,
                },
                timeout: 10000, // 10 second timeout
            });

            if (response.data && response.data.satellites) {
                setSatellites(response.data.satellites);
                setLastUpdated(new Date());
                setIsConnected(true);
                setError(null);
            } else {
                throw new Error('Invalid API response format');
            }
        } catch (err) {
            console.error('Error fetching satellite positions:', err);

            // Handle different error types
            if (err.response) {
                // Server responded with error
                if (err.response.status === 429) {
                    setError('Rate limit exceeded. Please wait before refreshing.');
                } else if (err.response.status === 401) {
                    setError('Invalid API key. Please check your configuration.');
                } else {
                    setError(`API error: ${err.response.status}`);
                }
            } else if (err.request) {
                // Request made but no response
                setError('Unable to reach API server. Please check your connection.');
            } else {
                // Other errors
                setError(err.message || 'An unexpected error occurred');
            }

            setIsConnected(false);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchPositions();
    }, [fetchPositions]);

    // Set up polling
    useEffect(() => {
        const interval = setInterval(() => {
            fetchPositions();
        }, POLL_INTERVAL);

        return () => clearInterval(interval);
    }, [fetchPositions]);

    return {
        satellites,
        loading,
        error,
        lastUpdated,
        isConnected,
        refetch: fetchPositions,
    };
};
