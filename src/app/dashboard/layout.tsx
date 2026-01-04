export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add auth guard here
  return (
    <div>
      {/* Auth guard will be implemented here */}
      {children}
    </div>
  );
}
