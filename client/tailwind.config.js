/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontSize: {
				10: "10px",
				12: "12px",
			},
		},
	},
	plugins: [],
};
