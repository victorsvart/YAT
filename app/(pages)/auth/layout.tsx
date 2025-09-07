import { geistMono, geistSans } from "@/app/(components)/fonts";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black to-[#0a0f2c]`}
    >
      <div className="w-96 bg-zinc-950/90 border border-gray-700 shadow-lg backdrop-blur-sm rounded-2xl focus-within:border-gray-500 transition-all">
        {children}
      </div>
    </div>
  );
}
