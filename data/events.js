/* Event data for the Haiti campaign tracker. This file is the single source: edit it by hand.

   To attach an X post or video to an event, add to its "sources" list:
     { "title": "what it shows", "publisher": "X (@handle)", "url": "https://x.com/handle/status/123", "date": "2026-11-18", "type": "x" }
   type is one of: article, x, video, report. Add "graphic": true to put a warning on violent footage.

   category: gang | military | people | politics | humanitarian
   location_precision: landmark | neighbourhood | commune | city | unknown | offmap (no marker)
   movement: { from_place, from: [lat, lon], to_place, to: [lat, lon] } draws a line that grows on the event's day.
   control_areas: dated outlines (see data/haiti-before.js for the format). Here mostly status "liberated": ground security
     forces have retaken and hold, per sources. Add a new dated outline for a name to grow or shrink it; to shrink the
     gang-controlled shading, add a "Greater Port-au-Prince" outline dated after 17 Oct 2026.
   Coordinates are approximate (from memory, not geocoded). */
window.HAITI_TRACKER = {
  "meta": {
    "title": "Haiti: the war on the gangs",
    "subtitle": "Gang activity, Salvadoran and coalition operations, and the public response, day by day.",
    "anchor_date": "2026-10-18",
    "anchor_label": "since the Santo ambush",
    "end": "2026-11-18",
    "compiled": "2026-11-18",
    "ranges": [
      {
        "id": "campaign",
        "label": "Since the ambush",
        "start": "2026-10-15"
      },
      {
        "id": "year",
        "label": "All of 2026",
        "start": "2026-01-01"
      }
    ]
  },
  "events": [
    {
      "id": "2026-01-15-delmas-cherizier-house",
      "date": "2026-01-15",
      "date_precision": "approx",
      "category": "military",
      "actor": "PNH",
      "title": "House of Viv Ansanm leader Chérizier destroyed in Delmas",
      "summary": "According to an ACLED expert comment, security operations in January 2026 destroyed a house belonging to Viv Ansanm coalition leader Jimmy 'Barbecue' Chérizier in Delmas. ACLED says this did not significantly change gang dynamics, and cites it as a precedent for the November strikes on gang leaders' houses.",
      "place": "Delmas, Port-au-Prince",
      "lat": 18.552,
      "lon": -72.325,
      "location_precision": "commune",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Is El Salvador's Military Deployment in Haiti Boosting Anti-Gang Efforts?",
          "publisher": "ACLED",
          "url": "https://acleddata.com/expert-comment/el-salvadors-military-deployment-haiti-boosting-anti-gang-efforts",
          "date": "2026-11-11",
          "type": "report"
        }
      ],
      "confidence": "low",
      "notes": "Only 'January 2026' is given; the day (15th) is a placeholder. Which force carried out the operation and the exact address are not stated in the source; 'PNH' as actor is an assumption from context."
    },
    {
      "id": "2026-02-07-tpc-steps-down",
      "date": "2026-02-07",
      "date_precision": "day",
      "category": "politics",
      "actor": "Government of Haiti",
      "title": "Transitional Presidential Council steps down",
      "summary": "The nine-member Transitional Presidential Council stepped down at a ceremony in Port-au-Prince with no succession plan, leaving Prime Minister Alix Didier Fils-Aimé solely in charge, according to Africanews. In January the council had tried to remove Fils-Aimé but backed down after Washington threatened consequences.",
      "place": "Port-au-Prince",
      "lat": 18.5425,
      "lon": -72.3386,
      "location_precision": "city",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Haiti's presidential council steps down with no succession plan",
          "publisher": "Africanews",
          "url": "https://www.africanews.com/2026/02/08/haitis-presidential-council-steps-down-with-no-succession-plan/",
          "date": "2026-02-08",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "The ceremony was held at 'a government office' in Port-au-Prince; exact venue not named."
    },
    {
      "id": "2026-03-29-petite-riviere-gran-grif",
      "date": "2026-03-29",
      "date_precision": "day",
      "category": "gang",
      "actor": "Gang: Gran Grif",
      "title": "Gran Grif attack on Petite-Rivière-de-l'Artibonite",
      "summary": "A gunfight between the Gran Grif gang and a vigilante (self-defence) group in Petite-Rivière-de-l'Artibonite killed at least 16 people and injured 10, according to the Wikipedia '2026 in Haiti' chronology citing an AP wire story. Rights activists alleged more than 30 dead and dozens missing; an Al Jazeera link dated 31 March refers to at least 70 killed according to a rights group.",
      "place": "Petite-Rivière-de-l'Artibonite, Artibonite",
      "lat": 19.1247,
      "lon": -72.4797,
      "location_precision": "commune",
      "casualties": {
        "killed": 16,
        "injured": 10,
        "note": "Official minimum; activists said 30+ dead; one rights group reportedly said at least 70 killed and 30 wounded."
      },
      "movement": null,
      "sources": [
        {
          "title": "Activists in Haiti say at least 30 people are dead after a gang attacks a town again",
          "publisher": "ABC News / AP (archived)",
          "url": "https://web.archive.org/web/20260331045837/https://abcnews.com/International/wireStory/activists-haiti-30-people-dead-after-gang-attacks-131544611",
          "date": "2026-03-31",
          "type": "article"
        },
        {
          "title": "2026 in Haiti",
          "publisher": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_in_Haiti",
          "date": null,
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "Death toll conflicts between sources (16 / 30+ / 70)."
    },
    {
      "id": "2026-04-01-gsf-first-troops",
      "date": "2026-04-01",
      "date_precision": "day",
      "category": "military",
      "actor": "GSF",
      "title": "First Gang Suppression Force troops (Chad) arrive",
      "summary": "An advance team of Chadian forces and GSF Special Representative Jack Christofides arrived in Port-au-Prince, the first deployment of the UN-backed Gang Suppression Force that replaced the Kenyan-led mission, according to Al Jazeera and the GSF website. The force is authorised for 5,500 personnel (5,550 in some sources) and, unlike the Kenyan mission, can make arrests.",
      "place": "Toussaint Louverture International Airport, Port-au-Prince",
      "lat": 18.58,
      "lon": -72.2925,
      "location_precision": "city",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "First troops from UN-backed Gang Suppression Force arrive in Haiti",
          "publisher": "Al Jazeera",
          "url": "https://www.aljazeera.com/news/2026/4/1/first-troops-from-un-backed-gang-suppression-force-arrive-in-haiti",
          "date": "2026-04-01",
          "type": "article"
        },
        {
          "title": "Gang Suppression Force — Haïti (official site)",
          "publisher": "GSF",
          "url": "https://gangsuppressionforce.org/",
          "date": null,
          "type": "report"
        },
        {
          "title": "Leader of UN-backed force and first Chadian troops arrive in Haiti as deployment begins",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/04/02/un-backed-haiti-gang-suppression-force/",
          "date": "2026-04-02",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Sources say 'arrived in Port-au-Prince'; the airport pin is an assumption. Wikipedia says about 400 Chadian soldiers, stationed at the Vertières base; Al Jazeera only says 'advance team'."
    },
    {
      "id": "2026-06-16-gsf-patrols-guterres-visit",
      "date": "2026-06-16",
      "date_precision": "approx",
      "category": "military",
      "actor": "GSF",
      "title": "GSF begins patrols; Guterres visits Camp Vertières",
      "summary": "UN News reported on 16 June 2026 that GSF troops from several countries were living at Camp Vertières on Boulevard du 15 Octobre, east of the capital, and that patrols were now being mounted, with foot patrols and forward operating bases to follow. Secretary-General António Guterres visited the base that week and said the deployment 'offers a real opportunity to curb violence'.",
      "place": "Camp Vertières, Boulevard du 15 Octobre, Tabarre",
      "lat": 18.575,
      "lon": -72.258,
      "location_precision": "neighbourhood",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "UN News story on the GSF's first operations (16 June 2026)",
          "publisher": "UN News",
          "url": "https://news.un.org/en/story/2026/06/1167732",
          "date": "2026-06-16",
          "type": "article"
        },
        {
          "title": "Gang Suppression Force — Haïti (official site)",
          "publisher": "GSF",
          "url": "https://gangsuppressionforce.org/",
          "date": null,
          "type": "report"
        }
      ],
      "confidence": "medium",
      "notes": "No exact start date for GSF operations is given; 16 June is the article date ('patrols are now being mounted'). Guterres visited 'on Tuesday' (16 June 2026 is a Tuesday). Exact coordinates of Camp Vertières are not known to me; pin is approximate on Boulevard du 15 Octobre."
    },
    {
      "id": "2026-07-22-gsf-tabarre-firefight",
      "date": "2026-07-22",
      "date_precision": "day",
      "category": "military",
      "actor": "GSF",
      "title": "GSF patrol kills three gunmen at Tabarre checkpoint",
      "summary": "According to a GSF press release, a GSF patrol was fired on near an illegal checkpoint in Tabarre, in territory held by the Kraze Baryè gang, and returned fire under its rules of engagement. Three armed elements were killed and no civilians were injured, the force said.",
      "place": "Tabarre",
      "lat": 18.5786,
      "lon": -72.27,
      "location_precision": "commune",
      "casualties": {
        "killed": 3,
        "injured": 0,
        "note": "Three 'armed elements' killed per GSF; no civilian injuries per GSF. Not independently verified."
      },
      "movement": null,
      "sources": [
        {
          "title": "Gang Suppression Force — Haïti (official site, press release of 22 July 2026)",
          "publisher": "GSF",
          "url": "https://gangsuppressionforce.org/",
          "date": "2026-07-22",
          "type": "report"
        }
      ],
      "confidence": "medium",
      "notes": "Single (official) source. Exact location of the checkpoint within Tabarre not given."
    },
    {
      "id": "2026-08-23-kenscoff-massacre",
      "date": "2026-08-23",
      "date_precision": "day",
      "category": "gang",
      "actor": "Gang: unknown (Viv Ansanm-linked, not named in sources read)",
      "title": "Gang attack on Kenscoff kills dozens",
      "summary": "A gang attack on Kenscoff, in the hills above Port-au-Prince, killed at least 47 people and dozens were kidnapped, according to a Guardian headline cited by Wikipedia; Le Monde reported around 40 dead. It was the deadliest single attack near the capital in the months before the Salvadoran deployment.",
      "place": "Kenscoff",
      "lat": 18.45,
      "lon": -72.285,
      "location_precision": "commune",
      "casualties": {
        "killed": 47,
        "injured": null,
        "note": "Guardian: at least 47 killed, dozens kidnapped; Le Monde: around 40 dead."
      },
      "movement": null,
      "sources": [
        {
          "title": "At least 47 killed and dozens kidnapped in gang attack near Haiti capital",
          "publisher": "The Guardian",
          "url": "https://www.theguardian.com/world/2026/aug/25/gang-attack-kenscoff-port-au-prince-haiti",
          "date": "2026-08-25",
          "type": "article"
        },
        {
          "title": "Around 40 dead in gang attack near Haiti's capital",
          "publisher": "Le Monde",
          "url": "https://www.lemonde.fr/en/international/article/2026/08/25/around-40-dead-in-gang-attack-near-haiti-s-capital_6756821_4.html",
          "date": "2026-08-25",
          "type": "article"
        },
        {
          "title": "2026 in Haiti",
          "publisher": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_in_Haiti",
          "date": null,
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "Guardian and Le Monde could not be fetched (blocked); details come from their headlines as cited on Wikipedia. Responsible gang and exact locality within Kenscoff not established."
    },
    {
      "id": "2026-10-05-gsf-tabarre-operation",
      "date": "2026-10-05",
      "date_precision": "day",
      "category": "military",
      "actor": "GSF",
      "title": "Several hundred GSF troops clear barricades in Tabarre",
      "summary": "According to the GSF, several hundred of its personnel, backed by armoured vehicles and helicopters, carried out a security operation in Tabarre, pushing into areas armoured vehicles could not reach. Troops removed numerous barricades and seized homemade explosive devices; suspected gang members withdrew after engagements. No casualty figures were given.",
      "place": "Tabarre",
      "lat": 18.5786,
      "lon": -72.27,
      "location_precision": "commune",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Gang Suppression Force — Haïti (official site, press release of 6 October 2026)",
          "publisher": "GSF",
          "url": "https://gangsuppressionforce.org/",
          "date": "2026-10-06",
          "type": "report"
        }
      ],
      "confidence": "medium",
      "notes": "Single (official) source."
    },
    {
      "id": "2026-10-06-gsf-route-soleil-9",
      "date": "2026-10-06",
      "date_precision": "day",
      "category": "military",
      "actor": "GSF",
      "title": "GSF search-and-clear raid on Route Soleil 9, Cité Soleil",
      "summary": "In the early hours, the GSF conducted an intelligence-led search-and-clear operation against gang-held positions on Route Soleil 9 in Cité Soleil, according to the force. Two suspects were apprehended, two were killed and several others critically wounded; three firearms, ammunition, a radio and two motorcycles were seized.",
      "place": "Route Soleil 9, Cité Soleil",
      "lat": 18.588,
      "lon": -72.32,
      "location_precision": "neighbourhood",
      "casualties": {
        "killed": 2,
        "injured": null,
        "note": "Two suspects killed, 'several' critically wounded, two arrested, per GSF."
      },
      "movement": null,
      "sources": [
        {
          "title": "Gang Suppression Force — Haïti (official site, press release of 6 October 2026)",
          "publisher": "GSF",
          "url": "https://gangsuppressionforce.org/",
          "date": "2026-10-06",
          "type": "report"
        }
      ],
      "confidence": "medium",
      "notes": "Single (official) source. Coordinates for Route Soleil 9 are approximate."
    },
    {
      "id": "2026-10-18-ambush",
      "date": "2026-10-18",
      "date_precision": "day",
      "category": "gang",
      "actor": "Gang: Chen Mechan (suspected; unclaimed)",
      "title": "Four Salvadoran GSF air technicians vanish after Santo ambush",
      "summary": "On Sunday afternoon, armed men attacked a GSF armoured vehicle with gunfire and explosives and set it ablaze in Santo, Croix-des-Bouquets, as four Salvadoran Air Force aviation technicians returned from buying food. The Salvadoran military says the four escaped the burning vehicle and then went missing; Haiti's government says they were abducted. The area is controlled by Chen Mechan and borders 400 Mawozo territory; no group has claimed the attack.",
      "place": "Santo, Croix-des-Bouquets",
      "lat": 18.583,
      "lon": -72.248,
      "location_precision": "neighbourhood",
      "casualties": {
        "killed": null,
        "injured": null,
        "note": "Four Salvadoran technicians missing; fate unknown as of 18 Nov 2026. 400 Mawozo leader Wilson Joseph claims they are dead (no evidence); El Salvador maintains they are alive."
      },
      "movement": null,
      "sources": [
        {
          "title": "Salvadoran special forces arrive in Haiti to find missing soldiers",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/10/23/salvadoran-contingent-arrives-haiti-search-four-missing-soldiers/",
          "date": "2026-10-23",
          "type": "article"
        },
        {
          "title": "2026 Croix-des-Bouquets kidnapping",
          "publisher": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Croix-des-Bouquets_kidnapping",
          "date": null,
          "type": "article"
        },
        {
          "title": "Gangs in Haiti Target Foreign Troops in the Biggest Attack Since a New Force Began Operations",
          "publisher": "Associated Press",
          "url": "https://apnews.com/article/haiti-gangs-salvador-attack-military-dd5d4b617fc526d3f7d994274732fc7e",
          "date": "2026-10-19",
          "type": "article"
        },
        {
          "title": "Four Salvadoran air force members missing after gang ambush in Haiti",
          "publisher": "Reuters",
          "url": "https://www.reuters.com/business/aerospace-defense/four-salvadoran-air-force-members-missing-after-gang-ambush-haiti-2026-10-19/",
          "date": "2026-10-19",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Sources differ on details: 'market' vs 'supermarket'; Haitian Times (18 Nov) describes the vehicle as an 'ambulance' while others say armoured vehicle; some outlets say 'soldiers', El Salvador stresses 'non-combat aviation technicians'. Per NYT (via La Prensa Gráfica) they were shopping in a restricted 'red zone'. AP and Reuters could not be fetched (blocked); URLs from Wikipedia references."
    },
    {
      "id": "2026-10-21-pnh-gsf-cul-de-sac-offensive",
      "date": "2026-10-21",
      "date_precision": "approx",
      "category": "military",
      "actor": "PNH",
      "title": "PNH-GSF offensive in Plaine du Cul-de-Sac after the ambush",
      "summary": "Haitian police, with the army holding approaches to the capital and GSF support, launched an offensive in the Plaine du Cul-de-Sac that began on 18 October and intensified on Wednesday 21 October, when forces entered Croix-des-Bouquets from 5:00 a.m., according to EFE via Diario El Mundo. Operations hit Croix-des-Missions, Santo, Carrefour Marassa and the 'Dyo' and 'Las Vegas' corridors; unofficial preliminary reports said at least 18 gang members were killed and 13 seriously injured. Wikipedia adds that four GSF personnel were injured and that Erik Prince's Vectus Global took part with the PNH task force.",
      "place": "Croix-des-Missions / Santo / Carrefour Marassa, Plaine du Cul-de-Sac",
      "lat": 18.587,
      "lon": -72.26,
      "location_precision": "neighbourhood",
      "casualties": {
        "killed": 18,
        "injured": 17,
        "note": "Unofficial: at least 18 gang members killed and 13 seriously injured (EFE/El Mundo); 4 GSF personnel injured (Wikipedia). No official toll."
      },
      "movement": null,
      "sources": [
        {
          "title": "Haití lanza ofensiva contra pandillas tras secuestro de militares salvadoreños",
          "publisher": "Diario El Mundo (EFE)",
          "url": "https://diario.elmundo.sv/nacionales/haiti-lanza-ofensiva-contra-pandillas-tras-secuestro-de-salvadorenos",
          "date": "2026-10-22",
          "type": "article"
        },
        {
          "title": "Mueren varios pandilleros haitianos en operativo para buscar a militares salvadoreños",
          "publisher": "La Prensa Gráfica (EFE)",
          "url": "https://www.laprensagrafica.com/internacional/mueren-varios-pandilleros-haitianos-en-operativo-para-buscar-a-militares-salvadorenos-20261020-0074.html",
          "date": "2026-10-20",
          "type": "article"
        },
        {
          "title": "2026 Croix-des-Bouquets kidnapping",
          "publisher": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Croix-des-Bouquets_kidnapping",
          "date": null,
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "Offensive spans 18-21 Oct; Wikipedia dates the helicopter phase to 19-20 Oct (inconsistently). On 19 Oct a Salvadoran helicopter searching the area was shot at (Wikipedia). La Prensa Gráfica returned HTTP 403 and was not read. Pin is a midpoint between the named localities."
    },
    {
      "id": "2026-10-21-bukele-announces-operation",
      "date": "2026-10-21",
      "date_precision": "day",
      "category": "politics",
      "actor": "El Salvador",
      "title": "Bukele announces military rescue operation, threatens gangs",
      "summary": "President Nayib Bukele announced on X at 12:58 that El Salvador had launched a military operation to rescue the four technicians, saying 'We have a single objective: to bring our four compatriots home alive'. He warned gang leaders: 'We have already finished with the gangs in El Salvador, and we can finish with yours too.' The same day Haitian PM Fils-Aimé called the release an 'absolute priority', and gang leader Krisla posted a video saying 'we'll fight to the end'.",
      "place": "San Salvador, El Salvador (statement on X)",
      "lat": null,
      "lon": null,
      "location_precision": "offmap",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Bukele anuncia operación militar para rescatar a cuatro militares salvadoreños secuestrados en Haití",
          "publisher": "Diario El Mundo",
          "url": "https://diario.elmundo.sv/politica/bukele-anuncia-operacion-militar-para-rescatar-a-cuatro-militares-salvadorenos-secuestrados-en-haiti",
          "date": "2026-10-21",
          "type": "article"
        },
        {
          "title": "Nayib Bukele post announcing the operation",
          "publisher": "X (@nayibbukele)",
          "url": "https://x.com/nayibbukele/status/2112981920741310695",
          "date": "2026-10-21",
          "type": "x"
        },
        {
          "title": "Bukele Says Military Operation Launched to Rescue Salvadorans Held by Gangs in Haiti",
          "publisher": "Associated Press",
          "url": "https://apnews.com/article/el-salvador-haiti-bukele-gangs-hostages-822efd292abcd7caa13cf085956f93cc",
          "date": "2026-10-21",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Event location is outside Haiti (statement issued from El Salvador; exact place not stated). Al Jazeera says part of the post was in Haitian Creole. The Krisla video URL was not found."
    },
    {
      "id": "2026-10-22-special-forces-arrive",
      "date": "2026-10-22",
      "date_precision": "day",
      "category": "military",
      "actor": "El Salvador",
      "title": "First 100 Salvadoran special forces land in Port-au-Prince",
      "summary": "The GSF confirmed on 22 October the arrival of a Salvadoran contingent of about 100 special forces soldiers, with another 100 expected later that day, according to the Haitian Times citing AP. The GSF said it was continuing operations with the PNH and urged Santo residents to avoid operation areas; residents of Clercine and Marin reported gunfire that evening and some fled.",
      "place": "Toussaint Louverture International Airport, Port-au-Prince",
      "lat": 18.58,
      "lon": -72.2925,
      "location_precision": "landmark",
      "casualties": null,
      "movement": {
        "from_place": "El Salvador (San Salvador; exact departure base not stated)",
        "from": [
          13.6929,
          -89.2182
        ],
        "to_place": "Port-au-Prince (Toussaint Louverture airport)",
        "to": [
          18.58,
          -72.2925
        ]
      },
      "sources": [
        {
          "title": "Salvadoran special forces arrive in Haiti to find missing soldiers",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/10/23/salvadoran-contingent-arrives-haiti-search-four-missing-soldiers/",
          "date": "2026-10-23",
          "type": "article"
        },
        {
          "title": "GSF announcement of the Salvadoran contingent's arrival",
          "publisher": "X (@gsforcehaiti)",
          "url": "https://x.com/gsforcehaiti/status/2113430424508612706",
          "date": "2026-10-22",
          "type": "x"
        },
        {
          "title": "El Salvador Deploys Special Forces to Haiti to Help Find 4 Missing Soldiers who Came Under Attack",
          "publisher": "Associated Press",
          "url": "https://apnews.com/article/el-salvador-haiti-special-forces-gangs-03ec2bf89616d8b313c54da34c24eab1",
          "date": "2026-10-22",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Arrival airport is assumed (sources say 'arrived in Haiti/Port-au-Prince'); the Salvadoran departure airfield is not stated. Some outlets date the arrival to 23 Oct. Later reporting says US Southern Command C-130s helped move troops and that helicopters staged through a Dominican base near the border."
    },
    {
      "id": "2026-10-23-lanmo-san-jou-video",
      "date": "2026-10-23",
      "date_precision": "day",
      "category": "gang",
      "actor": "Gang: 400 Mawozo",
      "title": "Lanmò San Jou video: 'waiting' for the Salvadorans",
      "summary": "Wilson Joseph, alias Lanmò San Jou, leader of 400 Mawozo, posted a video displaying ammunition and saying he would wait for the Salvadorans and not flee, according to Wikipedia citing La Prensa Gráfica. The Haitian Times reported that he and Carrefour-area gang leader Christ-Roi 'Krisla' Chéry warned that Salvadoran troops would meet resistance if they entered gang areas on foot rather than relying on drones and helicopters.",
      "place": "Croix-des-Bouquets (400 Mawozo stronghold; filming location not stated)",
      "lat": 18.5768,
      "lon": -72.2263,
      "location_precision": "commune",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Wilson Joseph 'Lanmò San Jou', señalado de ser líder de pandilla haitiana, publica mensaje",
          "publisher": "La Prensa Gráfica",
          "url": "https://www.laprensagrafica.com/internacional/wilson-joseph-conocido-como-lanm-san-jou-y-senalado-de-ser-lider-de-pandilla-haitiana-dice-estar-esperando-a-presidente-salvadoreno-20261023-0028.html",
          "date": "2026-10-23",
          "type": "article"
        },
        {
          "title": "Salvadoran special forces arrive in Haiti to find missing soldiers",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/10/23/salvadoran-contingent-arrives-haiti-search-four-missing-soldiers/",
          "date": "2026-10-23",
          "type": "article"
        },
        {
          "title": "2026 Croix-des-Bouquets kidnapping",
          "publisher": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Croix-des-Bouquets_kidnapping",
          "date": null,
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "No direct URL for the video was found. La Prensa Gráfica returned HTTP 403 (not read). Where the video was filmed is unknown; pin is the gang's home commune."
    },
    {
      "id": "2026-10-24-remains-handed-over",
      "date": "2026-10-24",
      "date_precision": "day",
      "category": "gang",
      "actor": "Gang: Chen Mechan",
      "title": "Burned remains handed over; Bukele says 'not our men'",
      "summary": "According to NAGO News summarising the New York Times and Miami Herald, the US-funded medevac organisation HERO was contacted 'through humanitarian channels' and collected burned remains in garbage bags at a drop-off point in Chen Mechan territory, after the gang signalled it wanted to return 'the remains of Salvadorians'. Bukele said on X that evening that the remains were not the four technicians, claiming they included a child and a much taller man. On 25 October the GSF said it had received remains 'suspected' to be the soldiers' but could not confirm identity.",
      "place": "Chen Mechan territory, Croix-des-Bouquets (exact drop-off point not disclosed)",
      "lat": 18.583,
      "lon": -72.248,
      "location_precision": "unknown",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Haiti: Bukele says the remains found are not those of the four Salvadoran soldiers",
          "publisher": "NAGO News",
          "url": "https://nago.tv/en/news/bukele-affirme-que-les-restes-retrouves-en-haiti-ne-sont-pas-ceux-des-quatre-militaires-salvadoriens",
          "date": "2026-10-24",
          "type": "article"
        },
        {
          "title": "El Salvador president says bodies found in Haiti are not those of hostages",
          "publisher": "BBC",
          "url": "https://www.bbc.com/news/articles/c8ly097zw1xwo",
          "date": "2026-10-25",
          "type": "article"
        },
        {
          "title": "Bukele denies bodies story (Haitian Times, 25 Oct 2026)",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/10/25/bukele-denies-bodies-haiti-anti-gang-force-salvadoran-soldiers/",
          "date": "2026-10-25",
          "type": "article"
        },
        {
          "title": "Salvadoran soldiers / remains found in Haiti",
          "publisher": "The New York Times",
          "url": "https://www.nytimes.com/2026/10/24/world/americas/salvadoran-soldiers-haiti-dead.html",
          "date": "2026-10-24",
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "Conflict: HERO says it collected the remains at a gang drop-off point; Bukele said an NGO handed them over at Toussaint Louverture airport. A Chadian military ID found with the remains belonged to a living Chadian soldier who lost it, per the GSF. No identification result has been published. BBC, NYT and the Haitian Times piece were not readable (blocked / rate-limited). Pin is a placeholder at Santo."
    },
    {
      "id": "2026-10-24-dominican-border-reinforced",
      "date": "2026-10-24",
      "date_precision": "approx",
      "category": "military",
      "actor": "Dominican Republic",
      "title": "Dominican Republic reinforces Haitian border at Jimaní",
      "summary": "The Dominican Army sent a convoy to reinforce the border after the Salvadorans' disappearance; at least seven army vehicles arrived in Jimaní, according to Diario Libre via EFE. Presidency Minister José Ignacio Paliza said on 22 October that more than 10,000 military personnel were deployed along the roughly 300 km border and that the country would add whatever was needed 'to protect our integrity'.",
      "place": "Jimaní, Dominican Republic (border with Haiti)",
      "lat": 18.4917,
      "lon": -71.8514,
      "location_precision": "commune",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "República Dominicana envía militares a frontera en medio de la creciente tensión en Haití",
          "publisher": "Infobae (EFE)",
          "url": "https://www.infobae.com/america/agencias/2026/10/24/republica-dominicana-envia-militares-a-frontera-en-medio-de-la-creciente-tension-en-haiti/",
          "date": "2026-10-24",
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "The 10,000 figure is the total border deployment as stated by Paliza, not a new reinforcement (Wikipedia words it as 'deploys 10,000'). Exact convoy date is 22-24 Oct. Later, Diario El Mundo (30 Oct) reported that the Dominican Republic facilitated the Salvadoran deployment toward Haiti."
    },
    {
      "id": "2026-10-25-joseph-video-chen-mechan-killed",
      "date": "2026-10-25",
      "date_precision": "day",
      "category": "gang",
      "actor": "Gang: 400 Mawozo",
      "title": "Lanmò San Jou claims Chen Mechan killed the four 'by error'",
      "summary": "In a video that appeared on 25 October, 400 Mawozo leader Wilson Joseph claimed the four Salvadorans died after an 'error' by men from the neighbouring Chen Mechan gang when their vehicle entered its territory, and denied his own group's involvement, according to NAGO News and Wikipedia. He later repeated to AP that the technicians are dead. No authority has confirmed any deaths, and El Salvador maintains they are alive.",
      "place": "Croix-des-Bouquets (filming location not stated)",
      "lat": 18.5768,
      "lon": -72.2263,
      "location_precision": "commune",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Haiti: Bukele says the remains found are not those of the four Salvadoran soldiers",
          "publisher": "NAGO News",
          "url": "https://nago.tv/en/news/bukele-affirme-que-les-restes-retrouves-en-haiti-ne-sont-pas-ceux-des-quatre-militaires-salvadoriens",
          "date": "2026-10-24",
          "type": "article"
        },
        {
          "title": "2026 Croix-des-Bouquets kidnapping",
          "publisher": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Croix-des-Bouquets_kidnapping",
          "date": null,
          "type": "article"
        },
        {
          "title": "Miami Herald report on continued deployment and gang threats (26 Oct 2026)",
          "publisher": "Miami Herald",
          "url": "https://www.miamiherald.com/news/nation-world/world/americas/haiti/article317789933.html",
          "date": "2026-10-26",
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "Unverified gang claim."
    },
    {
      "id": "2026-10-28-el-salvador-confirms-2000-troops",
      "date": "2026-10-28",
      "date_precision": "day",
      "category": "military",
      "actor": "El Salvador",
      "title": "El Salvador confirms more than 2,000 troops for Haiti",
      "summary": "After a phone call between Bukele and PM Fils-Aimé, El Salvador's Foreign Ministry confirmed a deployment of more than 2,000 soldiers to search for the four technicians and fight gangs, according to Al Jazeera and El Diario de Hoy; Fils-Aimé's office said the two agreed to strengthen cooperation. Reuters had reported about 1,000 on the ground the day before; AP later counted about 2,500. The vast majority are outside the UN-backed GSF, and Bukele said on 29 October that El Salvador was covering 90% of the cost and would leave the day the technicians were returned alive.",
      "place": "Port-au-Prince",
      "lat": 18.5425,
      "lon": -72.3386,
      "location_precision": "city",
      "casualties": null,
      "movement": {
        "from_place": "El Salvador (San Salvador; exact departure base not stated)",
        "from": [
          13.6929,
          -89.2182
        ],
        "to_place": "Port-au-Prince",
        "to": [
          18.5425,
          -72.3386
        ]
      },
      "sources": [
        {
          "title": "El Salvador pledges more than 2,000 soldiers as Haiti delays elections",
          "publisher": "Al Jazeera",
          "url": "https://www.aljazeera.com/news/2026/10/29/el-salvador-pledges-more-than-2000-soldiers-as-haiti-delays-elections",
          "date": "2026-10-29",
          "type": "article"
        },
        {
          "title": "Around 1,000 soldiers from El Salvador have deployed to Haiti, source says",
          "publisher": "Reuters",
          "url": "https://www.reuters.com/world/americas/around-1000-soldiers-el-salvador-have-deployed-haiti-source-says-2026-10-27/",
          "date": "2026-10-27",
          "type": "article"
        },
        {
          "title": "Cancillería de El Salvador confirma despliegue de 2,000 soldados en Haití para rescatar a desaparecidos",
          "publisher": "El Diario de Hoy",
          "url": "https://www.eldiariodehoy.com/noticias/nacionales/cancilleria-de-el-salvador-confirma-despliegue-de-2000-soldados-en-haiti-para-rescatar-a-desaparecidos/98534/2026/",
          "date": "2026-10-28",
          "type": "article"
        },
        {
          "title": "Salvadoran military intervention in Haiti",
          "publisher": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Salvadoran_military_intervention_in_Haiti",
          "date": null,
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Troop numbers conflict: ~1,000 (Reuters, 27 Oct), 'more than 2,000' (Salvadoran government, AFP), ~2,500 (AP, ACLED), '1,300 already deployed' (Le Nouvelliste link seen via Americas Quarterly). Wikipedia lists seven helicopters (five MD 500E, two UH-60); Bukele said attack helicopters arrived 29 Oct."
    },
    {
      "id": "2026-10-28-una-haiti-letter",
      "date": "2026-10-28",
      "date_precision": "day",
      "category": "people",
      "actor": "Civil society: UNA-Haiti",
      "title": "NGO alleges Salvadoran bombardment of civilians; Bukele denies",
      "summary": "The United Nations Association of Haiti (UNA-Haiti), founded by Harvey Dupiton, wrote to UN Secretary-General Guterres alleging that since 22 October Salvadoran forces had carried out air strikes, helicopter gunship attacks and heavy-weapons offensives in civilian neighbourhoods of Croix-des-Bouquets, Canaan and the Plaine du Cul-de-Sac, and asked for an investigation. Bukele denied it on X on 31 October, saying his attack helicopters only arrived on 29 October and had flown no missions, and called such NGOs 'lobbying firms for criminals and cartels'. The GSF also denied using explosives.",
      "place": "Croix-des-Bouquets / Canaan / Plaine du Cul-de-Sac (areas named in the letter)",
      "lat": 18.6,
      "lon": -72.24,
      "location_precision": "unknown",
      "casualties": {
        "killed": null,
        "injured": null,
        "note": "The letter alleges civilian deaths but, per the El Mundo report, gives no figures. MSF separately reported treating 30 people with gunshot or drone-blast wounds at its Tabarre and Cité Soleil hospitals in the eight days after 18 Oct."
      },
      "movement": null,
      "sources": [
        {
          "title": "Bukele desmiente a ONG que denunció que fuerzas salvadoreñas bombardean civiles en Haití",
          "publisher": "Diario El Mundo",
          "url": "https://diario.elmundo.sv/politica/bukele-desmiente-a-ong-que-denuncio-que-fuerzas-salvadorenas-bombardean-civiles-en-haiti",
          "date": "2026-10-31",
          "type": "article"
        },
        {
          "title": "El Salvador's Troops Are Fighting Haiti's Gangs. Who Is Protecting Civilians?",
          "publisher": "Council on Foreign Relations",
          "url": "https://cfr.org/articles/el-salvadors-troops-are-fighting-haitis-gangs-who-is-protecting-civilians",
          "date": "2026-11-17",
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "Allegations are unverified and contested. Pin is a rough centroid of the three areas named, not an incident location. Bukele's X post URL was not found."
    },
    {
      "id": "2026-10-28-elections-postponed",
      "date": "2026-10-28",
      "date_precision": "day",
      "category": "politics",
      "actor": "Government of Haiti",
      "title": "CEP moves first-round vote from 13 Dec 2026 to 18 July 2027",
      "summary": "Haiti's Provisional Electoral Council moved the first round of presidential and parliamentary elections from 13 December 2026 to 18 July 2027, with a second round and local polls on 4 October 2027, according to Al Jazeera. Gang violence and slow registration were cited: fewer than 900,000 of 6.5 million eligible ID holders had registered, per the Miami Herald. The vote had already slipped once, from 30 August 2026.",
      "place": "Port-au-Prince",
      "lat": 18.5425,
      "lon": -72.3386,
      "location_precision": "city",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "El Salvador pledges more than 2,000 soldiers as Haiti delays elections",
          "publisher": "Al Jazeera",
          "url": "https://www.aljazeera.com/news/2026/10/29/el-salvador-pledges-more-than-2000-soldiers-as-haiti-delays-elections",
          "date": "2026-10-29",
          "type": "article"
        },
        {
          "title": "Haiti Announces New Election Dates as 2,000 Salvadoran Troops Help Fight Gangs",
          "publisher": "Associated Press",
          "url": "https://apnews.com/article/haiti-elections-el-salvador-troops-gang-violence-3c24fe0b0134ea2b41b48fc80457215d",
          "date": "2026-10-29",
          "type": "article"
        },
        {
          "title": "Jean-Bertrand Aristide's Fanmi Lavalas refuses to take part in Haiti's upcoming elections",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/17/aristide-party-no-candidates-security-haiti/",
          "date": "2026-11-17",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Al Jazeera says the CEP acted 'on Wednesday' (28 Oct); Wikipedia dates the announcement 29 Oct. IMPORTANT for the brief: the 13 Dec 2026 first round no longer stands — it is now 18 July 2027."
    },
    {
      "id": "2026-10-29-bercy-galaxie-killed",
      "date": "2026-10-29",
      "date_precision": "day",
      "category": "military",
      "actor": "PNH",
      "title": "Police and Arcahaie brigade kill gang chief 'Galaxie' in Bercy",
      "summary": "A Haitian police operation supported by the Arcahaie self-defence brigade struck the Bercy (Bési) area between Cabaret and Arcahaie on Thursday 29 October, reportedly killing the local gang chief known as Galaxie and several others, according to NAGO News and ACLED. Local sources spoke of at least a dozen dead; authorities had not confirmed the toll, and other gang members escaped.",
      "place": "Bercy, between Cabaret and Arcahaie",
      "lat": 18.75,
      "lon": -72.455,
      "location_precision": "commune",
      "casualties": {
        "killed": 12,
        "injured": null,
        "note": "Local sources: at least a dozen killed (unconfirmed); one secondary outlet says about 20. Galaxie's death was still awaiting official confirmation in NAGO's report."
      },
      "movement": null,
      "sources": [
        {
          "title": "Police operation kills gang leader in Bercy",
          "publisher": "NAGO News",
          "url": "https://nago.tv/en/news/l-operation-policiere-tue-le-chef-d-une-bande-criminelle-a-bercy",
          "date": "2026-10-30",
          "type": "article"
        },
        {
          "title": "Is El Salvador's Military Deployment in Haiti Boosting Anti-Gang Efforts?",
          "publisher": "ACLED",
          "url": "https://acleddata.com/expert-comment/el-salvadors-military-deployment-haiti-boosting-anti-gang-efforts",
          "date": "2026-11-11",
          "type": "report"
        }
      ],
      "confidence": "medium",
      "notes": "ACLED describes him as 'a Cabaret gang leader' killed in Arcahaie on 29 Oct with self-defence group support. Bercy coordinates are approximate."
    },
    {
      "id": "2026-10-30-tabarre-base-first-patrols",
      "date": "2026-10-30",
      "date_precision": "day",
      "category": "military",
      "actor": "El Salvador",
      "title": "Salvadoran troops set up Tabarre base, begin patrols",
      "summary": "Salvadoran armoured convoys were photographed in Tabarre on 30 October, where troops established an encampment near the US embassy and began search-and-rescue patrols, according to Wikipedia, AP photo captions and the Latin Times. Plasan Yagu light armoured vehicles arrived in Port-au-Prince the same day. Per the Haitian Times, some Salvadoran troops are housed at a GSF base and others at a site managed by the Haitian Armed Forces.",
      "place": "Tabarre (encampment near the US Embassy)",
      "lat": 18.568,
      "lon": -72.252,
      "location_precision": "neighbourhood",
      "casualties": null,
      "movement": {
        "from_place": "Toussaint Louverture International Airport",
        "from": [
          18.58,
          -72.2925
        ],
        "to_place": "Tabarre encampment",
        "to": [
          18.568,
          -72.252
        ]
      },
      "sources": [
        {
          "title": "Salvadoran military intervention in Haiti",
          "publisher": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Salvadoran_military_intervention_in_Haiti",
          "date": null,
          "type": "article"
        },
        {
          "title": "El Salvador sends armored units into Haiti in its first major ground offensive after four technicians were kidnapped",
          "publisher": "Latin Times",
          "url": "https://www.latintimes.com/el-salvador-ground-operation-against-gangs-haiti-600873",
          "date": "2026-11-03",
          "type": "article"
        },
        {
          "title": "Haitians rally behind Bukele, urge Salvadoran forces to drive gangs out of their communities",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/07/haitians-rally-behind-bukele-salvadoran-troops-gangs/",
          "date": "2026-11-07",
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "Exact base location not published; 'near the US embassy' is from Wikipedia. The airport-to-Tabarre movement is inferred (arrival point assumed), not explicitly reported."
    },
    {
      "id": "2026-10-31-first-street-patrol-embassy-hit",
      "date": "2026-10-31",
      "date_precision": "day",
      "category": "military",
      "actor": "El Salvador",
      "title": "First Salvadoran street patrol; stray rounds hit US embassy",
      "summary": "Salvadoran soldiers carried out their first patrol through the streets of Port-au-Prince on 31 October, according to EFE. The same day, stray bullets struck the US embassy in Tabarre during a firefight between Salvadoran soldiers and gangs, according to the Council on Foreign Relations; a later US protest note said the rounds came from Salvadoran small arms, per the Haitian Times citing Axios.",
      "place": "US Embassy area, Tabarre, Port-au-Prince",
      "lat": 18.565,
      "lon": -72.2495,
      "location_precision": "landmark",
      "casualties": {
        "killed": null,
        "injured": null,
        "note": "No casualties reported from the embassy incident."
      },
      "movement": null,
      "sources": [
        {
          "title": "Los soldados de El Salvador realizan su primer patrullaje por las calles de Puerto Príncipe, en Haití",
          "publisher": "EFE",
          "url": "https://efe.com/mundo/2026-10-31/soldados-el-salvador-primer-patrullaje-calles-puerto-principe-haiti/",
          "date": "2026-10-31",
          "type": "article"
        },
        {
          "title": "El Salvador's Troops Are Fighting Haiti's Gangs. Who Is Protecting Civilians?",
          "publisher": "Council on Foreign Relations",
          "url": "https://cfr.org/articles/el-salvadors-troops-are-fighting-haitis-gangs-who-is-protecting-civilians",
          "date": "2026-11-17",
          "type": "article"
        },
        {
          "title": "Nayib Bukele defends Haiti gang operations, blasts US diplomat over coordination concerns",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/11/bukele-defends-haiti-gang-operations-amid-pressure/",
          "date": "2026-11-11",
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "Patrol route not known (EFE blocked, not read). Two things are merged here because they share a date; the patrol itself may have been elsewhere in the city. Embassy coordinates are approximate."
    },
    {
      "id": "2026-10-31-arcahaie-reprisal-attacks",
      "date": "2026-10-31",
      "date_precision": "approx",
      "category": "gang",
      "actor": "Gang: Canaan-based groups (Taliban / Viv Ansanm)",
      "title": "Gangs attack Arcahaie for days; 16 reported killed",
      "summary": "Between 31 October and 2 November gangs attacked Arcahaie, killing 16 people including members of self-defence brigades, with some bodies buried in a mass grave, according to the Wikipedia 'Haitian conflict' page, which frames it as retaliation for the Salvadoran intervention. The Haitian Times separately reported that armed groups based in Canaan attacked Arcahaie 'for several days' in early November.",
      "place": "Arcahaie",
      "lat": 18.77,
      "lon": -72.512,
      "location_precision": "commune",
      "casualties": {
        "killed": 16,
        "injured": null,
        "note": "16 killed incl. self-defence brigade members, per Wikipedia (primary source not identified)."
      },
      "movement": {
        "from_place": "Canaan",
        "from": [
          18.648,
          -72.27
        ],
        "to_place": "Arcahaie",
        "to": [
          18.77,
          -72.512
        ]
      },
      "sources": [
        {
          "title": "Haitian conflict",
          "publisher": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Haitian_conflict",
          "date": null,
          "type": "article"
        },
        {
          "title": "Conflicting reports emerge over strike on mansion linked to Haiti 400 Mawozo gang leader",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/10/mansion-linked-haiti-gang-leader-reportedly-destroyed/",
          "date": "2026-11-10",
          "type": "article"
        }
      ],
      "confidence": "low",
      "notes": "The 16-dead figure and the 31 Oct-2 Nov dates come from a search-result excerpt of the Wikipedia page (the relevant section was beyond what I could read directly); the 'retaliation' motive may equally relate to the 29 Oct killing of Galaxie in nearby Bercy. Treat as unverified."
    },
    {
      "id": "2026-11-01-joseph-letter-un",
      "date": "2026-11-01",
      "date_precision": "day",
      "category": "gang",
      "actor": "Gang: 400 Mawozo",
      "title": "400 Mawozo leader writes to UN chief asking for mediation",
      "summary": "A letter dated 1 November in Croix-des-Bouquets and signed by Wilson Joseph asked UN Secretary-General Guterres to send a delegation to mediate between 'the international forces present in Haiti' and 400 Mawozo, which it calls a 'rebel group'; it says he has 'raised a white flag' and declared a ceasefire on 20 August. It warned that Bukele's 'vengeful' threats would bring 'a logic of reprisals, of which the Haitian people would be the first victims'. On 2 November UN spokesman Stéphane Dujarric confirmed receipt but said this implied no recognition or endorsement.",
      "place": "Croix-des-Bouquets",
      "lat": 18.5768,
      "lon": -72.2263,
      "location_precision": "commune",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "UN confirms it received Lanmò San Jou's letter, without endorsing it",
          "publisher": "NAGO News",
          "url": "https://nago.tv/en/news/lettre-attribuee-a-lanmo-san-jou-400-mawozo-demande-mediation-onu",
          "date": "2026-11-02",
          "type": "article"
        },
        {
          "title": "El Salvador's Presence and a Gang's Offer Test Haiti's Security",
          "publisher": "Americas Quarterly",
          "url": "https://americasquarterly.org/article/el-salvadors-presence-and-a-gangs-offer-test-haitis-security/",
          "date": "2026-11-09",
          "type": "article"
        },
        {
          "title": "Powerful Haitian Gang Leader Tells AP He Wrote UN Seeking Dialogue as Clashes Intensify",
          "publisher": "Associated Press",
          "url": "https://apnews.com/article/lanmo-sanjou-letter-un-gang-violence-wilson-josph-374dfb531e5c919c3139649c7d63cefe",
          "date": "2026-11-02",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "The letter alleges civilian harm in the Plaine du Cul-de-Sac, including the shooting of an eight-year-old girl (unverified). Salvadoran VP Ulloa later called UN mediation with gangs 'unacceptable' (El Mundo, 10 Nov)."
    },
    {
      "id": "2026-11-02-cul-de-sac-ground-offensive",
      "date": "2026-11-02",
      "date_precision": "day",
      "category": "military",
      "actor": "El Salvador",
      "title": "First major Salvadoran ground offensive in Plaine du Cul-de-Sac",
      "summary": "Salvadoran special forces in about a dozen armoured vehicles, with PNH and GSF support, pushed into the Plaine du Cul-de-Sac against 400 Mawozo and Chen Mechan; Haitian press reports cited by EFE said at least a dozen gang members were killed, with no official toll. Forces searched Santo and reported no resistance; the PNH recovered the charred armoured vehicle from the 18 October ambush (announced 4 November), with no trace of the four technicians. The French Wikipedia page adds 30 civilians injured.",
      "place": "Santo / Plaine du Cul-de-Sac, Croix-des-Bouquets",
      "lat": 18.583,
      "lon": -72.248,
      "location_precision": "neighbourhood",
      "casualties": {
        "killed": 12,
        "injured": 30,
        "note": "At least a dozen gang members killed per Haitian press via EFE (unofficial); 30 civilians injured per French Wikipedia (primary source unclear). ACLED counted at least 21 killed in security operations in Croix-des-Bouquets between 18 Oct and 2 Nov (via The New Humanitarian, search excerpt)."
      },
      "movement": {
        "from_place": "Tabarre encampment",
        "from": [
          18.568,
          -72.252
        ],
        "to_place": "Santo, Croix-des-Bouquets",
        "to": [
          18.583,
          -72.248
        ]
      },
      "sources": [
        {
          "title": "El Salvador sends armored units into Haiti in its first major ground offensive after four technicians were kidnapped",
          "publisher": "Latin Times",
          "url": "https://www.latintimes.com/el-salvador-ground-operation-against-gangs-haiti-600873",
          "date": "2026-11-03",
          "type": "article"
        },
        {
          "title": "Burned-out armored vehicle found in Haiti, but four Salvadoran technicians are still missing after a gang ambush",
          "publisher": "Latin Times",
          "url": "https://www.latintimes.com/haiti-salvadoran-technicians-missing-vehicle-found-600954",
          "date": "2026-11-05",
          "type": "article"
        },
        {
          "title": "Los soldados de El Salvador lanzan su primera gran operación contra las bandas en Haití",
          "publisher": "EFE",
          "url": "https://efe.com/mundo/2026-11-03/soldados-el-salvador-operacion-haiti/",
          "date": "2026-11-03",
          "type": "article"
        },
        {
          "title": "Intervention militaire salvadorienne en Haïti",
          "publisher": "Wikipédia (fr)",
          "url": "https://fr.wikipedia.org/wiki/Intervention_militaire_salvadorienne_en_Ha%C3%AFti",
          "date": null,
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "'No resistance' in Santo (Latin Times, 5 Nov) sits awkwardly with 'at least a dozen killed' the same day; the deaths may have occurred elsewhere on the plain. Movement origin (Tabarre) is inferred from the base location."
    },
    {
      "id": "2026-11-02-canaan-march-against-deployment",
      "date": "2026-11-02",
      "date_precision": "day",
      "category": "people",
      "actor": "Civilians",
      "title": "Hundreds march in Canaan against Salvadoran operation",
      "summary": "Hundreds marched in gang-held Canaan behind a banner reading 'Kanaran Debou' ('Canaan Standing'), with signs demanding justice for children killed by gunfire and drones and speakers calling the operation a 'genocide', according to the World Socialist Web Site and a teleSUR report. Local outlets and CNN en Español (via the Latin Times and Wikipedia) reported that Viv Ansanm threatened residents of the Plaine du Cul-de-Sac with death to force them into the streets.",
      "place": "Canaan (north of Port-au-Prince)",
      "lat": 18.648,
      "lon": -72.27,
      "location_precision": "neighbourhood",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Salvadoran troops launch offensive in Haiti as warnings of civilian bloodbath mount",
          "publisher": "World Socialist Web Site",
          "url": "https://www.wsws.org/en/articles/2026/11/06/eqjb-n06.html",
          "date": "2026-11-06",
          "type": "article"
        },
        {
          "title": "El Salvador sends armored units into Haiti in its first major ground offensive after four technicians were kidnapped",
          "publisher": "Latin Times",
          "url": "https://www.latintimes.com/el-salvador-ground-operation-against-gangs-haiti-600873",
          "date": "2026-11-03",
          "type": "article"
        },
        {
          "title": "Salvadoran military intervention in Haiti",
          "publisher": "Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Salvadoran_military_intervention_in_Haiti",
          "date": null,
          "type": "article"
        }
      ],
      "confidence": "low",
      "notes": "Sourced only to partisan/secondary outlets; size, organisers and whether participation was coerced are unverified. Wikipedia places the coerced protest in 'Plaine du Cul-de-Sac', WSWS places the march in Canaan — possibly the same event, possibly two."
    },
    {
      "id": "2026-11-03-fils-aime-villa-accueil",
      "date": "2026-11-03",
      "date_precision": "day",
      "category": "politics",
      "actor": "Government of Haiti",
      "title": "Fils-Aimé backs Salvadoran role: 'gangs will not sleep'",
      "summary": "At a press conference at the Villa d'Accueil, PM Fils-Aimé thanked Bukele, confirmed Salvadoran special forces were taking part in anti-gang operations alongside the PNH, FAd'H and GSF, and said Haiti keeps political and strategic direction: 'The international forces did not come to replace the State.' He was flanked by GSF deputy commander Brig. Gen. E. C. Clarke and Salvadoran Col. José Roberto Figueroa Amaya, said interventions were under way in Kenscoff and Gressier, and warned that 'gangsters in ties and gangsters in sandals' would all be sanctioned.",
      "place": "Villa d'Accueil, Port-au-Prince",
      "lat": 18.537,
      "lon": -72.3,
      "location_precision": "landmark",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Primer ministro haitiano agradece a Bukele y confirma apoyo de fuerzas especiales salvadoreñas contra pandillas",
          "publisher": "Diario El Mundo",
          "url": "https://diario.elmundo.sv/politica/primer-ministro-haitiano-agradece-a-bukele-y-confirma-apoyo-de-fuerzas-especiales-salvadorenas-contra-pandillas",
          "date": "2026-11-03",
          "type": "article"
        },
        {
          "title": "Salvadoran troops target Haitian gang, leaving 20 dead (photo captions dated 3 Nov)",
          "publisher": "Al Jazeera",
          "url": "https://www.aljazeera.com/news/2026/11/10/salvadoran-troops-target-haitian-gang-leaving-20-dead",
          "date": "2026-11-10",
          "type": "article"
        },
        {
          "title": "Haiti's Prime Minister Fils-Aimé Speaks Out as Concerns Over El Salvador's Troops Deepen",
          "publisher": "Associated Press",
          "url": "https://apnews.com/article/haiti-prime-minister-el-salvador-gangs-un-fefbf2e40c1eef1cac6b0281cef961d0",
          "date": "2026-11-03",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Villa d'Accueil coordinates are approximate (Musseau area). The same day UN spokesman Dujarric reiterated that most Salvadoran troops fall outside the GSF and the UN Support Office's mandate."
    },
    {
      "id": "2026-11-03-helicopters-defend-chadian-gsf",
      "date": "2026-11-03",
      "date_precision": "day",
      "category": "military",
      "actor": "El Salvador",
      "title": "Salvadoran helicopters repel attack on Chadian GSF troops",
      "summary": "Bukele said on X that gangs were attacking Chadian GSF soldiers and that Salvadoran attack helicopters arrived quickly and drove them off, adding that the gangs 'no longer have the advantage'. A Haitian media video showed a helicopter over Croix-des-Bouquets at 6:16 p.m. with detonations and flashes. US chargé d'affaires David Howell later texted the Haitian PM that the Salvadorans 'nearly killed GSF troops', according to Axios as cited by CFR.",
      "place": "Croix-des-Bouquets",
      "lat": 18.5768,
      "lon": -72.2263,
      "location_precision": "commune",
      "casualties": {
        "killed": null,
        "injured": null,
        "note": "No casualties reported."
      },
      "movement": null,
      "sources": [
        {
          "title": "Bukele afirma que helicópteros salvadoreños repelieron ataque de pandillas contra soldados del GSF en Haití",
          "publisher": "La Noticia SV",
          "url": "https://lanoticiasv.com/bukele-afirma-que-helicopteros-salvadorenos-repelieron-ataque-de-pandillas-contra-soldados-del-gsf-en-haiti/",
          "date": "2026-11-03",
          "type": "article"
        },
        {
          "title": "Nayib Bukele: 'Gangs were attacking GSF soldiers from Chad'",
          "publisher": "X (@nayibbukele)",
          "url": "https://x.com/nayibbukele/status/2117773416094994924",
          "date": "2026-11-04",
          "type": "x"
        },
        {
          "title": "El Salvador's Troops Are Fighting Haiti's Gangs. Who Is Protecting Civilians?",
          "publisher": "Council on Foreign Relations",
          "url": "https://cfr.org/articles/el-salvadors-troops-are-fighting-haitis-gangs-who-is-protecting-civilians",
          "date": "2026-11-17",
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "Bukele's account and the US diplomat's account of the same engagement conflict (rescue vs near-miss on GSF troops). Exact location within Croix-des-Bouquets unknown."
    },
    {
      "id": "2026-11-03-kenscoff-residents-welcome",
      "date": "2026-11-03",
      "date_precision": "approx",
      "category": "people",
      "actor": "Civilians",
      "title": "Kenscoff residents cheer Salvadoran soldiers",
      "summary": "Residents of Kenscoff welcomed Salvadoran soldiers and chanted Bukele's name, according to the Dominican daily El Día (4 November). Bukele responded on X on 3 November: 'We are on the same side as you... We must rise up, retake control of our communities.' The PM said the same day that security interventions were under way in Kenscoff and Gressier.",
      "place": "Kenscoff",
      "lat": 18.45,
      "lon": -72.285,
      "location_precision": "commune",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Haitianos salen a las calles para respaldar ofensiva contra pandillas encabezada por militares salvadoreños",
          "publisher": "El Día (Santo Domingo)",
          "url": "https://eldia.com.do/haitianos-salen-a-las-calles-para-respaldar-ofensiva-contra-pandillas-encabezada-por-militares-salvadorenos/",
          "date": "2026-11-04",
          "type": "article"
        },
        {
          "title": "Primer ministro haitiano agradece a Bukele y confirma apoyo de fuerzas especiales salvadoreñas contra pandillas",
          "publisher": "Diario El Mundo",
          "url": "https://diario.elmundo.sv/politica/primer-ministro-haitiano-agradece-a-bukele-y-confirma-apoyo-de-fuerzas-especiales-salvadorenas-contra-pandillas",
          "date": "2026-11-03",
          "type": "article"
        }
      ],
      "confidence": "low",
      "notes": "Exact date not given (on or shortly before 4 Nov). Whether Salvadoran troops were themselves operating in Kenscoff, or the welcome refers to a convoy passing, is not clear from the source."
    },
    {
      "id": "2026-11-05-us-protest-note",
      "date": "2026-11-05",
      "date_precision": "day",
      "category": "politics",
      "actor": "United States",
      "title": "US protests 'lack of coordination'; asks pause in operations",
      "summary": "On 4 November US chargé d'affaires David Howell asked PM Fils-Aimé to urge El Salvador to temporarily halt operations until they were coordinated with the GSF, warning 'They are going to kill [GSF] troops or civilians and or get themselves killed', according to Axios as cited by the Haitian Times and CFR. On 5 November the US Embassy in San Salvador sent a formal protest note saying Salvadoran small-arms fire had struck the US embassy in Haiti. Bukele retorted that he had checked with Trump, who 'told me to do what we have to do'.",
      "place": "US Embassy, Tabarre, Port-au-Prince",
      "lat": 18.565,
      "lon": -72.2495,
      "location_precision": "landmark",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Nayib Bukele defends Haiti gang operations, blasts US diplomat over coordination concerns",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/11/bukele-defends-haiti-gang-operations-amid-pressure/",
          "date": "2026-11-11",
          "type": "article"
        },
        {
          "title": "Scoop: El Salvador blasts U.S. State Dept. over Haiti gang war",
          "publisher": "Axios",
          "url": "https://www.axios.com/2026/11/10/el-salvador-state-department-haiti-gangs",
          "date": "2026-11-10",
          "type": "article"
        },
        {
          "title": "El Salvador's Troops Are Fighting Haiti's Gangs. Who Is Protecting Civilians?",
          "publisher": "Council on Foreign Relations",
          "url": "https://cfr.org/articles/el-salvadors-troops-are-fighting-haitis-gangs-who-is-protecting-civilians",
          "date": "2026-11-17",
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "Wikipedia's infobox says Howell reported 3 Salvadorans injured, which El Salvador denies. On 8 Nov Secretary of State Rubio said 'we have to make sure there is deconfliction'. Trump backed the deployment in a 27 Oct call ('do what you have to do')."
    },
    {
      "id": "2026-11-05-mathias-saintil-killed",
      "date": "2026-11-05",
      "date_precision": "day",
      "category": "military",
      "actor": "PNH",
      "title": "Boston gang leader Mathias Saintil killed by drone in Cité Soleil",
      "summary": "Mathias Saintil, leader of the 'Boston' gang (part of Viv Ansanm), died after an explosive drone hit the vehicle he was travelling in on Thursday night in Cité Soleil, in an operation by the PNH and the Prime Minister's Task Force; EFE called it the first time a gang leader had been killed in a drone operation by Haitian forces. PM Fils-Aimé posted 'One less gang leader' and Erik Prince wrote 'Nice shot'. ACLED says drone operations in Cité Soleil around 5 November killed about 26 gang members.",
      "place": "Boston / Carrefour Drouillard, Cité Soleil",
      "lat": 18.5786,
      "lon": -72.3353,
      "location_precision": "commune",
      "casualties": {
        "killed": 26,
        "injured": null,
        "note": "About 26 gang members incl. Saintil per ACLED; authorities gave no number ('other members of his group also died')."
      },
      "movement": null,
      "sources": [
        {
          "title": "Muere poderoso jefe pandillero durante operativo con drones en Haití",
          "publisher": "Diario El Mundo (EFE)",
          "url": "https://diario.elmundo.sv/el-mundo/muere-poderoso-jefe-pandillero-durante-operativo-con-drones-en-haiti",
          "date": "2026-11-06",
          "type": "article"
        },
        {
          "title": "Alix Didier Fils-Aimé: 'One less gang leader'",
          "publisher": "X (@citoyendidier)",
          "url": "https://x.com/citoyendidier/status/2118853047925551366",
          "date": "2026-11-06",
          "type": "x"
        },
        {
          "title": "Is El Salvador's Military Deployment in Haiti Boosting Anti-Gang Efforts?",
          "publisher": "ACLED",
          "url": "https://acleddata.com/expert-comment/el-salvadors-military-deployment-haiti-boosting-anti-gang-efforts",
          "date": "2026-11-11",
          "type": "report"
        },
        {
          "title": "Haiti PM Says Gang Leader Mathias Saintil is Dead",
          "publisher": "Reuters",
          "url": "https://www.reuters.com/world/americas/haiti-pm-says-gang-leader-mathias-saintil-dead-2026-11-07/",
          "date": "2026-11-06",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Date conflict: 5 Nov (EFE, Haitian Times, ACLED 'around 5 Nov') vs 6 Nov (The Conversation). Spelling varies: Saintil / Sainthil / Santil. Salvadoran involvement is disputed: Wikipedia lists it as a joint PNH-GSF-Task Force-Salvadoran operation; EFE and the Haitian Times attribute it to Haitian police and the Task Force."
    },
    {
      "id": "2026-11-06-pro-bukele-marches",
      "date": "2026-11-06",
      "date_precision": "day",
      "category": "people",
      "actor": "Civilians",
      "title": "Marches in Canapé-Vert, Belladère and Jérémie back Bukele",
      "summary": "Hundreds of residents marched in Port-au-Prince's Canapé-Vert, in the border town of Belladère and in Jérémie in support of the Salvadoran troops, chanting 'Debloke peyi a' ('Unlock the country') and 'Long live Bukele', according to the Haitian Times; EFE spoke of thousands across several cities. One protester pleaded: 'Bukele, go to Furcy, go to Kenscoff, go to Ti Miska, Kay Jak. Give us back our country so we can return home.' ACLED noted demonstrations in at least four departments that also called for PM Fils-Aimé to resign.",
      "place": "Canapé-Vert, Port-au-Prince (also Belladère and Jérémie)",
      "lat": 18.5367,
      "lon": -72.314,
      "location_precision": "neighbourhood",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Haitians rally behind Bukele, urge Salvadoran forces to drive gangs out of their communities",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/07/haitians-rally-behind-bukele-salvadoran-troops-gangs/",
          "date": "2026-11-07",
          "type": "article"
        },
        {
          "title": "Belladère march post ('Beladè, Viv Bukele!')",
          "publisher": "X (@Master_Bean1)",
          "url": "https://x.com/Master_Bean1/status/2118778355122397570",
          "date": "2026-11-06",
          "type": "x"
        },
        {
          "title": "Jérémie march post ('Pèp Grandans Haiti an sipò de Prezidan Bukele')",
          "publisher": "X (@ItsBecksBe)",
          "url": "https://x.com/ItsBecksBe/status/2118768710194495760",
          "date": "2026-11-06",
          "type": "x"
        },
        {
          "title": "Marchas de apoyo a Bukele en Haití",
          "publisher": "EFE",
          "url": "https://efe.com/mundo/2026-11-07/marchas-apoyo-bukele-haiti/",
          "date": "2026-11-07",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Other march locations for mapping: Belladère (18.8667, -71.7833), Jérémie (18.6500, -74.1167). Crowd size conflicts: 'hundreds' (Haitian Times) vs 'thousands' (EFE). The Canapé-Vert self-defence group led by police officer Samuel Joasil took part."
    },
    {
      "id": "2026-11-06-400-mawozo-disarmament-offer",
      "date": "2026-11-06",
      "date_precision": "day",
      "category": "gang",
      "actor": "Gang: 400 Mawozo",
      "title": "400 Mawozo contacts state disarmament commission",
      "summary": "In a three-page statement sent to AP, 400 Mawozo said it had contacted Haiti's National Commission for Disarmament, Demobilization and Reintegration to seek dialogue, asked for military operations to be suspended in certain areas and for Wilson Joseph's home to be protected, and said 'dialogue is not a capitulation'. An anonymous spokesperson said disarmament would be 'a process'. The commission confirmed it was contacted but said any dialogue must follow the government's roadmap. The same day Bukele replied on X to a post showing Joseph's house: 'Where is this house? Give us the exact address, and we will destroy it.'",
      "place": "Croix-des-Bouquets",
      "lat": 18.5768,
      "lon": -72.2263,
      "location_precision": "commune",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Powerful Haitian gang reaches out to state disarmament group as gunfights persist",
          "publisher": "Associated Press (via ClickOnDetroit)",
          "url": "https://www.clickondetroit.com/news/world/2026/11/07/powerful-haitian-gang-reaches-out-to-state-disarmament-group-as-gunfights-persist/",
          "date": "2026-11-06",
          "type": "article"
        },
        {
          "title": "Nayib Bukele: 'Where is this house? Give us the exact address, and we will destroy it'",
          "publisher": "X (@nayibbukele)",
          "url": "https://x.com/nayibbukele/status/2118798429434343447",
          "date": "2026-11-06",
          "type": "x"
        },
        {
          "title": "Haiti's 400 Mawozo Gang Seeks Peace Talks Amid Ongoing Violence",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/09/haiti-400-mawozo-gang-disarmament-peace-talks/",
          "date": "2026-11-09",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "The gang also said it planned a 'peaceful demonstration' later in November."
    },
    {
      "id": "2026-11-07-minoterie-boats",
      "date": "2026-11-07",
      "date_precision": "day",
      "category": "military",
      "actor": "PNH",
      "title": "Armed men on two boats killed off Minoterie coast",
      "summary": "According to local media cited by the Haitian Times, an operation on the Minoterie coastline killed several armed men aboard two boats. They had reportedly been tracked after Canaan-based gangs attacked Arcahaie, about 40 miles north of Port-au-Prince, for several days. No verified casualty figure was given.",
      "place": "Minoterie coastline (Lafiteau area), north of Port-au-Prince",
      "lat": 18.685,
      "lon": -72.353,
      "location_precision": "neighbourhood",
      "casualties": {
        "killed": null,
        "injured": null,
        "note": "'Several' armed men reportedly killed; no number."
      },
      "movement": null,
      "sources": [
        {
          "title": "Conflicting reports emerge over strike on mansion linked to Haiti 400 Mawozo gang leader",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/10/mansion-linked-haiti-gang-leader-reportedly-destroyed/",
          "date": "2026-11-10",
          "type": "article"
        }
      ],
      "confidence": "low",
      "notes": "Which force carried out the operation is not stated ('PNH' is an assumption; could be Task Force drones). Not independently confirmed. Coordinates approximate (flour-mill / Lafiteau shoreline)."
    },
    {
      "id": "2026-11-08-400-mawozo-hq-strike",
      "date": "2026-11-08",
      "date_precision": "day",
      "category": "military",
      "actor": "El Salvador",
      "title": "Helicopters hit Lanmò San Jou's mansion, 400 Mawozo HQ",
      "summary": "At about 2:30 a.m. on Sunday, the PNH Task Force on the ground and four helicopters (two Task Force, two Salvadoran), plus a loitering munition, struck the Croix-des-Bouquets mansion of 400 Mawozo leader Wilson 'Lanmò San Jou' Joseph, according to the Miami Herald as cited by the Haitian Times. The operation reportedly killed up to 20 people (AFP/AP via Al Jazeera); Joseph was not there and survived. Bukele confirmed it on X on 10 November with helicopter footage: 'We kept our promise… We destroyed Lanmò San Jou's house and the headquarters of the 400 Mawozo gang', adding most gang members 'fled without even trying to fight'.",
      "place": "Croix-des-Bouquets (Wilson Joseph's mansion; exact address not published)",
      "lat": 18.5768,
      "lon": -72.2263,
      "location_precision": "commune",
      "casualties": {
        "killed": 20,
        "injured": null,
        "note": "'Up to 20' / '20 people' killed per wire reports; the Haitian Times said casualties were unverified at the time."
      },
      "movement": null,
      "sources": [
        {
          "title": "Salvadoran troops target Haitian gang, leaving 20 dead",
          "publisher": "Al Jazeera",
          "url": "https://www.aljazeera.com/news/2026/11/10/salvadoran-troops-target-haitian-gang-leaving-20-dead",
          "date": "2026-11-10",
          "type": "article"
        },
        {
          "title": "Conflicting reports emerge over strike on mansion linked to Haiti 400 Mawozo gang leader",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/10/mansion-linked-haiti-gang-leader-reportedly-destroyed/",
          "date": "2026-11-10",
          "type": "article"
        },
        {
          "title": "Nayib Bukele: 'We kept our promise…' (video)",
          "publisher": "X (@nayibbukele)",
          "url": "https://x.com/nayibbukele/status/2120182485015474372",
          "date": "2026-11-10",
          "type": "x"
        },
        {
          "title": "Alix Didier Fils-Aimé: 'Hats off to President Nayib Bukele'",
          "publisher": "X (@citoyendidier)",
          "url": "https://x.com/citoyendidier/status/2120280023399637493",
          "date": "2026-11-10",
          "type": "x"
        },
        {
          "title": "Haiti Police, Salvadoran Troops Destroy House of 400 Mawozo Gang Leader",
          "publisher": "Miami Herald",
          "url": "https://www.miamiherald.com/news/nation-world/world/americas/haiti/article317992703.html",
          "date": "2026-11-09",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Early reports conflicted on destroyed vs damaged, and some circulating images were AI-generated (Haitian Times). After the strike, gang members including Joseph reportedly fled to Carrefour (unconfirmed)."
    },
    {
      "id": "2026-11-09-amnesty-statement",
      "date": "2026-11-09",
      "date_precision": "day",
      "category": "humanitarian",
      "actor": "Amnesty International",
      "title": "Amnesty: publish the Haiti–El Salvador deployment agreement",
      "summary": "Amnesty International urged Haiti and El Salvador to make public the agreement governing the deployment, to ensure all Salvadoran operations comply with international human rights law, and to allow prompt, independent investigations into alleged violations. Americas director Ana Piquer said: 'The response to gang violence must not replicate the abuses and impunity' seen elsewhere.",
      "place": "Port-au-Prince (statement concerns operations in Haiti)",
      "lat": 18.5425,
      "lon": -72.3386,
      "location_precision": "city",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Haiti: Los gobiernos de Haití y El Salvador deben garantizar que el despliegue militar salvadoreño respete los derechos humanos",
          "publisher": "Amnesty International",
          "url": "https://www.amnesty.org/en/latest/news/2026/11/haiti-los-gobiernos-de-haiti-y-el-salvador-deben-garantizar-que-el-despliegue-militar-salvadoreno-respete-los-derechos-humanos",
          "date": "2026-11-09",
          "type": "report"
        },
        {
          "title": "Salvadoran troops target Haitian gang, leaving 20 dead",
          "publisher": "Al Jazeera",
          "url": "https://www.aljazeera.com/news/2026/11/10/salvadoran-troops-target-haitian-gang-leaving-20-dead",
          "date": "2026-11-10",
          "type": "article"
        },
        {
          "title": "Amnesty urges El Salvador to disclose terms of Haiti troop deployment",
          "publisher": "France 24",
          "url": "https://www.france24.com/en/americas/20261110-amnesty-urges-el-salvador-to-disclose-terms-of-haiti-troop-deployment",
          "date": "2026-11-10",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Statement was issued internationally, not from Port-au-Prince; city pin is nominal. Amnesty page redirected and was not read directly; content via Al Jazeera and Haitian Times. I found no RNDDH statement on the Salvadoran deployment."
    },
    {
      "id": "2026-11-10-martissant-operations",
      "date": "2026-11-10",
      "date_precision": "day",
      "category": "military",
      "actor": "PNH",
      "title": "Security operations reported in Martissant",
      "summary": "The Haitian Times reported that security operations continued in Martissant, at the southern gateway of Port-au-Prince, on 10 November, the day Bukele published video of the 400 Mawozo strike. No forces, targets or casualties were specified.",
      "place": "Martissant, Port-au-Prince",
      "lat": 18.529,
      "lon": -72.36,
      "location_precision": "neighbourhood",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Nayib Bukele defends Haiti gang operations, blasts US diplomat over coordination concerns",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/11/bukele-defends-haiti-gang-operations-amid-pressure/",
          "date": "2026-11-11",
          "type": "article"
        }
      ],
      "confidence": "low",
      "notes": "One-line mention only; the forces involved (actor 'PNH' is an assumption) and the gangs targeted are not stated in the source."
    },
    {
      "id": "2026-11-11-acled-toll",
      "date": "2026-11-11",
      "date_precision": "day",
      "category": "humanitarian",
      "actor": "ACLED",
      "title": "ACLED: 100+ killed in three weeks, at least 26 civilians",
      "summary": "ACLED estimated that security operations in the 21 days after the Salvadoran deployment caused more than 100 fatalities, at least 26 of them identified as civilians, and that clashes and drone strikes rose 45.8% compared with the previous 21 days. Activity was concentrated in Cité Soleil, Croix-des-Bouquets and Arcahaie; police and the Task Force carried out most operations. The same day the Haitian government said it was regaining territorial control with El Salvador's help (EFE).",
      "place": "Northern Ouest department (Cité Soleil / Croix-des-Bouquets / Arcahaie)",
      "lat": 18.5425,
      "lon": -72.3386,
      "location_precision": "city",
      "casualties": {
        "killed": 100,
        "injured": null,
        "note": "More than 100 killed between ~22 Oct and ~11 Nov, at least 26 civilians (ACLED estimate). Wikipedia's infobox gives ~74 gang members and 26+ civilians killed, 30 civilians wounded."
      },
      "movement": null,
      "sources": [
        {
          "title": "Is El Salvador's Military Deployment in Haiti Boosting Anti-Gang Efforts?",
          "publisher": "ACLED",
          "url": "https://acleddata.com/expert-comment/el-salvadors-military-deployment-haiti-boosting-anti-gang-efforts",
          "date": "2026-11-11",
          "type": "report"
        },
        {
          "title": "El Gobierno de Haití afirma que está recuperando control territorial con ayuda de El Salvador",
          "publisher": "EFE",
          "url": "https://efe.com/mundo/2026-11-11/gobierno-haiti-recuperacion-control-territorial-ayuda-tropas-el-salvador/",
          "date": "2026-11-11",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Aggregate figure, not a single incident; pin is nominal. Haitian Justice Minister Pélissier said on 16-17 Nov that the government had 'no reported casualties' among civilians, contradicting ACLED and UN data."
    },
    {
      "id": "2026-11-12-stade-sylvio-cator-retaken",
      "date": "2026-11-12",
      "date_precision": "day",
      "category": "military",
      "actor": "PNH",
      "title": "Stade Sylvio Cator retaken; becomes Salvadoran forward base",
      "summary": "In the early hours of Thursday, the PNH with the Task Force, the FAd'H and Salvadoran special forces retook the national stadium in downtown Port-au-Prince, held by gangs since February 2024; police said they took 'full control' and then handed security to Salvadoran soldiers. Le Nouvelliste reported more than 20 Salvadoran armoured vehicles and trucks parked inside, and troops deployed rifle-armed robot dogs. Bukele said several human skulls were found, announced a base 'to advance from there into gang-controlled territories', and advised 'all gang members to leave the area before the offensive begins'.",
      "place": "Stade Sylvio Cator, downtown Port-au-Prince",
      "lat": 18.5366,
      "lon": -72.342,
      "location_precision": "landmark",
      "casualties": {
        "killed": null,
        "injured": null,
        "note": "No casualties reported from the operation; human skulls found inside per Bukele (not independently verified)."
      },
      "movement": {
        "from_place": "Tabarre encampment",
        "from": [
          18.568,
          -72.252
        ],
        "to_place": "Stade Sylvio Cator",
        "to": [
          18.5366,
          -72.342
        ]
      },
      "sources": [
        {
          "title": "Haiti, Salvadoran forces retake Sylvio Cator Stadium from gangs, Bukele says",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/12/haiti-el-salvador-forces-retake-sylvio-cator-stadium/",
          "date": "2026-11-12",
          "type": "article"
        },
        {
          "title": "Haitian police retake national stadium after two years of gang control",
          "publisher": "France 24",
          "url": "https://www.france24.com/en/americas/20261113-haitian-police-retake-national-stadium-from-gangs-after-two-years",
          "date": "2026-11-13",
          "type": "article"
        },
        {
          "title": "Des soldats salvadoriens prennent position au stade Sylvio Cator",
          "publisher": "Le Nouvelliste",
          "url": "https://lenouvelliste.com/article/273831/salvadoran-soldiers-take-position-at-the-sylvio-cator-stadium",
          "date": "2026-11-12",
          "type": "article"
        },
        {
          "title": "Salvadoran Troops Turn Haiti National Stadium Into Base After Retaking It From Gangs",
          "publisher": "The Tico Times",
          "url": "https://ticotimes.net/2026/11/13/bukele-haiti-stadium-base-sylvio-cator",
          "date": "2026-11-13",
          "type": "article"
        },
        {
          "title": "Haiti Police, Salvadoran Troops and Armed Robot Dogs Retake Haiti's National Stadium From Gangs",
          "publisher": "SOFX",
          "url": "https://www.sofx.com/haiti-police-salvadoran-troops-and-armed-robot-dogs-retake-haitis-national-stadium-from-gangs/",
          "date": "2026-11-13",
          "type": "article"
        },
        {
          "title": "Nayib Bukele stadium announcement",
          "publisher": "TikTok (@nayibbukele)",
          "url": "https://www.tiktok.com/t/ZPL7p2VRA/",
          "date": "2026-11-12",
          "type": "video"
        }
      ],
      "confidence": "high",
      "notes": "Date: 12 Nov per most outlets; Wikipedia (fr) says 13 Nov. Credit conflict: PNH says its officers and the Task Force took the stadium then handed it over; Bukele presents it as a joint Salvadoran operation. Haiti's justice minister said the stadium had been closed 'five years or more' vs 'since February 2024' elsewhere. Movement origin (Tabarre) is inferred. Which gang held the stadium is not named in sources read. The Haitian Times (18 Nov) also says the EDH headquarters was retaken, undated."
    },
    {
      "id": "2026-11-13-fanmi-lavalas-withdraws",
      "date": "2026-11-13",
      "date_precision": "day",
      "category": "politics",
      "actor": "Fanmi Lavalas",
      "title": "Fanmi Lavalas says it will not field election candidates",
      "summary": "At a news conference in Tabarre, Jean-Bertrand Aristide's Fanmi Lavalas said security and political conditions do not allow credible elections and that it would not register candidates before the 15 November deadline, though it met the 30,000-member requirement. Executive coordinator Maryse Narcisse said: 'As soon as the conditions are met, we will participate', adding displaced residents must be able to return home and vote. Pitit Dessalines and André Michel's coalition also did not register; 33 presidential candidates were on the registry by 17 November.",
      "place": "Aristide Foundation, Tabarre",
      "lat": 18.565,
      "lon": -72.275,
      "location_precision": "neighbourhood",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Jean-Bertrand Aristide's Fanmi Lavalas refuses to take part in Haiti's upcoming elections",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/17/aristide-party-no-candidates-security-haiti/",
          "date": "2026-11-17",
          "type": "article"
        },
        {
          "title": "Haiti - News: Zapping...",
          "publisher": "HaitiLibre",
          "url": "https://www.haitilibre.com/en/news-48896-haiti-news-zapping.html",
          "date": null,
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Venue 'Aristide Foundation headquarters' comes from a HaitiLibre search excerpt (site blocked to fetch); Haitian Times says only 'Tabarre'. Coordinates approximate. Elections are now set for 18 July 2027 (first round) and 4 October 2027."
    },
    {
      "id": "2026-11-16-pelissier-san-salvador",
      "date": "2026-11-16",
      "date_precision": "day",
      "category": "politics",
      "actor": "Government of Haiti",
      "title": "Haitian justice minister in San Salvador: 'no date' for exit",
      "summary": "Haitian Justice Minister Patrick Pélissier travelled to San Salvador for an international conference, thanked Bukele ('The Haitian people applaud the decision') and said there was 'no date' for the troops to leave, with support needed at least until next year's elections and a legal framework to be drafted. Salvadoran Security Minister Gustavo Villatoro said: 'If tomorrow they reappear, as President Bukele said, we will leave', while VP Félix Ulloa said the bilateral agreement would not be published 'until diplomatic conditions allow'. Pélissier said the government had no reports of civilian casualties.",
      "place": "San Salvador, El Salvador",
      "lat": null,
      "lon": null,
      "location_precision": "offmap",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Haitians protest in support of El Salvador's anti-gang troop deployment",
          "publisher": "Al Jazeera",
          "url": "https://aljazeera.com/news/2026/11/17/haitians-protest-in-support-of-el-salvadors-anti-gang-troop-deployment",
          "date": "2026-11-17",
          "type": "article"
        },
        {
          "title": "Ministro de Justicia de Haití destaca apoyo salvadoreño en operativos contra grupos armados",
          "publisher": "Infobae",
          "url": "https://www.infobae.com/el-salvador/2026/11/17/ministro-de-justicia-de-haiti-destaca-apoyo-salvadoreno-en-operativos-contra-grupos-armados/",
          "date": "2026-11-17",
          "type": "article"
        },
        {
          "title": "Haitians rally behind Bukele as Salvadoran troops battle gangs",
          "publisher": "France 24",
          "url": "https://france24.com/en/americas/20261118-haitians-rally-behind-bukele-as-salvadoran-troops-battle-gangs",
          "date": "2026-11-18",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "PM Fils-Aimé had been announced (AP, 9-10 Nov) as visiting El Salvador on 16-17 Nov; coverage I could read shows only Justice Minister Pélissier attending. I found no confirmation that Fils-Aimé travelled or met Bukele. Movement here is a ministerial trip, not a troop movement."
    },
    {
      "id": "2026-11-17-ohchr-warning",
      "date": "2026-11-17",
      "date_precision": "day",
      "category": "humanitarian",
      "actor": "UN",
      "title": "UN rights office: 4,595 killed in 2026; protect civilians",
      "summary": "OHCHR spokesperson Marta Hurtado said armed violence killed 4,595 people and injured 2,050 in Haiti from January to 31 October 2026, including 1,167 killed and 459 injured in July-September, of whom at least 514 were killed in security-force operations against gangs. High Commissioner Volker Türk urged all forces 'under the Gang Suppression Force or outside it' to prioritise protecting the population and use lethal force only as a last resort. Displacement stands at an estimated 1.49 million and 5.94 million people face acute food insecurity.",
      "place": "Geneva (OHCHR briefing on Haiti)",
      "lat": null,
      "lon": null,
      "location_precision": "offmap",
      "casualties": {
        "killed": 4595,
        "injured": 2050,
        "note": "Nationwide, 1 Jan-31 Oct 2026. Q3 2026: 1,167 killed, 459 injured; 514 killed and 235 injured in security operations; 44 alleged police extrajudicial killings; 340 women and girls subjected to sexual violence."
      },
      "movement": null,
      "sources": [
        {
          "title": "UN News story on OHCHR Haiti briefing (17 November 2026)",
          "publisher": "UN News",
          "url": "https://news.un.org/en/story/2026/11/1168823",
          "date": "2026-11-17",
          "type": "report"
        },
        {
          "title": "Haitians take to the streets in support of El Salvador troops",
          "publisher": "Jamaica Observer (CMC)",
          "url": "https://www.jamaicaobserver.com/2026/11/17/haitians-take-streets-support-el-salvador-troops/",
          "date": "2026-11-17",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Event took place in Geneva; for a Haiti-only map, re-pin to Port-au-Prince (18.5944, -72.3074) with precision 'city'. The UN text does not name El Salvador explicitly. It also reports the 'Brooklyn' gang leader in Cité Soleil allegedly prepared a municipal candidate list and two residents who denounced it were shot dead (undated)."
    },
    {
      "id": "2026-11-17-merci-bukele-march",
      "date": "2026-11-17",
      "date_precision": "day",
      "category": "people",
      "actor": "Civilians",
      "title": "Thousands march in Port-au-Prince: 'Merci Bukele'",
      "summary": "Thousands marched in Port-au-Prince and other cities with signs reading 'Merci Bukele', 'Vive Bukele' and 'Too many police officers have died', chanting 'Ba yo dwonn' ('Strike them with drones') and 'Give them the drones and the dogs!', according to AFP and AP. At the end of the march police fired tear gas to disperse demonstrators heading for the Sylvio Cator stadium where Salvadoran soldiers are based; AFP photographed an injured protester. In Jacmel, marchers asked Bukele to help reopen the roads to the south (Le Nouvelliste via UPI). Bukele replied on X: 'Mwen renmen nou tou… I hear you loud and clear.'",
      "place": "Port-au-Prince (march ended near Stade Sylvio Cator)",
      "lat": 18.5366,
      "lon": -72.342,
      "location_precision": "landmark",
      "casualties": {
        "killed": null,
        "injured": 1,
        "note": "At least one protester injured after police fired tear gas (AFP photo caption); no full count."
      },
      "movement": null,
      "sources": [
        {
          "title": "Photos: Thousands march in Haiti in support of Salvadoran troops",
          "publisher": "Al Jazeera (AFP)",
          "url": "https://www.aljazeera.com/gallery/2026/11/18/photos-thousands-march-in-haiti-in-support-of-salvadoran-troops",
          "date": "2026-11-18",
          "type": "article"
        },
        {
          "title": "Haïti: manifestation de soutien aux soldats du Salvador",
          "publisher": "France 24 (AFP)",
          "url": "https://france24.com/fr/am%C3%A9riques/20261118-haiti-manifestation-soutien-soldats-salvador-nayib-bukele-gangs",
          "date": "2026-11-18",
          "type": "article"
        },
        {
          "title": "Thousands demonstrate in Haiti's capital to praise Bukele and Salvadoran troops fighting gangs",
          "publisher": "NBC News (AP)",
          "url": "https://www.nbcnews.com/world/haiti/thousands-demonstrate-haitis-capital-praise-bukele-salvadoran-troops-f-rcna609918",
          "date": "2026-11-17",
          "type": "article"
        },
        {
          "title": "Haitians march in support of Bukele, his troops against gangs",
          "publisher": "UPI",
          "url": "https://www.upi.com/Top_News/World-News/2026/11/18/latam-haiti-bukele-marches/5511795014914/",
          "date": "2026-11-18",
          "type": "article"
        },
        {
          "title": "Nayib Bukele reply to the marches ('I hear you loud and clear')",
          "publisher": "X (@nayibbukele)",
          "url": "https://x.com/nayibbukele/status/2122852551926141400",
          "date": "2026-11-17",
          "type": "x"
        }
      ],
      "confidence": "high",
      "notes": "March route and starting point are not given in any source read; pin is the stadium where it was dispersed. Crowd size conflict: 'thousands' (AFP, AP) vs 'hundreds' (Al Jazeera 17 Nov text). Jacmel is at 18.2342, -72.5347. Al Jazeera (17 Nov) says almost 2,000 people have been displaced since the Salvadoran troops arrived (source not specified)."
    },
    {
      "id": "2026-11-17-cooperation-agreement-approved",
      "date": "2026-11-17",
      "date_precision": "day",
      "category": "politics",
      "actor": "Government of Haiti",
      "title": "Haiti's cabinet approves cooperation accord with El Salvador",
      "summary": "Haiti's Council of Ministers approved a cooperation agreement with El Salvador, which the government called 'a new stage in strengthening bilateral relations and cooperation', according to AFP via Euronews and France 24. Its terms were not disclosed; Salvadoran VP Félix Ulloa said it would stay private 'until diplomatic conditions allow', and Amnesty has demanded publication. The International Crisis Group warned the same day that Haitian authorities 'lack a strategy' for holding retaken territory.",
      "place": "Port-au-Prince",
      "lat": 18.5425,
      "lon": -72.3386,
      "location_precision": "city",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "Haiti formalises security pact with El Salvador as thousands march in support of Bukele",
          "publisher": "Euronews",
          "url": "https://www.euronews.com/2026/11/18/haiti-formalises-security-pact-with-el-salvador-as-thousands-march-in-support-of-bukele",
          "date": "2026-11-18",
          "type": "article"
        },
        {
          "title": "Haïti: manifestation de soutien aux soldats du Salvador",
          "publisher": "France 24 (AFP)",
          "url": "https://france24.com/fr/am%C3%A9riques/20261118-haiti-manifestation-soutien-soldats-salvador-nayib-bukele-gangs",
          "date": "2026-11-18",
          "type": "article"
        },
        {
          "title": "Bukele says Salvadoran forces struck another gang leader's home on 'Vertières Day'",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/18/bukele-strikes-gang-leader-home-vertieres-day/",
          "date": "2026-11-18",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Wording varies: 'approved' (AFP), 'ratified' (France 24 English), 'signed' (Le Temps, via search excerpt). The agreement text is not public; whether it retroactively covers operations since late October is unknown."
    },
    {
      "id": "2026-11-18-canaan-jeff-mansion-strike",
      "date": "2026-11-18",
      "date_precision": "day",
      "category": "military",
      "actor": "El Salvador",
      "title": "Salvadoran helicopters strike 'Jeff' Larose's mansion in Canaan",
      "summary": "Early on Wednesday, the anniversary of the Battle of Vertières, Salvadoran helicopters fired on the mansion of Jeff Larose (alias Jeff Canaan, Jeff Gwo Lwa), leader of the 'Taliban' gang that controls Canaan, north of Port-au-Prince; residents reported several explosions. Bukele posted video on X captioned 'My gift to the Haitian people on the anniversary of the Battle of Vertières'. It is not known whether Larose was inside or killed; ICG analyst Diego Da Rin doubted he was there. The GSF said it was not involved, and it was unclear whether Haitian police or army took part.",
      "place": "Canaan (north of Port-au-Prince)",
      "lat": 18.648,
      "lon": -72.27,
      "location_precision": "neighbourhood",
      "casualties": {
        "killed": null,
        "injured": null,
        "note": "No casualty figures reported; Larose's fate unknown (one secondary report says he survived)."
      },
      "movement": null,
      "sources": [
        {
          "title": "Bukele confirms airstrike on Haitian gang leader Jeff's luxury mansion",
          "publisher": "Euronews (AP)",
          "url": "https://euronews.com/2026/11/18/bukele-confirms-airstrike-on-haitian-gang-leader-jeffs-luxury-mansion",
          "date": "2026-11-18",
          "type": "article"
        },
        {
          "title": "Bukele says Salvadoran forces struck another gang leader's home on 'Vertières Day'",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/18/bukele-strikes-gang-leader-home-vertieres-day/",
          "date": "2026-11-18",
          "type": "article"
        },
        {
          "title": "El Salvador's president confirms and celebrates attack on home of key Haitian gang leader",
          "publisher": "Associated Press (via WRAL)",
          "url": "https://www.wral.com/news/ap/4397a-el-salvadors-president-confirms-and-celebrates-attack-on-home-of-key-haitian-gang-leader/",
          "date": "2026-11-18",
          "type": "article"
        },
        {
          "title": "Nayib Bukele: 'My gift to the Haitian people on the anniversary of the Battle of Vertières' (video)",
          "publisher": "X (@nayibbukele)",
          "url": "https://x.com/nayibbukele/status/2123060372026331180",
          "date": "2026-11-18",
          "type": "x"
        }
      ],
      "confidence": "high",
      "notes": "Exact location of the mansion within Canaan is not published; pin is the settlement centre (approximate). Bukele did not say whether the house was destroyed or damaged; local outlets reported drone strikes destroyed it, AP says helicopters. The Haitian Times says the Taliban gang is closely allied with 5 Segonn (per a search excerpt); Jeff and Wilson Joseph control and toll the main roads north and east of the capital (AP)."
    },
    {
      "id": "2026-11-18-second-day-celebrations",
      "date": "2026-11-18",
      "date_precision": "day",
      "category": "people",
      "actor": "Civilians",
      "title": "Second day of pro-Bukele marches after Canaan strike",
      "summary": "Thousands marched through Port-au-Prince and beyond for a second consecutive day, chanting Bukele's name after the strike on Jeff Larose's house, according to AP. 'Jeff is a criminal and I hope he died… We asked for help; Bukele answered us,' said Mario Jean-Pierre, a 45-year-old vendor. Analysts from ICG and ACLED warned that gangs may retaliate against civilians seen as supporting the operations and that holding retaken territory remains the main challenge.",
      "place": "Port-au-Prince",
      "lat": 18.5425,
      "lon": -72.3386,
      "location_precision": "city",
      "casualties": null,
      "movement": null,
      "sources": [
        {
          "title": "El Salvador's president confirms and celebrates attack on home of key Haitian gang leader",
          "publisher": "Associated Press (via WRAL)",
          "url": "https://www.wral.com/news/ap/4397a-el-salvadors-president-confirms-and-celebrates-attack-on-home-of-key-haitian-gang-leader/",
          "date": "2026-11-18",
          "type": "article"
        },
        {
          "title": "Bukele confirms airstrike on Haitian gang leader Jeff's luxury mansion",
          "publisher": "Euronews (AP)",
          "url": "https://euronews.com/2026/11/18/bukele-confirms-airstrike-on-haitian-gang-leader-jeffs-luxury-mansion",
          "date": "2026-11-18",
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "No route or neighbourhood given. Single wire source (AP) for the second-day marches."
    }
  ],
  "control_areas": [
    {
      "name": "Downtown: Stade Sylvio Cator",
      "as_of": "2026-11-12",
      "status": "liberated",
      "share": null,
      "polygon": [
        [
          [
            18.5393,
            -72.3445
          ],
          [
            18.5395,
            -72.3395
          ],
          [
            18.534,
            -72.3393
          ],
          [
            18.5338,
            -72.3443
          ]
        ]
      ],
      "sources": [
        {
          "title": "Haiti, El Salvador forces retake Sylvio Cator stadium",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/12/haiti-el-salvador-forces-retake-sylvio-cator-stadium/",
          "date": "2026-11-12",
          "type": "article"
        },
        {
          "title": "Haitian police retake national stadium from gangs after two years",
          "publisher": "France 24",
          "url": "https://www.france24.com/en/americas/20261113-haitian-police-retake-national-stadium-from-gangs-after-two-years",
          "date": "2026-11-13",
          "type": "article"
        },
        {
          "title": "Salvadoran soldiers take position at the Sylvio Cator stadium",
          "publisher": "Le Nouvelliste",
          "url": "https://lenouvelliste.com/article/273831/salvadoran-soldiers-take-position-at-the-sylvio-cator-stadium",
          "date": "2026-11-13",
          "type": "article"
        }
      ],
      "confidence": "high",
      "notes": "Retaken on 12 Nov by the PNH, Task Force, FAd'H and Salvadoran special forces after gangs had held it since February 2024; police said they took 'full control' and handed security to Salvadoran soldiers, who use it as a forward base. Outline covers the stadium and its immediate blocks only; the rest of downtown is still contested."
    },
    {
      "name": "Downtown: Stade Sylvio Cator",
      "as_of": "2026-11-18",
      "status": "liberated",
      "share": null,
      "polygon": [
        [
          [
            18.543,
            -72.3475
          ],
          [
            18.5432,
            -72.3425
          ],
          [
            18.5395,
            -72.3395
          ],
          [
            18.534,
            -72.3393
          ],
          [
            18.5338,
            -72.3443
          ],
          [
            18.5395,
            -72.348
          ]
        ]
      ],
      "sources": [
        {
          "title": "Haiti, El Salvador forces retake Sylvio Cator stadium",
          "publisher": "The Haitian Times",
          "url": "https://haitiantimes.com/2026/11/12/haiti-el-salvador-forces-retake-sylvio-cator-stadium/",
          "date": "2026-11-12",
          "type": "article"
        },
        {
          "title": "Haitian police retake national stadium from gangs after two years",
          "publisher": "France 24",
          "url": "https://www.france24.com/en/americas/20261113-haitian-police-retake-national-stadium-from-gangs-after-two-years",
          "date": "2026-11-13",
          "type": "article"
        }
      ],
      "confidence": "medium",
      "notes": "Extended to the Électricité d'Haïti headquarters, which The Haitian Times says Salvadoran forces helped retake alongside the PNH, Task Force and FAd'H (no date given; dated here to the report). The EDH coordinates are approximate and unverified. Outline approximate."
    }
  ],
  "territory": [
    {
      "name": "Santo / Croix-des-Missions corridor (incl. 'Las Vegas' and 'Dyo' corridors)",
      "gang": "Chen Mechan (leader Claudy Célestin), Viv Ansanm",
      "status": "contested",
      "lat": 18.583,
      "lon": -72.248,
      "radius_km": 2.5,
      "as_of": "2026-11-05",
      "source_url": "https://www.latintimes.com/haiti-salvadoran-technicians-missing-vehicle-found-600954",
      "notes": "Site of the 18 Oct ambush. PNH/GSF offensive from 18-21 Oct; PNH, GSF and Salvadoran troops searched Santo on 2 Nov and reported no resistance, but no source says the state holds the area permanently. 'Las Vegas' is described as Chen Mechan's bastion (El Mundo/EFE, 22 Oct); its exact location is not known to me."
    },
    {
      "name": "Croix-des-Bouquets (400 Mawozo stronghold)",
      "gang": "400 Mawozo (leader Wilson Joseph, 'Lanmò San Jou'), Viv Ansanm",
      "status": "contested",
      "lat": 18.5768,
      "lon": -72.2263,
      "radius_km": 4,
      "as_of": "2026-11-10",
      "source_url": "https://haitiantimes.com/2026/11/10/mansion-linked-haiti-gang-leader-reportedly-destroyed/",
      "notes": "Joseph's mansion / gang HQ struck on 8 Nov (up to 20 killed). Gang members including Joseph reportedly fled to Carrefour afterwards (unconfirmed). Gang has offered dialogue/disarmament. 400 Mawozo also taxes the main road east of the capital (AP, 18 Nov). InSight Crime estimate: ~300 members (via Latin Times)."
    },
    {
      "name": "Plaine du Cul-de-Sac (wider plain)",
      "gang": "400 Mawozo, Chen Mechan, Taliban (Viv Ansanm factions)",
      "status": "contested",
      "lat": 18.6,
      "lon": -72.2,
      "radius_km": 8,
      "as_of": "2026-11-11",
      "source_url": "https://acleddata.com/expert-comment/el-salvadors-military-deployment-haiti-boosting-anti-gang-efforts",
      "notes": "Main theatre of operations since 18 Oct. Per Wikipedia (Territory of Viv Ansanm), at least 613 people died in intra-gang fighting over the plain between 6 March and 31 July 2026."
    },
    {
      "name": "Canaan",
      "gang": "Taliban / Canaan gang (leader Jeff Larose, 'Jeff Gwo Lwa'), Viv Ansanm; allied with 5 Segonn and 400 Mawozo",
      "status": "gang-held",
      "lat": 18.648,
      "lon": -72.27,
      "radius_km": 4,
      "as_of": "2026-11-18",
      "source_url": "https://www.wral.com/news/ap/4397a-el-salvadors-president-confirms-and-celebrates-attack-on-home-of-key-haitian-gang-leader/",
      "notes": "Larose's mansion hit by Salvadoran helicopters on 18 Nov; no ground presence reported ('hard to reach by land', per ICG's Diego Da Rin). Gang has 'a couple hundred members' and tolls the main road north of the capital (RN1). Canaan-based groups attacked Arcahaie in early November."
    },
    {
      "name": "Cité Soleil – Boston sector / Carrefour Drouillard",
      "gang": "Boston gang (leader Mathias Saintil, killed 5 Nov 2026), Viv Ansanm",
      "status": "contested",
      "lat": 18.5786,
      "lon": -72.3353,
      "radius_km": 1.5,
      "as_of": "2026-11-06",
      "source_url": "https://diario.elmundo.sv/el-mundo/muere-poderoso-jefe-pandillero-durante-operativo-con-drones-en-haiti",
      "notes": "Leader and ~26 members reportedly killed in drone operations around 5 Nov (ACLED). No source reports state forces holding ground here; gang reportedly ~100 members per a 2024 UN report."
    },
    {
      "name": "Cité Soleil – Brooklyn",
      "gang": "'Brooklyn' gang (leader not named in source)",
      "status": "gang-held",
      "lat": 18.583,
      "lon": -72.34,
      "radius_km": 1.2,
      "as_of": "2026-11-17",
      "source_url": "https://news.un.org/en/story/2026/11/1168823",
      "notes": "OHCHR: the gang's leader allegedly prepared a municipal candidate list; two residents who denounced it were shot dead. Coordinates approximate."
    },
    {
      "name": "Cité Soleil – Route Soleil 9",
      "gang": "Unnamed gang positions",
      "status": "contested",
      "lat": 18.588,
      "lon": -72.32,
      "radius_km": 0.8,
      "as_of": "2026-10-06",
      "source_url": "https://gangsuppressionforce.org/",
      "notes": "GSF search-and-clear raid on 6 Oct 2026 (2 killed, 2 arrested). Coordinates approximate."
    },
    {
      "name": "Tabarre (Kraze Baryè-influenced areas)",
      "gang": "Kraze Baryè (leader Vitel'Homme Innocent)",
      "status": "contested",
      "lat": 18.5786,
      "lon": -72.27,
      "radius_km": 2.5,
      "as_of": "2026-10-31",
      "source_url": "https://gangsuppressionforce.org/",
      "notes": "GSF patrol fired on at an illegal checkpoint in Kraze Baryè territory on 22 Jul; large GSF barricade-clearing operation on 5 Oct. Since 30 Oct the Salvadoran contingent has an encampment in Tabarre near the US embassy; the GSF's Camp Vertières is on Boulevard du 15 Octobre."
    },
    {
      "name": "Stade Sylvio Cator",
      "gang": "Previously gang-held since February 2024 (gang not named in sources read)",
      "status": "retaken",
      "lat": 18.5366,
      "lon": -72.342,
      "radius_km": 0.3,
      "as_of": "2026-11-12",
      "source_url": "https://haitiantimes.com/2026/11/12/haiti-el-salvador-forces-retake-sylvio-cator-stadium/",
      "notes": "Retaken 12 Nov by PNH, Task Force, FAd'H and Salvadoran special forces; now a Salvadoran forward base with 20+ armoured vehicles."
    },
    {
      "name": "Électricité d'Haïti (EDH) headquarters",
      "gang": "Previously gang-held (gang not named)",
      "status": "retaken",
      "lat": 18.541,
      "lon": -72.345,
      "radius_km": 0.2,
      "as_of": "2026-11-18",
      "source_url": "https://haitiantimes.com/2026/11/18/bukele-strikes-gang-leader-home-vertieres-day/",
      "notes": "The Haitian Times says Salvadoran forces helped retake the EDH headquarters alongside PNH, Task Force and FAd'H; no date given. Coordinates are my approximate recollection of the downtown head office and should be verified before plotting as a landmark."
    },
    {
      "name": "Downtown Port-au-Prince (centre-ville)",
      "gang": "Viv Ansanm coalition (leader Jimmy 'Barbecue' Chérizier)",
      "status": "contested",
      "lat": 18.543,
      "lon": -72.339,
      "radius_km": 1.5,
      "as_of": "2026-11-12",
      "source_url": "https://ticotimes.net/2026/11/13/bukele-haiti-stadium-base-sylvio-cator",
      "notes": "Described as gang-controlled in a CNN report of 15 Oct 2026 (via Wikipedia). Since 12 Nov Salvadoran troops hold the stadium and Bukele has announced an offensive 'into gang-controlled territories' from there, warning gang members to leave. Estimates of gang control of the metro area vary: ~90% (UN/GSF), 'more than 80%' (Al Jazeera, Haitian justice minister), ~70% (AP, Nov 2026)."
    },
    {
      "name": "Martissant",
      "gang": "Not named in sources read",
      "status": "contested",
      "lat": 18.529,
      "lon": -72.36,
      "radius_km": 1.5,
      "as_of": "2026-11-10",
      "source_url": "https://haitiantimes.com/2026/11/11/bukele-defends-haiti-gang-operations-amid-pressure/",
      "notes": "Security operations reported on 10 Nov, no detail. Which gang holds the area was not stated in any source I read for this period."
    },
    {
      "name": "Carrefour",
      "gang": "Ti Bwa / gang of Christ-Roi 'Krisla' Chéry, Viv Ansanm",
      "status": "gang-held",
      "lat": 18.534,
      "lon": -72.409,
      "radius_km": 4,
      "as_of": "2026-11-10",
      "source_url": "https://haitiantimes.com/2026/11/10/mansion-linked-haiti-gang-leader-reportedly-destroyed/",
      "notes": "Haitian Times: Carrefour 'is controlled by Christ-Roi Krisla Chéry'; 400 Mawozo members reportedly fled there after 8 Nov (unconfirmed). Krisla posted a defiant video on 21 Oct."
    },
    {
      "name": "Kenscoff / Furcy",
      "gang": "Viv Ansanm-linked groups (not named)",
      "status": "contested",
      "lat": 18.45,
      "lon": -72.285,
      "radius_km": 5,
      "as_of": "2026-11-06",
      "source_url": "https://haitiantimes.com/2026/11/07/haitians-rally-behind-bukele-salvadoran-troops-gangs/",
      "notes": "Gang attack on 23 Aug 2026 killed at least 47. PM said on 3 Nov that interventions were under way in Kenscoff and Gressier; displaced residents at the 6 Nov march asked Bukele to 'go to Furcy, go to Kenscoff, go to Ti Miska, Kay Jak'."
    },
    {
      "name": "Gressier",
      "gang": "Not named in sources read",
      "status": "contested",
      "lat": 18.54,
      "lon": -72.527,
      "radius_km": 4,
      "as_of": "2026-11-03",
      "source_url": "https://diario.elmundo.sv/politica/primer-ministro-haitiano-agradece-a-bukele-y-confirma-apoyo-de-fuerzas-especiales-salvadorenas-contra-pandillas",
      "notes": "PM Fils-Aimé named Gressier as an area where security interventions were already under way (3 Nov)."
    },
    {
      "name": "Arcahaie / Bercy / Cabaret",
      "gang": "Local Cabaret-Bercy gang (chief 'Galaxie', reportedly killed 29 Oct) and Canaan-based groups",
      "status": "contested",
      "lat": 18.75,
      "lon": -72.455,
      "radius_km": 7,
      "as_of": "2026-11-07",
      "source_url": "https://nago.tv/en/news/l-operation-policiere-tue-le-chef-d-une-bande-criminelle-a-bercy",
      "notes": "PNH and the Arcahaie self-defence brigade hit Bercy on 29 Oct; gangs attacked Arcahaie 31 Oct-2 Nov (16 reported killed, low confidence). OHCHR projects critical acute malnutrition in Cabaret by May 2027."
    },
    {
      "name": "Lower Artibonite (RN1 section, Pont-Sondé, Petite-Rivière-de-l'Artibonite)",
      "gang": "Gran Grif (allied with Viv Ansanm)",
      "status": "gang-held",
      "lat": 19.1247,
      "lon": -72.4797,
      "radius_km": 12,
      "as_of": "2026-03-29",
      "source_url": "https://en.wikipedia.org/wiki/Territory_of_Viv_Ansanm",
      "notes": "Stale: latest dated item is the 29 Mar 2026 attack on Petite-Rivière. Wikipedia says Viv Ansanm holds ~50% of Artibonite. No Salvadoran or GSF operation reported here in Oct-Nov 2026; PM said operations would expand to Artibonite and Centre."
    },
    {
      "name": "Mirebalais and Saut-d'Eau (Centre)",
      "gang": "Viv Ansanm",
      "status": "gang-held",
      "lat": 18.834,
      "lon": -72.105,
      "radius_km": 10,
      "as_of": "2025-04-30",
      "source_url": "https://en.wikipedia.org/wiki/Territory_of_Viv_Ansanm",
      "notes": "Stale: taken over in April 2025 per Wikipedia; no 2026 update found. Included for context only."
    }
  ]
};
