import React from 'react';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-md shadow-md">
        <h1 className="text-2xl font-bold">Plates For Us 🍽️</h1>
        <button className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-xl shadow hover:bg-gray-200 transition-all">
          Gestisci Piatti
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col justify-center items-center flex-1 text-center px-4">
        <h2 className="text-4xl font-bold mb-6">Il tuo menu settimanale, semplice e veloce</h2>
        <p className="text-lg mb-10 max-w-xl">
          Genera il piano pasti della settimana con i piatti che conosci e ami cucinare!
        </p>
        <button className="bg-white text-purple-600 text-lg font-bold px-8 py-4 rounded-full shadow-xl hover:bg-gray-100 transition-all">
          Genera Menu Settimanale
        </button>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-white/80">
        Made with ❤️ by Andrea & Annalisa
      </footer>
    </div>
  );
}

export default App;
