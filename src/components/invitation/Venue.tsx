import { MapPin } from "lucide-react";
import type { Theme, VenueInfo } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

export function Venue({
  theme,
  title,
  venue,
  gisLabel,
  gmapsLabel,
}: {
  theme: Theme;
  title: string;
  venue: VenueInfo;
  gisLabel: string;
  gmapsLabel: string;
}) {
  return (
    <Reveal>
      <section className="px-6 py-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: theme.colors.accent }}>
          {title}
        </p>
        <div className="mt-4 flex flex-col items-center gap-1">
          <MapPin size={20} style={{ color: theme.colors.accent }} aria-hidden="true" />
          <p className="text-base font-medium" style={{ color: theme.colors.text }}>
            {venue.name}
          </p>
          <p className="text-sm" style={{ color: theme.colors.muted }}>
            {venue.address}
          </p>
        </div>
        <div className="mt-5 flex justify-center gap-3">
          {venue.gis2Url && (
            <a
              href={venue.gis2Url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 flex items-center rounded-full px-5 text-sm font-medium"
              style={{ background: theme.colors.accent, color: "#fff" }}
            >
              {gisLabel}
            </a>
          )}
          {venue.googleUrl && (
            <a
              href={venue.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 flex items-center rounded-full px-5 text-sm font-medium border"
              style={{ borderColor: theme.colors.accent, color: theme.colors.accent }}
            >
              {gmapsLabel}
            </a>
          )}
        </div>
      </section>
    </Reveal>
  );
}
