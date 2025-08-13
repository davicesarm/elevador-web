'use client';

import { MdRefresh } from "react-icons/md";

export default function ResetButton () {
  return (
    <button
      onClick={() => {
        fetch("http://localhost:8080/reiniciar");
      }}
      className="cursor-pointer font-medium hover:bg-neutral-300 hover:border-neutral-400 mx-auto flex gap-1 items-center text-sm border px-3 py-1 rounded-full border-neutral-300 text-neutral-500">
      <MdRefresh />
      <span>Reiniciar</span>
    </button>
  );
}