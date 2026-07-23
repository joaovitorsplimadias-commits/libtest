"use client";

import { useEffect, useMemo, useState } from "react";
import SideBar from "@/components/layout/sideBar/SideBar";
import styles from "./App.module.css";

const books = [
  {
    title: "Dom Casmurro",
    author: "Machado de Assis",
    genre: "romance",
    isbn: "8508136121",
    cover: "https://covers.openlibrary.org/b/isbn/8508136121-L.jpg",
  },
  {
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    genre: "romance",
    isbn: "9788525056131",
    cover: "https://covers.openlibrary.org/b/isbn/9788525056131-L.jpg",
  },
  {
    title: "Duna",
    author: "Frank Herbert",
    genre: "ficcao-cientifica",
    isbn: "9788576573197",
    cover: "https://covers.openlibrary.org/b/isbn/9788576573197-L.jpg",
  },
  {
    title: "Fundação",
    author: "Isaac Asimov",
    genre: "ficcao-cientifica",
    isbn: "9788576573265",
    cover: "https://covers.openlibrary.org/b/isbn/9788576573265-L.jpg",
  },
  {
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    genre: "fantasia",
    isbn: "9788595084759",
    cover: "https://covers.openlibrary.org/b/isbn/9788595084759-L.jpg",
  },
  {
    title: "O Nome do Vento",
    author: "Patrick Rothfuss",
    genre: "fantasia",
    isbn: "9788580573026",
    cover: "https://covers.openlibrary.org/b/isbn/9788580573026-L.jpg",
  },
  {
    title: "It: A Coisa",
    author: "Stephen King",
    genre: "terror",
    isbn: "9788581050514",
    cover: "https://covers.openlibrary.org/b/isbn/9788581050514-L.jpg",
  },
  {
    title: "Drácula",
    author: "Bram Stoker",
    genre: "terror",
    isbn: "9788544001737",
    cover: "https://covers.openlibrary.org/b/isbn/9788544001737-L.jpg",
  },
  {
    title: "Garota Exemplar",
    author: "Gillian Flynn",
    genre: "suspense",
    isbn: "9788580574399",
    cover: "https://covers.openlibrary.org/b/isbn/9788580574399-L.jpg",
  },
  {
    title: "O Silêncio dos Inocentes",
    author: "Thomas Harris",
    genre: "suspense",
    isbn: "9788576571100",
    cover: "https://covers.openlibrary.org/b/isbn/9788576571100-L.jpg",
  },
  {
    title: "Assassinato no Expresso do Oriente",
    author: "Agatha Christie",
    genre: "misterio",
    isbn: "9788595084179",
    cover: "https://covers.openlibrary.org/b/isbn/9788595084179-L.jpg",
  },
  {
    title: "As Aventuras de Sherlock Holmes",
    author: "Arthur Conan Doyle",
    genre: "misterio",
    isbn: "9788542212194",
    cover: "https://covers.openlibrary.org/b/isbn/9788542212194-L.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "distopia",
    isbn: "9788535914849",
    cover: "https://covers.openlibrary.org/b/isbn/9788535914849-L.jpg",
  },
  {
    title: "Admirável Mundo Novo",
    author: "Aldous Huxley",
    genre: "distopia",
    isbn: "9788525041949",
    cover: "https://covers.openlibrary.org/b/isbn/9788525041949-L.jpg",
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    genre: "biografia",
    isbn: "9788580411978",
    cover: "https://covers.openlibrary.org/b/isbn/9788580411978-L.jpg",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "biografia",
    isbn: "9788525432704",
    cover: "https://covers.openlibrary.org/b/isbn/9788525432704-L.jpg",
  },
  {
    title: "O Poder do Hábito",
    author: "Charles Duhigg",
    genre: "autoajuda",
    isbn: "9788580421885",
    cover: "https://covers.openlibrary.org/b/isbn/9788580421885-L.jpg",
  },
  {
    title: "Pai Rico, Pai Pobre",
    author: "Robert Kiyosaki",
    genre: "autoajuda",
    isbn: "9788595081538",
    cover: "https://covers.openlibrary.org/b/isbn/9788595081538-L.jpg",
  },
];

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#"];


function getTitleLetter(title) {
  const char = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .charAt(0)
    .toUpperCase();

  return /[A-Z]/.test(char) ? char : "#";
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  const booksMatchingSearch = useMemo(() => {
    return books.filter((book) => {
      const matchesQuery =
        !query ||
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.genre.toLowerCase().includes(query.toLowerCase());

      const matchesGenre = !genre || book.genre === genre;

      return matchesQuery && matchesGenre;
    });
  }, [query, genre]);

  
  const availableLetters = useMemo(() => {
    return new Set(booksMatchingSearch.map((book) => getTitleLetter(book.title)));
  }, [booksMatchingSearch]);

  const filteredBooks = useMemo(() => {
    if (!selectedLetter) return booksMatchingSearch;
    return booksMatchingSearch.filter((book) => getTitleLetter(book.title) === selectedLetter);
  }, [booksMatchingSearch, selectedLetter]);

  
  useEffect(() => {
    if (selectedLetter && !availableLetters.has(selectedLetter)) {
      setSelectedLetter("");
    }
  }, [availableLetters, selectedLetter]);

  return (
    <div className={styles.container}>
      <SideBar />

      <div className={styles.content}>
        <h1 className={styles.title}>Página Inicial</h1>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Título, autor, gênero..."
            className={styles.searchInput}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <select className={styles.genreSelect} value={genre} onChange={(event) => setGenre(event.target.value)}>
            <option value="">Todos os gêneros</option>
            <optgroup label="Ficção">
              <option value="romance">Romance</option>
              <option value="ficcao-cientifica">Ficção Científica</option>
              <option value="fantasia">Fantasia</option>
              <option value="terror">Terror</option>
              <option value="suspense">Suspense/Thriller</option>
              <option value="misterio">Mistério/Policial</option>
              <option value="distopia">Distopia</option>
            </optgroup>
            <optgroup label="Não-ficção">
              <option value="biografia">Biografia/Autobiografia</option>
              <option value="autoajuda">Autoajuda</option>
              <option value="negocios">Negócios/Empreendedorismo</option>
              <option value="historia">História</option>
              <option value="filosofia">Filosofia</option>
              <option value="psicologia">Psicologia</option>
              <option value="ciencia">Ciência</option>
              <option value="religiao">Religião/Espiritualidade</option>
              <option value="politica">Política</option>
              <option value="culinaria">Culinária</option>
              <option value="saude">Saúde/Bem-estar</option>
            </optgroup>
          </select>
        </div>

        <div className={styles.alfabeto}>
          {alphabet.map((letter) => {
            const isActive = selectedLetter === letter;
            const isAvailable = availableLetters.has(letter);

            return (
              <button
                key={letter}
                type="button"
                aria-pressed={isActive}
                disabled={!isAvailable}
                className={[
                  styles.alfabetoButton,
                  isActive && styles.alfabetoButtonActive,
                  !isAvailable && styles.alfabetoButtonDisabled,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setSelectedLetter((prev) => (prev === letter ? "" : letter))}
              >
                {letter}
              </button>
            );
          })}
        </div>

        <div className={styles.catalogo}>
          {filteredBooks.length === 0 ? (
            <p className={styles.emptyState}>Nenhum livro encontrado com esses filtros.</p>
          ) : (
            filteredBooks.map((book) => (
              <article key={book.isbn} className={styles.bookCard}>
                <img className={styles.bookImage} src={book.cover} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <small>{book.genre}</small>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
