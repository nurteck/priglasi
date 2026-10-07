import publicInvites from "@/content/invites.generated.json";
import type { InviteRecord } from "@/types";

/**
 * Каталог приглашений — сгенерирован scripts/build-invites.ts из public/invites/*\/meta.json.
 * Только type="catalog" и published=true, без hostKey (безопасно для клиентских компонентов).
 */
const invites = publicInvites as InviteRecord[];

export function getCatalogInvites(): InviteRecord[] {
  return [...invites].sort((a, b) => a.order - b.order);
}

export function getInviteBySlug(slug: string): InviteRecord | undefined {
  return invites.find((i) => i.slug === slug);
}
