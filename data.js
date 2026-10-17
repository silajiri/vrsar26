// Data: místa, itinerář, rozpočet. "verify" = údaj, který není ověřen u oficiálního zdroje.
const EUR = 24.325; // Kč za 1 EUR (ČNB 16. 10. 2026)

const HOTEL = { name: "Maistra Resort Belvedere", addr: "Pineta 4, 52450 Vrsar", lat: 45.1478, lng: 13.6075, phone: "+385 52 800 250", mail: "hello@maistra.hr" };

const PLACES = [
  {
    id: "brijuni", name: "Brijuni (Veliký Brijun)", day: "Čt 29. 10. dopoledne",
    desc: "Národní park na ostrovech: 15 minut lodí z Fažany, vláček, safari park (zebry, sloni) a stopy dinosaurů. Prohlídky jsou v chorvatštině.",
    addr: "Brionska 10, 52212 Fažana", lat: 44.9270, lng: 13.8000,
    from: "~50 km, 45 min", hours: "Open Days 23. 10. – 1. 11. 2026. Lodě z Fažany v listopadu 9:00 a 11:30, zpět 7:15, 11:00, 13:00, 15:00 (zdroje se rozcházejí)",
    price: "Exkurze: dospělí 17 €, děti 7–18 let 12 €, do 7 let zdarma · lístky na shop.np-brijuni.hr",
    duration: "4–5 h", web: "https://np-brijuni.hr/en/open-days-2026", status: "warn", verify: true,
    kid: "Rovné cesty, vláček, vhodné pro kočárek.",
    photos: ["0/02/Brijuni_-_zebra.jpg"]
  },
  {
    id: "porec", name: "Poreč: trh a staré město", day: "Pá 30. 10. dopoledne",
    desc: "Městský trh na Mlinské ulici je pro milovníky jídla: sýry, olivy, olivový olej, pršut, sezónní zelenina. Poté procházka po Decumanu a po nábřeží. Baziliku znáte, tu vynecháváme.",
    addr: "Mlinska 1, 52440 Poreč", lat: 45.2267, lng: 13.5994,
    from: "~10 km, 12 min", hours: "Trh denně 6–14 (v neděli od 15. 9. nepracuje), 1. 11. zavřeno",
    price: "Zdarma (nakupujete podle chuti)",
    duration: "1–2 h", web: "https://rcl.myporec.com/en/rc-offer/1496", status: "ok", verify: true,
    kid: "Ve městě vhodné pro kočárek.",
    photos: ["d/d4/Croatia_Porec_Euphrasius_Basilika_BW_2014-10-08_11-13-28.jpg"]
  },
  {
    id: "limfjord", name: "Limský kanál (Limski kanal)", day: "St 28. 10. dopoledne",
    desc: "Úzký mořský záliv zaříznutý hluboko do vnitrozemí, známý mušlemi a ústřicemi. Na vyhlídce stačí krátká zastávka s dětmi.",
    addr: "Limska draga, 52440 Vrsar / Kanfanar", lat: 45.1330, lng: 13.7280,
    from: "~15 km, 15 min", hours: "Vyhlídka volně přístupná · restaurace v listopadu často zavřené (ověřit)",
    price: "Vyhlídka zdarma · pirátské lodě z Vrsaru jsou pro malé děti dlouhé (4,5–5 h)",
    duration: "30–60 min", web: "https://www.istra.hr/en/", status: "ok", verify: true,
    kid: "Na vyhlídce ano.",
    photos: ["d/da/Limski_Kanal_view.jpg"]
  },
  {
    id: "rovinj", name: "Rovinj a park Punta Corrente", day: "St 28. 10. odpoledne",
    desc: "Nejfotogeničtější městečko Istrie. Staré město stojí na kopci s dlážděnými uličkami, park Zlatni rt je borový háj u moře s hřištěm a stezkami.",
    addr: "Rovinj", lat: 45.0810, lng: 13.6387,
    from: "~25 km, 25 min", hours: "Volně přístupné",
    price: "Zdarma · parkování: Valdibora (levnější, 15 min pěšky)",
    duration: "2–3 h", web: "https://www.rovinj-tourism.com/", status: "ok",
    kid: "Staré město s kočárkem ne (dlažba, strmé), park ano.",
    photos: ["d/de/Rovinj_Old_Town.jpg"]
  },
  {
    id: "baredine", name: "Jeskyně Baredine (Nova Vas)", day: "Pouze po domluvě",
    desc: "40minutová prohlídka, sestup 60 m k podzemnímu jezeru. Uvnitř je zima (~14 °C), s malými dětmi spíš pro starší. V listopadu jen na objednávku, 1. 11. zavřeno.",
    addr: "Tar-Gedići 55, 52446 Nova Vas", lat: 45.2680, lng: 13.6290,
    from: "~25 km, 25 min", hours: "Říjen denně 10–16 · listopad jen po domluvě den předem · 1. 11. zavřeno",
    price: "Dospělí 14 €, děti 5–15 let 10 €, do 4 let zdarma",
    duration: "1,5 h", web: "https://www.baredine.com/en/", status: "warn", verify: true,
    kid: "S kočárkem ne (schody).", photos: ["d/d4/Baredine-011_%2836570678394%29.jpg"]
  },
  {
    id: "pazin", name: "Pazin: hrad a etnografické muzeum", day: "Plán B do deště",
    desc: "Středověký hrad nad Pazinskou jámou (inspirace pro Julesa Verna). Uvnitř Etnografické muzeum Istrie.",
    addr: "Trg Narodne zaštite 1, 52000 Pazin", lat: 45.2400, lng: 13.9370,
    from: "~45 km, 45 min", hours: "Zimní režim od 16. 10.: Út–Čt 10–15, Pá 11–16, So–Ne 10–16, Po zavřeno",
    price: "Dospělí 6 €, děti 3 €, do 7 let zdarma",
    duration: "1,5 h", web: "https://www.emi.hr", status: "ok", verify: true,
    kid: "S kočárkem ne (schody).", photos: ["4/43/Pazin_Burg_-_Innenraum.jpg"]
  }
];

// Vinařství, olivy, lanýže, jídlo
const FOOD = [
  {
    id: "zigante", name: "Zigante Truffle Days (Livade)", day: "So 31. 10. dopoledne",
    desc: "Veletrh lanýžů, vín a gastronomie v centru istrijské lanýžové země. Ukázky hledání lanýžů se psy, což děti ocení. Zigante Tartufi má v Livade i obchod a restauraci.",
    addr: "Livade 7, 52428 Livade", lat: 45.4116, lng: 13.7313,
    from: "~55 km, 55–60 min", hours: "3. 10. – 1. 11. 2026, vždy So a Ne 10–19",
    price: "Vstup zdarma · hledání lanýžů se psy: cena neuvedena (jiní provozovatelé: ~44 € / dospělý za 1,5 h)",
    duration: "2–3 h", web: "https://www.istra.hr/en/events/28369", status: "good", verify: true,
    kid: "Zeptejte se na cenu pro děti. Kontakt: +385 91 430 1200, support@zigantetartufi.com", photos: []
  },
  {
    id: "mondo", name: "Konoba Mondo (Motovun)", day: "So 31. 10. oběd",
    desc: "Slavná konoba v hrázděné vesničce na kopci: pljukanci, fuži s lanýži, pršut. Rezervujte předem. Po obědě se dá projít hradbami s výhledem na údolí.",
    addr: "Barbacan 1, 52424 Motovun", lat: 45.3374, lng: 13.8286,
    from: "~65 km, 1 h 10", hours: "Po a St–Ne 12–22, v úterý zavřeno",
    price: "Ceny neověřeny (hlavní jídlo s lanýži cca 20–35 €)", duration: "1,5–2 h", web: "https://joinpearl.co/restaurants/motovun/konoba-mondo", status: "ok", verify: true,
    kid: "Do Motovunu vede strmá cesta z parkoviště, kočárek je nevhodný.", photos: []
  },
  {
    id: "matosevic", name: "Matošević: vinařství (Sv. Lovreč)", day: "Pá 30. 10. odpoledne",
    desc: "Respektovaná rodinná vinotéka. Degustace Malvasia (5 vín, přednáška, prohlídka sklepa). Jen po předchozí domluvě.",
    addr: "Krunčići 2, 52448 Sv. Lovreč", lat: 45.2216, lng: 13.8231,
    from: "~35 km, 40 min", hours: "Po–Čt 10–16, Pá 10–17, So 10–18, Ne zavřeno (ověřit)",
    price: "Cenu degustace se nepodařilo zjistit", duration: "1,5 h", web: "https://www.matosevic.com", status: "warn", verify: true,
    kid: "Nezjištěno, zeptejte se (hroznový mošt pro děti). Kontakt: +385 52 448 558, office@matosevic.com", photos: []
  },
  {
    id: "chiavalon", name: "Chiavalon: olivový olej (Vodnjan)", day: "Čt 29. 10. odpoledne po Brijunech",
    desc: "Jeden z nejlepších producentů extra panenského olivového oleje v Istrii. Bezplatná ochutnávka v mlýně, nebo placená prohlídka statku se čtyřmi oleji.",
    addr: "Vodnjan (Peroj–Vodnjan)", lat: 44.9604, lng: 13.8546,
    from: "~45 km, 45 min", hours: "Neověřeno, rezervovat", price: "Ochutnávka zdarma / placená prohlídka (cena neověřena)",
    duration: "1 h", web: "https://istra.hr/en/gourmet/evoo/producers/chiavalon", status: "ok", verify: true,
    kid: "Parkování zdarma.", photos: []
  },
  {
    id: "olivegrove", name: "Rodinná prohlídka olivového háje (Poreč)", day: "Pá 30. 10. (alternativa k vinařství)",
    desc: "Rodinná farma s degustací oleje. Pro děti je tam fotbalové hřiště, přátelský pes a velká zahrada. Sezóna sklizně a nového oleje je právě teď.",
    addr: "okolí Poreče", lat: 45.2300, lng: 13.6100,
    from: "~15 km", hours: "Rezervace přes Musement", price: "Viz odkaz",
    duration: "1,5–2 h", web: "https://esaexperience.musement.com/uk/porec/authentic-istrian-olive-oil-grove-guided-visit-including-tastings-378616", status: "ok", verify: true,
    kid: "Vhodné pro děti.", photos: []
  },
  {
    id: "vrsar", name: "Vrsar: Kod Luce a Trost", day: "St 28. 10. večeře / kterýkoli den",
    desc: "Konoba Kod Luce: grilované ryby a mořské plody, „vrsarská instituce“. Trost: domácí fuži s lanýži nebo se zvěřinou. Oba cíle jsou v Vrsaru, kam se dojde pěšky od hotelu.",
    addr: "Vrsar", lat: 45.1500, lng: 13.6064,
    from: "300 m od hotelu", hours: "V listopadu ověřit telefonem", price: "Hlavní jídlo 12–25 € (odhad)",
    duration: "—", web: "https://bookiscout.com/en/guides/vrsar-restaurants", status: "ok", verify: true,
    kid: "V Chorvatsku je dětský talíř běžný.", photos: []
  }
];

const OTHERS = { hotel: HOTEL };

// Itinerář. Pozor: 1. 11. je státní svátek (zavřené obchody a trhy).
const DAYS = [
  { date: "Úterý 27. 10.", title: "Cesta do Vrsaru (bez noclehu)", items: [
    ["13:00", "Odjezd z Lípy nad Orlicí. Vyhnout se Brnu: <strong>Pisárecký tunel a tunel Hlinky jsou od ~12. 10. do 20. 11. zavřené</strong>. Jet po D1 kolem Brna (ne přes VMO), pak D2 směr Mikulov"],
    ["~15:30", "Mikulov, hranice, Vídeň (obchvat S1), A2 směr Štýrský Hradec"],
    ["~16:45", "Západ slunce (po změně času 25. 10.), dál se jede za tmy"],
    ["~18:00", "Hlavní pauza na večeři u Štýrského Hradce / Maribora (45–60 min, děti se projdou)"],
    ["~20:30", "Lublaň, Postojna, Divača, hranice s Chorvatskem, Buzet"],
    ["~23:30–00:30", "Příjezd do hotelu Belvedere, pozdní check-in na recepci"]
  ], alt: "Čistá jízda je 9–10 h, s pauzami 11–12 h, takže přijedete kolem půlnoci. Nahlaste hotelu pozdní příjezd, ať na vás recepce počká. Děti ať v autě spí. Střídejte se v řízení a dělejte pauzy každé 2 hodiny."},
  { date: "Středa 28. 10.", title: "Pozvolný start: Vrsar, Limský kanál, kola", items: [
    ["09:30", "Pozdní snídaně v hotelu, odpočinek po cestě"],
    ["11:00", "<strong>Limský kanál</strong>: vyhlídka a procházka (~15 min autem)"],
    ["12:30", "Oběd (mušle a ústřice u Limu, pokud je restaurace otevřená, jinak Vrsar)"],
    ["14:30", "<strong>Kola</strong>: výlet po pobřežní stezce Vrsar–Funtana (~5 km, rovina), případně <strong>Rovinj</strong> autem"],
    ["18:30", "Večeře ve Vrsaru: Kod Luce nebo Trost (rezervovat)"]
  ], alt: "Půjčení kol viz sekce Kola níže. Dětské sedačky, vozíky a dětská kola je nutné ověřit předem."},
  { date: "Čtvrtek 29. 10.", title: "Brijuni a olivový olej", items: [
    ["08:00", "Odjezd do Fažany (~45 min)"],
    ["09:00", "<strong>Loď na Brijuni</strong> (15 min), vláček, safari park, stopy dinosaurů"],
    ["13:00", "Zpětná loď, oběd ve Fažaně"],
    ["15:00", "<strong>Chiavalon</strong> ve Vodnjanu: ochutnávka oleje"],
    ["17:00", "Zpět do Vrsaru"]
  ], alt: "Zkontrolujte jízdní řád lodí (zdroje se liší) a kupte lístky předem na shop.np-brijuni.hr. Plán B pro déšť: Pazin (hrad a muzeum), hotelový bazén (ověřit)."},
  { date: "Pátek 30. 10.", title: "Poreč: trh a víno", items: [
    ["09:30", "<strong>Trh v Poreči</strong> (6–14): sýry, olivy, pršut, olej"],
    ["10:30", "Procházka po Decumanu a nábřeží, hřiště"],
    ["12:30", "Oběd v Poreči"],
    ["14:30", "<strong>Matošević</strong> (Sv. Lovreč, degustace po domluvě), nebo olivový háj u Poreče s dětským hřištěm"],
    ["17:00", "Zpět do Vrsaru"]
  ], alt: "Volitelně: jeskyně Baredine u Nova Vas (v listopadu jen po domluvě, uvnitř zima)."},
  { date: "Sobota 31. 10.", title: "Lanýžové dny v Livade a Motovun", items: [
    ["09:30", "Odjezd (~55 min)"],
    ["10:30", "<strong>Zigante Truffle Days</strong> v Livade: ukázky hledání lanýžů se psy, ochutnávky, nákup"],
    ["13:00", "Oběd v <strong>Konobě Mondo</strong> v Motovunu (rezervovat, v úterý zavřeno)"],
    ["15:00", "Procházka po hradbách Motovunu"],
    ["17:00", "Zpět do Vrsaru; nakoupit zásoby na cestu (zítra svátek, obchody zavřené)"]
  ]},
  { date: "Neděle 1. 11.", title: "Návrat domů (státní svátek)", items: [
    ["08:00", "Snídaně, check-out"],
    ["08:30", "Odjezd: Buzet → Lublaň → Maribor → Štýrský Hradec → Vídeň"],
    ["~12:30", "Oběd a pauza v Mariboru / Štýrském Hradci"],
    ["~18:30", "Vídeň, hranice, D2 → D1 (Brno obejet po D1)"],
    ["~21:00", "Příjezd domů"]
  ], alt: "Počítejte s kolonami (svátek Všech svatých). Brněnské tunely jsou pořád zavřené, nejezděte přes město. Při únavě můžete přespat na cestě (Štýrský Hradec)."}
];

// Rozpočet v EUR (odhady, pokud není uvedeno jinak). Hotel je zaplacený, v rozpočtu není.
const BUDGET = [
  { g: "Cesta" },
  { label: "Palivo: tam i zpět (~850 km × 2, 1,5–1,7 €/l)", eur: 280, est: true },
  { label: "Dálniční známka Rakousko (10 dní)", eur: 12.8 },
  { label: "E-vinjeta Slovinsko (7 dní)", eur: 16 },
  { label: "Mýtné Chorvatsko (tam i zpět)", eur: 16, est: true },
  { label: "Nocleh po cestě zpět (volitelně)", eur: 100, est: true, opt: true },
  { g: "Atrakce a aktivity" },
  { label: "Turistická taxa (2 dospělí, ~2 € / noc × 5; neověřeno)", eur: 20, est: true },
  { label: "Brijuni (loď + exkurze, 2 dosp. + 2 děti)", eur: 80, est: true },
  { label: "Půjčení kol: 2 dospělí, 1 den (15–25 € / kolo; děti neověřeno)", eur: 40, est: true, opt: true },
  { label: "Pazin: hrad a muzeum (déšť, volitelně)", eur: 18, opt: true, est: true },
  { label: "Baredine (volitelně)", eur: 48, opt: true, est: true },
  { g: "Víno, olivy, jídlo" },
  { label: "Degustace vína (Matošević, 2 dospělí)", eur: 60, est: true },
  { label: "Olivový olej, lanýže, trh (nákup)", eur: 100, est: true },
  { label: "Hledání lanýžů se psy (volitelně)", eur: 90, opt: true, est: true },
  { label: "Jídlo 5 dní (restaurace + občerstvení, 4 osoby)", eur: 400, est: true }
];
