import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Sprout, Tractor, Store, ShoppingCart, ChevronRight, Leaf, Shield, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import farmHero from "@/assets/farm-hero.jpg";
import techScan from "@/assets/tech-scan.jpg";
import sunriseField from "@/assets/sunrise-field.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const slides = [
    {
      id: "benefits",
      badge: t("landing.farmers"),
      title: t("landing.empoweringFarmers"),
      image: farmHero,
      points: [
        { icon: Shield, text: t("landing.tamperProof") },
        { icon: TrendingUp, text: t("landing.directMarket") },
        { icon: Star, text: t("landing.reputation") },
      ],
    },
    {
      id: "technology",
      badge: t("landing.technology"),
      title: t("landing.simpleTech"),
      image: techScan,
      roles: [
        { icon: Tractor, role: t("landing.farmer"), color: "bg-producer/20 text-producer", steps: [t("landing.createBatch"), t("landing.getQRCode"), t("landing.trackEarnings")] },
        { icon: Store, role: t("landing.retailer"), color: "bg-retailer/20 text-retailer", steps: [t("landing.scanQR"), t("landing.logCosts"), t("landing.passForward")] },
        { icon: ShoppingCart, role: t("landing.consumer"), color: "bg-consumer/20 text-consumer", steps: [t("landing.scanProduct"), t("landing.seeJourney"), t("landing.rateQuality")] },
      ],
    },
    {
      id: "quote",
      badge: t("landing.vision"),
      title: "",
      image: sunriseField,
      quote: t("landing.quote"),
      attribution: t("landing.attribution"),
    },
  ];

  const goTo = useCallback((idx: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(idx);
      setFade(true);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden">
      {/* Background blurred images */}
      <img src={farmHero} alt="" className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full object-cover opacity-10 blur-3xl" />
      <img src={techScan} alt="" className="pointer-events-none absolute top-1/3 -right-16 h-72 w-72 rounded-full object-cover opacity-[0.08] blur-3xl" />
      <img src={sunriseField} alt="" className="pointer-events-none absolute -bottom-16 left-1/4 h-72 w-72 rounded-full object-cover opacity-[0.08] blur-3xl" />
      {/* Decorative color orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-24 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-consumer/10 blur-3xl" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Sprout className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">{t("common.appName")}</span>
        </div>
      </header>

      {/* Hero area */}
      <div className="relative z-10 flex flex-1 flex-col items-center px-5 py-4">
        {/* Tagline */}
        <div className="mb-4 flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 backdrop-blur-sm">
          <Leaf className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">{t("common.tagline")}</span>
        </div>

        {/* Slide content */}
        <div
          className={`flex w-full max-w-md flex-col items-center transition-all duration-300 ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {/* Slide image */}
          <div className="relative mb-4 w-full overflow-hidden rounded-2xl">
            <img
              src={slide.image}
              alt={slide.badge}
              className="h-44 w-full object-cover"
              width={800}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
              {slide.badge}
            </span>
          </div>

          {slide.id === "benefits" && (
            <>
              <h2 className="mb-4 text-center text-xl font-bold leading-tight text-foreground">
                {slide.title}
              </h2>
              <div className="flex w-full flex-col gap-2.5">
                {slide.points!.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card/70 p-3.5 backdrop-blur-sm">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <p.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm leading-snug text-foreground">{p.text}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {slide.id === "technology" && (
            <>
              <h2 className="mb-4 text-center text-xl font-bold leading-tight text-foreground">
                {slide.title}
              </h2>
              <div className="flex w-full flex-col gap-2.5">
                {slide.roles!.map((r, i) => (
                  <div key={i} className="rounded-xl border border-border bg-card/70 p-3.5 backdrop-blur-sm">
                    <div className="mb-1.5 flex items-center gap-2">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${r.color}`}>
                        <r.icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{r.role}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      {r.steps.map((s, j) => (
                        <span key={j} className="flex items-center gap-1">
                          {j > 0 && <ChevronRight className="h-3 w-3 text-border" />}
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {slide.id === "quote" && (
            <div className="flex flex-col items-center py-4">
              <p className="mb-3 text-center text-lg font-semibold italic leading-relaxed text-foreground">
                {slide.quote}
              </p>
              <span className="text-sm font-medium text-primary">{slide.attribution}</span>
            </div>
          )}
        </div>

        {/* Dots */}
        <div className="mt-6 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 px-5 pb-6">
        <Button
          className="w-full rounded-2xl py-6 text-base font-semibold"
          onClick={() => navigate("/role-select")}
        >
          {t("landing.getStarted")} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
