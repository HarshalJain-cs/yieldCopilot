"use client";

import { useEffect, useState } from "react";

interface UseCountUpOptions {
    start?: number;
    end: number;
    duration?: number;
    decimals?: number;
    delay?: number;
}

/**
 * Animated number counter hook
 * Counts from start to end value with configurable duration
 */
export function useCountUp({
    start = 0,
    end,
    duration = 1500,
    decimals = 2,
    delay = 0,
}: UseCountUpOptions): string {
    const [count, setCount] = useState(start);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setHasStarted(true);
        }, delay);

        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!hasStarted) return;

        const startTime = Date.now();
        const difference = end - start;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const current = start + difference * easeOut;
            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [hasStarted, start, end, duration]);

    return count.toFixed(decimals);
}

/**
 * Animated counter component for displaying numbers
 */
export function AnimatedCounter({
    value,
    prefix = "",
    suffix = "",
    decimals = 2,
    duration = 1500,
    delay = 0,
    className = "",
}: {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
    delay?: number;
    className?: string;
}) {
    const displayValue = useCountUp({
        end: value,
        decimals,
        duration,
        delay,
    });

    return (
        <span className={`count-up ${className}`}>
            {prefix}
            {displayValue}
            {suffix}
        </span>
    );
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function AnimatedLargeNumber({
    value,
    prefix = "",
    duration = 1500,
    delay = 0,
    className = "",
}: {
    value: number;
    prefix?: string;
    duration?: number;
    delay?: number;
    className?: string;
}) {
    const formatNumber = (num: number): { value: number; suffix: string } => {
        if (num >= 1_000_000_000) {
            return { value: num / 1_000_000_000, suffix: "B" };
        }
        if (num >= 1_000_000) {
            return { value: num / 1_000_000, suffix: "M" };
        }
        if (num >= 1_000) {
            return { value: num / 1_000, suffix: "K" };
        }
        return { value: num, suffix: "" };
    };

    const { value: targetValue, suffix } = formatNumber(value);
    const displayValue = useCountUp({
        end: targetValue,
        decimals: 1,
        duration,
        delay,
    });

    return (
        <span className={`count-up ${className}`}>
            {prefix}
            {displayValue}
            {suffix}
        </span>
    );
}
