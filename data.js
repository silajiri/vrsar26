// Data: místa, itinerář, rozpočet. "verify" = údaj, který není ověřen u oficiálního zdroje.
const EUR = 24.325; // Kč za 1 EUR (ČNB 16. 10. 2026)

const HOTEL = { name: "Maistra Resort Belvedere", addr: "Pineta 4, 52450 Vrsar", lat: 45.1478, lng: 13.6075, phone: "+385 52 800 250", mail: "hello@maistra.hr" };

const PLACES = [
  {
    id: "pula", name: "Pula: Aréna a Zerostrasse", day: "Čt 29. 10.",
    desc: "Římský amfiteátr, kde děti můžou běhat po aréně a hrát si na gladiátory. Vedle toho podzemní tunely Zerostrasse (rovný terén, ideální s kočárkem nebo za deště).",
    addr: "Flavijevska, 52100 Pula", lat: 44.8730, lng: 13.8467,
    from: "~55 km, 50 min", hours: "Aréna: listopad 9–17, říjen 9–19 (rok 2026 nepotvrzen) · Zerostrasse 9–17",
    price: "Aréna: dospělí 10 €, děti 5 €, do 5 let zdarma · Zerostrasse: dospělí ~7 €, děti 5–16 let 3 €",
    duration: "2–3 h", web: "https://pulainfo.hr/where/arena-amphitheater/", status: "ok", verify: true,
    kid: "Částečně schody a dlažba, lepší nosítko.",
    photos: ["f/ff/Anfiteatro_de_Pula%2C_Croacia%2C_2017-04-17%2C_DD_13-18_HDR_PAN.jpg", "a/aa/Pula_Zerostrasse.jpg"]
  },
  {
    id: "verudela", name: "Akvárium Pula (pevnost Verudela)", day: "Čt 29. 10. odpoledne / déšť",
    desc: "Akvárium v rakousko-uherské pevnosti nad mořem. Hodí se jako záloha na déšť nebo odpoledne po Aréně.",
    addr: "Verudella 33, 52100 Pula", lat: 44.8420, lng: 13.8330,
    from: "~60 km, 55 min", hours: "Listopad 10–18 (poslední vstup 16:30), říjen 9–19",
    price: "Dospělí 25 €, děti 3–6 let 16 €, 7–18 let 20 €, do 3 let zdarma",
    duration: "1–1,5 h", web: "https://aquarium.hr/en/working-hours", status: "ok",
    kid: "Jen částečně vhodné pro kočárek (schody).", photos: []
  },
  {
    id: "brijuni", name: "Brijuni (Veliký Brijun)", day: "Alternativa na Pá 30. 10.",
    desc: "Národní park na ostrovech: 15 minut lodí z Fažany, vláček, safari park (zebry, sloni) a stopy dinosaurů. Prohlídky jsou v chorvatštině.",
    addr: "Brionska 10, 52212 Fažana", lat: 44.9270, lng: 13.8000,
    from: "~50 km, 45 min", hours: "Open Days 23. 10. – 1. 11. 2026. Lodě z Fažany v listopadu 9:00 a 11:30, zpět 7:15, 11:00, 13:00, 15:00 (zdroje se rozcházejí)",
    price: "Exkurze: dospělí 17 €, děti 7–18 let 12 €, do 7 let zdarma · lístky na shop.np-brijuni.hr",
    duration: "4–5 h", web: "https://np-brijuni.hr/en/open-days-2026", status: "warn", verify: true,
    kid: "Rovné cesty, vláček, vhodné pro kočárek.",
    photos: ["0/02/Brijuni_-_zebra.jpg"]
  },
  {
    id: "porec", name: "Poreč: Eufraziova bazilika a Decumanus", day: "Pá 30. 10. dopoledne",
    desc: "Raně byzantská bazilika s mozaikami (UNESCO) a římská hlavní ulice ve starém městě. Trh na Mlinské ulici je pro milovníky jídla (sýry, olivy, pršut).",
    addr: "Eufrazijeva 22, 52440 Poreč", lat: 45.2275, lng: 13.5950,
    from: "~10 km, 12 min", hours: "Bazilika: Po–Pá 9–16, So 9–14, v neděli a o svátcích zavřeno · trh denně 6–14, 1. 11. zavřeno",
    price: "Bazilika: dospělí 10 €, školní děti 5 €, předškoláci zdarma · trh zdarma",
    duration: "1–2 h", web: "https://www.istra.hr/en/experience/culture/museums-and-collections/euphrasian-basilica-unesco-heritage", status: "ok",
    kid: "Ve městě vhodné pro kočárek, uvnitř schůdky.",
    photos: ["d/d4/Croatia_Porec_Euphrasius_Basilika_BW_2014-10-08_11-13-28.jpg"]
  },
  {
    id: "limfjord", name: "Limský kanál (Limski kanal)", day: "St 28. 10. cestou do Vrsaru",
    desc: "Úzký mořský záliv zaříznutý hluboko do vnitrozemí, známý mušlemi a ústřicemi. Cestou z Pazinu na vyhlídce stačí krátká zastávka s dětmi.",
    addr: "Limska draga, 52440 Vrsar / Kanfanar", lat: 45.1330, lng: 13.7280,
    from: "~15 km, 15 min", hours: "Vyhlídka volně přístupná · restaurace v listopadu často zavřené (ověřit)",
    price: "Vyhlídka zdarma · pirátské lodě z Vrsaru jsou pro malé děti dlouhé (4,5–5 h)",
    duration: "30–60 min", web: "https://www.istra.hr/en/", status: "ok", verify: true,
    kid: "Na vyhlídce ano.",
    photos: ["d/da/Limski_Kanal_view.jpg"]
  },
  {
    id: "rovinj", name: "Rovinj a park Punta Corrente", day: "Volitelně, kdykoli",
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
    id: "chiavalon", name: "Chiavalon: olivový olej (Vodnjan)", day: "Čt 29. 10. cestou z Puly",
    desc: "Jeden z nejlepších producentů extra panenského olivového oleje v Istrii. Bezplatná ochutnávka v mlýně, nebo placená prohlídka statku se čtyřmi oleji.",
    addr: "Vodnjan (Peroj–Vodnjan)", lat: 44.9604, lng: 13.8546,
    from: "~45 km, 45 min", hours: "Neověřeno, rezervovat", price: "Ochutnávka zdarma / placená prohlídka (cena neověřena)",
    duration: "1 h", web: "https://istra.hr/en/gourmet/evoo/producers/chiavalon", status: "ok", verify: true,
    kid: "Parkování zdarma.", photos: []
  },
  {
    id: "olivegrove", name: "Rodinná prohlídka olivového háje (Poreč)", day: "Pá 30. 10. nebo kdykoli",
    desc: "Rodinná farma s degustací oleje. Pro děti je tam fotbalové hřiště, přátelský pes a velká zahrada. Sezóna sklizně a nového oleje je právě teď.",
    addr: "okolí Poreče", lat: 45.2300, lng: 13.6100,
    from: "~15 km", hours: "Rezervace přes Musement", price: "Viz odkaz",
    duration: "1,5–2 h", web: "https://esaexperience.musement.com/uk/porec/authentic-istrian-olive-oil-grove-guided-visit-including-tastings-378616", status: "ok", verify: true,
    kid: "Vhodné pro děti.", photos: []
  },
  {
    id: "vrsar", name: "Vrsar: Kod Luce a Trost", day: "Večeře po příjezdu / kterýkoli den",
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
  { date: "Úterý 27. 10.", title: "Odjezd a nocleh ve Štýrském Hradci / Mariboru", items: [
    ["13:00", "Odjezd z Lípy nad Orlicí. Vyhnout se Brnu: <strong>Pisárecký tunel a tunel Hlinky jsou od ~12. 10. do 20. 11. zavřené</strong>. Jet po D1 kolem Brna (ne přes VMO), pak D2 směr Mikulov"],
    ["~15:30", "Mikulov, hranice, A5/A6 směr Vídeň, obchvat (S1), A2 směr Štýrský Hradec"],
    ["16:15", "Západ slunce (po změně času 25. 10. je tma už kolem 17:00)"],
    ["~19:30", "Příjezd na nocleh: Štýrský Hradec (Graz), nebo Maribor (+1 h dál)"]
  ], alt: "Čistá jízda je 9–10 h. Z Lípy odjezd po obědě znamená příjezd do Vrsaru kolem půlnoci, s malými dětmi doporučujeme rozdělit cestu."},
  { date: "Středa 28. 10.", title: "Slovinsko a příjezd do Vrsaru", items: [
    ["09:00", "Snídaně, odjezd z Maribora (A1 → Lublaň → Postojna → Divača → Buzet)"],
    ["~11:30", "Pauza na oběd v Postojně / Divači, krátké protažení dětí"],
    ["~13:30", "Hranice Slovinsko/Chorvatsko (Schengen, doklady pro děti)"],
    ["~14:30", "Zastávka: Limský kanál (vyhlídka u Kanfanaru)"],
    ["~15:30", "Check-in v Belvederu, procházka po promenádě 300 m do Vrsaru"],
    ["18:30", "Večeře: Kod Luce nebo Trost (rezervovat)"]
  ], alt: "Slovinsko vyžaduje e-vinjetu (7 dní, 16 €), kupte ji předem na evinjeta.dars.si."},
  { date: "Čtvrtek 29. 10.", title: "Pula: gladiátoři a olej", items: [
    ["09:30", "Odjezd z Vrsaru (~50 min)"],
    ["10:30", "<strong>Aréna Pula</strong>: děti běhají po aréně"],
    ["12:00", "Oběd v Pule, nábřeží, Zlatna vrata, Augustův chrám"],
    ["13:30", "<strong>Zerostrasse</strong> (nebo Akvárium Verudela na déšť)"],
    ["15:30", "<strong>Chiavalon</strong> ve Vodnjanu: ochutnávka oleje"],
    ["17:30", "Zpět do Vrsaru"]
  ], alt: "Plán B pro déšť: Akvárium Pula, Zerostrasse, hotelový bazén (ověřit)."},
  { date: "Pátek 30. 10.", title: "Poreč a vinařství", items: [
    ["09:30", "Poreč: trh (6–14), Decumanus"],
    ["10:30", "<strong>Eufraziova bazilika</strong> (Po–Pá 9–16)"],
    ["12:30", "Oběd v Poreči"],
    ["14:30", "<strong>Matošević</strong> (Sv. Lovreč, degustace po domluvě), nebo olivový háj u Poreče s dětským hřištěm"],
    ["17:00", "Zpět do Vrsaru"]
  ], alt: "Alternativa celého dne: Brijuni (loď z Fažany ve 9:00, 4–5 h)."},
  { date: "Sobota 31. 10.", title: "Lanýžové dny v Livade a Motovun", items: [
    ["09:30", "Odjezd (~55 min)"],
    ["10:30", "<strong>Zigante Truffle Days</strong> v Livade: ukázky hledání lanýžů se psy, ochutnávky, nákup"],
    ["13:00", "Oběd v <strong>Konobě Mondo</strong> v Motovunu (rezervovat, v úterý zavřeno)"],
    ["15:00", "Procházka po hradbách Motovunu"],
    ["17:00", "Zpět do Vrsaru; nakoupit zásoby na cestu (zítra svátek, obchody zavřené)"]
  ]},
  { date: "Neděle 1. 11.", title: "Návrat domů (státní svátek)", items: [
    ["08:00", "Snídaně, check-out (portály uvádějí zavření hotelu až od 4. 11., ověřit)"],
    ["08:30", "Odjezd: Buzet → Lublaň → Maribor → Štýrský Hradec → Vídeň"],
    ["~12:30", "Oběd a pauza v Mariboru / Štýrském Hradci"],
    ["~18:30", "Vídeň, hranice, D2 → D1 (Brno obejet po D1)"],
    ["~21:00", "Příjezd domů"]
  ], alt: "Počítejte s kolonami (svátek Všech svatých). Brněnské tunely jsou pořád zavřené, nejezděte přes město. Můžete také přespat na cestě (Štýrský Hradec)."}
];

// Rozpočet v EUR (odhady, pokud není uvedeno jinak)
const BUDGET = [
  { g: "Cesta" },
  { label: "Palivo: tam i zpět (~850 km × 2, 1,5–1,7 €/l)", eur: 280, est: true },
  { label: "Dálniční známka Rakousko (10 dní)", eur: 12.8 },
  { label: "E-vinjeta Slovinsko (7 dní)", eur: 16 },
  { label: "Mýtné Chorvatsko (tam i zpět)", eur: 16, est: true },
  { label: "Nocleh po cestě tam (rodinný pokoj)", eur: 100, est: true },
  { label: "Nocleh po cestě zpět (volitelně)", eur: 100, est: true, opt: true },
  { g: "Ubytování" },
  { label: "Resort Belvedere (4 noci) – cenu zadejte z rezervace", input: "hotel", est: true },
  { label: "Turistická taxa (2 dospělí, ~2 € / noc, děti zdarma nebo sleva)", eur: 16, est: true },
  { g: "Atrakce" },
  { label: "Aréna Pula (2 dosp. + 2 děti)", eur: 30, est: true },
  { label: "Zerostrasse Pula", eur: 20, est: true },
  { label: "Akvárium Pula (volitelně)", eur: 80, opt: true, est: true },
  { label: "Eufraziova bazilika Poreč", eur: 20, est: true },
  { label: "Brijuni (volitelně, loď + exkurze)", eur: 80, opt: true, est: true },
  { label: "Baredine (volitelně)", eur: 48, opt: true, est: true },
  { g: "Víno, olivy, jídlo" },
  { label: "Degustace vína (Matošević, 2 dospělí)", eur: 60, est: true },
  { label: "Olivový olej a lanýže (nákup)", eur: 80, est: true },
  { label: "Hledání lanýžů se psy (volitelně)", eur: 90, opt: true, est: true },
  { label: "Jídlo 5 dní (restaurace + snídaně u cesty, 4 osoby)", eur: 400, est: true }
];
