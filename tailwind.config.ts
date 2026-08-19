import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'], theme: { extend: { fontFamily: { serif: ['Georgia','serif'], bengali: ['Noto Serif Bengali','serif'] } } }, plugins: [] };
export default config;
