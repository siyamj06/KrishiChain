import { useNavigate } from "react-router-dom";
import { Tractor, Store, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const RoleSelect = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const roles = [
    {
      id: "producer",
      label: t("roleSelect.producer"),
      description: t("roleSelect.producerDesc"),
      icon: Tractor,
      color: "bg-producer text-producer-foreground",
      path: "/producer",
    },
    {
      id: "retailer",
      label: t("roleSelect.retailer"),
      description: t("roleSelect.retailerDesc"),
      icon: Store,
      color: "bg-retailer text-retailer-foreground",
      path: "/retailer",
    },
    {
      id: "consumer",
      label: t("roleSelect.consumer"),
      description: t("roleSelect.consumerDesc"),
      icon: ShoppingCart,
      color: "bg-consumer text-consumer-foreground",
      path: "/consumer",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <h1 className="mb-2 text-3xl font-bold text-foreground">{t("roleSelect.chooseRole")}</h1>
      <p className="mb-10 text-muted-foreground">{t("roleSelect.selectParticipation")}</p>

      <div className="flex w-full max-w-3xl flex-col gap-4 md:flex-row">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => navigate(role.path)}
            className="group flex flex-1 flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:border-primary"
          >
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${role.color} transition-transform group-hover:scale-110`}>
              <role.icon className="h-8 w-8" />
            </div>
            <span className="text-xl font-bold text-foreground">{role.label}</span>
            <span className="text-sm text-center text-muted-foreground">{role.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelect;
