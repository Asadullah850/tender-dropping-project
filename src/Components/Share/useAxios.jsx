
import axios from 'axios';

const useAxios = () => {
    const instance = axios.create({
        baseURL: `https://tender-jamal-server.vercel.app`
        // baseURL: `http://localhost:5173`
      });

    return [instance]
};

export default useAxios;