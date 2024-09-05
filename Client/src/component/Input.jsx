import Prop_Types from 'prop-types'
const Input = ({inputType,inputStyle,inputChange,inputValue,placeholderText,LabelText,LabelStyle}) => {
  return (
    <>
        <label htmlFor="">
            {LabelText && <span className={LabelStyle}>{LabelText}</span>}
        </label>
        <input type={inputType} className={`${inputStyle}`} placeholder={placeholderText} onChange={inputChange} value={inputValue}/>
    </>
  )
}

Input.propTypes={
  inputType:Prop_Types.string,
  inputStyle:Prop_Types.string,
  inputChange:Prop_Types.func,
  inputValue:Prop_Types.string,
  placeholderText:Prop_Types.string,
  LabelText:Prop_Types.string,
  LabelStyle:Prop_Types.string
}
export default Input
