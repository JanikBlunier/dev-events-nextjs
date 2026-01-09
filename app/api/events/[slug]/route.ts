import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event, { IEvent } from "@/database/event.model";

interface ErrorResponse {
    message: string;
    details?: string;
}

interface EventResponse {
    message: string;
    event: IEvent;
}

export async function GET(
    _req: Request,
    ctx: { params: Promise<{ slug?: string }> }
): Promise<NextResponse<EventResponse | ErrorResponse>> {
    try {
        await connectDB();

        const { slug } = await ctx.params;

        if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
            return NextResponse.json<ErrorResponse>(
                {
                    message: "Validation error",
                    details: "A non-empty slug parameter is required.",
                },
                { status: 400 }
            );
        }

        const normalizedSlug = slug.toLowerCase().trim();

        const slugPattern = /^[a-z0-9-]+$/;
        if (!slugPattern.test(normalizedSlug)) {
            return NextResponse.json<ErrorResponse>(
                {
                    message: "Validation error",
                    details: "Slug may only contain lowercase letters, numbers, and hyphens.",
                },
                { status: 400 }
            );
        }

        const event = await Event.findOne({ slug: normalizedSlug })
            .lean<IEvent>()
            .exec();

        if (!event) {
            return NextResponse.json<ErrorResponse>(
                {
                    message: "Event not found",
                    details: `No event found with slug '${normalizedSlug}'.`,
                },
                { status: 404 }
            );
        }

        return NextResponse.json<EventResponse>(
            {
                message: "Event fetched successfully",
                event,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[GET /api/events/[slug]] Unexpected error", error);

        return NextResponse.json<ErrorResponse>(
            {
                message: "Internal server error",
                details: "An unexpected error occurred while fetching the event.",
            },
            { status: 500 }
        );
    }
}
