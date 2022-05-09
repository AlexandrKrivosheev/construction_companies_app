import { useState } from "react";
import { CompaniesTable } from "./CompaniesTable";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useCompaniesApi } from "./useCompaniesApi";

const specialties = ["excavation", "plumbing", "electrical"];
const iniFilters = {
  name: "",
  ...specialties.reduce((acc, s) => ({ ...acc, [s]: false }), {}),
};

export const Companies = () => {
  const { data: companies = [], isLoading, error } = useCompaniesApi();
  const [filters, setFilters] = useState(iniFilters);

  const checkedSpecialties = specialties.filter(
    (specialty) => filters[specialty]
  );
  const filteredCompanies = companies.filter((company) => {
    if (!company.name.includes(filters.name)) {
      return false;
    }

    let hasSpecialties = true;
    for (const specialty of checkedSpecialties) {
      if (!company.specialties.includes(specialty)) {
        hasSpecialties = false;
        break;
      }
    }

    if (!hasSpecialties) {
      return false;
    }

    return true;
  });

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <div style={{ height: 16, padding: 16 }}>
          {isLoading ? "loading..." : null}
          {error ? error.message : null}
        </div>

        <Paper style={{ padding: 16 }}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="subtitle1">Filters</Typography>
            </Grid>
            <Grid item>
              <TextField
                value={filters.name}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                label="Company name"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Specialties</Typography>
              <FormGroup>
                {specialties.map((s) => (
                  <FormControlLabel
                    key={s}
                    control={<Checkbox />}
                    label={s}
                    checked={filters[s]}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [s]: e.target.checked,
                      }))
                    }
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <CompaniesTable rows={filteredCompanies} />
      </Grid>
    </Grid>
  );
};
