import style from "./index.module.scss";

type Props = {
  placeholder: string;
  name: string;
  value: string;
  onChange: any;
  error: boolean;
  onClickMax: any;
};

const AmountInput: React.FC<Props> = ({
  placeholder,
  name,
  value,
  onChange,
  error,
  onClickMax,
}) => {
  return (
    <div className={`${style.input_container} ${error && style.show_error}`}>
      <input
        type="text"
        className={style.input_container__input}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
      <p className={style.input_container__max} onClick={onClickMax}>
        Max
      </p>
    </div>
  );
};

export default AmountInput;
