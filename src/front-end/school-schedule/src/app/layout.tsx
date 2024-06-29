export const metadata = {
  title: 'SchoolSdule',
  description: 'Organized material of schools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  )
}
