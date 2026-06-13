import { useEffect, useState } from "react";
import type { Fylke } from "../types/fylke";

export function useFylker() {
  const [fylker, setFylker] = useState<Fylke[]>([]);

  useEffect(() => {
    fetch('https://api.kartverket.no/kommuneinfo/v1/fylker')
      .then(response => response.json())
      .then(data => setFylker(data as Fylke[]))
      .catch(error => console.error('Error fetching fylker:', error))
  }, []);

  return { fylker };
}
    
