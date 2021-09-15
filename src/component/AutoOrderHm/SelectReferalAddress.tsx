import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSolo() {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={SampleAddres.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} label="freeSolo" margin="normal" variant="outlined" />
        )}
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const SampleAddres = [
{id:1, title: test}
]