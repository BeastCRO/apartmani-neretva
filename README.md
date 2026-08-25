# Apartmani Neretva — demo landing / booking predložak

Brz, moderan landing/booking template za smještajni objekt (hotel, apartman, konoba), izrađen kao **portfolio primjer** za pitchanje lokalnim smještajnim objektima u Metkoviću i okolici. Sav sadržaj i brend ("Apartmani Neretva") su fiktivni — svrha je pokazati razliku u brzini, konverziji i SEO postavkama u odnosu na tipična postojeća rješenja na tržištu.

**Live demo:** *(dodaj link nakon deploya na Netlify/GitHub Pages)*

## Zašto ovaj predložak

- **Brzina** — cilj je Google PageSpeed 90+ na mobitelu. Bez frameworka, bez teških animacijskih/JS biblioteka, bez eksternih fontova.
- **Konverzija** — jasan poziv na akciju od hero sekcije, booking forma s validacijom i potvrdom, cjenik bez skrivenih troškova.
- **Mobile-first** — dizajn i layout rade se prvo za mobitel jer većina gostiju pretražuje smještaj s telefona.
- **SEO od starta** — semantički HTML, meta/OG tagovi, `LodgingBusiness` schema.org markup, `sitemap.xml` i `robots.txt`.

## Stack

Čisti HTML/CSS/JS (vanilla), bez ovisnosti i bez build koraka. Slike su unaprijed obrađene (WebP, više veličina za `srcset`) tako da se stranica može otvoriti i poslužiti bez ikakvog dodatnog alata.

## Struktura projekta

```
index.html          glavna stranica (sve sekcije)
css/style.css        stilovi, mobile-first, CSS varijable za temu
js/main.js            mobilni izbornik, lightbox za galeriju, validacija i slanje booking forme
images/               WebP slike (2 veličine po slici radi responsive srcset-a) + og-image.jpg
favicon.svg           favicon
robots.txt, sitemap.xml   osnovni SEO fajlovi
_devserver.ps1        minimalni lokalni server za pregled (vidi ispod)
```

## Sekcije stranice

1. Hero — naslov, kratki opis, CTA ("Provjeri dostupnost")
2. Galerija apartmana/soba (lagana, bez teškog lightbox JS-a)
3. Pogodnosti (inline SVG ikone, bez ikonskog fonta)
4. Cjenik po sezonama
5. Booking forma (dolazak/odlazak, broj gostiju, kontakt) — s validacijom i `mailto:` slanjem upita
6. Lokacija (Google Maps embed, lazy-loaded)
7. Kontakt footer (telefon, email, adresa, social linkovi)

## Pokretanje lokalno

Stranica je statična pa je najjednostavnije samo otvoriti `index.html` u browseru. Ako trebaš da radi kao da je poslužena s pravog servera (npr. zbog relativnih putanja ili testiranja), a nemaš Python/Node instaliran, u repou postoji `_devserver.ps1` — minimalni statični server napisan u PowerShellu (koristi ugrađeni `.NET HttpListener`, ništa se ne instalira):

```powershell
powershell -ExecutionPolicy Bypass -File .\_devserver.ps1
```

Zatim otvori `http://localhost:8791/`.

## Booking forma — kako radi

Forma validira unos na frontendu (obavezna polja, datumi, format emaila) i pri submitu gradi `mailto:` link s podacima upita te otvara korisnikov email klijent, uz poruku o uspjehu. Ovo je namjerno pojednostavljeno rješenje za demo — za produkciju treba zamijeniti stvarnim backend endpointom (npr. Formspree, Netlify Forms ili vlastiti API) u `js/main.js`.

## Prije stvarnog deploya za klijenta

- Zamijeniti placeholder domenu, telefon, email i adresu (meta tagovi, `schema.org` JSON-LD, footer)
- Zamijeniti Unsplash placeholder fotografije stvarnim fotografijama objekta
- Spojiti booking formu na pravi email/backend endpoint
- Postaviti pravu Google Maps lokaciju (trenutno generički centrirano na Metković)
- Pokrenuti Google PageSpeed Insights i Mobile-Friendly Test na live URL-u

## Namjerno izostavljeno (radi performansi)

- Bez parallax efekata
- Bez auto-play videa/glazbe u pozadini
- Bez teških animacijskih biblioteka i ikonskih fontova
- Bez interaktivnog map widgeta (samo lightweight embed)

## Sadržaj i slike

Sav tekstualni sadržaj i naziv objekta su fiktivni, izrađeni isključivo za portfolio/demo svrhe. Fotografije su preuzete s [Unsplash](https://unsplash.com) kao placeholder i nisu vlasništvo stvarnog objekta.
