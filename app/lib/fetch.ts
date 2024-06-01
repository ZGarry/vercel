
export const fpy = async (
    path: string
  ) => {
    const url =  process.env.VERCEL_ENV === 'production'
    ? process.env.API_URL
    : 'http://localhost:5328';
    console.log(process.env.VERCEL_ENV)
    console.log(process.env.VERCEL_URL)
    // 他用link是想我们整个页面都用python！？

    const res = await fetch(url + path)
    let result = await res.text();
    return result;
  };

function toJSON(str:string) {
  try {
    const res = JSON.parse(str);
    return res;
  } catch (e) {
    return str;
  }
}


  // 体验好太多了，找文件比之前快无数倍。我可以完全用快捷键就找到非常多内容
  // 激活好了，巴适，最新版确实舒服
  // 独立RPC
  // 有NaN会解析失败，请注意
  export const rpc = async (
    path: string
  ) => {
    const url =  process.env.VERCEL_ENV === 'production'
    ? process.env.API_URL
    : 'http://localhost:5328';
  
    const res = await fetch(url + path)
    let result = await res.text();
    
    // 返回json, 单一的字符串会被直接当成结果，如果真的是json格式，就会以json返回
    // console.log(toJSON(result));
    return toJSON(result);
  };

export const rpc2 = async (
    path: string,
    symbol: string
) => {
  // 判断是否在客户端
  const isClient = typeof window !== 'undefined';

  let url = process.env.VERCEL_ENV === 'production'
      ? process.env.API_URL
      : 'http://localhost:5328';
  if (isClient){
    url = "https://ztoolapi.vercel.app";
  }

  const res = await fetch(url + path + `?stock=${symbol}`);
  let result = await res.text();

  // 返回json, 单一的字符串会被直接当成结果，如果真的是json格式，就会以json返回
  // 不会useclient, 这个逻辑都是在本地完成的吧
  console.log(toJSON(result));
  return toJSON(result);
};