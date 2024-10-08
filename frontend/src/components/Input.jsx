import React, {useId} from "react";

const Input = React.forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
}, ref){
    const id=useId()
    return (
        <div className="w-full">
            {label &&
                <label className={`inline-block md-1 pl-1 text-lg text-white text-xl`} htmlFor={id} >
                    {label}
                </label>
            }
            <input type={type} className={`$px-3 py-2 px-2 mb-3 rounded-lg text-black outline-none bg-gray-300 focus:bg-gray-50 duration-200 border
                        border-gray-400 w-full ${className}`} ref={ref} id={id} {...props} />
        </div>
    )
})
export default Input;
