# logs.rent

Digitale marktplaats en beurs voor de verhuur en verkoop van online accounts. De interface combineert een catalogus, realtime handelsweergave, orderboek, escrow-betalingen en hulpmiddelen voor waardering en beheer.

## Functionaliteiten

- **Beurs:** bekijk vraag- en aanbodprijzen, het orderboek en recente transacties.
- **Catalogus:** doorzoek accountaanbiedingen en open een uitgebreide detailweergave.
- **Handelen:** koop, huur of plaats een bod met een ingestelde prijs en huurperiode.
- **Escrow en wallet:** volg saldo, borg, transacties en uitgekeerde huurinkomsten.
- **Portfolio:** beheer actieve posities en bekijk de waarde en opbrengsten.
- **Waardering:** gebruik de waarderingstool om aanbiedingen te beoordelen.
- **Investbotiq:** bekijk de Investbotiq-integratie en geautomatiseerde handelsinformatie.
- **Overdracht:** doorloop de wizard voor een veilige overdracht van een account.
- **Geschillen:** registreer en volg geschillen rond transacties.
- **Privacy en documentatie:** lees de anonimiteitsgids, FAQ en API-portaalinformatie.
- **Accountbeheer:** open de authenticatie- en profielmodaliteiten vanuit de applicatie.

De huidige versie gebruikt lokale mockdata om de interface en handelsflows te demonstreren.

## Tech stack

- React 19 met TypeScript
- Vite
- Tailwind CSS 4 via de Vite-plugin
- Chart.js voor grafieken
- Lucide React voor iconen
- Motion voor animaties
- Bun-lockfile voor reproduceerbare dependency-installatie

## Lokaal starten

### Vereisten

- Node.js 18 of nieuwer
- npm of Bun

### Installeren en uitvoeren

```bash
npm install
npm run dev
```

Open daarna [http://localhost:3000](http://localhost:3000).

Voor een productie-build:

```bash
npm run build
npm run preview
```

## Scripts

| Script | Beschrijving |
| --- | --- |
| `npm run dev` | Start de Vite-ontwikkelserver op poort 3000. |
| `npm run build` | Bouwt de productieversie van de applicatie. |
| `npm run preview` | Serveert de productie-build lokaal. |
| `npm run lint` | Controleert de TypeScript-types zonder bestanden te wijzigen. |
| `npm run clean` | Verwijdert lokale build-output en `server.js`. |

## Projectstructuur

```text
.
├── src/
│   ├── components/       # Herbruikbare modals, grafieken en merkcomponenten
│   │   └── tabs/         # Applicatieschermen per hoofdonderdeel
│   ├── data/              # Lokale demonstratiegegevens
│   ├── App.tsx            # Hoofdscherm en globale interactiestate
│   ├── index.css          # Globale styling
│   ├── main.tsx           # React-entrypoint
│   └── types.ts           # Domeintypen voor listings en transacties
├── index.html              # HTML-entrypoint
├── vite.config.ts          # Vite- en Tailwind-configuratie
├── package.json            # Scripts en dependencies
└── .env.example            # Voorbeeld van lokale configuratie
```
