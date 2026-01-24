export const metadata = {
  title: 'Software Engineer',
  description: 'Personal portfolio of a software engineer'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
