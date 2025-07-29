import type { LanguageWithoutProgress, LanguageWithProgress } from "@/app/types/LanguageCard.type.";

export const languages = [
  { name: "Английский", flag: "🇬🇧" },
  { name: "Испанский", flag: "🇪🇸" },
  { name: "Французский", flag: "🇫🇷" },
  { name: "Немецкий", flag: "🇩🇪" },
  { name: "Японский", flag: "🇯🇵" },
  { name: "Китайский", flag: "🇨🇳" },
  { name: "Итальянский", flag: "🇮🇹" },
  { name: "Корейский", flag: "🇰🇷" },
  { name: "Португальский", flag: "🇵🇹" },
  { name: "Арабский", flag: "🇸🇦" },
];

  export const learningLanguages: LanguageWithProgress[] = [
    { name: "Испанский", flag: "🇪🇸", progress: 45 },
    { name: "Японский", flag: "🇯🇵", progress: 28 },
  ];

 export const newLanguages: LanguageWithoutProgress[] = [
    { name: "Французский", flag: "🇫🇷" },
    { name: "Немецкий", flag: "🇩🇪" },
    { name: "Итальянский", flag: "🇮🇹" },
  ];