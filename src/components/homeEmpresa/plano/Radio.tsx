import { useContext, createContext } from "react"

const RadioContext = createContext()

export default function Radio({ children, ...props }) {
  const { value, onChange } = useContext(RadioContext)

  return (
    <label
      className={`
        px-6 py-4 shadow rounded-lg cursor-pointer
        transition-all ${
          value === props.value
            ? "bg-gradient-to-t  from-violet-400 to-violet-50 text-violet-800 shadow-violet-500 scale-105"
            : "bg-neutral-100 hover:shadow-md shadow-gray-300"
        }
    `}
    >
      <input
        type="radio"
        className="hidden"
        checked={value === props.value}
        onChange={onChange}
        {...props}
      />
      {children}
    </label>
  )
}

export function RadioGroup({ value, onChange, children }: any) {
  return (
    <RadioContext.Provider value={{ value, onChange }}>
      {children}
    </RadioContext.Provider>
  )
}