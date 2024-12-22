"use server"

import { unstable_cache } from "next/cache";

export const getPixabayImage = async query => {

    try {
        const res = fetch(`https://pixabay.com/api/?q=${query}&key=${process.env.PIXABAY_API_KEY}
         &min_width=1280&min_height=720&image_type=illustration&category=feelings`);

        const data = await res.json();
        return data.hits[0]?.largeImageUrl || null;

    } catch (error) {
        console.log("Pixabay Api error ", error);
        return null;
    }
}


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

