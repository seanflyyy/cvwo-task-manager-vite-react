import React, { useState } from 'react';
import { TextField } from '@mui/material';

export const TaskTitle = () => {
    const [textValue, setTextValue] = useState<string>('');

    const onTextChange = (e: any) => setTextValue(e.target.value);

    return (
        <TextField
            onChange={onTextChange}
            value={textValue}
            label="Text Value" //optional
        />
    );
};
