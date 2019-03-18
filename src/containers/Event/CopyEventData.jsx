import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { copyTextToClipboard } from '../../util/copyTextToClipboard';

const CopyEventData = ({ participants, attendanceByCompany }) => {
  const allNames = participants
    .map(person => `${person.first_name} ${person.last_name}`)
    .join(', ');
  const allCompanies = attendanceByCompany
    .map(company => `${company.company_name}(${company.attendees})`)
    .join(', ');
  return (
    <Fragment>
      <Button
        color="primary"
        onClick={evt => copyTextToClipboard(allNames, evt.target)}>
        Kopier alle personer
      </Button>

      <Button
        color="primary"
        onClick={evt => copyTextToClipboard(allCompanies, evt.target)}>
        Kopier alle firmaer med antall
      </Button>
    </Fragment>
  );
};

CopyEventData.propTypes = {
  attendanceByCompany: PropTypes.arrayOf(
    PropTypes.shape({
      attendees: PropTypes.number,
      company_name: PropTypes.string,
    }),
  ),
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  ),
};

export default CopyEventData;
