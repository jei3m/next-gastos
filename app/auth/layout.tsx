export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-full max-w-[600px] m-auto">
      {children}
    </div>
  );
};