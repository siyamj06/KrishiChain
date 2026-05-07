import { useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const LanguageSelect = () => {
  const navigate = useNavigate();
  const { setLanguage, availableLanguages, t } = useLanguage();

  const handleSelect = (code: string) => {
    setLanguage(code as any);
    navigate("/landing");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
          <Globe className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">{t("common.appName")}</h1>
        <p className="text-muted-foreground">{t("common.tagline")}</p>
      </div>

      <div className="grid w-full max-w-md grid-cols-2 gap-3">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
          >
            <span className="text-lg font-semibold text-foreground">{lang.native}</span>
            <span className="text-sm text-muted-foreground">{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
