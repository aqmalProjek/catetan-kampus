import './globals.css'


export const metadata = {
  title: 'Catetan Kampus - Beranda',
  description: 'Catetan Kampus adalah website untuk membahas dan mendiskusikan kampus masing masing',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
   
      <body className='dark:bg-slate-700'>{children}</body>

    </html>
  )
}
