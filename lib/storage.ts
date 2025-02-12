export const saveToLocalStorage = (data: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ticketData", JSON.stringify(data));
    }
  };
  
  export const loadFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("ticketData");
      return data ? JSON.parse(data) : null;
    }
    return null;
  };
  