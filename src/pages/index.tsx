import { Navbar } from '@/components/navbar/Navbar';
import { Header } from '@/components/@index/header/Header';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-between bg-slate-100">
      <Navbar />
      <main className="container grow bg-slate-100 py-20 text-center">
        <Header />
      </main>
      <Footer />
    </div>
  );
}
