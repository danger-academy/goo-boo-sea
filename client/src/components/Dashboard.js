import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = (props) => {
  const { activePageHeader } = props;
  return (
    <div className="dashboard">
      <div className="title">Ye Olde Book Search</div>
      <div className="subtitle">{activePageHeader}</div>
    </div>
  );
};

Dashboard.propTypes = {
  activePageHeader: PropTypes.string.isRequired
};

export default Dashboard;
