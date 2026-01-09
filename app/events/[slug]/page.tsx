import {notFound} from "next/navigation";

import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import {IEvent} from "@/database";
import {getSimilarEventsBySlug} from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({icon, label, alt}: {icon: string, label: string, alt: string}) => (
    <div className="flex-row  items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

const EventAgenda = ({agendaItems}: {agendaItems: string[]}) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({tags}: {tags: string[]}) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)

const EventDetailsPage = async ({params}:{params: Promise<{slug: string}>}) =>{
    const { slug } = await params;

    if (!slug || slug === "undefined") return notFound();

    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    if (!request.ok) return notFound();

    const data = await request.json();
    if (!data?.event) return notFound();

    const {event: {description, image, overview, date, time, location, mode, agenda, audience, tags, organizer}} = data;

    if(!description) return notFound();

    const bookings = 10;

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>

            <div className="details">
                {/* left side*/}
                <div className="content">
                    <Image src={image} alt="Event Banner" width={800} height={800} className="banner" priority/>

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" label={date} alt="calendar"/>
                        <EventDetailItem icon="/icons/clock.svg" label={time} alt="clock"/>
                        <EventDetailItem icon="/icons/pin.svg" label={location} alt="pin"/>
                        <EventDetailItem icon="/icons/mode.svg" label={mode} alt="mode"/>
                        <EventDetailItem icon="/icons/audience.svg" label={audience} alt="audience"/>
                    </section>

                    <EventAgenda agendaItems={agenda}/>

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags}/>


                </div>
                {/* right side*/}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} people who have already booked their spot.
                            </p>
                        ) : (
                            <p className="text-sm">Be the first to book your spot!</p>
                        )}

                        <BookEvent/>
                    </div>
                </aside>
            </div>

            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent )=> (
                        <EventCard key={similarEvent.title} {...similarEvent}/>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default EventDetailsPage;
