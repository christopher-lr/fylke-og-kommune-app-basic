import { useState } from "react";
import type { FormValues } from "../types/formValues";

const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const useSubmitForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    municipalityNumber: string,
    data: Partial<FormValues>
  ): Promise<Response | null> => {

    const url = `/api/municipality/${municipalityNumber}/comments`;

    setLoading(true);
    await delay(3000);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return res;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleSubmit };
};