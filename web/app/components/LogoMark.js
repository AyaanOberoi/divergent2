import Image from "next/image";

export default function LogoMark({ className = "", priority = false }) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <Image
        className="object-cover"
        src="/metriq-logo.jpg"
        alt=""
        fill
        sizes="56px"
        priority={priority}
      />
    </span>
  );
}
