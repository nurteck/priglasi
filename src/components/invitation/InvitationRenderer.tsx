"use client";

import { useMemo, useRef, useState } from "react";
import type { Invitation, Theme } from "@/types";
import { resolveText, inviteUi } from "@/lib/localize";
import { categoryLabels } from "@/content/categories";
import { Envelope } from "./Envelope";
import { Cover } from "./Cover";
import { LangSwitch } from "./LangSwitch";
import { MusicToggle } from "./MusicToggle";
import { Intro } from "./Intro";
import { Hosts } from "./Hosts";
import { CalendarBlock } from "./CalendarBlock";
import { Countdown } from "./Countdown";
import { Program } from "./Program";
import { Venue } from "./Venue";
import { Gallery } from "./Gallery";
import { DressCode } from "./DressCode";
import { Rsvp } from "./Rsvp";
import { Finale } from "./Finale";

export function InvitationRenderer({ invitation, theme }: { invitation: Invitation; theme: Theme }) {
  const [opened, setOpened] = useState(!invitation.blocks.envelope);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [singleLang, setSingleLang] = useState<"ky" | "ru">(invitation.lang === "ru" ? "ru" : "ky");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const t = inviteUi[singleLang];
  const date = useMemo(() => new Date(invitation.date), [invitation.date]);

  const namesLabel = [invitation.names.first, invitation.names.second].filter(Boolean).join(" & ");
  const dateLabel = new Intl.DateTimeFormat(singleLang === "ru" ? "ru-RU" : "ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const timeLabel = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(date);

  function handleOpen() {
    setOpened(true);
    if (invitation.music && audioRef.current) {
      audioRef.current.play().then(
        () => setMusicPlaying(true),
        () => setMusicPlaying(false)
      );
    }
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.play().then(
        () => setMusicPlaying(true),
        () => setMusicPlaying(false)
      );
    }
  }

  return (
    <div
      className="relative min-h-screen"
      style={{ background: theme.colors.bg, fontFamily: "var(--font-body), sans-serif" }}
    >
      {invitation.music && (
        <audio ref={audioRef} src={invitation.music} loop preload="none" className="hidden" />
      )}

      {invitation.lang === "ky-ru" && opened && (
        <LangSwitch active={singleLang} onChange={setSingleLang} />
      )}
      {invitation.music && opened && <MusicToggle playing={musicPlaying} onToggle={toggleMusic} />}

      {invitation.blocks.envelope && (
        <Envelope theme={theme} hint={t.openHint} opening={opened} onOpen={handleOpen} />
      )}

      {opened && (
        <div>
          <Cover
            theme={theme}
            photo={invitation.coverPhoto}
            names={namesLabel}
            dateLabel={dateLabel}
            scrollHint={t.scrollHint}
          />

          {invitation.blocks.intro && (
            <Intro theme={theme} text={resolveText(invitation.blocks.intro.text, invitation.lang, singleLang)} />
          )}

          {invitation.blocks.hosts && (
            <Hosts
              theme={theme}
              title={t.hostsTitle}
              names={invitation.blocks.hosts.names}
              text={
                invitation.blocks.hosts.text
                  ? resolveText(invitation.blocks.hosts.text, invitation.lang, singleLang)
                  : undefined
              }
            />
          )}

          {invitation.blocks.calendar && (
            <CalendarBlock theme={theme} date={date} langKey={singleLang} timeLabel={timeLabel} />
          )}

          {invitation.blocks.countdown && (
            <Countdown
              theme={theme}
              target={date}
              title={t.countdownTitle}
              labels={{ days: t.days, hours: t.hours, minutes: t.minutes, seconds: t.seconds }}
            />
          )}

          {invitation.blocks.program && invitation.blocks.program.length > 0 && (
            <Program
              theme={theme}
              title={t.programTitle}
              items={invitation.blocks.program.map((p) => ({
                time: p.time,
                title: resolveText(p.title, invitation.lang, singleLang),
              }))}
            />
          )}

          {invitation.blocks.venue && (
            <Venue theme={theme} title={t.venueTitle} venue={invitation.blocks.venue} gisLabel={t.gis} gmapsLabel={t.gmaps} />
          )}

          {invitation.blocks.gallery && invitation.blocks.gallery.length > 0 && (
            <Gallery theme={theme} title={t.galleryTitle} photos={invitation.blocks.gallery} />
          )}

          {invitation.blocks.dressCode && (
            <DressCode
              theme={theme}
              title={t.dressTitle}
              text={resolveText(invitation.blocks.dressCode.text, invitation.lang, singleLang)}
              colors={invitation.blocks.dressCode.colors}
            />
          )}

          {invitation.blocks.rsvp && (
            <Rsvp
              theme={theme}
              invitationSlug={invitation.slug}
              labels={{
                title: t.rsvpTitle,
                name: t.rsvpName,
                coming: t.rsvpComing,
                notComing: t.rsvpNotComing,
                guests: t.rsvpGuests,
                wish: t.rsvpWish,
                submit: t.rsvpSubmit,
                thanks: t.rsvpThanks,
              }}
            />
          )}

          {invitation.blocks.finale && (
            <Finale
              theme={theme}
              names={namesLabel}
              dateLabel={`${dateLabel} · ${categoryLabels[invitation.eventType]}`}
              signature={t.finaleSignature}
              madeBy={t.madeBy}
            />
          )}
        </div>
      )}
    </div>
  );
}
