'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ items }) => (
  <div>
    {JSON.stringify(items)}
  </div>
);

Menu.propTypes = {
  items: PropTypes.array // TODO: better validation
};

export default Menu;