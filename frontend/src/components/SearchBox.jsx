import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox({ initialValue = "", onClose } = {}) {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState({ products: [], categories: [] });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const wrapperRef = useRef(null);
  const abortRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setHighlight(-1);
      }
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  // Fetch search results with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], categories: [] });
      setOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";


      fetch(`${baseURL}/api/search?query=${encodeURIComponent(query.trim())}`, {
        signal: abortRef.current.signal,
      })
        .then((r) => r.json())
        .then((data) => {
          setResults({
            products: data.products || [],
            categories: data.categories || [],
          });
          setOpen(true);
          setHighlight(-1);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error("Search fetch error:", err);
            setLoading(false);
          }
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const combined = [
    ...results.categories.map((c) => ({ type: "category", item: c })),
    ...results.products.map((p) => ({ type: "product", item: p })),
  ];

  const handleSelect = (type, item) => {
    setOpen(false);
    setQuery("");
    if (onClose) onClose();

    if (type === "category") {
      const slug = item.slug || item.name;
      navigate(`/categories/${encodeURIComponent(slug)}`);
    } else {
      navigate(`/products/${item.id}`);
    }
  };

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, combined.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlight >= 0 && combined[highlight]) {
        handleSelect(combined[highlight].type, combined[highlight].item);
      } else {
        navigate(`/search?query=${encodeURIComponent(query.trim())}`);
        if (onClose) onClose();
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search products or categories..."
          className="px-3 py-2 rounded-l-md bg-[#BDA895] text-[#4A2F1D] placeholder-[#4A2F1D] outline-none w-44 md:w-64"
        />
        <button
          onClick={() => {
            if (!query.trim()) return;
            if (results.categories.length === 1 && results.products.length === 0) {
              handleSelect("category", results.categories[0]);
            } else {
              navigate(`/search?query=${encodeURIComponent(query.trim())}`);
              if (onClose) onClose();
              setOpen(false);
            }
          }}
          className="bg-[#E6C152] text-white font-semibold px-3 py-2 rounded-r-md"
        >
          Go
        </button>
      </div>

      {open && (results.categories.length > 0 || results.products.length > 0) && (
        <div className="absolute z-50 mt-2 w-[18rem] md:w-[28rem] bg-white shadow-lg rounded divide-y border">
          {results.categories.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 px-2 py-1">
                Categories
              </div>
              {results.categories.map((c, idx) => (
                <button
                  key={c.id || c.name}
                  onClick={() => handleSelect("category", c)}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-50 ${
                    highlight === idx ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="font-medium text-sm text-[#3A1F04]">{c.name}</div>
                </button>
              ))}
            </div>
          )}

          {results.products.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 px-2 py-1">
                Products
              </div>
              {results.products.map((p, i) => {
                const index = results.categories.length + i;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelect("product", p)}
                    className={`w-full text-left px-3 py-2 flex gap-3 items-center rounded hover:bg-gray-50 ${
                      highlight === index ? "bg-gray-100" : ""
                    }`}
                  >
                    <img
                      src={p.image || "/placeholder.jpg"}
                      alt={p.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-[#3A1F04]">{p.name}</div>
                      <div className="text-xs text-gray-500">
                        {p.category?.name || "Uncategorized"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="absolute right-2 top-2 text-xs text-gray-500">…</div>
      )}
    </div>
  );
}