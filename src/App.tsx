import { useState } from 'react'
import './App.css'
import { Button, Fieldset, Label, Radio, Select, Textfield } from "@digdir/designsystemet-react";
import { useFylker } from './hooks/use-fylker';
import { useKommuner } from './hooks/use-kommuner';
import type { ValgtKommuneFormValues } from './types/valgt-kommune';
import type { Fylke } from './types/fylke';
import type { Kommune } from './types/kommune';

function App() {
  const [selectedFylke, setSelectedFylke] = useState<Fylke|undefined>(undefined);
  const [selectedKommune, setSelectedKommune] = useState<Kommune|undefined>(undefined)
  const [comment, setComment] = useState<string>("");

  const { fylker } = useFylker();
  const { kommuner, hentKommuner } = useKommuner();


  const handleFylkeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fylkeNummer = event.target.value;
    const fylke = fylker.find((f) => f.fylkesnummer === fylkeNummer)
    setSelectedFylke(fylke);
  }

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const renderKommuner = () => ( 
    <Fieldset>
        {kommuner.map(kommune => (
          <Radio
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

  function sendInn() {
    if (!selectedFylke || !selectedKommune) {
      return
    }

    const data: ValgtKommuneFormValues= {
      "countyNumber": selectedFylke?.fylkesnummer,
      "countyName": selectedFylke?.fylkesnavn,
      "municipalityNumber": selectedKommune?.kommunenummer,
      "municipalityName": selectedKommune?.kommunenavn,
      "comment": comment
    }
    console.log(data)
  }

  return (
    <>
      <form>
        <div>
          <Label>Velg et fylke</Label>
          <Select onChange={handleFylkeChange} defaultValue="">
          {fylker.map((fylke) => (
            <Select.Option key={fylke.fylkesnummer} value={fylke.fylkesnummer}>
              {fylke.fylkesnavn}
            </Select.Option>
          ))}
          </Select>
        </div>
        <Button disabled={selectedFylke === undefined} onClick={() => hentKommuner(selectedFylke ? selectedFylke.fylkesnummer : "")}>
            Hent detaljer
        </Button>
        <div>
           {kommuner.length > 0 && renderKommuner()}
        </div>
        <Textfield 
          label={`Kommentar til ${selectedKommune?.kommunenavn}`}
          onChange={handleCommentChange}
          value={comment}
        />
        <Button onClick={sendInn}>Send inn</Button>
      </form>
    </>
  )
}

export default App
