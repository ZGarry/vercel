
export const fpy = async (
    path: string
  ) => {
    const res = await fetch(path)
    let result = await res.text();
    return result;
  };

