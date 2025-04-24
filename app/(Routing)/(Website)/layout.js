import Footer from "@/Components/Website/Layout/Footer";
import Navbar from "@/Components/Website/Layout/Navbar";

export const metadata = {
    title: "Arksh Food - Premium Quality Food Products Online in Nepal",
    description: "Explore Arksh Food on Daraz Nepal for a curated selection of high-quality food items. Enjoy unbeatable prices, fresh ingredients, and fast delivery right to your doorstep. Shop now and savor the taste of excellence!",
};

export default function RootLayout({ children }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
