import React from "react";

function WhatsAppButton() {
  const phoneNumber = "+94771234567";
  const message = "Hello! I would like to know more about your products.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-50 transition whatsapp-pulse"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48A11.87 11.87 0 0012 0C5.373 0 0 5.373 0 12a11.937 11.937 0 002.957 7.875L0 24l4.313-2.957A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12 0-3.187-1.246-6.187-3.48-8.52zm-8.52 17.01a9.933 9.933 0 01-5.35-1.588l-.383-.228-2.56 1.755.682-2.63-.246-.395A9.963 9.963 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10zm5.338-7.44c-.295-.148-1.746-.863-2.018-.963-.271-.1-.468-.148-.666.15s-.763.963-.936 1.16c-.173.198-.347.223-.642.074-.295-.148-1.245-.46-2.372-1.46-.877-.78-1.468-1.74-1.642-2.034-.173-.295-.018-.454.13-.601.134-.133.295-.347.443-.52.148-.173.197-.296.296-.494.1-.198.05-.37-.025-.518-.075-.148-.666-1.607-.91-2.204-.24-.579-.484-.5-.666-.51l-.57-.01c-.197 0-.518.074-.79.37s-1.038 1.016-1.038 2.48c0 1.463 1.064 2.877 1.213 3.074.148.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.87.118.57-.085 1.746-.713 1.995-1.403.248-.69.248-1.283.173-1.403-.074-.118-.271-.198-.566-.346z" />
      </svg>
    </a>
  );
}

export default WhatsAppButton;
