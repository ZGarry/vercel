
export const fpy = async (
    path: string
  ) => {
    const res = await fetch('http://localhost:5328' + path)
    let result = await res.text();
    return result;
  };

