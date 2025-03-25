import { Header } from '@/components/@index/header';
import { Faq } from '@/components/faq';
import { Footer } from '@/components/footer';
import { Form } from '@/components/form';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-between font-sans text-slate-900">
      <Navbar />
      <main className="container grow py-20 text-center">
        <Header />
        <Form />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
