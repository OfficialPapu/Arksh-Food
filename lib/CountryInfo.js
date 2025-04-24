import axios from "axios";
export const CountryInfo = async (ip) => {
    try {
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);
        const { country_name, city } = response.data;
        return {
            Country: country_name || null,
            City: city || null,
        };
    } catch (error) {
        return { Country: null, City: null };
    }
};