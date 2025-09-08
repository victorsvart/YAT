import { DesktopNavbar } from "@/app/(components)/desktop-navbar/desktop-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-row bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <nav className="flex-shrink-0">
        <DesktopNavbar />
      </nav>
      <section className="w-full">{children}</section>
    </div>
  );
}
