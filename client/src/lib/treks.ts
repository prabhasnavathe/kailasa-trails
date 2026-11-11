export interface TrekDay {
  day: number;
  title: string;
  description: string;
  altitude?: string;
  distance?: string;
}

export interface Trek {
  id: string;
  name: string;
  slug: string;
  region: string;
  difficulty: "Easy" | "Moderate" | "Advanced" | "Expert";
  duration: number;
  groupSize: { min: number; max: number };
  price: number;
  currency: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  itinerary: TrekDay[];
  includes: string[];
  excludes: string[];
  bestSeason: string[];
  maxAltitude: string;
  totalDistance: string;
}

export const treks: Trek[] = [
  {
    "id": "brahmatal-winter-trek",
    "name": "Brahmatal Winter Trek",
    "slug": "brahmatal-winter-trek",
    "region": "Garhwal Himalayas \u00b7 Chamoli, Uttarakhand",
    "difficulty": "Easy",
    "duration": 5,
    "groupSize": {
      "min": 6,
      "max": 20
    },
    "price": 6500,
    "currency": "INR",
    "image": "/manus-storage/brahmatal-cover.jpg",
    "shortDescription": "A winter summit above the clouds \u2014 trek to the sacred frozen lake where Lord Brahma once meditated, ringed by colossal 360\u00b0 views of Mt. Trishul and Nanda Ghunti.",
    "fullDescription": "\u201cKailasa\u201d \u2014 a name borrowed from the sacred peak itself. Brahmatal is one of Garhwal\u2019s finest winter treks \u2014 a frozen alpine lake at 11,570 ft said to be where Lord Brahma once meditated, ringed by colossal panoramic views of Mt. Trishul and Nanda Ghunti. Starting with a picturesque 294 km drive along the Alaknanda river valley via the sacred Panchprayag (Devprayag, Rudraprayag, and Karnaprayag) to Lohajung, the trail winds on foot through oak and rhododendron forests, opening up to Bekaltal Lake, Jhandi Top, and the breathtaking high ridge of Brahmatal Pass before descending via Daldum.",
    "highlights": [
      "Brahmatal Pass summit at 11,570 ft with panoramic Himalayan vistas",
      "Mythical frozen Brahmatal Lake where Lord Brahma meditated",
      "Towering close-up views of Mt. Trishul (7,120 m) and Mt. Nanda Ghunti (6,309 m)",
      "Bekaltal Lake nested in deep silent oak forests",
      "Bagdi and Navali Bugyals (high alpine meadows)",
      "Scenic drive along the sacred Alaknanda River and Panchprayag confluences",
      "Daily departures December\u2013February, select March batches"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Lohajung & Acclimatization",
        "description": "Start your journey to Lohajung, 294 km from Rishikesh (11\u201312 hours). Drive uphill through the Kumaon area into Garhwal's Himalayan Belt, spotting the Shivalik ranges. Cross three iconic Panchprayag unions of the Alaknanda River (Devprayag, Rudraprayag, Karnaprayag). Overnight in Kailasa Trails guest house with evening tea-snacks and dinner.",
        "altitude": "7,600 ft",
        "distance": "294 km drive"
      },
      {
        "day": 2,
        "title": "Lohajung to Bekaltal",
        "description": "Trek begins from Lohajung through dense oak and rhododendron forests to Mandoli village with colossal mountain vistas and Nanda Ghunti peak views. Cross a wooden bridge over a fresh mountain stream to Begum resting spot overlooking Bagdi and Navali Bugyals. Camp in a woody forest \u2014 home to Asian Barred Owlets and Himalayan Woodpeckers.",
        "altitude": "9,850 ft",
        "distance": "4.5 km / 5 hrs"
      },
      {
        "day": 3,
        "title": "Bekaltal to Brahmatal Camp",
        "description": "Enjoy snow-capped pathways spotting Mt. Trishul through tall trees. Bekaltal Lake appears after a two-hour hike, creased with oak trees. Climb up to Talindi Top with exceptional views of Mt. Nanda Ghunti and Mt. Trishul, then descend 1.5 km to the Brahmatal Campsite. Brahmatal Lake is just 500 meters further, frozen through the winter.",
        "altitude": "10,650 ft",
        "distance": "7 km / 7 hrs"
      },
      {
        "day": 4,
        "title": "Brahmatal Camp to Peak & Return to Lohajung",
        "description": "Summit push day! Ascend along challenging ridgelines across Bada Jhandidar and Chota Jhandidar with valleys falling away on either side. Stand at Brahmatal Peak (11,570 ft) for a 360\u00b0 snow-capped Himalayan panorama. Trek 9 km down to Lohajung for evening refreshments and celebratory dinner at the guest house.",
        "altitude": "11,570 ft summit \u2193 7,600 ft",
        "distance": "8 km summit + 9 km descent"
      },
      {
        "day": 5,
        "title": "Lohajung to Rishikesh Departure",
        "description": "Depart early morning at 6:00 AM from Lohajung. Enjoy the 250 km scenic return drive via Karnaprayag, Rudraprayag, and Devprayag along the Ganga River, arriving in Rishikesh by around 6:00 PM \u2014 marking the conclusion of an unforgettable expedition.",
        "altitude": "7,600 ft \u2193 1,120 ft",
        "distance": "250 km / 10 hrs drive"
      }
    ],
    "includes": [
      "Accommodation (triple sharing): Kailasa Trails Guest House in Lohajung, and alpine tents on the trail",
      "Meals: Day 1 dinner; Day 2 to Day 4 all meals (nutritious vegetarian food prepared by camp cooks)",
      "Camping charges \u2013 all trekking permits and forest camping charges included",
      "Trekking equipment \u2013 high-quality tents, sleeping bags, ice axes, microspikes, gaiters as required",
      "Safety equipment \u2013 first aid, medical kit, oxygen cylinders, stretchers",
      "Professional trek leader (mountaineering qualified), local guides, and support staff"
    ],
    "excludes": [
      "Food during travelling from Rishikesh to Lohajung & Lohajung to Rishikesh",
      "Insurance (mandatory)",
      "Mules or porter to carry personal luggage",
      "Food items purchased by individuals at local canteens on the trek or during the drive",
      "Any early return travel costs or accommodation except for the days as per the itinerary",
      "Any expenses for medical treatment of injury or accident"
    ],
    "bestSeason": [
      "December",
      "January",
      "February",
      "March"
    ],
    "maxAltitude": "11,570 ft",
    "totalDistance": "~29 km"
  },
  {
    "id": "kedarkantha-trek",
    "name": "Kedarkantha Trek",
    "slug": "kedarkantha-trek",
    "region": "Garhwal Himalayas \u00b7 Uttarkashi, Uttarakhand",
    "difficulty": "Moderate",
    "duration": 5,
    "groupSize": {
      "min": 6,
      "max": 20
    },
    "price": 6000,
    "currency": "INR",
    "image": "/manus-storage/kedarkantha-cover.jpg",
    "shortDescription": "The Queen of Winter Treks \u2014 a 5-day snow-laden expedition through pine forests and frozen Juda Ka Talab to the summit of Kedarkantha at 12,500 ft.",
    "fullDescription": "Known as the \u201cQueen of Winter Treks,\u201d Kedarkantha packs summit views, frozen alpine lakes, and snow-laden pine forests into one of the most rewarding beginner treks in the Himalayas. Standing tall at 12,500 feet in Uttarakhand's Uttarkashi district, the trek offers a perfect blend of adventure, natural beauty, and spiritual vibes. Surrounded by breathtaking views of Himalayan peaks like Swargarohini, Bandarpoonch, and Kala Nag, trekkers camp at picturesque spots like Juda Ka Talab and Kedarkantha Base Camp under clear starlit skies before pushing for the sunrise summit.",
    "highlights": [
      "12,500 ft summit elevation with 360\u00b0 Himalayan panorama at dawn",
      "Juda Ka Talab \u2014 enchanting high-altitude frozen lake",
      "360\u00b0 views of Swargarohini, Bandarpoonch, and Kala Nag",
      "Snow trekking and thrilling snow sliding along the descent",
      "Picturesque base camps with Bortle-class stargazing",
      "Pickup and drop from Dehradun Railway Station / Patel Nagar included",
      "Best Season: December to April"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Dehradun to Sankri",
        "description": "Pickup at Dehradun Railway Station or Patel Nagar at 7:00 AM. Enjoy a scenic 7\u20138 hour drive (198 km) through mountains, rivers, and pine forests, passing through Govind National Park. Arrive in Sankri/Saur village by 5:00 PM. Evening free to explore the charming Himalayan hamlet with overnight in guest house.",
        "altitude": "6,400 ft",
        "distance": "198 km / 7\u20138 hrs drive"
      },
      {
        "day": 2,
        "title": "Sankri to Juda Ka Talab",
        "description": "Trek begins from Sankri to Juda Ka Talab (~4 km, 4\u20135 hrs). The trail passes through dense forests carpeted in pine and maple leaves, crossing freshwater streams and oak clearings. Arrive at the picturesque frozen Juda Ka Talab lake for overnight camping in nature's lap.",
        "altitude": "9,100 ft",
        "distance": "~4 km / 4\u20135 hrs"
      },
      {
        "day": 3,
        "title": "Juda Ka Talab to Kedarkantha Base",
        "description": "An early-morning trek toward Kedarkantha Base (~3 km, 4 hrs). The route passes through dense pine and oak forest, opening into wide scenic meadows. Breathtaking views of Kala Nag, Bandarpoonch, and Swargarohini. Overnight camping at the base camp with clear night skies ideal for stargazing.",
        "altitude": "11,300 ft",
        "distance": "~3 km / 4 hrs"
      },
      {
        "day": 4,
        "title": "Kedarkantha Base to Summit & descend to Juda Ka Talab",
        "description": "Alpine summit push begins at 2:00 AM through sub-zero temperatures (down to -15\u00b0C) to witness the golden sunrise from the summit at 12,500 ft. Soak in the 360\u00b0 Himalayan panorama of Gangotri and Swargarohini ranges. Descend via Hargaon back to Juda Ka Talab with snow sliding along the way.",
        "altitude": "12,500 ft summit \u2193 9,100 ft",
        "distance": "11 km / 8 hrs"
      },
      {
        "day": 5,
        "title": "Juda Ka Talab to Sankri & Return to Dehradun",
        "description": "After breakfast, descend ~4 km from Juda Ka Talab to Sankri (2\u20133 hrs). Freshen up at the base and board vehicles for the return drive to Dehradun, arriving by evening with summit memories.",
        "altitude": "9,100 ft \u2193 2,100 ft",
        "distance": "~4 km trek + 198 km drive"
      }
    ],
    "includes": [
      "All transfers in shared taxi: Pickup and drop from Dehradun (both ways)",
      "Permits and entrance fees included",
      "Accommodation: High-quality alpine tents and guest houses",
      "All vegetarian nutritious meals: Breakfast, lunch, tea/snacks, hot soup, dinner, and coffee",
      "Full camping gear: Tents, sleeping bags, mattress, liner, kitchen tent, dining tent, separate toilet tents (ladies & gents)",
      "Safety equipment: First-aid box, oxygen cylinder, technical safety equipment, walkie-talkies, microspikes & gaiters",
      "Experienced Hindi & English-speaking guide, local team, cooks & porters",
      "24\u00d77 customer service with 50+ professional team members"
    ],
    "excludes": [
      "Personal insurance",
      "Personal toiletry items & medicine kit",
      "Meals during transit (Dehradun to Sankri & back)",
      "Charges for mules/porters/extra luggage (\u20b9200 per bag/person \u2014 pre-booking required)",
      "Rental equipment (Jacket \u20b9500, Shoes \u20b9500, Walking pole \u20b9200, Head torch \u20b9200, Woolen cap \u20b9200, Poncho \u20b9200)"
    ],
    "bestSeason": [
      "December",
      "January",
      "February",
      "March",
      "April"
    ],
    "maxAltitude": "12,500 ft",
    "totalDistance": "19 km"
  },
  {
    "id": "kuari-pass-trek",
    "name": "Kuari Pass Trek",
    "slug": "kuari-pass-trek",
    "region": "Garhwal Himalayas \u00b7 Joshimath, Uttarakhand",
    "difficulty": "Moderate",
    "duration": 6,
    "groupSize": {
      "min": 6,
      "max": 20
    },
    "price": 8000,
    "currency": "INR",
    "image": "/manus-storage/kuari-pass-cover.jpg",
    "shortDescription": "The Trek of a Thousand Views \u2014 trace the historic Curzon Trail through oak forests and Gurson Bugyal to a 360\u00b0 wall facing Nanda Devi and Kamet.",
    "fullDescription": "\u201cKailasa\u201d \u2014 a name borrowed from the sacred peak itself. Kuari Pass, also known as the Curzon Trail, is one of the most beautiful and popular treks in the Garhwal Himalayas of Uttarakhand. Located at an altitude of 12,516 feet (3,820 metres), it offers breathtaking views of India's most iconic summits \u2014 Nanda Devi (7,816 m), Dronagiri, Kamet, Hathi Ghoda, and Trishul. The trail passes through dense forests of oak and rhododendron, charming Garhwali villages, and vast alpine meadows like Gurson Bugyal \u2014 a perfect blend of natural beauty and cultural experience. Best enjoyed September to April.",
    "highlights": [
      "Kuari Pass summit at 12,516 ft (3,820 m) with 360\u00b0 Garhwal giants panorama",
      "Unobstructed close-up views of Nanda Devi, Kamet, Dronagiri, Hathi Ghoda & Trishul",
      "Historic British-era Curzon Trail route",
      "Gurson Bugyal \u2014 vast sweeping alpine meadows",
      "Camp under Bortle-1 starlight at Gulling Top and Khullara Top",
      "Panchprayag confluences drive along the holy Alaknanda and Ganga rivers",
      "Best Season: September to April"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Drive from Rishikesh to Joshimath",
        "description": "Early morning departure from Rishikesh. A scenic 9\u201310 hour drive along the Badrinath Highway through the Himalayan foothills, following the Ganga and Alaknanda rivers past the five holy confluences \u2014 Panchprayag (Devprayag, Rudraprayag, Karnaprayag, Nandaprayag, Vishnuprayag). Arrive in Joshimath by evening, dinner and hotel rest.",
        "altitude": "6,150 ft",
        "distance": "250 km / 9\u201310 hrs drive"
      },
      {
        "day": 2,
        "title": "Joshimath to Dhak Village, Trek to Gulling Top",
        "description": "After breakfast, a short drive to Dhak Village trailhead. The trail ascends gradually through oak, rhododendron, and pine forests with distant views of Dronagiri and Hathi Ghoda peaks. Experience traditional Garhwali villages before camping at Gulling Top.",
        "altitude": "9,600 ft",
        "distance": "6 km / 4\u20135 hrs"
      },
      {
        "day": 3,
        "title": "Trek from Gulling Top to Khullara Top",
        "description": "A steady climb through dense forest and open clearings opening into expansive meadows. Spectacular sightings of Mt. Dronagiri and surrounding peaks. Khullara Top greets you with a vast alpine meadow ringed by snow-clad mountains. Rest under starry skies.",
        "altitude": "11,100 ft",
        "distance": "5 km / 4 hrs"
      },
      {
        "day": 4,
        "title": "Khullara Top to Kuari Pass and Back",
        "description": "Early breakfast, then the summit push toward Kuari Pass begins across alpine ridges and open meadows. At 3,820 m (12,516 ft), Kuari Pass rewards you with an overwhelming 360\u00b0 panorama of the Garhwal Himalayas: Nanda Devi, Kamet, Hathi Ghoda, and Dronagiri. Return to Khullara Top for overnight camp.",
        "altitude": "12,516 ft summit",
        "distance": "8 km / 5\u20136 hrs"
      },
      {
        "day": 5,
        "title": "Khullara Top to Dhak & Gurson Bugyal, Drive to Joshimath",
        "description": "Descent through Gurson Bugyal \u2014 one of the trek's most scenic meadows with wide-open landscapes and continuous Himalayan views. Vehicles meet the group at Dhak to drive back to Joshimath for hotel dinner and celebration.",
        "altitude": "11,100 ft \u2193 6,150 ft",
        "distance": "7 km trek + drive"
      },
      {
        "day": 6,
        "title": "Drive from Joshimath to Rishikesh",
        "description": "After breakfast, begin the 9\u201310 hour return drive retracing the mountain route through Panchprayag confluences along the Ganga River, reaching Rishikesh by evening \u2014 tour ends.",
        "altitude": "6,150 ft \u2193 1,120 ft",
        "distance": "250 km / 9\u201310 hrs drive"
      }
    ],
    "includes": [
      "Meals as per trek menu during the trek (from Joshimath onwards)",
      "Hotel stay in Joshimath (first and last night)",
      "Tented accommodation during the trek (Gulling Top & Khullara Top)",
      "Transport from Rishikesh to Joshimath and back (shared vehicle)",
      "Forest camping and permit charges",
      "Sleeping bags, mattresses, tents, dining and toilet tents",
      "Kitchen equipment and utensils, gaiters and microspikes for snow",
      "Qualified and professional trek leader, local guides, and support staff",
      "First-aid medical kit, oxygen cylinder, and stretcher for emergencies",
      "All applicable taxes and trekking service charges"
    ],
    "excludes": [
      "Mules offloading fees: \u20b9400/day (up to 10 kg bag)",
      "Personal trekking gear not mentioned in inclusions (jackets, trekking poles)",
      "Personal expenses \u2014 laundry, phone calls, additional beverages",
      "Private or individual transportation apart from scheduled vehicle",
      "Trek insurance: \u20b9320 / person",
      "GST @ 5%",
      "Meals en route to / from Rishikesh"
    ],
    "bestSeason": [
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
      "April"
    ],
    "maxAltitude": "12,516 ft",
    "totalDistance": "22 km"
  },
  {
    "id": "har-ki-dun-trek",
    "name": "Har Ki Dun Trek",
    "slug": "har-ki-dun-trek",
    "region": "Garhwal Himalayas \u00b7 Govind National Park, Uttarakhand",
    "difficulty": "Moderate",
    "duration": 7,
    "groupSize": {
      "min": 6,
      "max": 20
    },
    "price": 11000,
    "currency": "INR",
    "image": "/manus-storage/har-ki-dun-cover.jpg",
    "shortDescription": "The Valley of the Gods \u2014 a cradle-shaped alpine sanctuary at 11,675 ft said to be the mythical Pandavas' route to heaven, surrounded by Swargarohini, Bandarpoonch, and Black Peak.",
    "fullDescription": "\u201cKailasa\u201d \u2014 a name borrowed from the sacred peak itself. Har Ki Dun, also called the \u201cValley of Gods,\u201d is a cradle-shaped valley in Uttarakhand\u2019s Govind Pashu Vihar National Park. At 11,675 ft, it offers a dramatic blend of alpine meadows, dense pine and deodar forests, glacier basins, and panoramic views of the majestic Swargarohini (6,252 m), Bandarpoonch (6,316 m), and Black Peak (6,387 m). The valley is steeped in epic mythology, believed to be the ancient pathway taken by the Pandavas on their ascent to heaven. Its peaceful landscapes, terraced fields, wooden villages like Osla with its Someshwar temple, and untouched beauty make Har Ki Dun an absolute paradise.",
    "highlights": [
      "Har Ki Dun alpine valley floor at 11,675 ft with glacier basins",
      "Mythical Pandava Trail \u2014 believed to be the ancient route to heaven",
      "Stunning views of Swargarohini (6,252 m), Bandarpoonch (6,316 m), and Black Peak (6,387 m)",
      "Centuries-old wooden Pahari villages of Sankri, Taluka, and Osla with Someshwar Temple",
      "Supin River trail with exciting hanging wooden bridge crossings",
      "Inside Govind Pashu Vihar National Park with rich birdlife and alpine flora",
      "Round-trip pickup and drop from Dehradun Railway Station / ISBT"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Dehradun to Sankri",
        "description": "Pickup at Dehradun Railway Station / ISBT at 7:00 AM. Scenic 198 km drive (7\u20138 hrs) via Mussoorie, Kempty Falls, Yamuna Valley, Purola, Mori, and Naitwar. Arrive in Sankri by 5\u20136 PM; stay in guesthouse/hotel.",
        "altitude": "6,400 ft",
        "distance": "198 km / 7\u20138 hrs drive"
      },
      {
        "day": 2,
        "title": "Sankri to Osla/Seema via Taluka",
        "description": "Jeep ride to Taluka (6,800 ft). Trek along the Supin River through pine, deodar, and walnut forests. Cross freshwater streams and wooden bridges. Visit Osla village, famed for its Someshwar temple and wooden architecture. Camp at Seema/Osla.",
        "altitude": "8,500 ft",
        "distance": "~13 km / ~7 hrs"
      },
      {
        "day": 3,
        "title": "Osla/Seema to Simatra Campsite",
        "description": "Trail descends initially, then climbs through dense chestnut and willow forests. Thrilling river crossings and hanging wooden bridges beside the Supin River. Camp across the river opposite Osla village with the soothing sound of flowing water.",
        "altitude": "10,200 ft",
        "distance": "~13 km / 6\u20137 hrs"
      },
      {
        "day": 4,
        "title": "Simatra Campsite to Har Ki Dun & Back",
        "description": "Summit day! Cross a hanging bridge and ascend gradually through alpine meadows and coniferous forests. Final 200m climb opens into the cradle-shaped Har Ki Dun valley. Soak in towering views of Swargarohini, Black Peak, and Bandarpoonch. Enjoy packed lunch in the meadow before descending to Simatra.",
        "altitude": "11,675 ft",
        "distance": "11 km / 8 hrs"
      },
      {
        "day": 5,
        "title": "Simatra to Osla/Seema",
        "description": "Retrace steps through the valley in reverse. Enjoy photography of Himalayan villages and farming terraces. Interact with local villagers about their unique mountain culture and folklore. Overnight in tents near Osla/Seema.",
        "altitude": "8,500 ft",
        "distance": "~13 km / 6 hrs"
      },
      {
        "day": 6,
        "title": "Osla/Seema to Sankri",
        "description": "Downhill trek along the Supin River to Taluka. Shared jeep drive back to Sankri. Evening free to explore Sankri village, local caf\u00e9s, and traditional handicraft shops. Stay in guesthouse/hotel.",
        "altitude": "6,400 ft",
        "distance": "~13 km trek + jeep drive"
      },
      {
        "day": 7,
        "title": "Sankri to Dehradun Return Drive",
        "description": "Early morning departure from Sankri for the 198 km scenic drive through river valleys. Optional white-water rafting in Mori (at own cost, weather permitting). Arrive in Dehradun by 6\u20137 PM with lifelong memories of the Valley of Gods.",
        "altitude": "6,400 ft \u2193 2,100 ft",
        "distance": "198 km / 7\u20138 hrs drive"
      }
    ],
    "includes": [
      "All transfers in shared taxi: Pickup and drop from Dehradun (both ways)",
      "All forest permits and entrance fees for Govind Pashu Vihar National Park",
      "Accommodation: Tents and guest houses",
      "All nutritious vegetarian meals: Breakfast, lunch, evening tea/snacks, hot soup, dinner, and coffee",
      "All camping gear: High-quality tents, sleeping bags, mattresses, kitchen tent, dining tent, separate toilet tents (ladies & gents)",
      "Safety equipment: First aid box, oxygen cylinder, technical safety equipment, walkie-talkies, gaiters",
      "Experienced Hindi & English-speaking guide, local team, cooks, and helpers",
      "24x7 customer support and 100% certified mountain crew"
    ],
    "excludes": [
      "Meals during road transit (Dehradun \u2194 Sankri)",
      "Personal expenses (insurance, laundry, bottled water, beverages)",
      "Carriage of personal luggage (\u20b9200 per bag/day if hired)",
      "Rental equipment (trekking shoes, jackets, poles, etc.)"
    ],
    "bestSeason": [
      "April",
      "May",
      "June",
      "September",
      "October",
      "November",
      "December"
    ],
    "maxAltitude": "11,675 ft",
    "totalDistance": "35 km"
  },
  {
    "id": "hampta-pass-trek",
    "name": "Hampta Pass Trek",
    "slug": "hampta-pass-trek",
    "region": "Himachal Pradesh \u00b7 Manali & Lahaul",
    "difficulty": "Moderate",
    "duration": 5,
    "groupSize": {
      "min": 6,
      "max": 20
    },
    "price": 6500,
    "currency": "INR",
    "image": "/manus-storage/hampta-pass-cover.jpg",
    "shortDescription": "The Valley Between Two Worlds \u2014 cross from the lush pine forests of Kullu over the 14,010 ft alpine pass into the stark, dramatic cold-desert of Lahaul with an optional Chandratal Lake drive.",
    "fullDescription": "\u201cKailasa\u201d \u2014 a name borrowed from the sacred peak itself. Hampta Pass is one of Himachal Pradesh's most celebrated crossovers, connecting the lush green Kullu Valley with the stark, barren moonscapes of Lahaul. The trek rises to 14,010 feet (4,270 m) and is famous for its rapid, dramatic shift in terrain: moving from dense pine, maple, and deodar forests and blooming wildflower meadows in Jwara to towering cold-desert mountains within a single day. Campsites at Chika, Balu Ka Ghera, and Shea Goru sit beside gushing glacial streams, with an optional drive to the sacred turquoise waters of Chandratal (The Moon Lake).",
    "highlights": [
      "Hampta Pass crossing at 14,010 ft (4,270 m)",
      "Two worlds in one trek: verdant Kullu forests to stark Lahaul cold desert",
      "Jwara \u2014 Himachal's own vibrant Valley of Flowers",
      "Panoramic vistas of Mt. Deo Tibba (6,001 m) and Mt. Indrasan (6,221 m)",
      "Thrilling glacial river crossings and moraine traverses",
      "Optional Chandratal Lake extension (The Moon Lake)",
      "Scenic return drive via the historic Rohtang Pass",
      "Best season: June to September"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Manali to Jobra & Trek to Chika",
        "description": "Pickup at 10:00 AM from Manali. Drive to Jobra and begin trekking through pine, maple, and deodar forests along the roaring Rani Nallah stream. Reach Chika for scenic riverside camping under the stars.",
        "altitude": "10,100 ft",
        "distance": "~2 km trek / 2 hrs"
      },
      {
        "day": 2,
        "title": "Chika to Balu Ka Ghera",
        "description": "Trek along Rani Nallah through open meadows, boulder fields, and glacial valleys. Cross Jwara \u2014 Himachal's own Valley of Flowers. Camp at Balu Ka Ghera (sandy base of Hampta Pass) beneath towering snow peaks.",
        "altitude": "11,900 ft",
        "distance": "~5 km / 5\u20136 hrs"
      },
      {
        "day": 3,
        "title": "Balu Ka Ghera to Shea Goru via Hampta Pass",
        "description": "Summit day! Steep climb to Hampta Pass (14,010 ft) with breathtaking panoramas of Deo Tibba and Indrasan. Cross the thrilling pass and descend into the barren, stark landscape of Lahaul. Camp at Shea Goru beside a cold alpine stream.",
        "altitude": "14,010 ft pass \u2193 12,900 ft",
        "distance": "~8 km / 8\u20139 hrs"
      },
      {
        "day": 4,
        "title": "Shea Goru to Chatru & Optional Chandratal Lake",
        "description": "Descent along moraine paths and glacier runoffs to Chatru \u2014 the confluence point of Spiti, Lahaul, and Rohtang routes. Post lunch, optional drive to Chandratal Lake (The Moon Lake, ~3\u20134 hrs) if roads are open to admire its crystal-clear turquoise waters. Return to Chatru camp.",
        "altitude": "11,000 ft",
        "distance": "~6 km trek + drive"
      },
      {
        "day": 5,
        "title": "Drive from Chatru to Manali via Rohtang Pass",
        "description": "Early morning departure from Chatru. Scenic drive back to Manali via Rohtang Pass, traversing the dramatic contrast between Lahaul and Kullu Valley. Arrive in Manali by 5\u20136 PM.",
        "altitude": "6,725 ft",
        "distance": "~116 km / 5\u20136 hrs drive"
      }
    ],
    "includes": [
      "Transport from and to Manali (pickup & drop)",
      "4 nights camp stays (triple sharing) in high-quality alpine tents",
      "All meals from Day 1 lunch to Day 5 breakfast (nutritious vegetarian mountain menu)",
      "All forest permits and entry charges",
      "Basic medical and oxygen support, first aid kit, stretcher",
      "Bonfire with group activities and entertainment",
      "Mountaineering certified trek leader, guides, chefs, assistants, and porters/mules",
      "Trek certificate of completion"
    ],
    "excludes": [
      "Any meals not mentioned in inclusions",
      "Entry tickets for monuments, lakes, rafting, or Chandratal vehicle costs if opted individually",
      "Personal expenses (laundry, mineral water, personal porter)",
      "Insurance and emergency evacuation"
    ],
    "bestSeason": [
      "June",
      "July",
      "August",
      "September"
    ],
    "maxAltitude": "14,010 ft",
    "totalDistance": "26 km"
  },
  {
    "id": "bali-pass-trek",
    "name": "Bali Pass Trek",
    "slug": "bali-pass-trek",
    "region": "Garhwal Himalayas \u00b7 Uttarkashi & Yamunotri, Uttarakhand",
    "difficulty": "Advanced",
    "duration": 8,
    "groupSize": {
      "min": 6,
      "max": 15
    },
    "price": 17500,
    "currency": "INR",
    "image": "/manus-storage/bali-pass-cover.jpg",
    "shortDescription": "The Hardest Crossing in the Garhwal \u2014 an epic 77 km high-altitude col at 16,200 ft connecting the Supin Valley to Yamunotri via sacred Ruinsara Tal and knife-edge snow ridges.",
    "fullDescription": "\u201cKailasa\u201d \u2014 a name borrowed from the sacred peak itself. Bali Pass is one of the Garhwal Himalayas' toughest, most exhilarating high-altitude pass crossings. Rising to 16,200 ft (4,950 m), it connects the Har Ki Dun / Supin River valley with the sacred Yamunotri valley. The expedition takes mountaineers past ancient Pahari villages, high alpine meadows of Devsu Bugyal, the pristine sacred glacial lake of Ruinsara Tal beneath Black Peak (Kalanag) and Swargarohini, and the mythical Hanuman cave at Odari before tackling the steep, technical snow climb over Bali Pass and descending to the holy hot springs of Janki Chatti.",
    "highlights": [
      "Bali Pass crossing at 16,200 ft (4,950 m) with technical knife-edge ridge",
      "Pristine glacial lake of Ruinsara Tal (11,800 ft) sacred to locals",
      "Colossal close-ups of Swargarohini (6,252 m), Bandarpoonch (6,316 m), and Black Peak (6,387 m)",
      "High-altitude meadows of Devsu Bugyal with alpine wildflowers",
      "Odari Camp \u2014 the legendary cave where Lord Hanuman is said to have rested",
      "Epic descent into Yamunotri gorge ending at Janki Chatti hot springs",
      "Dehradun to Dehradun 8D/7N package (\u20b917,500) or Sankri to Janki Chatti 7D/6N (\u20b915,000)",
      "Best season: May, June, September & October"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Dehradun to Sankri",
        "description": "Pickup at 6:00 AM from Prince Chowk, Dehradun. Scenic 220 km drive (10 hrs) through Mussoorie, Nainbagh, Purola, and Mori along river valleys. Check in at Sankri guesthouse (6,400 ft / 1,950 m).",
        "altitude": "6,400 ft",
        "distance": "220 km / 10 hrs drive"
      },
      {
        "day": 2,
        "title": "Sankri to Seema via Taluka",
        "description": "Drive 12 km to Taluka (6,700 ft). Trek along the Supin River through lush pine and deodar forests, traditional wooden villages, and terraced fields to Seema (8,500 ft / 2,600 m). Camp under the stars.",
        "altitude": "8,500 ft",
        "distance": "12 km trek / 7\u20138 hrs"
      },
      {
        "day": 3,
        "title": "Seema to Devsu Bugyal",
        "description": "Ascent into Devsu Bugyal (10,200 ft / 3,100 m) \u2014 a pristine high-altitude meadow surrounded by dense forests and snow-capped peaks with sweeping panoramas of Swargarohini and Bandarpoonch.",
        "altitude": "10,200 ft",
        "distance": "10 km / 5\u20136 hrs"
      },
      {
        "day": 4,
        "title": "Devsu Bugyal to Ruinsara Tal",
        "description": "Trek through green valleys and stream crossings to Ruinsara Tal (11,800 ft / 3,600 m), an enchanting glacial lake revered by locals, nestled right beneath Black Peak (Kalanag) and Swargarohini. Lakeside camp.",
        "altitude": "11,800 ft",
        "distance": "7 km / 4\u20135 hrs"
      },
      {
        "day": 5,
        "title": "Ruinsara Tal to Odari",
        "description": "Shorter but steeper climb to Odari (13,100 ft / 4,000 m), meaning 'cave' \u2014 believed to be where Lord Hanuman rested on his journey. Camp amidst dramatic rocky moraines beneath towering peaks.",
        "altitude": "13,100 ft",
        "distance": "4 km / 3\u20134 hrs"
      },
      {
        "day": 6,
        "title": "Odari to Bali Col Camp",
        "description": "Trek across steep moraine and snow patches to Bali Col Camp (15,100 ft / 4,600 m), the high base for the pass attempt. Awe-inspiring views of the Himalayan amphitheatre. Early rest for midnight summit push.",
        "altitude": "15,100 ft",
        "distance": "5 km / 6\u20137 hrs"
      },
      {
        "day": 7,
        "title": "Bali Col Camp to Lower Dhamni via Bali Pass",
        "description": "Summit day! Early alpine push across steep snow and rocky ridge to conquer Bali Pass (16,200 ft / 4,950 m). Unmatched 360\u00b0 panoramas of Garhwal giants. Descend carefully across snowfields and meadows to Lower Dhamni (11,100 ft / 3,350 m). Longest day.",
        "altitude": "16,200 ft summit \u2193 11,100 ft",
        "distance": "14 km / 10\u201311 hrs"
      },
      {
        "day": 8,
        "title": "Lower Dhamni to Janki Chatti & Drive to Dehradun",
        "description": "Downhill trek through dense forest to Janki Chatti (8,500 ft), famous for its holy thermal springs. Board vehicles for the 170 km drive back to Dehradun, arriving by evening.",
        "altitude": "8,500 ft \u2193 2,100 ft",
        "distance": "8 km trek + 170 km drive"
      }
    ],
    "includes": [
      "Full transport: Dehradun to Sankri and Janki Chatti to Dehradun",
      "Accommodation in hotels/guesthouses and high-altitude alpine tents",
      "All nutritious meals as per trek menu",
      "Forest camping permits and entry charges",
      "Safety equipment: Gaiters, microspikes, ropes, first aid kits, stretcher, oxygen cylinder",
      "High-quality camping gear: Tents, sleeping bags, mattresses, kitchen, dining and toilet tents",
      "Mountaineering-qualified professional trek leader, guides, and support staff",
      "All taxes including GST @ 5%"
    ],
    "excludes": [
      "Personal expenses (laundry, bottled water, telephone)",
      "Meals during road transit",
      "Personal insurance and emergency evacuation",
      "Mules or porter to carry personal luggage"
    ],
    "bestSeason": [
      "May",
      "June",
      "September",
      "October"
    ],
    "maxAltitude": "16,200 ft",
    "totalDistance": "77 km"
  },
  {
    "id": "chopta-chandrashila-trek",
    "name": "Chopta Chandrashila & Tungnath Trek",
    "slug": "chopta-chandrashila-trek",
    "region": "Garhwal Himalayas \u00b7 Chopta & Rudraprayag, Uttarakhand",
    "difficulty": "Easy",
    "duration": 3,
    "groupSize": {
      "min": 4,
      "max": 25
    },
    "price": 6000,
    "currency": "INR",
    "image": "/manus-storage/chopta-chandrashila-cover.jpg",
    "shortDescription": "The Trail to the Moon Rock \u2014 trek past Tungnath (the world's highest Shiva temple at 3,680 m) to the 13,549 ft Chandrashila summit and camp beside pristine Deoria Tal with 360\u00b0 Chaukhamba reflections.",
    "fullDescription": "\u201cKailasa\u201d \u2014 a name borrowed from the sacred peak itself. This legendary trail takes you past Tungnath, the highest Shiva temple in the world (3,680 m) and one of the revered Panch Kedar shrines, before pushing to the 'Moon Rock' \u2014 the Chandrashila summit at 13,549 ft (4,000 m). From Chandrashila, experience one of the most stunning 360\u00b0 panoramas in India: Nanda Devi, Mt. Trishul, Kedar Dome, Chaukhamba, and Bandarpunch standing in pure majesty. The journey also features the magical Deoria Tal lake at 7,999 ft, famous for its crystal-clear reflections of the Chaukhamba massif, village homestays, and sacred Ganga confluences at Devprayag.",
    "highlights": [
      "Chandrashila Peak summit (13,549 ft / 4,000 m) with 360\u00b0 Himalayan wall",
      "Tungnath Temple \u2014 the highest Shiva temple in the world (3,680 m, Panch Kedar)",
      "Magical Deoria Tal lake with crystal reflections of Mt. Chaukhamba",
      "Unobstructed views of Nanda Devi, Trishul, Kedar Dome, and Chaukhamba",
      "Scenic drive via Devprayag Sangam and Dhari Devi Temple",
      "Charming Sari Village homestay and alpine campsites",
      "Convenient pickup and drop from Delhi (Akshardham Metro) or Rishikesh",
      "Beginner-friendly and accessible from September to April"
    ],
    "itinerary": [
      {
        "day": 0,
        "title": "Delhi to Rishikesh Overnight Journey",
        "description": "Reporting 9:30\u201310:30 PM at Akshardham Metro Station, Delhi. Overnight scenic journey with music and travel group games onboard. En route halt for dinner/tea.",
        "altitude": "1,120 ft",
        "distance": "240 km / 5\u20136 hrs drive"
      },
      {
        "day": 1,
        "title": "Rishikesh to Sari Village via Devprayag",
        "description": "Early morning arrival in Rishikesh. Drive through Devprayag Sangam (confluence of Bhagirathi and Alaknanda) and Dhari Devi Temple. Arrive and check in at Sari Village. Evening bonfire, village exploration, and group activities.",
        "altitude": "6,560 ft",
        "distance": "~210 km / 8\u20139 hrs drive"
      },
      {
        "day": 2,
        "title": "Tungnath & Chandrashila Peak Summit",
        "description": "Early drive to Chopta base via Baniyakund. Begin trek to Tungnath Temple (3,680 m) for darshan. Push 1.5 km further to Chandrashila summit (13,549 ft) for a jaw-dropping 360\u00b0 Himalayan panorama of Nanda Devi, Trishul, and Chaukhamba. Descend to base and return to Sari for celebratory dinner.",
        "altitude": "13,549 ft",
        "distance": "~5.5 km / 3\u20134 hrs"
      },
      {
        "day": 3,
        "title": "Deoria Tal Lake Trek & Departure to Delhi",
        "description": "After breakfast, check out from Sari homestay. Morning trek to crystal-clear Deoria Tal (7,999 ft) reflecting Chaukhamba. Free time for photography and reflection. Return by noon to begin the return drive through Rishikesh, reaching Delhi overnight.",
        "altitude": "7,999 ft \u2193 700 ft",
        "distance": "~3.5 km trek + return drive"
      }
    ],
    "includes": [
      "Pickup & drop from Delhi (Akshardham) or Rishikesh",
      "Shared stay in homestay / campsite in Sari Village",
      "Meals: Dinner (Day 1), Breakfast & Dinner (Day 2), Breakfast (Day 3)",
      "Guided treks to Tungnath Temple, Chandrashila Peak & Deoria Tal",
      "Bonfire with group activities and entertainment",
      "Certified trek leader (basic/advanced mountaineering certified) & crew",
      "Safety gear: First aid medical kit, oxygen cylinder, stretcher",
      "Trek certificate of completion"
    ],
    "excludes": [
      "Meals en route to/from Rishikesh/Delhi",
      "Mules offloading fees: \u20b9400/day (up to 10 kg bag)",
      "Trek insurance: \u20b9320 / person",
      "GST @ 5%",
      "Any personal expenses (laundry, snacks, beverages)"
    ],
    "bestSeason": [
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
      "April"
    ],
    "maxAltitude": "13,549 ft",
    "totalDistance": "5.5 km"
  }
];

export function getTrekBySlug(slug: string): Trek | undefined {
  return treks.find((trek) => trek.slug === slug);
}

export function formatPrice(trek: Trek, amount: number): string {
  const symbol = trek.currency === "INR" ? "₹" : "$";
  return `${symbol}${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export function getTrekById(id: string): Trek | undefined {
  return treks.find((trek) => trek.id === id);
}
