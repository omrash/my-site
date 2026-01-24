export const metadata = {
  title: 'Software Engineer',
  description: 'Personal portfolio of a software engineer'
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
