
import axios from 'axios';

const useAxios = () => {
    const instance = axios.create({
        baseURL: `https://tender-jamal-server.vercel.app`
      });

    return [instance]
};

export default useAxios;