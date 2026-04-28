export interface ActivityPhoto {
  src: string | string[];
  caption: string;
}

export interface Activity {
  id: string;
  order: number;
  emoji: string;
  title: string;
  location: string;
  address: string;
  description: string;
  highlights: string[];
  // Rich diary content — filled progressively per banner
  story?: string;
  feelings?: string;
  quick_facts?: string[];
  photos?: ActivityPhoto[];
  realizations?: string[];
  keywords?: string[];
}

export interface Day {
  id: number;
  title: string;
  subtitle: string;
  theme: string;
  intro: string;
  activities: Activity[];
}

export const days: Day[] = [
  {
    id: 0,
    title: "PRE",
    subtitle: "The Journey Begins",
    theme: "departure",
    intro:
      "Before the adventure truly began, Day 0 was all about preparation, excitement, and the anticipation of what lay ahead. The DJM Educational Tour was about to take us across the Philippines — from the historic streets of Manila to the mountain air of Baguio City.",
    activities: [
      {
        id: "our-home",
        order: 1,
        emoji: "🏠",
        title: "Our Home",
        location: "Zamboanga City",
        address: "Zamboanga City, Zamboanga del Sur",
        description:
          "The morning of Day 0 started at home in Zamboanga City — the City of Flowers. Bags were packed, families gathered, and excitement filled the air. This was the last moment of familiar comfort before we set off on an adventure that would take us across the Philippines.",
        highlights: [
          "Final preparations and packing for the educational tour",
          "Farewells and send-off from family and friends",
          "Zamboanga City — the City of Flowers, gateway to adventure",
        ],
        story:
          "I woke up at 3:00 in the morning since our flight was scheduled for 6:00 AM. It was early, but I couldn't really sleep anyway — I was just too excited.\n\n My best friend Fhadia was also joining the tour, and since we live near each other, her father kindly let me ride with them to the airport. That early morning ride with them was such a relief and such a wholesome way to start the day.\n\nIn the days leading up to this, I had already packed my luggage about a week before the flight. I wanted to make sure everything was ready and nothing would be left behind. I also had my phone fixed beforehand — the last thing I wanted was a broken phone during the trip! On top of that, I made a list of all the people I planned to buy pasalubong for when I got back home.",
        feelings:
          "Honestly? I was a bundle of nerves but more than anything, I was beyond excited. This was my very first time going outside of Zamboanga City, and my very first time riding an airplane. Everything felt unreal.",
        realizations: [
          "I feel so blessed and grateful to my two sisters who paid for this tour and my plane ticket. Without them, this once-in-a-lifetime experience would not have been possible.",
          "I am deeply thankful to my mother, who guided me on what to do, what to expect, and what to bring for my flight. Her advice gave me so much confidence heading into this brand new experience.",
        ],
        keywords: [
          "First Flight",
          "3AM Wake Up",
          "Zamboanga City",
          "Departure Day",
          "Pasalubong List",
          "Travel Prep",
        ],
      },
      {
        id: "zamboanga-airport",
        order: 2,
        emoji: "✈️",
        title: "Zamboanga International Airport",
        location: "Zamboanga City",
        address: "Camino Nuevo, Zamboanga City, Zamboanga del Sur",
        description:
          "The Zamboanga International Airport was our meeting point. It was a busy morning, but it was cool to see most of my classmates and two of our teachers were on the same flight as us for the tour.",
        highlights: [
          "Arriving at the airport early",
          "Finding the prayer room with Ace for Fajr",
          "First-time flight experience on an Airbus A320",
          "Group attendance photos",
        ],
        story:
          "We left for the airport at 4:00 AM and got there by 4:45 AM. We weren't all booked on one big ticket, so it was a nice surprise to find that most of my classmates and two of our teachers were on the same flight. My best friend Fhadia and I checked in for Philippine Airlines flight PR 2950. Since it was my first time flying, she let me take the window seat on the Airbus A320.\n\nWhile waiting, Ace and I looked for the prayer room. We were happy to find one, so we prayed Fajr together before the flight—it was a good, calm start to the day. When it was time to board, we had to walk outside on the tarmac and climb the stairs into the plane since the airport doesn't have jetways.\n\nOnce we were buckled in, it finally hit me that we were really flying. The engine starting, the taxiing, and the speed during takeoff was pretty nerve-wracking. I was scared the whole time and just prayed for a safe flight. But once we were in the air and leveled off, I finally felt calm.",
        feelings:
          "I was super nervous. It was my first time flying, and the takeoff felt pretty intense. Praying before we left helped me settle down, and once we were cruising in the sky, I felt a lot better.",
        photos: [
          {
            src: [
              "/photos/day00/day00_006.webp",
              "/photos/day00/day00_007.webp",
            ],
            caption: "Group photo with friends for Sir Jason’s attendance.",
          },
          {
            src: [
              "/photos/day00/day00_009.webp",
              "/photos/day00/day00_002.webp",
            ],
            caption: "Arriving at the airport with Fhadia and her family.",
          },
          {
            src: [
              "/photos/day00/day00_003.webp",
              "/photos/day00/day00_008.webp",
            ],
            caption: "Walking out to the tarmac to climb up to the plane.",
          },
          {
            src: [
              "/photos/day00/day00_005.webp",
              "/photos/day00/day00_004.webp",
              "/photos/day00/day00_001.webp",
            ],
            caption: "My view from the window seat.",
          },
        ],
        realizations: [
          "The Zamboanga airport really is small compared to others, but it made the whole process feel faster.",
          "Takeoff is definitely the scariest part of the trip, but it's worth it once you're cruising.",
        ],
        keywords: [
          "First Flight",
          "Zamboanga International Airport",
          "Airbus A320",
          "PR 2950",
          "Fajr Prayer",
          "Travel Preparation",
        ],
      },
    ],
  },
  {
    id: 1,
    title: "Day 0",
    subtitle: "Welcome to Historical Manila",
    theme: "history",
    intro:
      "Day 1 of our DJM Educational Tour plunged us right into the heart of Filipino history. From the sweeping lawns of Luneta Park — where national hero Dr. Jose Rizal was executed — to the thick stone walls of Intramuros, Manila's oldest district, every step brought us closer to understanding the nation's remarkable past.",
    activities: [
      {
        id: "rizal-park",
        order: 1,
        emoji: "🌳",
        title: "Rizal Park (Luneta)",
        location: "Rizal Park (Luneta)",
        address: "Roxas Boulevard, Ermita, Manila",
        description:
          "After lunch, we started our official walking tour of Manila with our guide, Kuya Jero. Our first stop was the historic Rizal Park, where we spent the afternoon roaming around, learning about the statues and monuments, and beating the heat with some local ice cream.",
        highlights: [
          "Walking tour with our guide, Kuya Jero",
          "Learning the history behind the statues and guards",
          "Visiting the actual site where Jose Rizal was executed",
          "Getting some ice cream with friends",
        ],
        story:
          "After lunch, we hopped on our bus (I was assigned to Bus B) to start the walking tour. Our guide, Kuya Jero, walked us through the different historical spots in the park and explained what everything meant—from the statues and the flags to the guards. \n\nWe noticed a lot of photographers in the area offering instant photo prints for 100-150 pesos. It was good to see they were all wearing official IDs, which made it feel safe and organized. It was a really hot day, so we made sure to grab some ice cream from the local vendors to cool off while we walked around. It was honestly such a relief to see these historic spots in person instead of just in photos.",
        feelings:
          "It felt surreal. I’ve seen this park in pictures my whole life, but actually walking around it was a totally different experience. I was tired from the heat, but listening to the stories and seeing the history firsthand made it worth it.",
        photos: [
          {
            src: [
              "/photos/luneta/luneta_001.webp",
              "/photos/luneta/luneta_002.webp",
              "/photos/luneta/luneta_003.webp",
              "/photos/luneta/luneta_004.webp",
              "/photos/luneta/luneta_005.webp",
              "/photos/luneta/luneta_006.webp",
              "/photos/luneta/luneta_007.webp",
              "/photos/luneta/luneta_010.webp",
              "/photos/luneta/luneta_011.webp",
              "/photos/luneta/luneta_012.webp",
              "/photos/luneta/luneta_013.webp",
              "/photos/luneta/luneta_019.webp",
              "/photos/luneta/luneta_022.webp",
              "/photos/luneta/luneta_023.webp",
            ],
            caption: "Group and solo shots from Rizal Park.",
          },
        ],
        realizations: [
          "It’s amazing to finally see the places I’ve only ever studied in history books. Being there in person makes the history feel real.",
          "Kuya Jero’s explanations really helped. I learned that the statue isn't actually the exact spot where Rizal was shot; it's a monument, but the execution site is nearby.",
          "The photographers wearing ID badges is a smart move by the city—it keeps things professional and safe for tourists.",
        ],
        keywords: [
          "Manila Tour",
          "Rizal Park",
          "Luneta",
          "Educational Tour",
          "Walking Tour",
          "Historical Sites",
        ],
      },
      {
        id: "intramuros",
        order: 3,
        emoji: "🏛",
        title: "Intramuros",
        location: "Intramuros",
        address: "The Walled City, Manila",
        description:
          "Intramuros, known as 'The Walled City,' is the oldest district in Manila. Built by the Spanish in 1571, walking through its gates feels like stepping back in time. With its cobblestone streets, horse-drawn kalesas, and centuries-old structures, it is a huge part of our history.",
        highlights: [
          "Exploring the Manila Cathedral and Fort Santiago",
          "Learning about WWII history and the dungeon ruins",
          "Walking along the Pasig River entry point",
          "Seeing the old architecture and cobblestone streets",
        ],
        story:
          "After finishing up at Luneta, we headed over to Intramuros. Our tour guide, Kuya Jero, showed us around the major spots like the Manila Cathedral and the historic Fort Santiago. The area is really old—you can tell by the cobblestone streets and the way the buildings are designed. There were a lot of other tourists around, and you could see kalesas passing by, which made the vibe even more historic.\n\nWe spent a good amount of time at Fort Santiago. We saw old cannons and piles of cannonballs used during World War II. The most intense part was seeing the dungeons—they were used as a torture chamber during the Japanese occupation. It’s sobering to think that over 300 bodies were found in that underground area after the war ended. Near the entrance of the fort, we also saw the Pasig River, which flows out into Manila Bay.",
        feelings:
          "It was a mix of being amazed at how well the area is preserved and feeling kind of heavy/sad after learning about the war history in the dungeons. It really changes how you look at the city.",
        photos: [
          {
            src: [
              "/photos/intramuros/intramuros_001.webp",
              "/photos/intramuros/intramuros_002.webp",
              "/photos/intramuros/intramuros_003.webp",
              "/photos/intramuros/intramuros_004.webp",
              "/photos/intramuros/intramuros_006.webp",
              "/photos/intramuros/intramuros_007.webp",
              "/photos/intramuros/intramuros_008.webp",
              "/photos/intramuros/intramuros_009.webp",
              "/photos/intramuros/intramuros_010.webp",
              "/photos/intramuros/intramuros_011.webp",
              "/photos/intramuros/intramuros_013.webp",
              "/photos/intramuros/intramuros_014.webp",
              "/photos/intramuros/intramuros_015.webp",
              "/photos/intramuros/intramuros_017.webp",
              "/photos/intramuros/intramuros_018.webp",
              "/photos/intramuros/intramuros_019.webp",
              "/photos/intramuros/intramuros_020.webp",
              "/photos/intramuros/intramuros_021.webp",
              "/photos/intramuros/intramuros_022.webp",
              "/photos/intramuros/intramuros_023.webp",
              "/photos/intramuros/intramuros_024.webp",
              "/photos/intramuros/intramuros_025.webp",
              "/photos/intramuros/intramuros_026.webp",
            ],
            caption:
              "Various photos captured inside the walls of Intramuros and Fort Santiago.",
          },
        ],
        realizations: [
          "Kuya Jero explained that back in the day, the people living inside the walls were 'Intramuros' (within the walls), while those who lived outside were called 'Extramuros.'",
          "Visiting Fort Santiago really put the reality of World War II into perspective for me. Seeing the actual dungeons where people suffered makes history feel much more 'real' than just reading about it in a textbook.",
          "It’s important that we keep these places standing. Seeing the contrast between the old fort and the modern city around it shows how much Manila has changed, but it also shows how vital it is to remember our past.",
        ],
        keywords: [
          "Intramuros",
          "Fort Santiago",
          "Manila History",
          "Walled City",
          "WWII",
          "Pasig River",
        ],
      },
      {
        id: "manila-cathedral",
        order: 4,
        emoji: "⛪",
        title: "Manila Cathedral",
        location: "Intramuros, Manila",
        address: "Cabildo St, Intramuros, Manila, 1002 Metro Manila",
        description:
          "The Manila Cathedral, formally known as the Minor Basilica and Metropolitan Cathedral of the Immaculate Conception, is a historic landmark located right inside Intramuros. It is massive, majestic, and easily one of the most famous churches in the Philippines.",
        highlights: [
          "One of the two historic churches inside Intramuros (alongside San Agustin)",
          "Famous venue for celebrity weddings",
          "Impressive scale and intricate interior architecture",
        ],
        quick_facts: [
          "It is officially a Minor Basilica.",
          "The cathedral is known for its intricate travertine marble and mosaic artwork.",
          "It is a top choice for grand weddings because of its historical prestige.",
        ],
        story:
          "After leaving Fort Santiago, we continued our walking tour to the Manila Cathedral. Our guide, Kuya Jero, explained that there are two main churches inside Intramuros: San Agustin and the Manila Cathedral. Both are very old, but the Cathedral really stands out because of how huge it is.\n\nWhen we went inside, a mass was ongoing, so we had to be respectful while looking around. It’s definitely grand—you can see why it’s the go-to spot for big celebrity weddings. There are souvenir shops inside, but the main thing that caught my eye was just how majestic the interior is. The detail in the stone and the design is top-tier.",
        feelings:
          "It felt peaceful yet impressive. Even though there were a lot of tourists, the atmosphere inside was still very solemn because of the mass. It’s one of those places that feels much bigger once you actually step inside.",
        photos: [
          {
            src: [
              "/photos/manila_cathedral/manila_cathedral_001.jpeg",
              "/photos/manila_cathedral/manila_cathedral_002.webp",
              "/photos/manila_cathedral/manila_cathedral_003.webp",
              "/photos/manila_cathedral/manila_cathedral_004.webp",
              "/photos/manila_cathedral/manila_cathedral_005.webp",
              "/photos/manila_cathedral/manila_cathedral_006.webp",
              "/photos/manila_cathedral/manila_cathedral_007.webp",
            ],
            caption:
              "Shots taken inside and outside the cathedral during our visit.",
          },
        ],
        realizations: [
          "It’s important to remember that this is an active place of worship. Even though we were there as tourists, I realized we needed to keep quiet and stay respectful because mass was being held.",
          "Seeing the size and detail of the church, I finally understood why it’s the most sought-after wedding venue in the country—the architecture is just on another level.",
          "Having two such historical churches (San Agustin and the Cathedral) within the same district really shows how central the Catholic faith was to the history of Manila.",
        ],
        keywords: [
          "Manila Cathedral",
          "Intramuros",
          "Minor Basilica",
          "Catholic Church",
          "Manila History",
          "Walking Tour",
        ],
      },
      {
        id: "ccp-complex",
        order: 5,
        emoji: "🎭",
        title: "CCP Complex",
        location: "Cultural Center of the Philippines",
        address: "CCP Complex, Roxas Boulevard, Pasay City",
        description:
          "The Cultural Center of the Philippines (CCP) Complex is the premier destination for arts and culture in the country. We caught a great view of the iconic architecture while passing by on our way to the Mall of Asia.",
        highlights: [
          "Drive-by viewing of the CCP main building",
          "Learning about its importance to Philippine arts",
          "Spotting the iconic brutalist architecture from the bus",
        ],
        quick_facts: [
          "The CCP was designed by National Artist for Architecture, Leandro Locsin.",
          "The complex is built on reclaimed land along Manila Bay.",
          "It serves as the main home for the performing arts in the Philippines, including theater, music, and dance.",
        ],
        story:
          "After we left Intramuros, we hopped back on the bus to head toward the Mall of Asia. As we were driving down Roxas Boulevard, Kuya Jero got our attention to point out the CCP Complex. We didn't have enough time to stop or go inside, so it was just a quick drive-by, but it was still cool to see it in person. Even just from the bus window, the building is massive and clearly a major landmark.",
        feelings:
          "It was a bit of a rush since we didn't get to hop off, but it was cool to finally see such a well-known building. It makes the city tour feel like you're covering all the bases.",
        photos: [],
        realizations: [
          "Not every tour stop needs to be a long walk-around; sometimes just getting a look at the landmark and learning its significance from the guide is enough to appreciate it.",
          "It’s impressive how much Manila packs into one stretch of the city—you go from old colonial history in Intramuros to modern arts and culture centers in just a few minutes.",
        ],
        keywords: [
          "CCP",
          "Cultural Center of the Philippines",
          "Manila Tour",
          "Roxas Boulevard",
          "Philippine Arts",
          "Educational Tour",
        ],
      },
      {
        id: "sm-mall-of-asia",
        order: 6,
        emoji: "🛍️",
        title: "SM Mall of Asia",
        location: "Pasay City, Metro Manila",
        address: "J.W. Diokno Blvd, Pasay, Metro Manila",
        description:
          "After a long day of walking under the sun, reaching the SM Mall of Asia (MOA) felt like the ultimate prize. As one of the largest malls in the world, its sheer scale is mind-blowing—a total contrast to the historical sites we visited earlier in the day.",
        highlights: [
          "Experiencing one of the world's largest malls",
          "Shopping for brands unavailable in Zamboanga",
          "Relaxing and grabbing dinner by the bay side",
        ],
        quick_facts: [
          "It is consistently ranked among the top 10 largest shopping malls globally.",
          "The entire complex sits on reclaimed land along Manila Bay.",
          "It features the MOA Eye, a giant ferris wheel that offers great views of the bay area.",
        ],
        story:
          "After our tiring walking tour of Old Manila, we headed straight to the Mall of Asia. Entering through the back near the bay, I was immediately stunned by how massive the place is. It’s so huge that you seriously need Google Maps to find your way around—I’ve never seen a mall like this back home in Zamboanga! \n\nWe only had about an hour and a half to roam, which honestly isn't enough time to see even half of it. My friends and I spent most of our time window shopping and looking for stores we don't have back home. Some of us bought clothes, food, and pasalubongs. Even the Watsons here is ridiculously big compared to what I’m used to.",
        feelings:
          "I was exhausted from the walking tour, but the energy of the mall totally woke me up. I felt a mix of awe at the size of the place and a bit of frustration that we couldn't stay longer!",
        photos: [
          {
            src: [
              "/photos/moa/IMG20260405173123.webp",
              "/photos/moa/moa_002.webp",
              "/photos/moa/moa_003.webp",
              "/photos/moa/moa_006.webp",
              "/photos/moa/moa_007.webp",
            ],
            caption:
              "Pictures capturing the massive scale of the mall and our shopping trip.",
          },
        ],
        realizations: [
          "The difference between Old Manila and modern Manila is crazy—one minute you're in the 1500s at Intramuros, and the next you're in a futuristic super-mall.",
          "Having a 'prize' stop like this after a long educational tour is a great way to keep everyone motivated throughout the day.",
          "The sheer convenience of having every single brand and restaurant in one massive building makes MOA a city within a city.",
          "I realized that 1.5 hours is definitely not enough time to explore a place this big—next time, I'd need a whole day just for the mall alone.",
        ],
        keywords: [
          "SM Mall of Asia",
          "MOA",
          "Shopping",
          "Pasay City",
          "Travel",
          "Largest Malls",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Day 1",
    subtitle: "Into the Corporate World",
    theme: "corporate",
    intro:
      "Day 2 gave us a front-row seat to two very different corners of the Philippine tech and business landscape. We visited an engineering power company and a global enterprise information management giant — both offering valuable insights into real-world careers in technology and business.",
    activities: [
      {
        id: "hytech-power",
        order: 1,
        emoji: "🤖",
        title: "Hytech Power Inc.",
        location: "Hytech Power Inc. Facility",
        address: "Metro Manila, Philippines",
        description:
          "Our second day kicked off with an eye-opening visit to Hytech Power Inc. We spent the day diving into the world of industrial simulation, robotics, and cutting-edge training technologies that are changing the way students learn engineering and technical skills.",
        highlights: [
          "Tour of various science and robotics laboratories",
          "Hands-on demo of VR welding and engineering simulators",
          "Showcase of award-winning robotics projects by former students and interns",
        ],
        quick_facts: [
          "Robotics is the intersection of mechanical engineering, electrical engineering, and computer science.",
          "Industrial simulation allows students to master complex, dangerous, or expensive tasks in a safe, risk-free virtual environment.",
          "Automation technology is used in almost every modern industry to increase precision, speed, and safety in manufacturing.",
        ],
        story:
          "The day started with a quick video presentation on what Hytech offers. We were guided by Ate Joy, who took us through the different spots in the facility. It was cool to see how they simulate different technical scenarios—from computer parts and transistors to full-scale automation labs and anatomical models (the hearts with magnets were really neat!).\n\nThe most interesting part for me was the simulation tech. They have everything from VR welding setups to mechanical and electrical engineering simulators. Ate Joy explained that this lets students practice real-life scenarios without the danger of being in a live field, which is super smart. We also got to see some of the projects created by their OJT interns and former students. Seeing robots that actually won competitions was really inspiring.",
        feelings:
          "I was super impressed. It’s one thing to learn theory in the classroom, but seeing actual machinery and simulators made it all click. It made me realize how much tech is actually out there for us to explore.",
        photos: [
          {
            src: [
              "/photos/day02_hytech/hytech_001.webp",
              "/photos/day02_hytech/hytech_002.webp",
              "/photos/day02_hytech/hytech_003.webp",
              "/photos/day02_hytech/hytech_004.webp",
              "/photos/day02_hytech/hytech_005.webp",
              "/photos/day02_hytech/hytech_006.webp",
              "/photos/day02_hytech/hytech_008.webp",
              "/photos/day02_hytech/hytech_009.webp",
              "/photos/day02_hytech/hytech_021.webp",
              "/photos/day02_hytech/hytech_027.webp",
              "/photos/day02_hytech/hytech_026.webp",
              "/photos/day02_hytech/hytech_019.webp",
            ],
            caption:
              "Snapshots from our tour of the facility and various labs.",
          },
          {
            src: [
              "/photos/day02_hytech/hytech_016.webp",
              "/photos/day02_hytech/hytech_017.webp",
            ],
            caption:
              "Our group photo using the smart monitor they have in their conference room for virtual meetings and collaboration.",
          },
          {
            src: [
              "/photos/day02_hytech/hytech_042.webp",
              "/photos/day02_hytech/hytech_033.webp",
              "/photos/day02_hytech/hytech_030.webp",
              "/photos/day02_hytech/hytech_037.webp",
            ],
            caption:
              "Some of the cool robotics projects created by interns and students.",
          },
        ],
        realizations: [
          "The use of VR and simulation is a game-changer. It takes the fear out of making mistakes while learning, which helps you learn faster and safer.",
          "It was really inspiring to see student-made projects that actually win competitions. It shows that as students, we are capable of creating professional-grade tech if we have the right guidance and resources.",
          "Automation isn't just about 'machines doing work'; it's about precision and creating better solutions for industries. Seeing the laboratory equipment up close made me appreciate the complexity of the systems we use every day.",
          "Having mentors like Ate Joy to show us the 'behind the scenes' of the industry makes me feel more confident about my path in the tech and computing field.",
        ],
        keywords: [
          "Hytech Power",
          "Robotics",
          "Engineering Simulation",
          "VR Training",
          "Automation",
          "Student Projects",
        ],
      },
      {
        id: "opentext-bgc",
        order: 2,
        emoji: "🏢",
        title: "OpenText Office Visit",
        location: "BGC, Taguig",
        address: "Bonifacio Global City, Taguig, Metro Manila",
        description:
          "After lunch, we headed to BGC in Taguig to visit the OpenText office. BGC felt like a completely different world—modern, walkable, and filled with towering skyscrapers and professionals. The visit itself was a great insight into the corporate side of the IT industry.",
        highlights: [
          "Experiencing the modern, professional vibe of BGC",
          "Company presentation on career opportunities for IT students",
          "Touring the workplace and learning about their internal operations",
          "Q&A session on hiring processes and career tips",
        ],
        quick_facts: [
          "OpenText is a global leader in Enterprise Information Management (EIM) software.",
          "The company helps major organizations manage, secure, and optimize their data using cloud, AI, and security tools.",
          "They serve 99 of the top 100 global companies across various industries like healthcare, finance, and manufacturing.",
        ],
        story:
          "The moment we arrived in BGC, I was amazed. It’s so modern, with great sidewalks and massive buildings everywhere—you can tell it’s a high-lifestyle area where many professionals work. We headed to the OpenText building for our tour. Since they deal with sensitive client accounts, we weren't allowed to take photos inside the office, so we respected that policy during our walkthrough. \n\nThey set up a great program for us, explaining what the company does and showing us potential career paths for IT students like us. We got to see the different spots in their facility and finished the day with a Q&A. The team gave us really helpful advice on the hiring process and what makes a good applicant in the tech industry.",
        feelings:
          "It felt professional and inspiring. Being in BGC and seeing how a global company operates firsthand made me feel more motivated to finish my degree and start my own career.",
        photos: [
          {
            src: [
              "/photos/day02_opentext/opentext_003.webp",
              "/photos/day02_opentext/opentext_004.webp",
              "/photos/day02_opentext/opentext_007.webp",
            ],
            caption:
              "Pictures taken while walking through BGC toward the office.",
          },
          {
            src: [
              "/photos/day02_opentext/opentext_001.webp",
              "/photos/day02_opentext/opentext_002.webp",
              "/photos/day02_opentext/opentext_005.webp",
              "/photos/day02_opentext/opentext_006.webp",
            ],
            caption:
              "Photos from inside the premises and during the welcome program.",
          },
        ],
        realizations: [
          "BGC’s design proves how important walkability is for a city. It makes the whole environment feel cleaner, safer, and much more productive for the people working there.",
          "Working in a BPO or a global tech company isn't just about technical skills; it's heavily about professional communication and being able to adapt to different client needs.",
          "Applying for a job is a skill in itself. The tips they gave us—like being proactive and showing a genuine interest in the company—are just as important as knowing how to code.",
          "Seeing the office operations in person helped me visualize where I could end up after graduation. It turns 'working in IT' from a vague idea into a real goal.",
        ],
        keywords: [
          "OpenText",
          "BGC",
          "IT Careers",
          "Corporate Office",
          "BPO",
          "Taguig",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Day 2",
    subtitle: "Creativity Meets Communication",
    theme: "creative",
    intro:
      "Day 3 was a study in contrasts — from the vibrant, colorful world of Filipino animation to the fast-paced global operations of one of the world's leading customer experience companies. Both stops revealed exciting career paths and the talent thriving right here in the Philippines.",
    activities: [
      {
        id: "top-peg",
        order: 1,
        emoji: "🎨",
        title: "TOP PEG Animation Studio",
        location: "Quezon City, Metro Manila",
        address: "Filipino Animation & Creative Studio — Metro Manila",
        description:
          "TOP PEG is a powerhouse in the Filipino animation industry. Our visit gave us an incredible behind-the-scenes look at the animation production pipeline—from concept art and storyboarding to the actual digital illustration and rendering that brings characters to life.",
        highlights: [
          "Overview of the full animation production pipeline",
          "Hands-on demo with professional Pen Displays",
          "Learning about the Philippines' role in global animation (Disney, Nintendo, Trese)",
          "Q&A session about the creative career path",
        ],
        quick_facts: [
          "Top Peg is one of the pioneers in the Philippine animation industry.",
          "The 'drawing pads' we used are called Pen Displays, which allow artists to draw directly onto a screen.",
          "Animation is a highly collaborative pipeline, involving roles like concept artists, storyboarders, animators, colorists, and riggers.",
        ],
        story:
          "For Day 3, our first stop was Top Peg. As someone who loves gaming and anime, this was definitely the part I was most hyped for. I’ve watched countless studio tour videos on YouTube, but getting to see the real deal was on another level. The studio itself wasn't a massive corporate building, but it had that cool, creative vibe you’d expect.\n\nWe started by meeting the artists and seeing their current projects. They let us try out their Pen Displays—the drawing tablets that render directly to the screen. My classmates who draw were definitely in their element here! Afterward, we had a session where we learned about the studio's history and their major international projects for companies like Disney, Nintendo, and even the Netflix series 'Trese.' It was eye-opening to learn about the specific roles in the team, like how much effort goes into simple color grading or character movement.\n\nWe wrapped it up with a Q&A. Asking about the business side of animation and how the industry works was really helpful, especially to see if it’s a career path I might want to explore.",
        feelings:
          "I was totally energized. It’s one thing to watch a show, but seeing the actual artists sweating the details on a single frame made me respect the craft so much more. It was inspiring to see Filipinos working on global icons like Batman and Disney characters.",
        photos: [
          {
            src: [
              "/photos/day03_toppeg/toppeg_011.webp",
              "/photos/day03_toppeg/toppeg_007.webp",
              "/photos/day03_toppeg/toppeg_006.webp",
              "/photos/day03_toppeg/toppeg_001.webp",
            ],
            caption:
              "Photos taken during the lecture regarding animation and the studio's history.",
          },
          {
            src: [
              "/photos/day03_toppeg/toppeg_009.jpeg",
              "/photos/day03_toppeg/toppeg_008.webp",
              "/photos/day03_toppeg/toppeg_002.webp",
            ],
            caption:
              "Shots of the animators working and me trying out the Pen Display myself.",
          },
        ],
        realizations: [
          "Animation isn't just about drawing; it's a massive team sport. I realized that even for a short clip, you need a whole chain of people, from colorists to riggers, working in sync.",
          "The creative industry is very different from the corporate BPO world. While OpenText was about data and professional processes, Top Peg is about passion, artistic vision, and iteration—it's a whole different kind of pressure.",
          "Seeing Filipino artists contribute to major global brands like Disney and Nintendo makes me proud. It proves that we have the talent here to compete on the world stage, even in highly technical creative fields.",
          "Technical skill is important, but patience is the real secret. You could see that the artists spent hours on just a few seconds of footage, which is a level of discipline I really need to develop.",
        ],
        keywords: [
          "Top Peg",
          "Animation",
          "Graphic Design",
          "Pen Display",
          "Filipino Artists",
          "Creative Industry",
        ],
      },
      {
        id: "teleperformance",
        order: 2,
        emoji: "📞",
        title: "Teleperformance Philippines",
        location: "Teleperformance Philippines",
        address: "Metro Manila, Philippines",
        description:
          "Teleperformance is a global leader in customer experience management and digital services. Our visit provided a look at the immense scale of their operations, handling thousands of customer interactions daily for major international brands. It was a clear example of the massive presence the BPO industry has here in the Philippines.",
        highlights: [
          "Overview of global customer experience management",
          "Tour of high-security office operations",
          "Learning about the technical and support opportunities for IT graduates",
          "Understanding the BPO industry's scale in the Philippines",
        ],
        quick_facts: [
          "Teleperformance operates in nearly 100 countries and serves over 170 markets.",
          "They are a 'Great Place to Work' certified company with a heavy focus on employee well-being.",
          "The company integrates AI and digital analytics to assist their agents in providing better customer service.",
        ],
        story:
          "For our last stop of the day, we visited Teleperformance. Just like with OpenText, they prepared a program to welcome us and walk us through what the company actually does. It was interesting to see how they manage their local and international clients—the scale of their office was just massive.\n\nWe toured the workplace and different sections of the office, though we were careful not to take photos inside because of the confidentiality of the accounts they handle. We saw a lot of agents in action, which was a real eye-opener regarding how fast-paced the environment is. They also hooked us up with some cool swag before we left!",
        feelings:
          "I was struck by how busy everything was. It was a very high-energy environment, and you could feel the pressure and the professionalism in the air. It’s definitely a different vibe from the creative studio we visited earlier in the day.",
        photos: [
          {
            src: [
              "/photos/day03_tp/tp_002.webp",
              "/photos/day03_tp/tp_004.webp",
              "/photos/day03_tp/tp_005.webp",
            ],
            caption: "Photos inside and outside the Teleperformance premises.",
          },
          {
            src: "/photos/day03_tp/tp_001.webp",
            caption: "The swags they gave us after the tour.",
          },
        ],
        realizations: [
          "I realized that BPO work isn't just about 'answering calls.' It's actually a complex technical workflow where agents use advanced software and AI tools to solve problems in real-time.",
          "The diversity of the accounts they handle—from tech support to healthcare to retail—shows how much specialized knowledge you need to succeed in this industry.",
          "Seeing the massive scale of a company like Teleperformance made me understand why the Philippines is a global hub for this industry. They’ve built an entire system that keeps global businesses running 24/7.",
        ],
        keywords: [
          "Teleperformance",
          "BPO",
          "Customer Experience",
          "BPO Career",
          "Tech Support",
          "Call Center Industry",
        ],
      },
    ],
  },

  {
    id: 4,
    title: "Day 3",
    subtitle: "Public Service Meets Global Business",
    theme: "government",
    intro:
      "Day 4 took us from the halls of one of Metro Manila's most vital government agencies to the modern offices of a leading business process outsourcing company. Two very different worlds — yet both shaping the daily lives of millions of Filipinos and contributing to the nation's growth.",
    activities: [
      {
        id: "mmda",
        order: 1,
        emoji: "🏛",
        title: "MMDA (Metropolitan Manila Development Authority)",
        location: "MMDA New Office",
        address: "Makati City, Metro Manila",
        description:
          "Our visit to the MMDA was a complete eye-opener. While I used to think they were just about traffic tickets, seeing their new command center showed me they are a high-tech operation managing everything from flood control to real-time traffic flow across the entire metro.",
        highlights: [
          "Exploring the Crisis Command Center and massive video wall",
          "Learning about AI-powered traffic enforcement and NCAP",
          "Understanding the underground fiber network that keeps traffic data live",
          "Overview of the ITS, Radio dispatch, and Metrocall 136 systems",
        ],
        quick_facts: [
          "The MMDA coordinates functions of 16 cities and 1 municipality in Metro Manila.",
          "Their command center uses AI to automatically detect traffic violations through their surveillance network.",
          "Metrocall 136 is their 24/7 hotline that handles emergencies, inquiries, and incident reports across the metro.",
          "They utilize over 350 CCTV cameras and a team of operators to maintain public safety and traffic flow.",
        ],
        story:
          "I arrived at the MMDA building thinking it was just a regular government office, but I was wrong. We were taken to a huge meeting room—I believe it’s where city mayors gather during typhoons or big emergencies—and the first thing that hit me was the video wall. It was massive, covering the entire front of the room.\n\nIt was wild to see live, crystal-clear feeds from cameras all over the metro. They showed us how they use AI to detect violations; the system doesn't just record, it actively scans for traffic offenses. They also explained that they don't have lag because they run on their own underground fiber optic network. It wasn't just about catching violators, though. They explained how these tools, like their Radio dispatch system and queue-length monitoring, help them respond to accidents and emergencies instantly. It’s a 24/7 operation to keep people safe on the road.",
        feelings:
          "I was honestly stunned. It’s easy to complain about traffic, but seeing the actual tech and the sheer amount of work going on behind the scenes to keep the city moving changed my perspective. It made me realize how vital these government systems are to our daily safety.",
        photos: [
          {
            src: [
              "/photos/day04_mmda/mmda_004.webp",
              "/photos/day04_mmda/mmda_006.webp",
              "/photos/day04_mmda/mmda_007.webp",
              "/photos/day04_mmda/mmda_008.webp",
            ],
            caption: "Some photos inside the MMDA headquarters.",
          },
          {
            src: [
              "/photos/day04_mmda/mmda_001.webp",
              "/photos/day04_mmda/mmda_002.webp",
              "/photos/day04_mmda/mmda_003.webp",
            ],
            caption: "Some photos outside the MMDA premises.",
          },
        ],
        realizations: [
          "Technology is the backbone of governance. The fact that they have a dedicated underground network shows that the government knows that reliability is just as important as the enforcement itself.",
          "The 'AI detection' part was a wake-up call. It shows that public spaces are becoming increasingly digitized, and traffic management is now a data-driven science, not just manual labor.",
          "There is a huge difference between 'enforcement' and 'safety.' While they do catch violators, the primary goal of these systems is actually rapid response—getting help to accidents and incidents before they become major traffic jams or dangers to the public.",
          "Working in IT doesn't just mean tech companies; government agencies are massive hubs for engineers, system analysts, and IT support staff to maintain these critical city-wide systems.",
        ],
        keywords: [
          "MMDA",
          "Traffic Management",
          "Command Center",
          "AI Technology",
          "Metro Manila",
          "NCAP",
        ],
      },
      {
        id: "microsourcing",
        order: 2,
        emoji: "🤝",
        title: "MicroSourcing Philippines",
        location: "Pasay City, Metro Manila",
        address: "Pasay City, Metro Manila",
        description:
          "Our visit to MicroSourcing was, without a doubt, the standout BPO experience of the tour. More than just a workplace tour, it was a masterclass in professional development. We had the rare opportunity to sit down with company leaders who shared their real-world experience, insights on the global job market, and advice on how to actually succeed in the IT industry.",
        highlights: [
          "Engaging session with company leaders from different departments",
          "Deep dive into the realities of global market competition",
          "Actionable advice on honing skills to stand out as an applicant",
          "Tour of the facility and office culture",
        ],
        quick_facts: [
          "MicroSourcing is one of the largest offshore outsourcing providers in the Philippines, helping companies build dedicated teams.",
          "Unlike traditional call centers, they provide a wide range of services including IT, software development, creative, and admin roles.",
          "They focus heavily on managed operations, allowing foreign companies to build their own unique corporate culture within the Philippines.",
        ],
        story:
          "To wrap up Day 4, we visited MicroSourcing in Pasay. They put together a great program for us, but what really set this visit apart was how genuine they were. They didn’t just talk about their success; they gave us a reality check on the current job market. They made us realize that when you work here, you aren't just competing with other Filipinos—you're competing with talent from all over the world, so you have to be ready to stand out.\n\nThe best part was the leadership panel. Having actual leaders from different departments set aside their time to talk to us, answer our questions about competencies, and give us honest career advice was incredibly humbling. It felt like they genuinely care about grooming the next generation of Filipino talent. They didn't just show us an office; they gave us a roadmap for our own careers.",
        feelings:
          "I felt truly valued. After a long day, ending with leaders who actually took the time to talk to us made me feel like they really believe in our potential. It was the most inspiring BPO visit of the whole trip.",
        photos: [
          {
            src: [
              "/photos/day04_ microsourcing/microsourcing_001.webp",
              "/photos/day04_ microsourcing/microsourcing_002.webp",
            ],
            caption: "Some photos during the welcome program.",
          },
        ],
        realizations: [
          "The competition is global. I learned that I can't just be 'good enough for the Philippines'—I need to cultivate a skillset that is competitive on a worldwide scale if I want to have a sustainable career.",
          "Leadership isn't about being untouchable. Seeing high-level managers take the time to talk to students shows that the best companies are those that prioritize mentorship and building the future rather than just hitting daily metrics.",
          "Technical skills might get you the interview, but soft skills and a professional attitude are what get you the job and keep you growing in the industry.",
          "I now realize that choosing a BPO isn't just about the salary or the perks; it’s about finding a company that invests in its people and challenges you to improve.",
        ],
        keywords: [
          "MicroSourcing",
          "BPO",
          "Career Mentorship",
          "Job Market",
          "Professional Growth",
          "Leadership",
        ],
      },
    ],
  },

  {
    id: 5,
    title: "Day 4",
    subtitle: "Our Tagaytay Free Day",
    theme: "nature",
    intro:
      "Between the packed company visits, we earned a well-deserved free day in Tagaytay — one of the Philippines' most beloved highland destinations. Perched on a ridge above Taal Lake, Tagaytay's cool breezes and breathtaking views of Taal Volcano made for an unforgettable escape from the city. We started at the hilltop shrine and capped the day with thrilling rides and panoramic views at Sky Ranch.",
    activities: [
      {
        id: "peoples-park-in-the-sky",
        order: 1,
        emoji: "🏔️",
        title: "People's Park in the Sky",
        location: "Tagaytay City, Cavite",
        address: "Tagaytay City, Cavite — 700m above sea level",
        description:
          "With our company visits canceled due to the Araw ng Kagitingan holiday, we turned our fifth day into a free day in Tagaytay. We chose to visit People's Park in the Sky, a high-altitude spot offering the best panoramic views of Taal Lake and the ridge. It was the perfect escape to enjoy nature, cool highland air, and some much-needed relaxation.",
        highlights: [
          "Iconic summit landmark perched 700m above sea level",
          "Sweeping 360° views of Taal Lake, Taal Volcano, and the Tagaytay ridge",
          "Cool mountain air and a peaceful highland atmosphere",
          "A relaxing break from the busy educational tour schedule",
        ],
        quick_facts: [
          "Originally known as the 'Palace in the Sky,' it was intended to be a mansion for a state visit by Ronald Reagan during the Marcos era.",
          "It sits on Mount Sungay, the highest point in Tagaytay City.",
          "The park features a mix of historical ruins from the unfinished mansion and modern viewing decks, souvenir stalls, and gardens.",
        ],
        story:
          "Since April 9th is Araw ng Kagitingan (Day of Valor), all the companies and government offices were closed. We had to pivot our plans, and between Enchanted Kingdom and Sky Ranch, we ultimately picked Tagaytay. I'm honestly glad we did—I’m not a fan of rides or heights, but I’m a huge fan of nature and scenery. \n\nWe spent our time at People's Park in the Sky, which turned out to be the best spot for views. We got lucky because the weather was clear, so no fog blocked our view of Taal Lake and the volcano. The wind was cold and refreshing, and it was just great to roam around without the pressure of a strict itinerary. We bought some pasalubongs and just took in the scenery.",
        feelings:
          "It was incredibly peaceful. After four days of rushing from office to office, being up in the mountains with fresh air felt like a massive reset button. I felt calm and totally energized by the view.",
        photos: [
          {
            src: [
              "/photos/day05_tagaytay/tagaytay_006.webp",
              "/photos/day05_tagaytay/tagaytay_007.webp",
              "/photos/day05_tagaytay/tagaytay_008.webp",
              "/photos/day05_tagaytay/tagaytay_017.webp",
              "/photos/day05_tagaytay/tagaytay_016.webp",
              "/photos/day05_tagaytay/tagaytay_001.webp",
            ],
            caption: "Group and solo photos at the summit of Tagaytay.",
          },
        ],
        realizations: [
          "Sometimes, the unplanned parts of a trip are the best ones. A 'free day' to just breathe and look at the scenery was exactly what we needed to keep the energy up for the rest of the tour.",
          "Tagaytay’s cold weather and elevation aren't just for comfort—they really change the 'vibe' of the entire experience, making it feel much more like an escape from the city grind.",
          "You don't need thrill rides to have a good time on a day off. Being surrounded by nature, even if it's just a park at the top of a mountain, is enough to feel refreshed and inspired.",
        ],
        keywords: [
          "Tagaytay",
          "People's Park in the Sky",
          "Nature",
          "Araw ng Kagitingan",
          "Taal Volcano",
          "Scenic Views",
        ],
      },
      {
        id: "sky-ranch",
        order: 2,
        emoji: "🎡",
        title: "Sky Ranch Tagaytay",
        location: "Sky Ranch Tagaytay",
        address:
          "Amusement Park with Taal Volcano View — Tagaytay City, Cavite",
        description:
          "After enjoying the quiet views at People's Park, we headed to Sky Ranch. It’s Tagaytay's go-to spot for rides and amusement, located right on the ridge. Even for someone like me who isn't a fan of extreme rides, the view from the Ferris wheel alone made the trip worth it.",
        highlights: [
          "Unlimited ride access with the 400 PHP entrance fee",
          "Ferris wheel ('Sky Eye') with a 10-minute ride time and perfect views",
          "Bumper cars and other classic amusement park fun",
          "Optional zipline experience for the adrenaline junkies",
        ],
        quick_facts: [
          "The 'Sky Eye' Ferris wheel at Sky Ranch is one of the tallest in the Philippines.",
          "The park covers roughly 10 hectares along the Tagaytay ridge, offering a direct view of Taal Volcano.",
          "It is a popular family destination that combines thrill rides with the natural cool climate of Tagaytay.",
        ],
        story:
          "We went straight to Sky Ranch after People's Park. We paid 400 pesos each for the entrance, which is a solid deal because it includes unlimited rides for most of the smaller attractions. Some of the bigger stuff, like the bumper cars and the Ferris wheel, are one-time-only, but that's fair.\n\nI’m not really into extreme stuff—I definitely skipped the Vikings and the drop tower because of my fear of heights. It was hilarious watching my friends try those while I stayed on the ground! A few of them paid the extra 300 pesos for the zipline, too. My personal highlight was definitely the Ferris wheel and the bumper cars. The Ferris wheel ride lasts about 10 minutes, and even though I was a bit nervous at first, the view of the whole Tagaytay ridge from the top was incredible.",
        feelings:
          "It was a fun, lighthearted end to the day. I felt a bit nervous on the Ferris wheel, but being with friends made it easy. It’s nice to have a place where you can just chill with bumper cars if you aren't an adrenaline junkie.",
        photos: [
          {
            src: [
              "/photos/day05_tagaytay/tagaytay_005.webp",
              "/photos/day05_tagaytay/tagaytay_002.webp",
              "/photos/day05_tagaytay/tagaytay_010.webp",
              "/photos/day05_tagaytay/tagaytay_011.webp",
              "/photos/day05_tagaytay/tagaytay_009.webp",
            ],
            caption: "Shots of the fun we had at the park.",
          },
        ],
        realizations: [
          "You don't have to love extreme rides to have a great time at an amusement park. Sometimes just riding the bumper cars and hanging out with friends is the best part of the day.",
          "The entrance fee is definitely worth it. When you divide 400 pesos by the number of rides we went on, it’s actually a really cheap way to spend a whole afternoon.",
          "Overcoming even a small fear, like going on the Ferris wheel despite my dislike of heights, feels like a mini-win. The view you get is the reward for pushing yourself just a little bit out of your comfort zone.",
        ],
        keywords: [
          "Sky Ranch",
          "Tagaytay",
          "Amusement Park",
          "Ferris Wheel",
          "Sky Eye",
          "Travel with Friends",
        ],
      },
    ],
  },

  {
    id: 6,
    title: "Day 5",
    subtitle: "Welcome to the City of Pines",
    theme: "mountain",
    intro:
      "The sixth and final day of our DJM Educational Tour brought us to Baguio City — the summer capital of the Philippines, nestled in the Cordillera Mountains at 1,500 m above sea level. The pine-scented cool air, colonial landmarks, military pride, and mountain panoramas made Day 6 one of the most memorable days of the entire tour.",
    activities: [
      {
        id: "la-trinidad-strawberry-farm",
        order: 1,
        emoji: "🍓",
        title: "La Trinidad Strawberry Farm",
        location: "La Trinidad, Benguet",
        address:
          "La Trinidad, Benguet (The Strawberry Capital of the Philippines)",
        description:
          "After a 6-hour overnight drive from Quezon City via Marcos Highway, we finally reached the Benguet highlands. Our first stop was the famous La Trinidad Strawberry Farm. Getting to pick our own strawberries in the cool morning air, sipping on fresh strawberry taho, and browsing local souvenirs was the perfect, chilly welcome to the North.",
        highlights: [
          "Picking fresh strawberries straight from the fields",
          "Trying the famous strawberry taho (a must-try at 50 PHP!)",
          "Strategic souvenir shopping based on our tour guide's local advice",
          "Experiencing the refreshing cold weather of the Benguet highlands",
        ],
        quick_facts: [
          "La Trinidad, Benguet is officially known as the 'Strawberry Capital of the Philippines.'",
          "Baguio is called the 'Summer Capital of the Philippines' because its high elevation (over 1,500 meters) keeps it significantly cooler than the lowlands.",
          "The temperature in this region can drop dramatically; while summer is cool, January and February can see temperatures dip to 9°C or lower.",
        ],
        story:
          "We left our accommodation in QC at 1:00 AM for the 6-hour trip. Our tour guide, Kuya Jero, chose Marcos Highway over Kennon Road—even though it’s longer, it's much safer for a bus, which I totally appreciated since I was asleep most of the way! We woke up around 5:00 AM as we entered the Benguet area, and the temperature drop was instant.\n\nWe arrived at the Strawberry Farm by 6:00 AM. It was cold, so my OJT jacket was a lifesaver. We spent the morning walking around the fields. Kuya Jero mentioned we had the option to pick our own strawberries for 100–150 PHP per kilo, but we mostly just took photos and grabbed some 50-peso strawberry taho instead. Kuya Jero gave us a great tip to buy our souvenirs here; he explained that the local shops connected to their route offer better prices, and he was right—prices here were noticeably lower than what we saw in other tourist spots later on. It was a great, relaxed start to our time in the North.",
        feelings:
          "It felt incredibly refreshing. Being in the cold air after the heat of Manila and the rush of the previous days made everything feel calm. It felt like we were finally 'away' from the city grind.",
        photos: [
          {
            src: [
              "/photos/day06 _strawberry_farm/strawberry_farm_002.webp",
              "/photos/day06 _strawberry_farm/strawberry_farm_003.webp",
              "/photos/day06 _strawberry_farm/strawberry_farm_004.webp",
              "/photos/day06 _strawberry_farm/strawberry_farm_005.webp",
              "/photos/day06 _strawberry_farm/strawberry_farm_006.webp",
              "/photos/day06 _strawberry_farm/strawberry_farm_007.webp",
            ],
            caption: "Group and solo shots in Strawberry Farm.",
          },
          {
            src: "/photos/day06 _strawberry_farm/strawberry_farm_001.webp",
            caption:
              "My 50-peso strawberry taho—the perfect breakfast in the cold weather.",
          },
        ],
        realizations: [
          "Having a knowledgeable tour guide like Kuya Jero is a huge budget hack. Taking his advice on where to buy souvenirs saved us money, proving that local knowledge is just as important as having a travel itinerary.",
          "Bus travel safety is no joke. Choosing the 'longer' route (Marcos Highway) over the 'shortest' one (Kennon Road) is a smart logistical decision for a large group. It taught me that sometimes, the safest path is the best one, even if it adds time to the clock.",
          "The 'Summer Capital' title doesn't mean it’s tropical. I realized that even in summer, the Benguet air is crisp and cold, which makes me respect why people have been flocking here for decades to escape the Manila heat. It’s a completely different environment.",
        ],
        keywords: [
          "Strawberry Farm",
          "La Trinidad",
          "Baguio Tour",
          "Strawberry Taho",
          "Benguet",
          "Travel Tips",
        ],
      },
      {
        id: "bell-church",
        order: 2,
        emoji: "🔔",
        title: "Bell Church",
        location: "La Trinidad/Baguio Border",
        address: "Kilometer 3, La Trinidad, Benguet",
        description:
          "Located on the boundary of Baguio City and La Trinidad, the Bell Church is a serene Taoist/Buddhist temple founded by Chinese immigrants in 1960. With its steep, winding pathways, colorful pagodas, and intricate dragon sculptures, it offers a peaceful, culturally rich escape from the bustling city streets.",
        highlights: [
          "Ornate Chinese architecture, including dragon statues and pagodas",
          "Panoramic views from the higher grounds of the temple complex",
          "Serene atmosphere for reflection and photography",
          "Learning about the Chinese-Filipino community's spiritual heritage",
        ],
        quick_facts: [
          "It is officially a Taoist/Buddhist temple, not a church in the traditional sense, but the name 'Bell Church' became the popular local moniker.",
          "Founded in 1960 by Chinese immigrants, it serves as a spiritual center for the Chinese-Filipino community in the region.",
          "The temple features traditional Chinese motifs, including the bagua (octagon) which symbolizes rebirth and infinity, and lotus flowers representing purity.",
          "The steep terrain of the property was chosen for its 'good feng shui' and reminds devotees of their hometowns in China.",
        ],
        story:
          "After the Strawberry Farm, we made our way to the Bell Church. It was impossible to miss the steep climb—everything in Baguio and Benguet seems to be uphill! The church itself is stunning, filled with statues of Buddhas, traditional bells, and amazing Chinese-inspired architecture. \n\nI was curious why it was called 'Bell Church' if it was a temple, and after looking it up, it seems like the name just stuck because it’s a lot easier to remember than the formal Chinese name! It’s a beautiful, peaceful place to roam around and take photos. It felt like we were stepping into another country with all the dragon statues and inscriptions everywhere. We took our time walking the steep paths, enjoying the cool air and the unique views of the surrounding hills.",
        feelings:
          "It was very relaxing. Despite the steep climb, the temple felt quiet and respectful. It was a great contrast to the more 'touristy' feel of the strawberry farm—here, the vibe was much more about culture and history.",
        photos: [
          {
            src: [
              "/photos/day06_bell_church/bell_church_002.webp",
              "/photos/day06_bell_church/bell_church_003.webp",
              "/photos/day06_bell_church/bell_church_004.webp",
              "/photos/day06_bell_church/bell_church_005.webp",
              "/photos/day06_bell_church/bell_church_007.webp",
              "/photos/day06_bell_church/bell_church_008.webp",
              "/photos/day06_bell_church/bell_church_010.webp",
              "/photos/day06_bell_church/bell_church_012.webp",
              "/photos/day06_bell_church/bell_church_013.webp",
              "/photos/day06_bell_church/bell_church_014.webp",
              "/photos/day06_bell_church/bell_church_015.webp",
              "/photos/day06_bell_church/bell_church_016.webp",
              "/photos/day06_bell_church/bell_church_017.webp",
            ],
            caption:
              "Shots of the intricate architecture, the dragon statues, and group and solo photos at the Bell Church.",
          },
        ],
        realizations: [
          "I learned that Baguio and La Trinidad are incredibly culturally diverse. Seeing a temple like this nestled in the mountains really shows how Chinese culture has become such a huge part of the local history here.",
          "The 'steepness' of the place isn't just about the geography—it’s part of the experience. Walking those steep roads to get to the temple makes you appreciate the view from the top so much more once you finally reach it.",
          "It was a humbling experience to realize that we are just visitors in a sacred space. It made me more mindful of staying quiet and respectful while walking around, even though there were plenty of photo opportunities.",
        ],
        keywords: [
          "Bell Church",
          "La Trinidad",
          "Chinese Temple",
          "Baguio Culture",
          "Taoist Temple",
          "Travel Benguet",
        ],
      },
      {
        id: "pma",
        order: 3,
        emoji: "🎖️",
        title: "Philippine Military Academy (PMA)",
        location: "Fort del Pilar, Baguio City",
        address: "Fort del Pilar, Baguio City, Benguet",
        description:
          "After a quick stop at Prince Plaza Hotel to drop our bags and have lunch, we headed to the Philippine Military Academy. Located in Fort del Pilar, this is the premier training ground for the country's future military leaders. Seeing the sprawling campus and the disciplined lifestyle of the cadets firsthand was a highlight of our Baguio visit.",
        highlights: [
          "Touring the massive Fort del Pilar grounds",
          "Viewing historic WWII-era aircraft displays",
          "Learning about the discipline and life of a PMA cadet",
          "Group photo at the historic Melchor Hall",
        ],
        quick_facts: [
          "PMA cadets are classified into four classes: Fourth Class (Plebes), Third Class (Yearlings), Second Class (Cows), and First Class (Firsties).",
          "The Academy’s motto is 'Courage, Integrity, Loyalty.'",
          "Melchor Hall is the oldest standing structure in the Academy and serves as the academic heart of the institution.",
          "PMA covers about 373 hectares, which explains why it feels more like a self-contained barangay than just a school.",
        ],
        story:
          "After we dropped our things at Prince Plaza Hotel and finished lunch, we went straight to PMA. Honestly, I expected it to be a small campus, but I was shocked—it’s massive! It basically functions like its own barangay, complete with its own hospital, gas stations, and scattered buildings. We walked around their park, saw statues dedicated to their core values, and checked out the old World War II aircraft displayed in the headquarters.\n\nWe saw cadets roaming around and doing their routines, and Kuya Jero reminded us to stay respectful and not disturb them because they’re constantly on duty. It really puts into perspective how intense their training is. Before we left, I grabbed a PMA refrigerator magnet as a souvenir, and we made sure to get a group shot at Melchor Hall.",
        feelings:
          "It was very humbling. There’s a certain weight to the place—you can feel the history and the discipline in the air. It wasn't just a tour; it felt like walking through a place that takes national service extremely seriously.",
        photos: [
          {
            src: "/photos/day06_pma/pma_015.webp",
            caption: "Our group photo in front of the iconic Melchor Hall.",
          },
          {
            src: [
              "/photos/day06_pma/pma_001.webp",
              "/photos/day06_pma/pma_002.webp",
              "/photos/day06_pma/pma_003.webp",
              "/photos/day06_pma/pma_004.webp",
              "/photos/day06_pma/pma_017.webp",
              "/photos/day06_pma/pma_018.webp",
            ],
            caption: "The historical aircraft on display at the headquarters.",
          },
          {
            src: [
              "/photos/day06_pma/pma_006.webp",
              "/photos/day06_pma/pma_005.webp",
              "/photos/day06_pma/pma_007.webp",
              "/photos/day06_pma/pma_014.webp",
              "/photos/day06_pma/pma_020.webp",
              "/photos/day06_pma/pma_021.webp",
              "/photos/day06_pma/pma_022.webp",
              "/photos/day06_pma/pma_019.webp",
              "/photos/day06_pma/pma_016.webp",
            ],
            caption: "General photos of us walking around the PMA grounds.",
          },
        ],
        realizations: [
          "I used to think PMA was just a 'school,' but seeing how they live, train, and study on such a huge, self-sufficient campus showed me it’s more like a lifestyle. It’s 24/7 dedication.",
          "Seeing our classmate who actually quit IT to become a cadet made it hit home. It’s not just a place for 'other people'—it’s a realistic path for students like us if we have the grit for it.",
          "The strict 'don't disturb' rule for cadets made me realize that discipline isn't just a trait you talk about—it’s something they have to practice every single minute of the day, even while walking from building to building.",
          "The contrast between the old planes and the modern campus showed how the academy honors its history while continuing to evolve. It’s a place that deeply respects the past while training for the future.",
        ],
        keywords: [
          "PMA",
          "Philippine Military Academy",
          "Baguio",
          "Cadet Life",
          "Fort del Pilar",
          "Military Training",
        ],
      },
      {
        id: "the-mansion",
        order: 4,
        emoji: "🏛",
        title: "The Mansion",
        location: "The Mansion, Baguio City",
        address: "Leonard Wood Road, Baguio City, Benguet",
        description:
          "After our time at PMA, we made a quick stop at The Mansion. It’s the official summer residence of the President of the Philippines. While we couldn't go deep into the private areas, it’s one of the most iconic spots in the city and an essential part of any Baguio tour.",
        highlights: [
          "Iconic Victorian-style architecture and the famous wrought-iron gates",
          "Learning about its history as the summer seat of power since 1908",
          "Beautifully manicured gardens and formal grounds",
          "Perfect spot for that classic Baguio souvenir photo",
        ],
        quick_facts: [
          "Built in 1908, it originally served as the summer residence for American Governors-General.",
          "It was heavily damaged during World War II and was reconstructed in 1947.",
          "It has hosted major international events like the 1950 Baguio Conference.",
          "As of September 2024, The Mansion has officially opened to the public as a Presidential Museum.",
        ],
        story:
          "Our stop at The Mansion was pretty fast. Kuya Jero explained that since it’s an official government residence, we can't just wander around inside like a regular park. We mostly stayed by the front gates, which are super famous for being the most photographed structure in Baguio. Even just standing in front of the gate, you can feel the history of the place—it’s been standing since 1908 and has survived wars and major political shifts. It was a good, quick break to snap some photos before heading to our next spot.",
        feelings:
          "It felt grand and official. Even though it was a short visit, being in front of the 'Summer Palace' of the President makes you feel the weight of the city’s history. It’s a very 'Baguio' experience.",
        photos: [
          {
            src: [
              "/photos/day06_the_mansion/mansion_001.webp",
              "/photos/day06_the_mansion/mansion_002.webp",
              "/photos/day06_the_mansion/mansion_003.webp",
              "/photos/day06_the_mansion/mansion_004.webp",
              "/photos/day06_the_mansion/mansion_005.webp",
              "/photos/day06_the_mansion/mansion_006.webp",
            ],
            caption: "General photos in front of The Mansion.",
          },
        ],
        realizations: [
          "I realized that historical landmarks aren't just for looking at—they’re for remembering. This building has seen everything from colonial governors to post-war reconstruction and modern presidencies.",
          "Even a quick 'photo-op' stop adds value to a trip. Sometimes you don't need hours at a place to appreciate what it represents; just seeing the architecture and knowing its story is enough to round out the experience.",
        ],
        keywords: [
          "The Mansion",
          "Baguio",
          "Presidential Residence",
          "Historical Landmark",
          "Summer Capital",
          "Travel Baguio",
        ],
      },
      {
        id: "mines-view-park",
        order: 5,
        emoji: "⛰️",
        title: "Mines View Park & Good Shepherd",
        location: "Mines View, Baguio City",
        address: "Mines View, Baguio City, Benguet",
        description:
          "We wrapped up our last stop of the day at Mines View Park, one of the most famous overlooks in Baguio. It's a busy hub filled with souvenir shops, local stalls, and the traditional Igorot attire rentals. Just a short walk away, we visited the Good Shepherd Convent, which is world-famous for their jams and their charitable mission.",
        highlights: [
          "Panoramic view of the Benguet mountain range",
          "Cultural experience: renting Igorot attire and horse riding",
          "Shopping for Ube and Strawberry jams at Good Shepherd",
          "Learning about the charitable mission behind Good Shepherd’s products",
        ],
        quick_facts: [
          "The park is named 'Mines View' because it overlooks the abandoned gold and copper mines of Itogon, Benguet.",
          "Good Shepherd jams are produced by the Religious of the Good Shepherd, a non-profit organization.",
          "A significant portion of Good Shepherd's revenue goes toward educational programs and providing scholarships for underprivileged youth in the region.",
          "Mines View Park is one of the most visited spots in Baguio, known for its mix of natural scenery and local cultural commerce.",
        ],
        story:
          "Mines View Park was our final stop for the day. It’s actually quite small, but it’s packed with action—there are horses you can ride, stalls selling plants, and places to rent traditional Igorot clothing for photos. The main draw is definitely the observation deck, which gives you a great view of the mountains. \n\nAfter roaming around, Fhadia and I walked about 5 minutes to Good Shepherd to get some pasalubong. We’d heard their Ube jam is the absolute best (the GOAT!), and even though it costs more than the generic ones sold in the park, it was worth it. Kuya Jero explained that the proceeds go to helping kids get an education, which made buying the 350-peso Ube jam feel like a good deed rather than just a purchase. We skipped the strawberry jam since we already bought plenty at the farm, but we left feeling like we got the best souvenirs in Baguio.",
        feelings:
          "It was a productive end to the day. I felt good knowing that my money was going toward a mission to help students, and it was nice to cap off the tour with such a positive, community-focused experience.",
        photos: [
          {
            src: [
              "/photos/day06_mines_view/mines_01.webp",
              "/photos/day06_mines_view/mines_04.jpeg",
              "/photos/day06_mines_view/mines_05.jpeg",
            ],
            caption: "General shots of the view at Mines View Park.",
          },
          {
            src: [
              "/photos/day06_mines_view/mines_03.jpeg",
              "/photos/day06_mines_view/mines_02.webp",
            ],
            caption: "Visiting the Good Shepherd shop for their famous jams.",
          },
        ],
        realizations: [
          "I learned that as a tourist, you have a choice. You can buy the cheapest souvenir, or you can buy one that actually gives back to the community. The Good Shepherd model really proves that social enterprise is a great way to support local causes.",
          "Sometimes the most popular 'tourist spots' like Mines View are popular for a reason—they are compact, lively, and offer a quick look at the local culture, even if they are a bit crowded.",
          "Price tags on food like jams aren't just for profit. Understanding the 'why' behind the price (like funding education) makes you appreciate the product much more than just looking at the ingredients.",
        ],
        keywords: [
          "Mines View Park",
          "Good Shepherd",
          "Baguio Pasalubong",
          "Ube Jam",
          "Social Enterprise",
          "Baguio Tourism",
        ],
      },
      {
        id: "burnham-park-night-market",
        order: 6,
        emoji: "🌃",
        title: "Burnham Park & Night Market",
        location: "Baguio City Center",
        address: "Burnham Park & Harrison Road, Baguio City",
        description:
          "We spent our final hours in Baguio soaking up the local vibe. From hunting for the best thrift finds at the Harrison Road Night Market to pedaling around Burnham Park in the cool highland air, it was the perfect, laid-back finish to our entire educational tour.",
        highlights: [
          "Bagging high-quality thrift finds at the organized Baguio Night Market",
          "Experiencing SM Baguio—the only SM mall without air conditioning!",
          "Renting carts and roaming the massive grounds of Burnham Park",
          "Enjoying the city's refreshing natural climate",
        ],
        quick_facts: [
          "The Baguio Night Market along Harrison Road is strictly regulated, with designated entrances and exits to manage the massive crowds.",
          "SM Baguio is the only SM mall in the Philippines that relies on natural ventilation instead of air conditioning systems due to the cool climate.",
          "Burnham Park was designed by the famous American architect Daniel Burnham, who also drafted the original urban plan for Manila.",
          "Baguio's 'natural air conditioning' is so effective that most hotels and establishments don't even use AC units.",
        ],
        story:
          "On our final night, we hit the Baguio Night Market. I was honestly impressed by how organized it was—there were police and city hall staff everywhere ensuring people only entered through the front and exited at the back. It kept the crowd moving perfectly. The ukay-ukay finds were legit—lots of branded items in great condition for prices way cheaper than back home. \n\nIn the morning, we headed to Burnham Park. It’s wild that in Baguio, you don't even need AC; just opening the window keeps the room freezing cold. We rented carts and rode around the park. Sadly, the lake was dry, so we couldn't go boating, but the park was still a great place to hang out. We also dropped by SM Baguio—it’s such a weird experience walking through a mall with no AC, but it’s honestly one of the coolest features of the city.",
        feelings:
          "It felt like a calm, satisfying end to a fast-paced trip. Navigating the crowded night market and then spending a quiet morning at the park gave us the perfect balance of excitement and relaxation before heading home.",
        photos: [
          {
            src: [
              "/photos/day06_burnham/burnham_01.webp",
              "/photos/day06_burnham/burnham_02.webp",
            ],
            caption:
              "Our group photo having fun renting carts at Burnham Park.",
          },
        ],
        realizations: [
          "Organization makes all the difference. The Night Market proved that even a massive, crowded public event can be enjoyable if there are clear rules on entry, exit, and flow.",
          "Sustainability isn't always about high-tech gadgets; sometimes, it’s just about building structures in the right climate, like SM Baguio, where they don't have to waste energy on AC units.",
          "It’s totally okay if a plan doesn't go 100% according to schedule—we couldn't go boating because the lake was dry, but renting the carts ended up being way more fun than boating would have been anyway.",
          "Traveling is better when you slow down at the end. After all the company tours, having that morning at Burnham Park to just walk around helped me process everything we learned over the last week.",
        ],
        keywords: [
          "Burnham Park",
          "Baguio Night Market",
          "Ukay-Ukay",
          "SM Baguio",
          "Travel Baguio",
          "City Tour",
        ],
      },
    ],
  },
];
