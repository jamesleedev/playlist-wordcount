import { Header } from '@/components/@index/header';
import { Footer } from '@/components/footer';
import { Form } from '@/components/form';
import { Navbar } from '@/components/navbar';
import { Success } from '@/components/success/success';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-between font-sans text-slate-900">
      <Navbar />
      <main className="container grow py-20 text-center">
        <Header />
        <Form />
        <Success count={20} errors={8} />
      </main>
      <Footer />
    </div>
  );
}
