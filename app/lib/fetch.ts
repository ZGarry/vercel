
export const fpy = async (
    path: string
  ) => {
    const res = await fetch("http://127.0.0.1:5328" + path)
    let result = await res.text();
    return result;
  };

