import './globals.css'

export const metadata = {
  title: 'PãoQuentinho - SAAS',
  description: 'O melhor sistema para padarias',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="bg-[#FDFCFB] antialiased">
        {children}
      </body>
    </html>
  )
}