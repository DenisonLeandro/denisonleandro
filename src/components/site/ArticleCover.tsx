/** Article cover shown whole (never cropped) over a blurred, darkened copy of itself. */
export function ArticleCover({
  src,
  alt,
  className = "aspect-[16/10] w-full",
  imgClassName = "h-full w-full object-contain",
  loading,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
}) {
  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading={loading}
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
      />
      <div className="absolute inset-0 bg-navy/55" aria-hidden="true" />
      <img src={src} alt={alt} loading={loading} className={`relative mx-auto ${imgClassName}`} />
    </div>
  );
}
