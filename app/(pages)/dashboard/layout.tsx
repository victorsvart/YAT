import { DesktopNavbar } from "@/app/(components)/desktop-navbar/desktop-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-row bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <nav>
        <DesktopNavbar />
      </nav>
      <section className="w-full px-16">{children}</section>
    </div>
  );
}
