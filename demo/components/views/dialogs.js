'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { components, modules } from 'mylife-tools-ui';
import { createUseConnect } from 'react-use-redux';

const { busySet, infoShow, showDialog, Dialog, notificationShow } = modules.dialogs;

const CustomQuestion = ({ open, onClose }) => (
  <Dialog
    open={open}
    keyMap={{ esc: 'cancel', enter: 'ok' }}
    onClose={onClose}
    title={<h2>Custom title</h2>}
    actions={[
      { closeValue: 'ok', content: 'Ok', primary: true, shortcuts: [ 'o' ] },
      { closeValue: 'cancel', content: 'Annuler', shortcuts: [ 'esc' ], isDefault: true }
    ]}>
    {'Custom text'}
  </Dialog>
);

CustomQuestion.propTypes = {
  open: Dialog.propTypes.open,
  onClose: Dialog.propTypes.onClose
};

const CustomAnswer = ({ open, onClose, value }) => (
  <Dialog
    open={open}
    onClose={onClose}
    title={<h3>Custom title</h3>}
    actions={[
      { closeValue: 'ok', content: 'Ok', primary: true, shortcuts: [ 'esc' ] },
    ]}>
    {`Answer : ${value}`}
  </Dialog>
);

CustomAnswer.propTypes = {
  open: Dialog.propTypes.open,
  onClose: Dialog.propTypes.onClose,
  value: PropTypes.string.isRequired
};

async function customDialogs() {
  const value = await showDialog(CustomQuestion);
  showDialog(CustomAnswer, { value });
}

const useConnect = createUseConnect(undefined,
  (dispatch) => ({
    errorClick : () => dispatch(busySet(new Error('Boom!'))),
    busyClick : async () => {
      dispatch(busySet(true));
      await delay(2000);
      dispatch(busySet(false));
    },
    infoClick : () => dispatch(infoShow('information text')),
    notificationClick : (type) => dispatch(notificationShow({ header: type === 'info' ? 'Title' : null, message: `Message ${type.toUpperCase()}`, type: notificationShow.types[type] }))
  })
);

const Dialogs = () => {
  const { errorClick, busyClick, infoClick, notificationClick } = useConnect();
  return (
    <div>
      <div>
        <components.Button onClick={errorClick}>Error</components.Button>
        <components.Button onClick={infoClick}>Info</components.Button>
        <components.Button onClick={busyClick}>Busy</components.Button>
        <components.Button onClick={customDialogs}>Custom</components.Button>
      </div>
      <div>
        <components.Button onClick={() => notificationClick('info')}>Message Info</components.Button>
        <components.Button onClick={() => notificationClick('warning')}>Message Warning</components.Button>
        <components.Button onClick={() => notificationClick('error')}>Message Error</components.Button>
      </div>
    </div>
  );
};

Dialogs.meta = {
  menu: 'Modules',
  icon: null,
  title: 'Dialogs'
};

export default Dialogs;

async function delay(value) {
  return new Promise(resolve =>setTimeout(() => resolve(), value));
}
