
export const fpy = async (
    path: string
  ) => {
    const url =  process.env.VERCEL_ENV === 'production'
    ? process.env.VERCEL_URL
    : '0.0.0.0:5328';
    console.log(process.env.VERCEL_ENV)

    const res = await fetch("http://" + url + path)
    let result = await res.text();
    return result;
  };

