export default function Bridge({ variant }: { variant: "noir-cream" | "cream-noir" }) {
  return <div className={variant === "noir-cream" ? "bridge-noir-cream" : "bridge-cream-noir"} aria-hidden="true" />;
}
