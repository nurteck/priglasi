import allInvites from "@/content/invites.generated.server.json";
import type { InviteRecordWithKey } from "@/types";

/**
 * ВНИМАНИЕ: содержит hostKey. Импортировать только в серверных компонентах
 * и route-хендлерах (/host/[slug], /admin, /api/host/*) — никогда в "use client".
 * Включает все папки public/invites/* (catalog и client, опубликованные и нет).
 */
const invites = allInvites as InviteRecordWithKey[];

export function getAllInvitesWithKey(): InviteRecordWithKey[] {
  return [...invites].sort((a, b) => a.order - b.order);
}

export function getInviteWithKey(slug: string): InviteRecordWithKey | undefined {
  return invites.find((i) => i.slug === slug);
}
