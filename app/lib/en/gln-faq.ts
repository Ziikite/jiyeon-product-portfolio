import type { Project } from "@/app/lib/data";

export const project: Project = {
  slug: "gln-faq",
  no: "01",
  org: "GLN International",
  period: "2025.10 — 2026.02",
  role: "UX Research · Service UX Planning · Design",
  domain: "Fintech",
  image: "/projects/gln-faq.svg",
  coverImage: "/projects/cover/gln-faq.svg",
  title: "Rewriting FAQ UX copy\nto ease user anxiety",
  summary:
    "Analyzing 3,929 inquiries showed the real problem was a structure that made it hard for users to judge their own situation — so I rewrote the FAQ.",
  heroMetric: { value: "3,929", label: "inquiries analyzed by frequency" },
  metrics: [
    { value: "44.7%", label: "share of inquiries filed as 'Other'" },
    { value: "3 principles", label: "rewriting criteria" },
    { value: "−59%", label: "exchange rate and fee inquiries after launch" },
  ],
  sections: [
    {
      label: "01 · Background",
      heading: "Why do customers ask support about things the FAQ already covers?",
      body:
        "Many GLN customers contacted the customer center even about issues the FAQ already answered. An analysis of overall inquiry frequency showed that 'Other' inquiries made up as much as 45%, and many more customers reached out because they couldn't find answers about errors, refunds, or exceeded limits.",
      image: "/projects/detail/gln-faq-1.png",
    },
    {
      label: "02 · Problem",
      heading: "An FAQ not organized around users' situations was sending them to CS",
      body:
        "Within the categories provided, users struggled to tell \"which one my situation falls under.\" This left them stuck with problems they couldn't find in the FAQ, until they eventually gave up searching and contacted CS directly.",
    },
    {
      label: "03 · Cause",
      heading: "When something failed, customers couldn't diagnose and fix the problem on their own",
      body:
        "Interviews (operations team, n = 2) showed that inquiries about failed transfers and cash-outs kept coming back, and a large share of them came from anxiety about not knowing what was happening. The FAQ content needed to be built around failure situations.",
      image: "/projects/detail/gln-faq-2.png",
    },
    {
      label: "04 · Strategy",
      heading: "An experience that eases anxiety and rebuilds trust",
      body:
        "Interviews and VOC analysis showed that when something fails, users are most anxious about 'whether it can be done', 'where my money went', and 'how long I'll have to wait'. Taking GLN's existing three UX principles as a starting point, we set out to achieve (1) clearer communication when things fail, (2) less user anxiety, and (3) more room for users to solve problems themselves.",
      list: [
        "Clear & Intuitive — Clear, concise failure messages (standardized message flows by failure type, no duplicate or vague wording, consistent terminology) → Goal : Fewer questions asking just 'does it work or not'",
        "Approachable — A friendly tone of guidance (empathy even when things fail, minimal jargon, conversational sentences) → Goal : Ease user anxiety and rebuild trust",
        "Focus on Solutions — Guidance users can act on themselves (stronger self-help guides, exceptions spelled out) → Goal : Fewer repeat CS inquiries and more peace of mind",
      ],
    },
    {
      label: "05 · Solution 1",
      heading: "Rewriting the FAQ to be Clear and Intuitive",
      body:
        "The old FAQ repeated the same information and scattered timing details across the answer, so users couldn't grasp the key point quickly. Following the Clear and Intuitive principle, we restructured the information and rewrote how it was expressed. As-is : \"Q. My withdrawal failed but I haven't been refunded / A. Transactions that fail due to an ATM sequence error or button input are refunded within 2 hours. If you have not been refunded, please contact the customer center. However, refunds during Open Banking maintenance hours are processed after 12:10 AM. If the refund time falls within Open Banking maintenance hours, please wait until maintenance is over. ※Open Banking maintenance hours : PM 11:45 ~ AM 12:10 (KST)\" To-be : \"Q. My withdrawal failed and I didn't get a refund / A. Transactions that fail because of an ATM input error are usually refunded within 2 hours. If you still haven't been refunded after 2 hours, please contact the customer center. Note that during Open Banking maintenance (23:45~00:10 KST), refunds are processed once maintenance is over.\" We merged the duplicate explanations to make it lighter to read. We put the times right in the sentence so users can understand them at a glance.",
    },
    {
      label: "06 · Solution 2",
      heading: "Friendly, easy-to-understand guidance",
      body:
        "The old FAQ exposed formulas, abbreviations, and internal terms as-is, so users couldn't understand the content intuitively. Following the Approachable principle, we refined the jargon, simplified the formulas, and redesigned the explanations to be user-friendly. As-is : \"Q. What are the payment fees? / A. The GLN payment service fee is charged per payment at 0.3% of the payment amount converted into US dollars (USD) + USD 0.13. *What is the GLN payment fee? : It refers to the price a user pays GLN for using the payment service. / Q. What is the withdrawal limit? / A. Thailand ATM withdrawal limits are as follows. KRW 1,000,000 per transaction (approx. 22,000 THB), KRW 8,000,000 per day (approx. 200,000 THB), KRW 16,000,000 per month (approx. 360,000 THB) *The local baht limit may change depending on the exchange rate of the local partner.\" To-be : \"Purple GLN payment fees are calculated as follows. You're charged 0.3% of the payment amount (in USD) + USD 0.13 as a fee. * Purple GLN payment fee : the amount you pay Purple GLN for using the payment service. / ATM withdrawal limits differ by region. Check the limit for the region you're using below. (…) * Limits may change with local exchange rates * In Japan, Vietnam, and Laos, you can withdraw with 'GLN ATM Withdrawal' in the 'Hana Money', 'Hana 1Q', or 'KB Kookmin Bank' app.\" Adding a plain-language line before the formula makes the formula easier to take in. To avoid internal jargon, we removed words like 'partner'. Condensing the calculation into a short formula makes it easy to follow.",
    },
    {
      label: "07 · Solution 3",
      heading: "Guidance focused on solutions",
      body:
        "The old FAQ focused on 'why it can't be done', so users couldn't tell what to do next. Following the Focus on Solutions principle, we rewrote it around 'the reason it isn't possible + an alternative you can act on right away'. As-is : \"Q. Can I get a cash receipt or a prepaid e-receipt? / A. Overseas payments are not eligible for cash receipts or prepaid e-receipts, so no receipt is issued. / Q. The service isn't working properly / A. Please check that your app version and your device's OS version are up to date. If the same problem persists after updating, contact GLN via KakaoTalk/email and we'll help you.\" To-be : \"Q. I'd like to get a cash receipt or a prepaid e-receipt / A. Cash receipts and prepaid e-receipts aren't issued for overseas payments. That's because they aren't a payment type eligible for the National Tax Service income deduction. Instead, you can check your payment receipt right in the app. How to find your receipt : top of the home screen → select 'History' → tap the details / A. First, please check that the app and your phone's OS are up to date. If the problem continues after updating, contact us via KakaoTalk or email. Purple GLN will look into it and help you. * KakaoTalk : https://pf.kakao.com/_dxoixbxj * Email : cs@glninternational.com\" By explaining why receipts can't be issued, we shifted the reason from the service to the regulation and aimed to reduce frustration. We provided contact details users can spot right away, so they can act immediately if the issue isn't resolved.",
    },
    {
      label: "08 · Outcome",
      heading: "34% fewer CS inquiries after the FAQ redesign",
      body:
        "After improving the guidance structure and information design to fit each situation, we measured the change in inquiries against the previous month. Inquiries dropped by an average of 34% across three key topics — payment failures, ATM failures, and exchange rates/fees — as customers got better at solving problems on their own. The old FAQ listed terms, so it was hard to see right away \"how much I have to pay\" → after the redesign, payment fees and withdrawal fees were split by case with examples → structured so customers can plug in their own situation. What customers look for is context: \"how much in my case\". ATM failures often come from network or technical errors, and the old FAQ described them as having an unknown cause → after the redesign, it gave a conditional action guide: \"automatic refund within 3 minutes → contact us after 3 minutes\" → explaining the cause of failure plus a fix created a decision flow that lets customers judge the situation themselves. The old FAQ stopped at \"contact us if it fails\", but the data confirmed that inquiries only go down when the FAQ completes the action path for each situation. If the FAQ can work as a diagnostic tool, many more cases can be solved before they ever reach CS. The key is to build the FAQ structure by tracing back the intent behind users' questions.",
      list: [
        "Payment failure inquiries 17% ▼ (includes the Jan 30 9pay error message fix)",
        "ATM failure inquiries 27% ▼ (includes the Feb 4 SCB ATM fix)",
        "FX/fee inquiries 59% ▼",
      ],
    },
    {
      label: "09 · Appendix",
      heading: "GLN International — word clouds, topic modeling, more improvements and proposals",
      body:
        "We ran a frequency analysis on the full inquiry corpus and word cloud analyses by type: payments, errors/outages, login/verification, how-to/guides, fees/exchange rates, and other. Building on this, topic modeling grouped the existing categories (All, Payment, Withdrawal, Account/Security, System, Other) into topics such as payment errors/refunds, sign-up/verification/account, how to top up and cash out, cash-outs/errors/history, fees/account linking/withdrawal, partner cash errors, and overseas withdrawal/exchange rates, which we then reorganized into improved categories (Top 10 : Payment, Withdrawal, Error, Other). Additional screen improvement (list) : We showed the top questions for each category (up to 5), such as Payment and Withdrawal, so users can get straight to solving their problem, and planned for 'See more' to reveal every item in that category. We also added a KakaoTalk inquiry banner so users can reach an agent right away when the FAQ doesn't solve their issue. Additional screen proposal (admin) : In the existing GLN admin portal, filtering by channel didn't show results that included the selected channel — it only showed results matching that single channel. Because of this, the operations team managed content by checking every search result one by one. So we planned to turn the notice channel filter into checkboxes to allow multi-select search. Also, in the existing GLN admin portal, registering a post required two categories: channel and channel type. However, the channel category was never actually used in searches, and content was registered according to the channel type the user selected. As a result, channel and channel type were filled in differently depending on who registered the post, and follow-up management always required checking with that person. So we removed the confusing channel/channel type split.",
    },
  ],
  tags: ["VOC Analysis", "UX Writing", "Topic Modeling"],
};

// Exact substrings of the 04 · Strategy and 02 · Problem bodies above.
export const glnHighlights = {
  strategy:
    "(1) clearer communication when things fail, (2) less user anxiety, and (3) more room for users to solve problems themselves.",
  problem:
    "This left them stuck with problems they couldn't find in the FAQ, until they eventually gave up searching and contacted CS directly.",
};
