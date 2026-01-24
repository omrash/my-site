export const metadata = {
  title: 'Hello World',
  description: 'Simple test page'
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
