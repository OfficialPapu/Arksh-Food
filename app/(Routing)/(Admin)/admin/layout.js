export const metadata = {
  title: {
    default: 'Arksh Food - Admin Panel',
    template: '%s | Arksh Food',
  },
  description: 'Admin panel for managing Arksh Food website content and orders.',
  metadataBase: new URL('http://food.arkshgroup.com'),
};
export default function RootLayout({ children }) {
  return <div className="lg:px-12 md:px-6 px-2 mt-4">{children}</div>;
}
