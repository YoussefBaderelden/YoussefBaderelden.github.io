import { profile } from "../data";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8 text-center text-xs text-mute md:px-8">
      © {new Date().getFullYear()} {profile.name} · Mid-level Flutter Engineer · Cairo, Egypt
    </footer>
  );
}
