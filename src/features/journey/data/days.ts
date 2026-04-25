export interface ActivityPhoto {
  src: string
  caption: string
}

export interface Activity {
  id: string
  order: number
  emoji: string
  title: string
  location: string
  address: string
  description: string
  highlights: string[]
  images: string[]
  // Rich diary content — filled progressively per banner
  story?: string
  feelings?: string
  photos?: ActivityPhoto[]
  realizations?: string[]
  keywords?: string[]
}

export interface Day {
  id: number
  title: string
  subtitle: string
  theme: string
  intro: string
  activities: Activity[]
}

export const days: Day[] = [
  {
    id: 0,
    title: 'Day 0',
    subtitle: 'The Journey Begins',
    theme: 'departure',
    intro: 'Before the adventure truly began, Day 0 was all about preparation, excitement, and the anticipation of what lay ahead. The DJM Educational Tour was about to take us across the Philippines — from the historic streets of Manila to the mountain air of Baguio City.',
    activities: [
      {
        id: 'our-home',
        order: 1,
        emoji: '🏠',
        title: 'Our Home',
        location: 'Zamboanga City',
        address: 'Zamboanga City, Zamboanga del Sur',
        description:
          'The morning of Day 0 started at home in Zamboanga City — the City of Flowers. Bags were packed, families gathered, and excitement filled the air. This was the last moment of familiar comfort before we set off on an adventure that would take us across the Philippines.',
        highlights: [
          'Final preparations and packing for the educational tour',
          'Farewells and send-off from family and friends',
          'Zamboanga City — the City of Flowers, gateway to adventure',
        ],
        images: [],
        story:
          'I woke up at 3:00 in the morning since our flight was scheduled for 6:00 AM. It was early, but I couldn\'t really sleep anyway — I was just too excited.\n\nMy best friend Fhadia was also joining the tour, and since we\'re basically neighbors, her parents were kind enough to drive me to the airport. That early morning ride with them was such a relief — and such a wholesome way to start the day.\n\nIn the days leading up to this, I had already packed my luggage about a week before the flight. I wanted to make sure everything was ready and nothing would be left behind. I also had my phone fixed beforehand — the last thing I wanted was a broken phone during the trip! On top of that, I made a list of all the people I planned to buy pasalubong for when I got back home.',
        feelings:
          'Honestly? I was a bundle of nerves — but more than anything, I was beyond excited. This was my very first time going outside of Zamboanga City, and my very first time riding an airplane. Everything felt unreal.',
        photos: [
          {
            src: '/photos/day00/luggage.jpg',
            caption:
              'Inside my luggage — I sent this photo to my friends to show how I packed everything and what I was bringing on the trip.',
          },
        ],
        realizations: [
          'I feel so blessed and grateful to my two sisters who paid for this tour and my plane ticket. Without them, this once-in-a-lifetime experience would not have been possible.',
          'I am deeply thankful to my mother, who guided me on what to do, what to expect, and what to bring for my flight. Her advice gave me so much confidence heading into this brand new experience.',
        ],
        keywords: ['First Flight', '3AM Wake Up', 'Zamboanga City', 'Departure Day', 'Pasalubong List', 'Travel Prep'],
      },
      {
        id: 'zamboanga-airport',
        order: 2,
        emoji: '✈️',
        title: 'Zamboanga City Airport',
        location: 'Zamboanga International Airport',
        address: 'La Piñana, Zamboanga City, Zamboanga del Sur',
        description:
          "The Zamboanga International Airport was our launching pad — the official start of the DJM Educational Tour. With boarding passes in hand and backpacks on shoulders, the whole group gathered at the terminal before taking flight to Manila. The journey of a thousand miles truly began with this first step through the departure gate.",
        highlights: [
          'Group assembly and final headcount at the departure terminal',
          'First flight experience for many of the students',
          'Bound for Manila — the capital and heart of the Philippines',
        ],
        images: [],
      },
    ],
  },
  {
    id: 1,
    title: 'Day 1',
    subtitle: 'Welcome to Historical Manila',
    theme: 'history',
    intro:
      "Day 1 of our DJM Educational Tour plunged us right into the heart of Filipino history. From the sweeping lawns of Luneta Park — where national hero Dr. Jose Rizal was executed — to the thick stone walls of Intramuros, Manila's oldest district, every step brought us closer to understanding the nation's remarkable past.",
    activities: [
      {
        id: 'rizal-park',
        order: 1,
        emoji: '🏕',
        title: 'Rizal Park',
        location: 'Rizal Park (Luneta)',
        address: 'Roxas Boulevard, Ermita, Manila — National Park & Monument',
        description:
          "Rizal Park, popularly known as Luneta, is the most important historical and national park in the Philippines. It is the site where national hero Dr. Jose Rizal was executed by Spanish colonial forces on December 30, 1896. The massive Rizal Monument at the center of the park houses Rizal's remains, and the eternal flame burns in his honor. The sprawling lawns, fountains, and Kilometer Zero marker — the reference point for all road distances in the Philippines — made this a moving and educational stop.",
        highlights: [
          'Home of the Rizal Monument and eternal flame',
          'Kilometer Zero — reference point for all PH road distances',
          'Beautiful fountain gardens and open park grounds',
        ],
        images: [],
      },
      {
        id: 'intramuros',
        order: 2,
        emoji: '🏛',
        title: 'Intramuros',
        location: 'Intramuros',
        address: "The Walled City — Manila's Oldest District, Metro Manila",
        description:
          'Intramuros, meaning "within the walls" in Latin, is the historic walled city at the heart of Manila. Built by Spanish colonizers in 1571, its thick stone walls and cobblestone streets transport you back 500 years. Walking through the gates felt like stepping into a different century — the stone ramparts, the horse-drawn kalesas, and the centuries-old buildings told the story of a nation shaped by colonial history and Filipino resilience.',
        highlights: [
          'Surrounded by 4.5-kilometer thick stone walls built in 1571',
          'Cobblestone streets and colonial architecture frozen in time',
          "Gateway to Manila's most treasured historical landmarks",
        ],
        images: [],
      },
      {
        id: 'manila-cathedral',
        order: 3,
        emoji: '⛪',
        title: 'Manila Cathedral',
        location: 'Minor Basilica of the Immaculate Conception',
        address: 'Beaterio St cor General Luna, Intramuros, Manila',
        description:
          "The Manila Cathedral — formally the Minor Basilica of the Immaculate Concepción — has been rebuilt eight times over four centuries due to earthquakes and wars. The present Romanesque-Byzantine structure, completed in 1958, stands as a symbol of Filipino faith and resilience. Its grand rose windows, towering pipe organ, and intricately carved facade make it one of the most breathtaking churches in Southeast Asia. It serves as the seat of the Archbishop of Manila and the heart of Catholic life in the country.",
        highlights: [
          'Built and rebuilt 8 times — standing since the 1580s',
          'Stunning Romanesque-Byzantine architecture and rose windows',
          'Seat of the Archbishop of Manila',
        ],
        images: [],
      },
      {
        id: 'ccp',
        order: 6,
        emoji: '🎭',
        title: 'CCP Complex',
        location: 'Cultural Center of the Philippines',
        address: 'Roxas Boulevard, Pasay City, Metro Manila',
        description:
          "The Cultural Center of the Philippines (CCP) was established in 1969 as the country's premiere institution for the arts. Situated along the historic Manila Bay waterfront, the CCP complex is an architectural landmark in itself — its brutalist main building designed by National Artist Leandro Locsin is iconic along the Roxas Boulevard skyline. The CCP hosts world-class performances in theater, ballet, opera, film, and visual arts, and is home to several major cultural organizations. Our visit gave us a deep appreciation for the richness of Filipino artistic expression.",
        highlights: [
          'Premier home of Philippine arts, culture, and performance',
          'Iconic brutalist architecture by National Artist Leandro Locsin',
          'Located on the historic Manila Bay waterfront',
        ],
        images: [],
      },
      {
        id: 'mall-of-asia',
        order: 7,
        emoji: '🌊',
        title: 'Mall of Asia',
        location: 'SM Mall of Asia',
        address: 'Seaside Boulevard, Mall of Asia Complex, Pasay City',
        description:
          "SM Mall of Asia — one of the largest shopping malls in the world — was the perfect way to cap off our first day. Sprawling across 42 hectares along Manila Bay, MOA is not just a mall but a destination: an IMAX theater, a skating rink, a concert grounds, and dozens of restaurants and shops. But the real highlight was the bayside area at golden hour — watching the sun dip below the horizon over Manila Bay, painting the sky in brilliant oranges and pinks, with the city lights beginning to flicker on around us. It was a beautiful, peaceful end to an incredible day of history.",
        highlights: [
          'One of the largest malls in the world — 42 hectares',
          'Iconic bayside area with stunning Manila Bay sunset views',
          'IMAX theater, skating rink, and concert grounds',
        ],
        images: [],
      },
    ],
  },

  {
    id: 2,
    title: 'Day 2',
    subtitle: 'Into the Corporate World',
    theme: 'corporate',
    intro:
      'Day 2 gave us a front-row seat to two very different corners of the Philippine tech and business landscape. We visited an engineering power company and a global enterprise information management giant — both offering valuable insights into real-world careers in technology and business.',
    activities: [
      {
        id: 'hytec-power',
        order: 1,
        emoji: '⚡',
        title: 'Hytec Power Inc.',
        location: 'Hytec Power Inc.',
        address: 'Engineering & Power Solutions Company — Metro Manila',
        description:
          'Hytec Power Inc. is a Philippine engineering company specializing in power solutions, technical products, and industrial equipment. Our tour of the facility gave us a deep appreciation for the technical side of the energy and engineering sectors in the Philippines. Representatives from the company walked us through their products, services, and the professional paths available in electrical and mechanical engineering.',
        highlights: [
          'Specializes in power solutions and industrial equipment',
          'Insight into the engineering industry in the Philippines',
          'Career guidance from working professionals',
        ],
        images: [],
      },
      {
        id: 'opentext',
        order: 2,
        emoji: '📈',
        title: 'OpenText Philippines',
        location: 'OpenText Philippines',
        address: 'Enterprise Information Management — Metro Manila',
        description:
          'OpenText is a Canadian multinational company and global leader in Enterprise Information Management (EIM) software. Their Philippine office gave us a look into how a world-class tech company operates locally. We learned about content management, business process automation, and how digital information is managed at scale for large corporations around the world. The modern office environment and the scale of their operations were truly impressive.',
        highlights: [
          'Global leader in Enterprise Information Management',
          'Multinational operations with local Philippine presence',
          'Careers in software, cloud, and enterprise tech',
        ],
        images: [],
      },
    ],
  },

  {
    id: 3,
    title: 'Day 3',
    subtitle: 'Creativity Meets Communication',
    theme: 'creative',
    intro:
      'Day 3 was a study in contrasts — from the vibrant, colorful world of Filipino animation to the fast-paced global operations of one of the world\'s leading customer experience companies. Both stops revealed exciting career paths and the talent thriving right here in the Philippines.',
    activities: [
      {
        id: 'toppeg',
        order: 1,
        emoji: '🎨',
        title: 'TOP PEG Animation Studio',
        location: 'TOP PEG Animation Studio',
        address: 'Filipino Animation & Creative Studio — Metro Manila',
        description:
          'TOP PEG is a Filipino animation company that produces animated content for both local and international clients. Our visit gave us an incredible behind-the-scenes look at the animation production pipeline — from concept art and storyboarding to rigging, rendering, and final output. The talented artists showed us their workflow and shared how the Philippines has become a significant hub for animation production in Asia.',
        highlights: [
          'Full animation production pipeline from concept to output',
          'The Philippines as a growing animation hub in Asia',
          'Storyboarding, rigging, and digital art techniques',
        ],
        images: [],
      },
      {
        id: 'teleperformance',
        order: 2,
        emoji: '📞',
        title: 'Teleperformance Philippines',
        location: 'Teleperformance Philippines',
        address: 'Global Customer Experience Leader — Metro Manila',
        description:
          'Teleperformance is a global leader in customer experience management, digital business services, and outsourcing, with a massive presence in the Philippines. Our visit to their modern office showed us the scale of their operations — thousands of agents handling customer interactions for major global brands across virtually every industry. We learned about career opportunities in BPO, the technology that powers their operations, and how Filipino talent continues to drive the global BPO industry.',
        highlights: [
          'Global leader in customer experience management',
          'Serving major international brands across all industries',
          'The Philippines as the BPO capital of the world',
        ],
        images: [],
      },
    ],
  },

  {
    id: 4,
    title: 'Day 4',
    subtitle: 'Public Service Meets Global Business',
    theme: 'government',
    intro:
      'Day 4 took us from the halls of one of Metro Manila\'s most vital government agencies to the modern offices of a leading business process outsourcing company. Two very different worlds — yet both shaping the daily lives of millions of Filipinos and contributing to the nation\'s growth.',
    activities: [
      {
        id: 'mmda',
        order: 1,
        emoji: '🏛',
        title: 'Metropolitan Manila Development Authority (MMDA)',
        location: 'Metropolitan Manila Development Authority',
        address: 'Mandaluyong, Metro Manila',
        description:
          'The Metropolitan Manila Development Authority (MMDA) is the government agency responsible for the delivery of metro-wide services in Metro Manila. From traffic management and flood control to solid waste disposal and urban planning, MMDA coordinates the functions of 16 local governments to keep the metropolis running. Our visit gave us an inside look at the command center, traffic monitoring systems, and the day-to-day operations of this critical public institution.',
        highlights: [
          'Oversees 16 cities & municipalities of Metro Manila',
          'State-of-the-art traffic monitoring & command center',
          'Flood control, solid waste, and urban planning operations',
        ],
        images: [],
      },
      {
        id: 'microsourcing',
        order: 2,
        emoji: '💼',
        title: 'MicroSourcing',
        location: 'MicroSourcing (Probe Group)',
        address: 'Business Process Outsourcing — Metro Manila',
        description:
          'MicroSourcing (part of Probe Group) is one of the largest and most respected business process outsourcing companies in the Philippines, providing dedicated offshore staffing solutions to clients across Australia, the United States, and beyond. Our tour of their facilities revealed the scale and sophistication of the modern BPO industry — from state-of-the-art workstations to HR practices designed around employee well-being and performance.',
        highlights: [
          'Leading offshore staffing and BPO solutions provider',
          'Serving clients in Australia, USA, and globally',
          'Showcasing Filipino talent on the global stage',
        ],
        images: [],
      },
    ],
  },

  {
    id: 5,
    title: 'Day 5',
    subtitle: 'Our Tagaytay Free Day',
    theme: 'nature',
    intro:
      'Between the packed company visits, we earned a well-deserved free day in Tagaytay — one of the Philippines\' most beloved highland destinations. Perched on a ridge above Taal Lake, Tagaytay\'s cool breezes and breathtaking views of Taal Volcano made for an unforgettable escape from the city. We started at the hilltop shrine and capped the day with thrilling rides and panoramic views at Sky Ranch.',
    activities: [
      {
        id: 'peoples-park-in-the-sky',
        order: 1,
        emoji: '🏔️',
        title: "People's Park in the Sky",
        location: "People's Park in the Sky",
        address: 'Tagaytay City, Cavite — 700m above sea level',
        description:
          "Perched at the very summit of Tagaytay at around 700 meters above sea level, People's Park in the Sky is one of the most iconic landmarks in Cavite. Originally intended as a presidential rest house, the unfinished structure has since become a beloved public park offering some of the most breathtaking panoramic views in the Philippines — stretching across Taal Lake, Taal Volcano, and the rolling Tagaytay ridge. The cool highland air, sweeping vistas, and quiet atmosphere made it a truly memorable start to our free day.",
        highlights: [
          "Iconic summit landmark perched 700m above sea level",
          'Sweeping 360° views of Taal Lake, Taal Volcano, and the Tagaytay ridge',
          'Cool mountain air and a peaceful highland atmosphere',
        ],
        images: [],
      },
      {
        id: 'sky-ranch',
        order: 2,
        emoji: '🌋',
        title: 'Sky Ranch Tagaytay',
        location: 'Sky Ranch Tagaytay',
        address: 'Amusement Park with Taal Volcano View — Tagaytay City, Cavite',
        description:
          "Sky Ranch is Tagaytay's premier outdoor amusement and leisure park, perched right on the Tagaytay ridge with an unobstructed view of Taal Volcano and Taal Lake. The Sky Eye — the park's massive Ferris wheel — lifted us high above the ridge for a bird's-eye panoramic view of one of the world's smallest active volcanoes sitting in the middle of a lake, which is itself on an island. Thrilling rides, cool mountain air, and that iconic view made this an absolute highlight of the entire tour.",
        highlights: [
          'Iconic view of Taal Volcano & Taal Lake from the ridge',
          "Sky Eye Ferris wheel for bird's-eye panoramic views",
          'Taal — a volcano on an island in a lake on an island!',
        ],
        images: [],
      },
    ],
  },

  {
    id: 6,
    title: 'Day 6',
    subtitle: 'Welcome to the City of Pines',
    theme: 'mountain',
    intro:
      'The sixth and final day of our DJM Educational Tour brought us to Baguio City — the summer capital of the Philippines, nestled in the Cordillera Mountains at 1,500 m above sea level. The pine-scented cool air, colonial landmarks, military pride, and mountain panoramas made Day 6 one of the most memorable days of the entire tour.',
    activities: [
      {
        id: 'strawberry-farm',
        order: 1,
        emoji: '🍓',
        title: 'Strawberry Farm',
        location: 'La Trinidad Strawberry Farm',
        address: 'La Trinidad, Benguet — Strawberry Capital of the Philippines',
        description:
          'The La Trinidad Strawberry Farm in Benguet is one of the most beloved agritourism destinations in the Philippines. Stretching across the cool valley floor of La Trinidad, the farm is famous for its rows upon rows of sweet, freshly grown strawberries that thrive in the highland climate. Visitors can pick their own strawberries straight from the vines, sample strawberry-based jams, wines, and pastries, and experience the rich agricultural heritage of the Cordillera. It was a refreshing, hands-on way to start our Baguio adventure.',
        highlights: [
          'Pick-your-own strawberries fresh from the highland vines',
          'La Trinidad — the Strawberry Capital of the Philippines',
          'Cool Benguet climate that makes the sweetest berries',
        ],
        images: [],
      },
      {
        id: 'bell-church',
        order: 2,
        emoji: '⛪',
        title: 'Bell Church',
        location: 'Our Lady of Atonement Cathedral',
        address: 'Kisad Road, Baguio City',
        description:
          "The Bell Church, formally the Our Lady of Atonement Cathedral, is one of Baguio's most distinctive and photographed landmarks. Its vibrant pagoda-style architecture, colorful tile murals, and decorative statues blend Chinese and Catholic traditions into a uniquely Filipino expression of faith. Strolling through the grounds, we were struck by the intricate detail of every tile and the peaceful atmosphere despite being a popular tourist destination.",
        highlights: [
          'Pagoda-style architecture blending Chinese & Catholic traditions',
          'Vibrant tile murals and intricately crafted statues',
          "One of Baguio's most iconic spiritual landmarks",
        ],
        images: [],
      },
      {
        id: 'philippine-military-academy',
        order: 3,
        emoji: '🎖️',
        title: 'Philippine Military Academy',
        location: 'Philippine Military Academy (PMA)',
        address: 'Fort del Pilar, Baguio City',
        description:
          "The Philippine Military Academy, nestled within Fort del Pilar in Baguio City, is the country's premier military training institution and one of its most prestigious academic establishments. Founded in 1905, the PMA has produced generations of outstanding military officers who have served the nation with distinction. Our visit to the sprawling campus gave us a profound sense of discipline, honor, and patriotism — from the immaculate parade grounds and grand Melchor Hall to the monument of Gregorio del Pilar and the breathtaking mountain backdrop that frames the entire campus.",
        highlights: [
          'Premier military academy founded in 1905 at Fort del Pilar',
          'Grand campus with parade grounds and iconic Melchor Hall',
          'Monument of Gregorio del Pilar and panoramic mountain views',
        ],
        images: [],
      },
      {
        id: 'the-mansion',
        order: 4,
        emoji: '🏛',
        title: 'The Mansion',
        location: 'The Mansion',
        address: 'Official Presidential Summer Residence — Leonard Wood Road, Baguio',
        description:
          'The Mansion is the official summer residence of the President of the Philippines. Built during the American colonial era, it boasts Victorian-style architecture, iconic ornate wrought-iron gates, and immaculate formal gardens. Even from outside the main gate, the grandeur of the facade was breathtaking. The gates themselves are among the most photographed structures in Baguio — and we made sure to get our group photo there!',
        highlights: [
          'Victorian colonial architecture from the American era',
          'Famous wrought-iron presidential gates',
          'Beautifully manicured formal gardens and grounds',
        ],
        images: [],
      },
      {
        id: 'mines-view-park',
        order: 5,
        emoji: '⛰️',
        title: 'Mines View Park',
        location: 'Mines View Park',
        address: 'Mines View, Baguio City, Benguet',
        description:
          "Mines View Park is one of Baguio's most iconic tourist destinations, perched on a hillside overlooking the old gold and copper mines of Itogon, Benguet. The sweeping panorama from the observation deck stretches across the rugged mountain ranges of the Cordillera — a dramatic landscape carved by decades of mining and shaped by the forces of nature. Beyond the stunning views, the park is a lively hub of Cordilleran culture, with vendors selling traditional Igorot costumes for photo opportunities, handcrafted wood carvings, and native highland souvenirs.",
        highlights: [
          'Panoramic view of the Benguet mountain range and old mining valleys',
          'Traditional Igorot cultural experience and highland souvenirs',
          "One of Baguio's most visited and photographed overlooks",
        ],
        images: [],
      },
      {
        id: 'burnham-park',
        order: 6,
        emoji: '🌿',
        title: 'Burnham Park',
        location: 'Burnham Park',
        address: 'Jose Abad Santos Drive, Baguio City',
        description:
          "Burnham Park is the beloved heart of Baguio City — a sprawling urban park designed by American architect Daniel Burnham in the early 1900s as part of his vision for a model city in the Philippine highlands. The park's iconic man-made lake is dotted with colorful paddleboats and rowboats, and its wide open lawns, rose garden, and tree-lined paths make it the perfect place to unwind. Surrounded by the cool mountain air and the gentle hum of the city, Burnham Park was a wonderful, peaceful way to close the final chapter of our DJM Educational Tour.",
        highlights: [
          'Designed by American architect Daniel Burnham in the early 1900s',
          'Iconic man-made lake with paddleboats and rowboats',
          'Rose garden, open lawns, and a serene highland atmosphere',
        ],
        images: [],
      },
    ],
  },
]
