const fs = require('fs');
const axios = require('axios');

// List of all countries
const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia_and_Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina_Faso", "Burundi", "Cabo_Verde", "Cambodia", "Cameroon",
    "Canada", "Central_African_Republic", "Chad", "Chile", "China",
    "Colombia", "Comoros", "Congo", "Congo_(Democratic_Republic_of_the)",
    "Costa_Rica", "Croatia", "Cuba", "Cyprus", "Czech_Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican_Republic", "Ecuador",
    "Egypt", "El_Salvador", "Equatorial_Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
    "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Korea_(North)", "Korea_(South)",
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Marshall_Islands", "Mauritania", "Mauritius",
    "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New_Zealand", "Nicaragua",
    "Niger", "Nigeria", "North_Macedonia", "Norway", "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua_New_Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint_Kitts_and_Nevis",
    "Saint_Lucia", "Saint_Vincent_and_the_Grenadines", "Samoa", "San_Marino", 
    "Sao_Tome_and_Principe", "Saudi_Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra_Leone", "Singapore", "Slovakia", "Slovenia", "Solomon_Islands",
    "Somalia", "South_Africa", "South_Africa", "Spain", "Sri_Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo",
    "Tonga", "Trinidad_and_Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United_Arab_Emirates", "United_Kingdom",
    "United_States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican_City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// Create a directory for SVG files
const dir = './Countries_SVG';
fs.mkdirSync(dir, { recursive: true });

// Function to download SVG file
const downloadSVG = async (country) => {
    try {
        const url = `https://path/to/svg/${country}.svg`; // Replace with the actual URL
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const filePath = `${dir}/${country}.svg`;
        fs.writeFileSync(filePath, response.data);
        console.log(`Downloaded: ${country}.svg`);
    } catch (error) {
        console.error(`Failed to download ${country}: ${error.message}`);
    }
};

// Download all SVG files
const downloadAllSVGs = async () => {
    for (const country of countries) {
        await downloadSVG(country);
    }
};

downloadAllSVGs();