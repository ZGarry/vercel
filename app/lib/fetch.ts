
export const fpy = async (
    path: string
  ) => {
    const res = await fetch('http://0.0.0.0:5328' + path)
    let result = await res.text();
    return result;
  };

