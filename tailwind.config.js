/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,ts}"];

export const theme = {
  extend: {
    animation: {
      shake: "shake 0.9s ease-in-out infinite",
    },
    keyframes: {
      shake: {
        "0%, 100%": { transform: "translateX(0)" }, // No início e no fim, sem deslocamento
        "25%": { transform: "translateX(-4px)" }, // Move para a esquerda
        "50%": { transform: "translateX(4px)" }, // Move para a direita
        "75%": { transform: "translateX(-4px)" }, // Move para a esquerda novamente
      },
    },
  },
};

export const plugins = [];
