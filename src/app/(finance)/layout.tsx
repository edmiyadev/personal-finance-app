import { Header } from "@/components/header";

export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex flex-col container mx-auto px-4">
        <Header />
        {children}
      </div>
    </div>
  );
}
