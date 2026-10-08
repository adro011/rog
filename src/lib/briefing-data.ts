import type { Act, ActId, Slide } from "./briefing-types";
import {
  clipACaptions,
  clipBCaptions,
  clipCCaptions,
  collegeCaptions,
  exchangeCaptions,
  fuelCaptions,
  introCaptions,
} from "./briefing-films";

export const BRIEF_DATE = "01 September 2026";
export const TOTAL_SEC = 40 * 60;

export const ACTS: Act[] = [
  {
    id: "intro",
    index: "01",
    title: "Cold open",
    subtitle: "Iran–Israel: the fuel crisis",
    runtime: "5:00",
    durationSec: 300,
    cue: "Video 2 min · speaker 3 min",
  },
  {
    id: "present",
    index: "02",
    title: "Israel’s position",
    subtitle: "Economy, budget, Iran standing, bombing",
    runtime: "8:00",
    durationSec: 480,
    cue: "Video 4 min · speaker 4 min",
  },
  {
    id: "rise",
    index: "03",
    title: "The rise",
    subtitle: "Prologue, 1948 to the open war",
    runtime: "6:00",
    durationSec: 360,
    cue: "Three clips · speaker",
  },
  {
    id: "usa",
    index: "04",
    title: "The American shadow",
    subtitle: "WW2, nuclear treaty, Trump, the clashes",
    runtime: "5:00",
    durationSec: 300,
    cue: "Speaker 5 min",
  },
  {
    id: "cost",
    index: "05",
    title: "Casualties & fuel",
    subtitle: "Human cost, country report, campus film",
    runtime: "12:00",
    durationSec: 720,
    cue: "Fuel film 3 min · college film 5 min",
  },
  {
    id: "future",
    index: "06",
    title: "Solution",
    subtitle: "Market threat, WW3 risk, the ladder",
    runtime: "4:00",
    durationSec: 240,
    cue: "Close",
  },
];

export const SLIDES: Slide[] = [
  {
    id: "i1",
    act: "intro",
    kind: "cover",
    durationSec: 10,
    kicker: "Special briefing",
    title: "The Chokepoint",
    subtitle: "Iran, Israel & the global fuel crisis",
    image: "/briefing/briefing-room.jpg",
    meta: [BRIEF_DATE, "Net time 40:00", "Classification: open source"],
    notes:
      "Stand still for ten seconds. Let the room go quiet. Do not greet yet. The title is the first sentence of the hour.",
  },
  {
    id: "i2",
    act: "intro",
    kind: "cover",
    durationSec: 25,
    kicker: "From flashpoint to fuel shock",
    title: "A rivalry that prices the world",
    subtitle:
      "How a decades-long confrontation can travel through one narrow waterway, reach every fuel pump — and what governments can still do.",
    image: "/briefing/hormuz-aerial.jpg",
    meta: ["Iran–Israel conflict", "Global energy", "Not a forecast"],
    notes:
      "Introduce yourself in one line. Then: this is a systems brief, not a rooting interest. We will move through six acts in forty minutes. Figures come from public reporting as of 1 September 2026 and often disagree. We will say so when they do.",
  },
  {
    id: "i3",
    act: "intro",
    kind: "agenda",
    durationSec: 35,
    kicker: "Run of show",
    title: "Forty minutes, six acts",
    notes:
      "Walk the rundown with your hand, not a laser. Flag the video blocks so the room knows when to watch and when to listen. Promise the close: peace lowers the risk, resilience lowers the cost.",
  },
  {
    id: "i4",
    act: "intro",
    kind: "film",
    durationSec: 120,
    kicker: "Intro film",
    title: "The waterway",
    filmLabel: "Film 01 · Intro · 2:00",
    video: "/briefing/hormuz-fly.mp4",
    stills: [
      "/briefing/hormuz-aerial.jpg",
      "/briefing/tanker.jpg",
      "/briefing/gulf-satellite.jpg",
      "/briefing/petrol-night.jpg",
    ],
    captions: introCaptions,
    notes:
      "Do not talk over the film unless a caption fails. After it ends, take one breath, then go to the question.",
  },
  {
    id: "i5",
    act: "intro",
    kind: "quote",
    durationSec: 55,
    kicker: "Speaker",
    title: "The question",
    quote:
      "The first casualty is confidence. The next is affordability.",
    attribution: "Working line for this brief",
    image: "/briefing/petrol-night.jpg",
    notes:
      "Restate the question in your own words: how does a war between Iran and Israel become a fuel crisis in countries that are not fighting? Answer in one sentence: because twenty percent of the world’s oil liquids still have to thread Hormuz, and markets punish uncertainty faster than engineers can reroute barrels.",
  },
  {
    id: "i6",
    act: "intro",
    kind: "map",
    durationSec: 55,
    kicker: "The geography",
    title: "One strait. Global price.",
    image: "/briefing/gulf-satellite.jpg",
    lead: "In the first half of 2025 the EIA put Hormuz flows at 20.9 million barrels a day — about 20% of global petroleum liquids consumption, and a quarter of maritime oil trade.",
    pins: [
      { label: "Iran", sub: "Northern shore", x: "42%", y: "28%" },
      { label: "Strait of Hormuz", sub: "21 miles at the pinch", x: "58%", y: "48%" },
      { label: "Oman", sub: "Musandam peninsula", x: "72%", y: "62%" },
      { label: "Persian Gulf", sub: "Export basin", x: "28%", y: "52%" },
    ],
    notes:
      "Point to the pinch. Say: tankers from every Gulf producer except those with redundant pipelines must pass here. Qatar’s LNG also. That is why a local war becomes a global fuel story. Then: we leave geography and look at the two states standing over it.",
  },
  {
    id: "p0",
    act: "present",
    kind: "section",
    durationSec: 12,
    kicker: "Act 02 · Present",
    title: "Israel’s position in the Middle East",
    image: "/briefing/desert-glow.jpg",
    actIndex: "02",
    runtime: "8:00",
    cue: "Economy · budget · Iran stands · bombing · film 4:00",
    notes: "Section card. Name the act. Sit back for one beat.",
  },
  {
    id: "p1",
    act: "present",
    kind: "split",
    durationSec: 50,
    kicker: "Present tense",
    title: "A small state with a long reach",
    image: "/briefing/desert-glow.jpg",
    lead: "Israel’s ‘domination’ in the region is not occupation of the map. It is a stack: air force, intelligence, missile defence, a defence-export industry, and a superpower ally.",
    bullets: [
      {
        title: "Military rank",
        body: "Among the most capable air and intel forces on earth, despite a population under ten million.",
      },
      {
        title: "Defence industry",
        body: "Reported weapons exports on the order of $19 billion in the last full year — a state that sells security as well as consumes it.",
      },
      {
        title: "The 2024–26 wars",
        body: "Hamas, Hezbollah, and then Iran itself. Each campaign expanded the envelope of what Jerusalem would do alone — and with Washington.",
      },
    ],
    notes:
      "Be precise: ‘domination’ here means military-technological superiority and freedom of action, not uncontested political control. Iran, Turkey, and the Gulf states still set limits. Israel can strike deeply. It cannot freeze the region.",
  },
  {
    id: "p2",
    act: "present",
    kind: "stats",
    durationSec: 45,
    kicker: "Stable economy — under strain",
    title: "A rich war economy",
    lead: "Israel entered this decade as a high-income tech and defence economy. The wars did not collapse it. They militarised the budget.",
    stats: [
      { value: "Top 25", label: "Per-capita GDP", hint: "High-income OECD peer set" },
      { value: "7–9%", label: "Defence / GDP", hint: "Spiked after 7 Oct 2023" },
      { value: "$49B", label: "2026 defence budget", hint: "About 6% above 2025" },
    ],
    footnote:
      "Orders of magnitude from open budget reporting, 2025–26. Not a live treasury feed.",
    notes:
      "The economy is stable relative to a war of this scale — that is the point. It is not costless. Labour, reserves, tourism, and capital all took hits. But the state can still fund a high-tempo air campaign. That is rare in the region and it shapes Iran’s calculations.",
  },
  {
    id: "p3",
    act: "present",
    kind: "split",
    durationSec: 40,
    kicker: "Budget",
    title: "Who pays for the edge",
    image: "/briefing/briefing-room.jpg",
    lead: "The Israeli defence budget is Israeli. American money is still a strategic lubricant — and a political argument in Washington.",
    bullets: [
      {
        title: "$3.8B / year",
        body: "Baseline US security assistance under the 2019–2028 memorandum: $3.3B FMF plus $500M missile defence.",
      },
      {
        title: "Share of the pie",
        body: "Once ~20% of Israel’s defence budget; spiked above a third with post-Oct-7 supplementals; falling back toward 10% as Israel spends more of its own money.",
      },
      {
        title: "The politics",
        body: "Netanyahu has talked about weaning off aid. Congress is no longer unanimous. The 2026 campaign is being fought with both Israeli shekels and American munitions.",
      },
    ],
    notes:
      "Do not oversell US aid as the whole story — 0.6% of Israeli GDP at the MOU level. Do not undersell it either: interceptors, F-35s, and the political signal of resupply are not items you buy off a shelf in a week.",
  },
  {
    id: "p4",
    act: "present",
    kind: "compare",
    durationSec: 50,
    kicker: "Iran stands tall",
    title: "Two strengths, two weaknesses",
    leftTitle: "Israel",
    rightTitle: "Iran",
    left: [
      { title: "Air & intel", body: "Precision strike, missile defence, US resupply." },
      { title: "Economy", body: "High-income, sanctioned far less, tech exports." },
      { title: "Risk", body: "Small geography, hostage to interceptors and US stocks." },
    ],
    right: [
      { title: "Geography & oil", body: "Holds the northern shore of Hormuz. Can tax the world’s oil without occupying it." },
      { title: "Missiles, drones, proxies", body: "Depth through Hezbollah, Houthis, Iraqi factions — degraded, not gone." },
      { title: "Risk", body: "Sanctions, damaged nuclear sites, leadership shock, a currency already thin." },
    ],
    notes:
      "This is the ‘Iran stands tall’ slide. After Khamenei’s death and twelve months of bombardment, Tehran is weaker as a conventional power and still dangerous as a chokepoint power. That distinction is the whole present tense.",
  },
  {
    id: "p5",
    act: "present",
    kind: "timeline",
    durationSec: 43,
    kicker: "Bombing",
    title: "The old boundary broke",
    items: [
      {
        year: "Apr 2024",
        title: "Direct fire",
        body: "Iran’s first large ballistic salvo on Israel; a limited Israeli reply inside Iran.",
      },
      {
        year: "Jun 2025",
        title: "Twelve-day war",
        body: "Israeli strikes on nuclear and military sites; US bunker-busters on Fordow, Natanz, Isfahan; a fast ceasefire.",
      },
      {
        year: "28 Feb 2026",
        title: "Epic Fury / Roaring Lion",
        body: "Joint opening salvo. Leadership targets. A regional missile-and-drone answer. Hormuz becomes the second front.",
      },
    ],
    notes:
      "Keep it chronological. You are handing the room to the four-minute film. Last line: ‘Watch how a military campaign becomes an energy campaign.’",
  },
  {
    id: "p6",
    act: "present",
    kind: "film",
    durationSec: 240,
    kicker: "War film",
    title: "From shadow war to open sky",
    filmLabel: "Film 02 · Exchanges · 4:00",
    video: "/briefing/desert-pan.mp4",
    stills: [
      "/briefing/desert-glow.jpg",
      "/briefing/refinery.jpg",
      "/briefing/tanker.jpg",
      "/briefing/hormuz-aerial.jpg",
    ],
    captions: exchangeCaptions,
    notes: "Silent. After the film: one sentence — ‘That is the present. Now the past that made it possible.’",
  },
  {
    id: "r0",
    act: "rise",
    kind: "section",
    durationSec: 12,
    kicker: "Act 03 · Past",
    title: "The rise of Iran and Israel",
    image: "/briefing/briefing-room.jpg",
    actIndex: "03",
    runtime: "6:00",
    cue: "Prologue · three clips · 1948 to 2026",
    notes: "Prologue card. Tell them this is the origin story in six minutes.",
  },
  {
    id: "r1",
    act: "rise",
    kind: "split",
    durationSec: 48,
    kicker: "1948–1978",
    title: "A quiet strategic partnership",
    image: "/briefing/tanker.jpg",
    lead: "The rivalry is modern. Its first form was cooperation.",
    bullets: [
      {
        title: "Recognition",
        body: "Imperial Iran recognized Israel. Trade, oil, and security ties ran under the Shah, often out of public view.",
      },
      {
        title: "Periphery doctrine",
        body: "Ben-Gurion’s bet: align with non-Arab powers on the rim of the Arab world — Iran, Turkey, Ethiopia.",
      },
      {
        title: "What it was not",
        body: "Not a love story. A balance-of-power story. That is why a revolution could erase it so fast.",
      },
    ],
    notes:
      "Kill the myth of eternal enmity in thirty seconds. Then the first clip.",
  },
  {
    id: "r2",
    act: "rise",
    kind: "film",
    durationSec: 40,
    kicker: "Clip A",
    title: "Partners, not twins",
    filmLabel: "Clip A · Partnership · 0:40",
    video: "/briefing/tanker-track.mp4",
    stills: ["/briefing/tanker.jpg", "/briefing/briefing-room.jpg"],
    captions: clipACaptions,
    notes: "Silent.",
  },
  {
    id: "r3",
    act: "rise",
    kind: "split",
    durationSec: 48,
    kicker: "1979",
    title: "The revolution resets the relationship",
    image: "/briefing/desert-glow.jpg",
    lead: "The Islamic Republic replaced a partner with a revolutionary enemy — and built a foreign policy that needed that enemy.",
    bullets: [
      {
        title: "Ideology",
        body: "Israel as the occupying outpost; the United States as the distant hand. Hostility became identity, not just interest.",
      },
      {
        title: "Export of the revolution",
        body: "Support for armed groups opposed to Israel, first and most consequentially in Lebanon.",
      },
      {
        title: "The hostage of 1979",
        body: "The US embassy crisis locked Washington into the triangle. Iran–Israel was never again a two-player game.",
      },
    ],
    notes:
      "Emphasize: 1979 is the hinge. Everything after is variation on revolutionary hostility plus American involvement.",
  },
  {
    id: "r4",
    act: "rise",
    kind: "film",
    durationSec: 40,
    kicker: "Clip B",
    title: "The war leaves the map of states",
    filmLabel: "Clip B · Revolution · 0:40",
    video: "/briefing/desert-pan.mp4",
    stills: ["/briefing/desert-glow.jpg", "/briefing/refinery.jpg"],
    captions: clipBCaptions,
    notes: "Silent.",
  },
  {
    id: "r5",
    act: "rise",
    kind: "timeline",
    durationSec: 44,
    kicker: "1980s–2010s",
    title: "Proxies, then a shadow war",
    items: [
      {
        year: "1980s",
        title: "Lebanon",
        body: "Hezbollah is born in the wreckage of the Lebanese war. A northern front that will last two generations.",
      },
      {
        year: "1990s–2000s",
        title: "Connected arenas",
        body: "Gaza, Syria, Iraq. Missiles, intelligence operations, and the nuclear file deepen distrust.",
      },
      {
        year: "2010s",
        title: "Shadow war",
        body: "Cyberattacks, covert killings, maritime incidents, strikes on Iranian-linked forces — pressure without sustained direct war.",
      },
    ],
    notes:
      "Name Hezbollah, the nuclear file, and Stuxnet if you have time. Then clip C.",
  },
  {
    id: "r6",
    act: "rise",
    kind: "film",
    durationSec: 40,
    kicker: "Clip C",
    title: "The boundary breaks",
    filmLabel: "Clip C · Direct war · 0:40",
    video: "/briefing/hormuz-fly.mp4",
    stills: ["/briefing/hormuz-aerial.jpg", "/briefing/desert-glow.jpg"],
    captions: clipCCaptions,
    notes: "Silent.",
  },
  {
    id: "r7",
    act: "rise",
    kind: "stats",
    durationSec: 88,
    kicker: "2024–2026",
    title: "Direct exchanges, then a campaign",
    lead: "Once missiles flew the other way in 2024, planners in three capitals started to treat a general war as a scenario, not a taboo.",
    stats: [
      { value: "2024", label: "First large direct salvos", hint: "April and October" },
      { value: "12 days", label: "June 2025 air war", hint: "US enters on Fordow" },
      { value: "8 months", label: "The false peace", hint: "Ceasefire, no treaty" },
    ],
    footnote: "Then 28 February 2026. The prologue ends; the American shadow is already in the room.",
    notes:
      "Use the extra time. Connect to the next act: none of this is intelligible without Washington — the treaty, the exit from the treaty, the bombs, the talks.",
  },
  {
    id: "u0",
    act: "usa",
    kind: "section",
    durationSec: 12,
    kicker: "Act 04 · Past + present",
    title: "The conflict and the American shadow",
    image: "/briefing/briefing-room.jpg",
    actIndex: "04",
    runtime: "5:00",
    cue: "WW2 · nuclear treaty · Trump · the clashes on the US",
    notes: "Name the act in the language of the outline: the shadow hand. Then be factual.",
  },
  {
    id: "u1",
    act: "usa",
    kind: "timeline",
    durationSec: 58,
    kicker: "Architecture",
    title: "How America became the third party",
    items: [
      {
        year: "1945–53",
        title: "After the world war",
        body: "US power replaces Britain east of Suez over a generation. Oil, bases, and the Cold War make the Gulf an American interest.",
      },
      {
        year: "1953",
        title: "The coup in Iran",
        body: "Washington and London help restore the Shah. A wound that the 1979 revolution never stopped citing.",
      },
      {
        year: "1979–80s",
        title: "The triangle locks",
        body: "Embassy crisis, the Iran–Iraq war, the tanker war. The US fights to keep Hormuz open long before 2026.",
      },
    ],
    notes:
      "You have under a minute. Hit 1953 and the tanker war of the 1980s — the first time Hormuz was a battlefield for Washington.",
  },
  {
    id: "u2",
    act: "usa",
    kind: "split",
    durationSec: 70,
    kicker: "The treaty",
    title: "The nuclear deal, and the hole it left",
    image: "/briefing/refinery.jpg",
    lead: "The Joint Comprehensive Plan of Action was the last serious attempt to trade sanctions for nuclear limits. Its collapse is the diplomatic prehistory of the 2026 war.",
    bullets: [
      {
        title: "2015 — signed",
        body: "P5+1 and Iran. Enrichment limits, inspections, sanctions relief. Israel’s government opposed it in public.",
      },
      {
        title: "2018 — US exit",
        body: "The first Trump administration leaves the JCPOA. Iran later breaches limits. Europe cannot hold the deal alone.",
      },
      {
        title: "2025–26 — talks, then bombs",
        body: "Direct talks resume after Trump’s return. They fail. IAEA findings, an Israeli strike in June 2025, then Epic Fury in February 2026 — during negotiations, in Ramadan.",
      },
    ],
    notes:
      "Stay linear. The room needs to hear: there was a treaty, America left it, later America tried to renegotiate it, and then America and Israel chose the military track while talks were still open. That is the ‘shadow hand’ in legal form.",
  },
  {
    id: "u3",
    act: "usa",
    kind: "split",
    durationSec: 80,
    kicker: "Negotiate and strike",
    title: "Trump’s two tracks",
    image: "/briefing/tanker.jpg",
    lead: "Maximum pressure, direct talks, a war, a ceasefire, a memorandum, a collapse. Diplomacy and force have been run as a single playlist.",
    bullets: [
      {
        title: "Maximum pressure, then talks",
        body: "2025: sanctions restored, first direct US–Iran nuclear talks since the JCPOA died. Israel opposed the talks; struck anyway in June 2025.",
      },
      {
        title: "Epic Fury",
        body: "28 February 2026. Authorized from Air Force One. Joint US–Israeli opening. Aim stated as nuclear, missiles, and regime weakening.",
      },
      {
        title: "Islamabad memorandum",
        body: "17 June 2026, Trump and Pezeshkian. Open the strait, ease the blockade, 60 days to talk nukes. In July, three ships are hit and the truce is declared over.",
      },
    ],
    notes:
      "This is the ‘how USA is trying to negotiate’ slide. Be even-handed: talks were real; so were the bombs; so was the Pakistani mediation. The pattern is: bargain, hit, bargain again. That pattern is still live in September.",
  },
  {
    id: "u4",
    act: "usa",
    kind: "stats",
    durationSec: 80,
    kicker: "The clashes upon the United States",
    title: "What the war costs Washington",
    lead: "The United States is not a commentator. It is a combatant, an insurer of last resort, and a political argument at home.",
    stats: [
      { value: "$113B", label: "US war cost by June", hint: "Open reporting, not a final audit" },
      { value: "19+", label: "US dead (military)", hint: "Plus wounded in the hundreds" },
      { value: "$68B+", label: "Extra US fuel spend", hint: "Consumers, through July" },
    ],
    footnote:
      "US figures as compiled in public tallies through mid-2026. Iranian, Israeli, and Gulf numbers are on the next act. Bases in Qatar, Bahrain, Jordan, the Emirates were in the missile picture. So was the Fifth Fleet.",
    notes:
      "Name the domestic clash: interceptor shortages reported in August, fights over munitions, a $1.5T Pentagon request, midterms in the background. The ‘clashes upon USA’ are military, fiscal, and electoral. Then pivot: the people who paid in blood are not only American.",
  },
  {
    id: "c0",
    act: "cost",
    kind: "section",
    durationSec: 12,
    kicker: "Act 05 · Casualties",
    title: "The human bill, then the fuel bill",
    image: "/briefing/oil-slick.jpg",
    actIndex: "05",
    runtime: "12:00",
    cue: "Casualties · fuel film 3:00 · country report · college film 5:00",
    notes: "Lower your voice. This act is longer because it has to be.",
  },
  {
    id: "c1",
    act: "cost",
    kind: "stats",
    durationSec: 70,
    kicker: "Casualties — sources disagree",
    title: "Thousands, not dozens",
    lead: "Britannica’s round-up: thousands dead in Iran and Lebanon, dozens in Israel and the Gulf, millions displaced. Below are reported bands, not a court finding.",
    stats: [
      { value: "3.4–6k+", label: "Iran dead, reported", hint: "OCHA / HRANA / US-Israeli claims differ" },
      { value: "570+", label: "Lebanon, early official", hint: "Hezbollah fighter deaths much higher in some tallies" },
      { value: "70+", label: "Israel, soldiers + civilians", hint: "Thousands injured" },
    ],
    footnote:
      "Early Iranian Red Crescent counts were lower; later Iranian and UN figures rose. Gulf civilians and soldiers died in the missile picture (UAE, Kuwait, Bahrain, Saudi Arabia). Treat every number as contested.",
    notes:
      "Do not perform a fake precision. Say: the war killed thousands in Iran, tore Lebanon again, and was not costless in Israel or the Gulf. Then displacement.",
  },
  {
    id: "c2",
    act: "cost",
    kind: "split",
    durationSec: 38,
    kicker: "Portrayal",
    title: "Not only a death toll",
    image: "/briefing/lecture-hall.jpg",
    lead: "A casualty is also a city that cannot keep the lights, a port that will not load, a family that will not go home this year.",
    bullets: [
      {
        title: "Lebanon",
        body: "More than a sixth of the population displaced after the war reopened the Israel–Hezbollah front.",
      },
      {
        title: "Iran",
        body: "Infrastructure, energy, and a leadership decapitation. Estimated economic cost in the hundreds of billions — a year of national output.",
      },
      {
        title: "The Gulf",
        body: "Cities that had bought safety with money discovered they were still on the flight path.",
      },
    ],
    notes: "Short. Then the fuel film. Promise: we will now watch the price move.",
  },
  {
    id: "c3",
    act: "cost",
    kind: "film",
    durationSec: 180,
    kicker: "Fuel crisis film",
    title: "How a war becomes a queue",
    filmLabel: "Film 03 · Fuel crisis · 3:00",
    video: "/briefing/petrol-push.mp4",
    stills: [
      "/briefing/petrol-night.jpg",
      "/briefing/oil-slick.jpg",
      "/briefing/asian-port.jpg",
      "/briefing/refinery.jpg",
    ],
    captions: fuelCaptions,
    notes: "Silent. Afterward, the transmission chart.",
  },
  {
    id: "c4",
    act: "cost",
    kind: "chart",
    durationSec: 45,
    kicker: "Transmission",
    title: "Prices moved before the wreckage did",
    chart: "brent",
    lead: "Illustrative Brent path from public reporting: ~$70 before the war, March average ~$103, prints above $120 after Hormuz was squeezed, then a jagged plateau. Not a live feed.",
    footnote: "IEA: the largest oil-supply disruption on record. Strategic releases did not restore the route.",
    notes:
      "Walk four steps: threat, insurance, tight products, household prices. Then countries.",
  },
  {
    id: "c5",
    act: "cost",
    kind: "countries",
    durationSec: 45,
    kicker: "Country-wise · Asia",
    title: "The four importers who sit on the pipe",
    lead: "China, India, Japan and South Korea take about 75% of the oil and a majority of the LNG that used to leave through Hormuz.",
    items: [
      {
        name: "China",
        share: "Largest buyer",
        note: "Can dip into stocks and Russian/Atlantic barrels, but Gulf grades and petrochemicals still bite. Diplomacy with both Tehran and Washington is now energy policy.",
      },
      {
        name: "India",
        share: "High Gulf share",
        note: "Pumps and food inflation are political. A fuel crisis here is a street crisis faster than in East Asia.",
      },
      {
        name: "Japan",
        share: "LNG + crude",
        note: "A high-income importer with thin domestic cushion. Industry and power feel a long disruption.",
      },
      {
        name: "South Korea",
        share: "Refining hub",
        note: "Exports products as well as consuming crude. A Hormuz shock hits the factory and the foreign account.",
      },
    ],
    notes:
      "One sentence each. If short on time, name the 75% statistic and move.",
  },
  {
    id: "c6",
    act: "cost",
    kind: "countries",
    durationSec: 30,
    kicker: "Country-wise · the rest",
    title: "Price shock, not always volume shock",
    lead: "The rest of the world mostly pays the number, not the shortage.",
    items: [
      {
        name: "Europe",
        share: "Price > barrels",
        note: "Less dependent on Hormuz crude than Asia, fully dependent on a global price. Diesel and chemicals transmit the shock.",
      },
      {
        name: "United States",
        share: "Politics + gasoline",
        note: "Not short of molecules in the same way. Still paid tens of billions extra at the pump, and is the fleet in the Gulf.",
      },
      {
        name: "Gulf exporters",
        share: "Stranded cargoes",
        note: "Oil in the ground is not oil in a customer’s tank. Qatar declared force majeure on LNG when the strait seized up.",
      },
      {
        name: "Low-income importers",
        share: "The quiet damage",
        note: "Kenya and others saw record pump prices and protest. This is where a ‘fuel crisis’ stops being a chart.",
      },
    ],
    notes: "Thirty seconds. Then hand the room to the five-minute campus film.",
  },
  {
    id: "c7",
    act: "cost",
    kind: "film",
    durationSec: 300,
    kicker: "College film",
    title: "How a chokepoint prices your week",
    filmLabel: "Film 04 · Campus briefing · 5:00",
    video: "/briefing/lecture-dolly.mp4",
    stills: [
      "/briefing/lecture-hall.jpg",
      "/briefing/asian-port.jpg",
      "/briefing/petrol-night.jpg",
      "/briefing/gulf-satellite.jpg",
      "/briefing/oil-slick.jpg",
    ],
    captions: collegeCaptions,
    notes:
      "This is the college video. Let it run. It is the teaching cut: mechanism, importers, households, reserves, LNG, the WW3 metaphor, what to watch. After it, you have four minutes to close.",
  },
  {
    id: "s0",
    act: "future",
    kind: "section",
    durationSec: 10,
    kicker: "Act 06 · Future",
    title: "Solution — before crisis becomes catastrophe",
    image: "/briefing/refinery.jpg",
    actIndex: "06",
    runtime: "4:00",
    cue: "Market threat · WW3 · the ladder",
    notes: "Last act. Energy in the voice, not panic.",
  },
  {
    id: "s1",
    act: "future",
    kind: "quote",
    durationSec: 40,
    kicker: "Energy market as transmission",
    title: "The WW3 that is not a mushroom cloud",
    quote:
      "Great powers can fight a limited war and still crash a global market. That is the potential threat — a stacked crisis of fuel, food, insurance, and alliances.",
    attribution: "The brief’s working definition — not a prediction",
    image: "/briefing/oil-slick.jpg",
    notes:
      "Reject cartoon WW3. Accept the real risk: a regional war that becomes a world economic war because of one strait. Then the ladder.",
  },
  {
    id: "s2",
    act: "future",
    kind: "ladder",
    durationSec: 110,
    kicker: "The solution ladder",
    title: "Manage the emergency. Then reduce the leverage.",
    steps: [
      {
        window: "0–30 days",
        title: "Stabilize",
        lead: "Keep routes open and markets informed.",
        points: [
          "Military deconfliction channels for civilian shipping",
          "Coordinated strategic-reserve releases — a bridge, not a bluff",
          "Protect shipping under international law, including the Omani shore",
          "Publish supply and inventory data so panic does not outrun barrels",
        ],
      },
      {
        window: "1–12 months",
        title: "Insulate",
        lead: "Shield people, not every unit of consumption.",
        points: [
          "Targeted cash over blanket fuel subsidies",
          "Refinery and product-swap flexibility",
          "Emergency freight and transit plans",
          "Restore nuclear and regional security diplomacy — the Islamabad track, repaired",
        ],
      },
      {
        window: "1–10 years",
        title: "Transform",
        lead: "Make chokepoints less powerful.",
        points: [
          "Electrify transport and freight",
          "Diversify generation and storage",
          "Pipelines and spare routes that actually exist in a crisis",
          "A regional forum for water, energy, and security — boring, durable, unglamorous",
        ],
      },
    ],
    notes:
      "This is the policy close. Spend the time. If you must cut, keep one line from each rung. Do not let the room leave on the war footage.",
  },
  {
    id: "s3",
    act: "future",
    kind: "close",
    durationSec: 80,
    kicker: "The central lesson",
    title: "Peace lowers the risk. Resilience lowers the cost.",
    image: "/briefing/hormuz-aerial.jpg",
    quote: "Diplomacy is the fastest route away from crisis. Energy diversification is the lasting route away from vulnerability.",
    lines: [
      "A forty-minute brief cannot end a war. It can stop a room from confusing a chokepoint with fate.",
      "Questions. Then the lights.",
    ],
    notes:
      "Read the lesson slowly. Thank the room. Open for questions. If asked for a forecast, refuse it: this was a systems brief, not a price target.",
  },
];

export const brentSeries = [
  { m: "Jan", p: 74 },
  { m: "Feb", p: 70 },
  { m: "Mar", p: 103 },
  { m: "Apr", p: 118 },
  { m: "May", p: 96 },
  { m: "Jun", p: 88 },
  { m: "Jul", p: 101 },
  { m: "Aug", p: 94 },
];

export const hormuzSeries = [
  { m: "4Q25", v: 20.7 },
  { m: "1Q26", v: 14.6 },
  { m: "Crisis", v: 2.1 },
  { m: "Aug", v: 6.8 },
];

export const asiaShare = [
  { name: "China", v: 32 },
  { name: "India", v: 18 },
  { name: "Japan", v: 14 },
  { name: "Korea", v: 11 },
  { name: "Other Asia", v: 12 },
  { name: "Rest", v: 13 },
];

export function actOf(id: ActId) {
  return ACTS.find((a) => a.id === id)!;
}

export function startIndexOf(actId: ActId) {
  return SLIDES.findIndex((s) => s.act === actId);
}

export function cumulativeStart(index: number) {
  let t = 0;
  for (let i = 0; i < index; i++) t += SLIDES[i].durationSec;
  return t;
}

export function totalDuration() {
  return SLIDES.reduce((a, s) => a + s.durationSec, 0);
}
