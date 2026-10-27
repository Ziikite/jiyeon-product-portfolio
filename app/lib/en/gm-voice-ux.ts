import type { Project } from "@/app/lib/data";

// Body strings keep the markers the gm-voice-ux components parse ("Guideline (…) :", "Test Result", quoted scripts,
// "Quantitative results"). Use ’ for apostrophes: the parsers turn pairs of ASCII ' into curly quotes.
export const project: Project = {
  slug: "gm-voice-ux",
  no: "04",
  org: "GM Korea · Industry–Academia Project",
  period: "2022.12 — 2023.08",
  role: "UX Research 90% · Service UX Planning 90%",
  team: ["Project Manager 1", "UX Designer 6"],
  domain: "Mobility",
  image: "/projects/gm-voice-ux.svg",
  coverImage: "/projects/cover/gm-voice-ux.svg",
  title: "Designing in-car voice UX\nthat drivers keep using",
  summary:
    "Through driver shadowing and A/B tests, we showed that trust depends not on how often the system speaks, but on whether drivers know why it’s speaking now.",
  heroMetric: { value: "+51%", label: "Improvement in scenario goal completion" },
  metrics: [
    { value: "83%", label: "Drivers ignoring or double-checking voice prompts" },
    { value: "n=38", label: "A/B test participants" },
    { value: "+12.5%", label: "Improvement in sense of safety" },
  ],
  sections: [
    {
      label: "01 · Background",
      heading: "Why don’t drivers use voice recognition?",
      body:
        "Car buttons have to be found and pressed, which makes them hard to operate while driving. Voice control was introduced to fix this, yet more than half of users weren’t using voice recognition at all. AI speaker satisfaction lowered by technical issues : satisfied 48%, dissatisfied to neutral 52% (unnatural conversation, recognition accuracy) / In-car voice recognition usage : never used 50%, via Bluetooth 20%, via smartphone 20%, other 10%. Low trust in voice recognition technology : poor recognition accuracy (47%), unnatural conversation (33%), external noise (32%), limited features (31%)",
    },
    {
      label: "02 · Problem",
      heading: "Voice prompts with no context or reason kept drivers from using voice features",
      body:
        "Shadowing six drivers showed that they either ignored the navigation’s voice prompts or checked the screen themselves. Speed camera warnings, dashcam alerts, turn-by-turn directions — with so much information competing for attention, 5 out of 6 drivers ignored the voice prompts or checked the navigation screen directly.",
      list: [
        "\"Did the nav just say something? It’ll say it again anyway, so I can ignore it.\"",
        "\"When I have to pick one of several options, it’s faster to just look and choose.\"",
      ],
    },
    {
      label: "03 · Cause",
      heading: "Drivers couldn’t tell why a prompt was playing or when the next one would come",
      body:
        "Follow-up interviews showed that 65% of participants saw repetitive prompts with no clear reason as unnecessary distractions and found them confusing. We found that trust was dropping because no one had designed the intent and context behind each prompt.",
      list: [
        "\"All I ever hear is speed camera alerts, so I don’t want to listen anymore.\" / \"It keeps repeating itself... I can just ignore it.\" → The same message repeats regardless of the situation → Prompts that ignore the situation erode trust",
        "\"It just rattles things off, so I can’t focus and can’t even hear it properly.\" / \"I don’t know what it’s saying. I just look at the screen.\" → Prompts repeat with no reason or explanation → Information without a purpose adds cognitive load",
        "\"I don’t know what it wants me to do next.\" → A single sentence plays with no surrounding context → Cut off from the user’s flow, prompts become noise",
      ],
      image: "/projects/detail/gm-voice-ux-interview.svg",
    },
    {
      label: "04 · Strategy",
      heading: "UX factors that make people trust the system and keep using it",
      body: "To design for experience quality beyond feature completeness, we drew the core UX factors from a literature review.",
      list: [
        "System quality — Safety : Give only the key information to reduce confusion",
        "Information quality — Comfort : Short prompts with a predictable structure to lower cognitive load",
        "Service quality — Appeal : An emotional experience that makes people want to keep using voice",
      ],
    },
    {
      label: "05 · Test Design",
      heading: "A/B tests to find the right way to deliver information in each situation",
      body: "",
    },
    {
      label: "06 · Solution 1",
      heading: "Route briefing — Information matched to trip distance and purpose",
      body:
        "Guideline (long drive) : On long drives, give traffic flow, accident, and fuel information / Ask only simple yes-or-no questions to support quick decisions while driving. \"Here’s your route briefing. High1 Resort is 209 km away, about 2 hours 27 minutes. (…) You’re low on fuel, so I recommend refueling at ‘Yongin Rest Area.’ Would you like me to add Yongin Rest Area as a stop?\" Guideline (short drive) : Give only essential information to avoid overload / Focus on basics like estimated arrival time and current traffic. \"Here’s your route briefing. GM Korea is 4 km from your current location, about 21 minutes. Traffic is light the whole way. Drive safely.\" Test Result (adopted vs rejected) : Safety 4.26 vs 3.31, Appeal 3.28 vs 2.60, Comfort 3.53 vs 3.50",
      list: [
        "P5 : On a long drive, fuel really matters, so I liked that — and having it set the stop for me was great too.",
        "P7 : The comparison version does run long. Still, because it gives me the numbers, I get it right away without looking at the screen.",
        "P10 : When I get in the car and just want to go, it’s annoying that the nav keeps talking and asking me things.",
        "P13 : It’s really about the amount of information. If it briefed me on fuel every time, even on my usual 20–30 minute drives, I’d get tired of it.",
      ],
    },
    {
      label: "07 · Solution 2",
      heading: "Lane changes while driving — Situational context for a safe, comfortable system",
      body:
        "Guideline (basic directions) : Remove extra information (e.g., nearby landmarks, road condition details) to minimize cognitive load. \"Turn right at the intersection in 1 km.\" Guideline (exceptions) : Give the reason (why) to build trust and understanding / Include only information that needs immediate action. \"Turn left in 2.3 km. There’s congestion ahead, so move into the left lane in 500 meters.\" Guideline (emergencies) : Explain why the driver must slow down or change lanes right away / Designed for immediate action. \"There’s fallen rock on the road ahead. Slow down and change lanes.\" Test Result (adopted vs rejected) : Safety 3.87 vs 3.29, Appeal 3.34 vs 2.95, Comfort 4.13 vs 3.29",
      list: [
        "P6 : Sometimes traffic is so backed up that I can’t merge, so a heads-up in advance is nice.",
        "P4 : On an unfamiliar road, extra information about lane changes definitely helps, and you can’t know about congestion on your own...",
        "P12 : It’s reassuring to understand the situation ahead of time while I drive, but if the voice gets too detailed, I think it’d be confusing.",
        "P15 : I liked that it told me there was congestion. Even if I know the distance, it depends on the road, so it’s hard to tell whether I have enough room to get over.",
      ],
      image: "/projects/detail/gm-voice-ux-6.png",
    },
    {
      label: "08 · Solution 3",
      heading: "Information overlap — A system that quickly handles what the driver asks for",
      body:
        "Guideline (basic directions) : Let drivers ask for more information even while a voice prompt is playing. \"Changing your route. On your current route... / Will it rain this afternoon? / There’s a 60% chance of rain. On your current route, turn left in 300 meters.\" Guideline (exceptions) : Urgent guidance (e.g., sudden lane changes, congestion) comes first / Supporting information comes after. \"Congestion 500 meters ahead. Please move to the right lane.\" / \"The nearest gas station you asked about is at Yongin Rest Area, 2 km away.\" Test Result (adopted vs rejected) : Safety 3.50 vs 2.79, Appeal 3.50 vs 2.24, Comfort 3.82 vs 2.32",
      list: [
        "P5 : If it cut me off and just kept going with its own directions, I’d feel like it was getting in the way of my priorities.",
        "P7 : I’d like it to remember what I said and answer once it finishes. If it doesn’t put my request first, it’s definitely less comfortable.",
        "P10 : What matters is getting the important information exactly when I want it.",
        "P13 : The agent is like a travel buddy, so I like it when it feels even a little like we’re having a conversation.",
      ],
      image: "/projects/detail/gm-voice-ux-7.png",
    },
    {
      label: "09 · Outcome",
      heading: "Overall gains in comfort, safety, and appeal",
      body:
        "After designing how information is delivered in each situation, the A/B tests confirmed clear improvements, and we expect the new design to give drivers more emotional reassurance and more confidence in the controls. \"It told me the travel time and the main features of the route before I left, so I had a sense of the road ahead.\" \"Hearing the route explained in advance helped me get mentally ready.\" \"The lane change guidance explained the situation too, so I think I could respond without panicking.\" \"Because it’s voice-first, I think I could focus more on driving.\" \"It felt like a co-pilot, because it listened to me first.\" \"The phrasing and tone of voice were gentle, which I liked.\" Quantitative results (before → after) : 3.17 → 3.61 (14.01%↑), 3.15 → 3.54 (12.49%↑), 2.86 → 3.15 (9.89%↑)",
    },
  ],
  tags: ["Shadowing", "A/B Test", "Voice UX"],
};
