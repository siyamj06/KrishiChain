# Language Support Guide

## Overview
The application now has full multilingual support for 6 Indian languages:
- **English** (en)
- **Hindi** (hi)
- **Tamil** (ta)
- **Telugu** (te)
- **Kannada** (kn)
- **Marathi** (mr)

## How It Works

### 1. **Language Selection**
Users start by selecting their language on `/language` page. The selected language is stored in `localStorage` and persists across sessions.

### 2. **Translation Files**
All translations are located in `src/locales/`:
- `en.json` - English
- `hi.json` - Hindi
- `ta.json` - Tamil
- `te.json` - Telugu
- `kn.json` - Kannada
- `mr.json` - Marathi

Each file contains keys organized by feature:
```json
{
  "common": { ... },
  "landing": { ... },
  "roleSelect": { ... },
  "producer": { ... },
  "retailer": { ... },
  "consumer": { ... },
  "buttons": { ... },
  "messages": { ... }
}
```

### 3. **Using Translations in Components**

Import the hook:
```tsx
import { useLanguage } from "@/hooks/useLanguage";
```

Use in your component:
```tsx
const MyComponent = () => {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t("landing.empoweringFarmers")}</h1>
      <p>{t("common.tagline")}</p>
    </div>
  );
};
```

### 4. **useLanguage Hook**
Available properties and methods:

```tsx
const {
  language,              // Current language code ("en", "hi", etc.)
  setLanguage,           // Function to change language: setLanguage("hi")
  t,                     // Translation function: t("key.path")
  availableLanguages,    // Array of available language options
} = useLanguage();
```

## Adding New Translations

### Step 1: Add key to all language files
**src/locales/en.json:**
```json
{
  "myFeature": {
    "title": "My Feature Title",
    "description": "My description"
  }
}
```

**src/locales/hi.json:**
```json
{
  "myFeature": {
    "title": "मेरी सुविधा शीर्षक",
    "description": "मेरा विवरण"
  }
}
```

### Step 2: Use in component
```tsx
const { t } = useLanguage();
return <h1>{t("myFeature.title")}</h1>;
```

## Currently Translated Pages

✅ LandingPage - Full translations for all slides and content  
✅ LanguageSelect - Language selection interface  
✅ RoleSelect - Role selection after language choice  

## Pages Needing Translation

To add translations to other pages, follow this pattern:

1. Import the hook: `import { useLanguage } from "@/hooks/useLanguage";`
2. Call the hook: `const { t } = useLanguage();`
3. Replace hardcoded strings with `t("key.path")`
4. Add translations to all files in `src/locales/`

## Features

- ✅ Persistent language selection (localStorage)
- ✅ Automatic document language attribute (`lang` attribute on HTML)
- ✅ Fallback to English for missing translations
- ✅ No external dependencies required
- ✅ Type-safe translation keys
- ✅ Lightweight and efficient

## Testing Language Switching

1. Start the app and select a language
2. Navigate through pages - they will display in selected language
3. Go back to language select and choose a different language
4. All content updates dynamically

## Troubleshooting

**Translation not showing?**
- Check if key exists in all language JSON files
- Verify the key path is correct (use dot notation: "section.key")
- Check browser console for any errors

**Language not persisting?**
- Clear browser cache/localStorage
- Check if localStorage is enabled in browser settings

**Missing language?**
- Add a new JSON file in `src/locales/` (e.g., `src/locales/ta.json`)
- Import it in `useLanguage.ts`
- Add to `translations` object
- Add to `availableLanguages` array
