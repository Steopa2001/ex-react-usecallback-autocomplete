//Funzione di Debounce generica
const debounce = (callback, delay) => {
  let timeout;
  return (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

import { useCallback, useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [suggerimenti, setSuggerimenti] = useState([]);

  const fetchProducts = async (query) => {
    if (query.trim() === "") {
      setSuggerimenti([]);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3333/products?search=${query}`);
      const data = await res.json();
      setSuggerimenti(data);
      console.log("API");
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), []);

  useEffect(() => {
    debouncedFetchProducts(query);
  }, [query]);

  return (
    <div>
      <h1>Autocomplete</h1>
      <input
        type="text"
        placeholder="Cerca un prodotto..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggerimenti.length > 0 && (
        <div className="dropdown">
          {suggerimenti.map((product) => (
            <p key={product.id}>{product.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

// 📌 Milestone 1: Creare un campo di ricerca e mostrare la lista dei suggerimenti

//     Crea un campo di input (<input type="text">) in cui l’utente può digitare.

//     Effettua una chiamata API a:
//     /products?search=[query]
//         La query deve essere sostituita con il testo digitato.

//     Mostra i risultati API sotto l'input in una tendina di suggerimenti.

//     Se l'utente cancella il testo, la tendina scompare.

// Obiettivo: Mostrare suggerimenti dinamici in base alla ricerca dell'utente.
// 📌 Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca

//     Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
//     Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
//     Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.

// Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.
