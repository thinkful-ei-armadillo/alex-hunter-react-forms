import React from 'react';

const NoteContext = React.createContext({
    note: {},
    full: false
});

export default NoteContext;