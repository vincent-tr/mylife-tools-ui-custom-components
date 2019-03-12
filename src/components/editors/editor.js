'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import String from './string';

import './editor.scss';

// TODO: rules
const editors = {
  string: String, // max length ?
  integer: null, // can be < 0 ?
  number: null, // decimals count, can be < 0 ?, +/- steps ?
  list: null,
  date: null,
  datetime: null,
  bool: null, // splitter or checkbox ?
};

const Editor = React.forwardRef(({ type, ...props }, ref) => {
  const EditorComponent = editors[type];
  if(!EditorComponent) {
    throw new Error(`Bad editor type: '${type}'`);
  }
  return (
    <EditorComponent ref={ref} {...props} />
  );
});

Editor.propTypes = {
  type: PropTypes.string.isRequired
};

Editor.displayName = 'Editor';

export default Editor;