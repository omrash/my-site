import ParticleConstellation from '../components/ParticleConstellation'
import Navigation from '../components/Navigation'
import './globals.css'

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="relative min-h-screen font-inter antialiased">
        <ParticleConstellation />
        <Navigation />
        <main className="relative z-10 pt-20">
          {children}
        </main>
      </body>
    </html>
  )
}
