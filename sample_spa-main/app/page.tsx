"use client";
import { useRouter } from 'next/navigation';

const Home = async ({}) => {

  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <main className="h-screen">
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        Olá, seja bem vindo
      </h1>
      <h3 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">Explicação:</h3>
      <p></p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>


  <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105 active:scale-100">
    Login
  </button>

</div>

    </main>
  );
};

export default Home;
