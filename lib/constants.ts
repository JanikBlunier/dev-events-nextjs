export type Event = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

export const events = [
    {
        title: "Next.js Conf 2026",
        image: "/images/event1.png",
        slug: "nextjs-conf-2026",
        location: "San Francisco, CA",
        date: "2026-10-25",
        time: "10:00 AM",
    },
    {
        title: "React Summit",
        image: "/images/event2.png",
        slug: "react-summit",
        location: "Amsterdam, NL",
        date: "2026-06-14",
        time: "09:00 AM",
    },
    {
        title: "Web Dev Hackathon",
        image: "/images/event3.png",
        slug: "web-dev-hackathon",
        location: "Remote",
        date: "2026-03-12",
        time: "11:00 AM",
    },
    {
        title: "AI in Tech Meetup",
        image: "/images/event4.png",
        slug: "ai-tech-meetup",
        location: "New York, NY",
        date: "2026-02-15",
        time: "06:30 PM",
    },
    {
        title: "Node.js Interactive",
        image: "/images/event5.png",
        slug: "nodejs-interactive",
        location: "Vancouver, BC",
        date: "2026-09-08",
        time: "09:30 AM",
    },
    {
        title: "Frontend Masters Workshop",
        image: "/images/event6.png",
        slug: "frontend-masters-workshop",
        location: "London, UK",
        date: "2026-05-20",
        time: "01:00 PM",
    },
];
