export const WHATSAPP_NUMBER = "5543999948455";
export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
export const articleMessage = (title: string, question?: string) =>
  `Olá! Estava lendo o artigo "${title}" no site Denison Leandro e gostaria de uma orientação sobre o meu caso.` +
  (question?.trim() ? `\n\nMinha dúvida: ${question.trim()}` : "");
