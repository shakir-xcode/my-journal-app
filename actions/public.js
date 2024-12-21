"use server"

import { unstable_cache } from "next/cache";

export const getDailyPrompt = unstable_cache(
    async () => {
        try {
            const res = await fetch('https://api.adviceslip.com/advice', {
                cache: "no-store"
            });
            const data = await res.json();
            return {
                success: true,
                data: data?.slip?.advice
            };
        } catch (error) {
            return {
                success: false,
                data: "What's on your mind today?"
            };
        }
    },
    ["daily-prompts"],
    {
        revalidate: 86400,
        tags: ["daily-prompts"]
    })

