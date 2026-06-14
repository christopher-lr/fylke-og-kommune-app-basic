import { useState } from 'react'
import { Button, Fieldset, Label, Radio, Select, Textfield } from "@digdir/designsystemet-react";
import { useFylker } from './hooks/useFylker';
import { useKommuner } from './hooks/useKommuner';
import { useSubmitForm } from './hooks/useSubmitForm';
import type { FormValues } from './types/formValues';
import type { Fylke } from './types/fylke';
import type { Kommune } from './types/kommune';
import './styling/App.css';

function App() {
  const [selectedFylke, setSelectedFylke] = useState<Fylke | undefined>(undefined);
  const [selectedKommune, setSelectedKommune] = useState<Kommune | undefined>(undefined);
  const [comment, setComment] = useState<string>("");

  const { fylker } = useFylker();
  const { kommuner, hentKommuner } = useKommuner();
  const { handleSubmit, loading } = useSubmitForm();

  const handleFylkeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fylkeNummer = event.target.value;
    const fylke = fylker.find((f) => f.fylkesnummer === fylkeNummer)
    setSelectedFylke(fylke);
    setSelectedKommune(undefined);
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const submit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFylke || !selectedKommune) {
      return;
    }

    const data: FormValues = {
      countyNumber: selectedFylke.fylkesnummer,
      countyName: selectedFylke.fylkesnavn,
      municipalityNumber: selectedKommune.kommunenummer,
      municipalityName: selectedKommune.kommunenavn,
      comment: comment || undefined,
    };

    const res = await handleSubmit(selectedKommune.kommunenummer, data);
    if (res) {
      const responseData = await res.json();
      alert(responseData.text + " Du sendte verdiene: " + `
      
      Fylkesnavn: ${data.countyName}
      Fylkesnummer: ${data.countyNumber}
      Kommunenavn: ${data.municipalityName}
      Kommunenummer: ${data.municipalityNumber}
      Kommentar: ${data.comment ? data.comment : "Ingen kommentar!"}`
      );
    }
  };

  const renderKommuner = () => (
    <Fieldset className="kommuner-grid">
      {kommuner.map(kommune => (
        <Radio
          className="kommune-item"
          key={kommune.kommunenummer}
          name='kommuner'
          label={kommune.kommunenavn}
          value={kommune.kommunenummer}
          checked={selectedKommune === kommune}
          onChange={() => setSelectedKommune(kommune)}
        />
      ))}
    </Fieldset>
  )

  return (
    <>
      <form onSubmit={submit} className="centered-form">
        <div>
          <Label>Velg et fylke</Label>
          <Select
            value={selectedFylke?.fylkesnummer ?? ""}
            onChange={handleFylkeChange}>
            {fylker.map((fylke) => (
              <Select.Option key={fylke.fylkesnummer} value={fylke.fylkesnummer}>
                {fylke.fylkesnavn}
              </Select.Option>
            ))}
          </Select>
        </div>

        <Button
          disabled={selectedFylke === undefined}
          onClick={() => selectedFylke && hentKommuner(selectedFylke?.fylkesnummer)}>
          Hent detaljer
        </Button>

        {kommuner.length > 0 && renderKommuner()}

        <Textfield
          label={selectedKommune ? `Valgfri kommentar for ${selectedKommune?.kommunenavn}` : ""}
          placeholder="Skriv en kommentar"
          disabled={selectedKommune === undefined}
          onChange={handleCommentChange}
          value={comment}
        />

        <Button
          type="submit"
          loading={loading}
          disabled={selectedKommune === undefined}>
          Send inn
        </Button>
      </form>
    </>
  )
}

export default App
