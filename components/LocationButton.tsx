import Link from "next/link";

type Props = {
  href: string;
  label: string;
  top: string;
  left: string;
};

export default function LocationButton({ href, label, top, left }: Props) {
  return (
    <Link
      href={href}
      style={{ top, left }}
      className="absolute -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 text-xs font-medium bg-white text-[#1a3a2e] border border-[#e5e5e0] rounded-full shadow-sm hover:border-[#1a3a2e] hover:shadow transition-all whitespace-nowrap"
    >
      {label}
    </Link>
  );
}