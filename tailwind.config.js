module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'daheng' : ['Daheng', 'sans-serif'],
        'dimibang' : ['dimibang_new', 'sans-serif'],
        'samlip' : ['SDSamliphopangche_Outline', 'sans-serif'],
        'katuri' : ['Katuri', 'sans-serif'],
        'classic' : ['classic'],
      },
      screens: {
        // 'mobile' : '640px',
        'mobile' : {'max': '640px'},
      }
    
    },
  },
  plugins: [],
}
