import { siteConfig } from "@/site.config";
import { Reveal } from "@/components/ui/Reveal";

export function TrustBar() {
  const stats = [
    { value: siteConfig.stats.invitations, label: siteConfig.stats.invitationsLabel },
    { value: siteConfig.stats.designs, label: siteConfig.stats.designsLabel },
    { value: siteConfig.stats.speed, label: siteConfig.stats.speedLabel },
  ];

  return (
    <section className="border-b border-black/5 bg-white">
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-3 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-heading text-2xl sm:text-3xl text-accent">{s.value}</div>
              <div className="text-xs sm:text-sm text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
