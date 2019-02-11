import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import styled from '@emotion/styled';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import config from '../../config';
import { fetchEvents } from '../../util/apiEndpoints';
import { spacing, colors } from '../../util/variables';
import {
  fetchCompanies,
  updatePerson,
  addPerson,
} from '../../util/apiEndpoints';

const StyledTextField = styled(TextField)`
  margin: ${spacing.normal} 0;
`;

const StyledSelect = styled(Select)`
  margin: ${spacing.normal} 0;
`;

const StyledButton = styled(Button)`
  background-color: ${colors.knowit.purpleLight};
  color: white;

  &:hover,
  &:focus {
    color: white;
    background-color: ${colors.knowit.purple};
  }
`;

class PersonForm extends React.Component {
  constructor() {
    super();
    this.state = {
      companies: [],
    };
  }
  async componentDidMount() {
    const companies = await fetchCompanies();
    this.setState({ companies });
  }
  onSubmit = async (values, actions) => {
    const { onAddParticipation, person } = this.props;
    const body = {
      first_name: values.first_name,
      last_name: values.last_name,
      company_id: values.company_id,
    };
    let updatedPerson;
    try {
      if (person.id) {
        updatedPerson = await updatePerson(person.id, body);
      } else {
        updatedPerson = await addPerson(values);
      }
      actions.setSubmitting(false);
    } catch (err) {
      console.error(err);
    }
    onAddParticipation(updatedPerson.id, values);
  };

  render() {
    const { companies } = this.state;
    const { person } = this.props;
    return (
      <Fragment>
        <hr />
        <h1>{person.id ? 'Oppdater bruker' : 'Opprett bruker'}</h1>
        <Formik
          initialValues={person}
          onSubmit={this.onSubmit}
          render={({
            values,
            errors,
            status,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <StyledTextField
                label="Fornavn"
                type="text"
                fullWidth
                error={!!errors.first_name}
                name="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
              />
              {errors.first_name && touched.first_name && (
                <div>{errors.first_name}</div>
              )}
              <StyledTextField
                label="Etternavn"
                type="text"
                fullWidth
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
              />
              {errors.last_name && touched.last_name && (
                <div>{errors.last_name}</div>
              )}
              <StyledSelect
                value={values.company_id}
                onChange={handleChange}
                name="company_id"
                fullWidth>
                <MenuItem value="">
                  <em>Ingen</em>
                </MenuItem>
                {companies.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </StyledSelect>

              <StyledTextField
                label="Kortnummer - Read only"
                fullWidth
                defaultValue={values.card_id}
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <StyledButton
                variant="contained"
                type="submit"
                disabled={isSubmitting}>
                Lagre og delta på arrangement
              </StyledButton>
            </form>
          )}
        />
      </Fragment>
    );
  }
}

export default PersonForm;
