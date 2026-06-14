import { useState } from "react";
import type { Kommune } from "../types/kommune";

export const useKommuner = () => {
  const [kommuner, setKommuner] = useState<Kommune[]>([]);

  const hentKommuner = (fylkeNummer: string) => {
    if (fylkeNummer) {
      fetch(`https://api.kartverket.no/kommuneinfo/v1/fylker/${fylkeNummer}`)
        .then(response => response.json())
        .then(data => {
          setKommuner(data.kommuner as Kommune[]);
        })
        .catch(error => console.error('Error fetching kommuner:', error))
    }
  }

  const nullStillKommuner = () => {
    setKommuner([]);
  }

  return { kommuner, hentKommuner, nullStillKommuner };
}
