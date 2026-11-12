/** Browser-only: builds a 1200x630 JPEG with the whole cover centered over a blurred, darkened copy. */
export async function buildShareImage(src: string | Blob): Promise<Blob> {
  const url = typeof src === "string" ? src : URL.createObjectURL(src);
  const img = new Image();
  img.crossOrigin = "anonymous";
  await new Promise<void>((ok, fail) => {
    img.onload = () => ok();
    img.onerror = () => fail(new Error("Não foi possível ler a capa."));
    img.src = url;
  });
  const W = 1200, H = 630;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  const cover = Math.max(W / img.width, H / img.height) * 1.1;
  ctx.filter = "blur(40px)";
  ctx.drawImage(img, (W - img.width * cover) / 2, (H - img.height * cover) / 2, img.width * cover, img.height * cover);
  ctx.filter = "none";
  ctx.fillStyle = "rgba(10,20,40,0.55)";
  ctx.fillRect(0, 0, W, H);
  const fit = Math.min(W / img.width, H / img.height, 1);
  const w = img.width * fit, h = img.height * fit;
  ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
  if (typeof src !== "string") URL.revokeObjectURL(url);
  return await new Promise((ok, fail) => c.toBlob((b) => (b ? ok(b) : fail(new Error("Falha ao gerar imagem."))), "image/jpeg", 0.85));
}
