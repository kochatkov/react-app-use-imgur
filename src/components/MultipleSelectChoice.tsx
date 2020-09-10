import React from 'react';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'true',
  'false',
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  filteringByEditorsChoice: (value: string[]) => void;
  disabled: boolean;
}

const MultipleSelectChoice: React.FC<Props> = ({filteringByEditorsChoice, disabled}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (value: string[]) => {
    setPersonName(value);
    filteringByEditorsChoice(value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-name-label">Choice</InputLabel>
      <Select
        labelId="demo-mutiple-name-label"
        id="demo-mutiple-name"
        multiple
        value={personName}
        onChange={(e) => handleChange(e.target.value as string[])}
        input={<Input/>}
        MenuProps={MenuProps}
        disabled={disabled}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectChoice;
