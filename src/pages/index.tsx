import { Header } from '@/components/@index/header';
import { Footer } from '@/components/footer';
import { Form } from '@/components/form';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-between bg-slate-100 font-sans">
      <Navbar />
      <main className="container grow bg-slate-100 py-20 text-center">
        <Header />
        <Form />
      </main>
      <Footer />
    </div>
  );
}
