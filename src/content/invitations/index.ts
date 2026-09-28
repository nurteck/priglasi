import type { Invitation } from "@/types";
import { aibekAizhan } from "./aibek-aizhan";

/**
 * Реестр приглашений клиентов (не демо!). Доступны по /i/[slug].
 * После создания нового файла-приглашения — добавьте его сюда.
 */
export const invitations: Record<string, Invitation> = {
  "aibek-aizhan": aibekAizhan,
};

export function getInvitation(slug: string): Invitation | undefined {
  return invitations[slug];
}
