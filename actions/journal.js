import { MOODS } from "@/app/lib/moods";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const createJournalEntry = async (data) => {

    try {
        const { userId } = await auth();
        if (!userId)
            throw new Error('Unauthorized')

        // Arcjet rate limiting

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            }
        });

        if (!user)
            throw new Error("User not found");

        const mood = MOODS[data.mood.toUpperCase()];
        if (!mood) throw new Error('invlaid mood')


    } catch (error) {

    }
}