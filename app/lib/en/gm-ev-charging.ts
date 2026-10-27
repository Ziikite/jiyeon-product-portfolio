import type { Project } from "@/app/lib/data";

export const project: Project = {
  slug: "gm-ev-charging",
  no: "05",
  org: "GM Korea · Industry–Academia Project",
  period: "2022.04 — 2022.08",
  role: "UX Research 90% · Service UX Planning 90% · UX Design 100%",
  team: ["Project Manager 1", "UX Designer 2"],
  domain: "Mobility",
  image: "/projects/gm-ev-charging.svg",
  coverImage: "/projects/cover/gm-ev-charging.svg",
  title: "Easing EV Charging Anxiety:\nCharging Reservations and a Rest Lounge",
  summary:
    "We overturned our initial OTT-centered hypothesis and proposed an end-to-end charging journey linking reservations, real-time status, and a lounge — ranked first in the localization strategy review.",
  heroMetric: { value: "1st", label: "Connected-car localization strategy review" },
  metrics: [
    { value: "89%", label: "Positive on cost savings while charging" },
    { value: "5", label: "In-depth interviews with EV drivers" },
    { value: "3 steps", label: "Unified station · content · lounge flow" },
  ],
  sections: [
    {
      label: "01 · Background",
      heading: "Would watching OTT content make charging a better experience?",
      body:
        "For EV drivers, charging is something they simply have to do. The need to charge acts as a strong constraint, and what users want during that time can't be explained by content consumption alone. The core goal of the charging experience is for charging to go smoothly — so watching OTT content is likely a secondary activity.",
    },
    {
      label: "02 · Problem",
      heading: "The core pain point of EV charging is uncertainty",
      body:
        "To learn what drivers actually do and feel while charging, whether they truly want to consume content, and whether the existing concept met their needs, we ran 1:1 interviews with five EV drivers. The interviews showed that watching OTT content while charging doesn't necessarily mean a satisfying experience. The core task for users is checking the charging status, and without confidence that charging is going smoothly, it's hard to focus on content → Instead of simply offering OTT, we needed UX designed around the entire charging experience (with entertainment in a supporting role)",
      list: [
        "Charging takes longer than expected — \"Just sitting and waiting is frustrating.\" \"Charging takes 20 to 40 minutes or more, and it always seems to take longer than I thought.\"",
        "Guaranteed charging — \"I'm constantly checking the charging status, it's exhausting.\" \"The app said a spot was open, but when I got there it was taken and I had to find another station.\"",
        "Light, low-effort experiences — \"I'm too tired for a long movie or a drama.\" \"Whatever I'm doing, I need to know it's still charging, so a movie or a drama doesn't really work.\"",
      ],
    },
    {
      label: "03 · Cause",
      heading: "Low trust in whether and how reliably they can charge kept users from settling in to rest",
      body:
        "While charging, users were far more focused on whether charging was going well. Charging times were unpredictable and station information was inaccurate, so they kept checking — and that got in the way of enjoying content or simply resting.",
      list: [
        "\"It takes longer than I expected\" → The estimated completion time isn't accurate → Uncertain timing raises the stress of waiting",
        "\"It said there was a charger, but there wasn't\" → Station information isn't real-time and contains errors → Users stop trusting the system itself",
        "\"I have to keep checking the charging status\" → Not enough feedback on charging status changes → Users have to monitor the situation constantly",
        "\"I can't focus on a drama\" → Checking the charging status breaks concentration → Checking status takes priority over immersion",
      ],
    },
    {
      label: "04 · Strategy",
      heading: "An end-to-end charging solution designed from start to finish",
      body:
        "Navigation → Station reservation / Food pre-order / Cinema reservation (cart, order history, charge amount, menu, screen selection, order review, charging information, charging bay, usage time, arrival time, payment) → Arrival at the station (go to the charging bay, use the cinema service, use the lounge)",
      list: [
        "Efficient charging time — Station reservations minimize waiting → Station pre-booking system, real-time station status",
        "A place to recharge yourself — Short, light content recommendations; food and amenity pre-booking → A rest lounge",
        "UI for real-time monitoring — Automatic charging settings and payment",
      ],
    },
    {
      label: "05 · Solution 1",
      heading: "Reserve the charge amount and charging bay you need",
      body:
        "Visualize the current battery as a graph so drivers can easily set the amount they want — to cut the complexity of charging units, the graph shows capacity as the charge amount changes, and battery level is shown in % to ease resistance to unfamiliar units. Check and reserve an available bay that fits the arrival time — available bays are shown in blue and vehicles that will finish charging by the arrival time in green, and the remaining charging time of other vehicles is shown so drivers can anticipate who will still be charging when they arrive.",
    },
    {
      label: "06 · Solution 2",
      heading: "Book the amenities that fit your content",
      body:
        "Choose equipment to suit the content — if the car's display isn't suited to watching, rent an extra screen that mounts inside the car. OTT recommendations sized to the charging time — snackable content that's easy to enjoy despite accumulated fatigue, chosen by runtime to match the charging time. Book for your arrival time and prepay so the service is ready the moment you arrive — set a food pickup time to match arrival, and pay with GM Points to make paying for services feel lighter.",
    },
    {
      label: "07 · Solution 3",
      heading: "A lounge-style charging station for a real break",
      body:
        "As a rest area, a lounge where drivers can shake off fatigue while charging. A station that doubles as a pop-up for brand promotion — as a brand pop-up zone, a promotional space for the GM Korea brand. A UX that turns charging into a new destination to experience, not just a break.",
    },
    {
      label: "08 · Outcome",
      heading: "Ranked first in connected-car localization strategy",
      body:
        "We presented the final UX design to the CEO and executives: beyond better charging reservations and entertainment, it turned the charging station into a place to enjoy, like a pop-up store. Through the interviews we found that the original plan centered on OTT and didn't fully reflect users' real needs. Rather than starting over, we evolved the existing plan — splitting the flow into before and after charging and dividing the work among the team — which let us develop a more refined UX. When we interviewed with a low-fi prototype, participants said it was hard to picture the service. To fix this, we made sketches, a 3D prototype, and a video for the interviews. As a result, participants said they could focus on the service and gave more immersive feedback, as if they had experienced it themselves.",
      list: [
        "\"It's refreshing how it solves charging anxiety while connecting naturally to entertainment.\"",
        "\"The UX planning stands out for balancing practicality and fun.\"",
        "\"The strategic approach, which even considers how the business could scale, was impressive.\"",
      ],
    },
    {
      label: "09 · Appendix",
      heading: "GM Korea — User journey map, IA",
      body:
        "We mapped the journey of a user (Gayoung Kim, EV driver, 34) who reserves a charging station and the car cinema, picks content, arrives at the station, watches a movie, and explores the station lounge — organizing each stage (station and car cinema reservation → content selection → arrival at the station → watching the movie → exploring the lounge) by behavior, touch point, emotion, and value point. \"The charging alert says there's not much left. For the third time, the station shown in the app already has a car charging there. My friend in the passenger seat looks tired too. But I don't want to waste time pulling into just any rest stop.\" Pain points: hard to find a charging station, wants to rest comfortably while charging / Needs: reliable charging, rest. Information Architecture: Navigation (current location (map), search, origin and destination, distance to the next major junction, distance to destination, estimated travel time, favorite destinations, search engine) / Station reservation (charging information, charging bay, usage time, arrival time, current charge level) / Food order (menu, cart, order, order history) / Cinema service (reservation, screen selection, payment), and more.",
    },
  ],
  tags: ["Concept Validation", "Journey Map", "Service Design"],
};
