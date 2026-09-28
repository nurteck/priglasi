import type { Invitation } from "@/types";

/**
 * Реестр приглашений клиентов. Доступны по /i/[slug].
 *
 * Сейчас пуст — приглашения создаются по одному для каждого клиента
 * (см. src/content/invitations/_template.ts и README → «Как создать
 * приглашение клиенту»). После создания нового файла-приглашения
 * добавьте его сюда: import { slug } from "./slug"; и впишите в объект ниже.
 */
export const invitations: Record<string, Invitation> = {};

export function getInvitation(slug: string): Invitation | undefined {
  return invitations[slug];
}
