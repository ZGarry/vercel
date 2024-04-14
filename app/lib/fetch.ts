
export const fpy = async (
    path: string
  ) => {
    const url =  process.env.VERCEL_ENV === 'production'
    ? process.env.VERCEL_URL
    : '0.0.0.0:5328';
    console.log(process.env.VERCEL_ENV)
    console.log(process.env.VERCEL_URL)
    // 他用link是想我们整个页面都用python！？

    const res = await fetch("http://" + url + ":5328" + path)
    let result = await res.text();
    return result;
  };

