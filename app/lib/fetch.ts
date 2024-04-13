
export const fpy = async (
    path: string
  ) => {
    const res = await fetch('http://localhost' + path)
    let result = await res.text();
    return result;
  };

