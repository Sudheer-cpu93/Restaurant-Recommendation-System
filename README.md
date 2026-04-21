# 🍽 RestroAI — AI-Powered Smart Food & Restaurant Recommendation System

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)
![No API Key](https://img.shields.io/badge/API_Key-Not_Required-orange?style=flat)

> A fully functional, real-time food and restaurant recommendation web app built with React + Vite. Personalized recommendations, live weather context, review sentiment analysis, and nutritional lookup — all with **zero paid APIs and zero backend**.

---

## 📸 Screenshots

| Onboarding | Recommendations | Restaurant Detail |
|---|---|---|
| ![Onboarding](./screenshots/onboarding.png) | ![Recommendations](./screenshots/recommendations.png) | ![Detail](./screenshots/detail.png) |

| Review Analyzer | Nutrition Lookup | Explorer |
|---|---|---|
| ![Reviews](./screenshots/reviews.png) | ![Nutrition](./screenshots/nutrition.png) | ![Explorer](./screenshots/explorer.png) |

---

## ✨ Features

- **🎯 Smart Personalization** — Onboarding collects diet, health goal, budget, spice level, and favourite categories to power all recommendations
- **🏨 Restaurant Recommendations** — Scored by a multi-factor JS algorithm across 5 weighted dimensions
- **🌤 Real-Time Context** — Live weather (Open-Meteo) and time-of-day signals influence every recommendation
- **📋 Restaurant Detail & Menu** — Click any restaurant to browse its dishes with real images from TheMealDB
- **⭐ Star Reviews** — Submit 1–5 star ratings with textual reviews; aggregations update live
- **🔍 Review Sentiment Analyzer** — Keyword-based NLP detects Genuine / Suspicious / Fake reviews with a trust score
- **🥗 Nutrition Lookup** — Real macronutrient data from USDA FoodData Central with local fallback
- **💡 Why This?** — Every recommendation includes a transparent, human-readable explanation
- **🚫 Zero Cold-Start** — New users get quality recommendations immediately through onboarding

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.x | Component-based UI framework |
| Vite | 5.x | Build tool with HMR |
| Tailwind CSS | 4.x | Utility-first styling |
| TheMealDB API | Free | Real dish names, images, categories |
| USDA FoodData API | Free (DEMO_KEY) | Nutritional information |
| Open-Meteo API | Free | Live weather data |
| localStorage | Browser | Profile & review persistence |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/restro-ai.git

# 2. Navigate into the project
cd restro-ai

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

> No `.env` file needed. No API keys. Just install and run.

---

## 📁 Project Structure

```
restro-ai/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Live context bar (city, time, weather)
│   │   ├── Onboarding.jsx          # First-visit profile setup modal
│   │   ├── RestaurantListing.jsx   # Grid of restaurant cards
│   │   ├── RestaurantCard.jsx      # Single restaurant card
│   │   ├── RestaurantDetail.jsx    # Detail page with menu + reviews
│   │   ├── MenuItemCard.jsx        # Individual dish card
│   │   ├── ReviewSection.jsx       # Rating summary + review list
│   │   ├── AddReviewForm.jsx       # Star rating + text review form
│   │   ├── NutritionModal.jsx      # Macronutrient popup
│   │   ├── ReviewAnalyzer.jsx      # Sentiment analysis tab
│   │   ├── ContextExplorer.jsx     # Weather + mealtime + profile tab
│   │   ├── NutritionLookup.jsx     # Nutrition search tab
│   │   └── SkeletonCard.jsx        # Loading placeholder
│   ├── utils/
│   │   ├── recommender.js          # Multi-factor scoring algorithm
│   │   ├── restaurantBuilder.js    # Build restaurant objects from API data
│   │   ├── reviewAnalyzer.js       # Keyword NLP sentiment engine
│   │   ├── mealtime.js             # Detect meal period from clock
│   │   └── weatherHelper.js        # Weather code → condition string
│   ├── hooks/
│   │   ├── useWeather.js           # Fetch weather by city name
│   │   └── useMeals.js             # Fetch from TheMealDB
│   ├── App.jsx                     # Root component, global state
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Tailwind base imports
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🔌 APIs Used

All APIs are **completely free** with **no authentication required**.

| API | Used For | Docs |
|---|---|---|
| [TheMealDB](https://www.themealdb.com/api.php) | Dish names, images, categories | [Link](https://www.themealdb.com/api.php) |
| [USDA FoodData Central](https://fdc.nal.usda.gov) | Nutritional data (DEMO_KEY) | [Link](https://fdc.nal.usda.gov/api-guide.html) |
| [Open-Meteo](https://open-meteo.com) | Live weather by city | [Link](https://open-meteo.com/en/docs) |
| Open-Meteo Geocoding | City name → lat/lon | [Link](https://open-meteo.com/en/docs/geocoding-api) |

---

## 🧠 How the Recommendation Algorithm Works

Each restaurant is scored across 5 factors:

```
Score = Category Preference (30pts)
      + Dietary Compatibility (25pts)
      + Weather Context Match (20pts)
      + Mealtime Suitability (15pts)
      + Health Goal Alignment (10pts)
```

Top 6 restaurants by score are displayed. The score breakdown is used to generate the **"Why This?"** explanation for every card.

**Weather logic example:**
- Temperature < 15°C → Beef, Lamb, Pasta, Chicken get +20 bonus (warm comfort food)
- Temperature > 30°C → Seafood, Starter, Vegetarian get +20 bonus (light, cooling)

---

## 🔍 Review Sentiment Analysis

The analyzer uses a **keyword-based NLP engine** (no external API):

- **25 positive keywords** — great, delicious, authentic, fresh, recommend...
- **24 negative keywords** — terrible, overpriced, bland, disappointing...
- **6 fake-review patterns** — excessive caps, repeated exclamations, superlative overuse...

**Trust score formula:**
```
TrustScore = 50 + (positiveCount × 5) − (negativeCount × 8) − (fakeSignals × 15)
             [clamped to 0–100]
```

Verdict thresholds:
- ≥ 2 fake signals → **Likely Fake** (red)
- 1 fake signal → **Suspicious** (yellow)
- 0 fake signals → **Genuine** (green)

---

## 🥗 Nutrition Lookup

Two-tier data strategy for maximum coverage:

1. **Primary** — USDA FoodData Central API (`DEMO_KEY`, 30 req/hour)
2. **Fallback** — Built-in local database of 30 common dishes (pizza, biryani, paneer, dal makhani, etc.)

Displays: Calories, Protein, Carbohydrates, Fat, Fiber as colored progress bars with an auto-generated health tip.

---

## ⚙️ Available Scripts

```bash
npm run dev        # Start development server (localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary color | `#F97316` (orange) |
| Background | `#0F172A` (dark navy) |
| Card surface | `#1E293B` (slate) |
| Accent | `#22D3EE` (cyan) |
| Success | `#22C55E` (green) |
| Warning | `#EAB308` (yellow) |
| Danger | `#EF4444` (red) |
| Font | System font stack |
| Grid | 1 col → 2 col → 3 col (responsive) |

---

## 🗺 Roadmap

- [ ] Integration with real restaurant database (Google Places / Yelp Fusion)
- [ ] BERT-based transformer sentiment analysis via ONNX Runtime Web
- [ ] Voice search using Web Speech API
- [ ] AR menu visualization using WebXR + Three.js
- [ ] Health tracking integration (wearable device APIs)
- [ ] Multi-user support with collaborative filtering
- [ ] Progressive Web App (PWA) with offline support

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

Please follow the existing code style and add comments for complex logic.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Sudheer**
- GitHub: https://github.com/Sudheer-cpu93
- LinkedIn: https://www.linkedin.com/in/sudheer993/

---

## 🙏 Acknowledgements

- [TheMealDB](https://www.themealdb.com) — Free meal database API
- [USDA FoodData Central](https://fdc.nal.usda.gov) — Public nutritional data
- [Open-Meteo](https://open-meteo.com) — Free open-source weather API
- [Lovely Professional University](https://www.lpu.in) — Academic guidance

---

<p align="center">Made with ❤️ for CSE435 Seminar Project — LPU Punjab</p>
