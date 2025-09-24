import React from "react";

export default function AdminCard({ title, image, details, actions }) {
  return (
    <div className="bg-yellow-50 rounded-lg shadow-md hover:shadow-lg overflow-hidden border-2 border-[#5C4033] flex flex-col transition-transform duration-300 hover:-translate-y-1">
      {image && (
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#5C4033]">{title}</h3>
        <p className="text-[#3D2B1F] mt-2">{details}</p>
        <div className="mt-4 flex gap-2 flex-wrap">{actions}</div>
      </div>
    </div>
  );
}
