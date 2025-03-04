
import { HexColorPicker} from 'react-colorful';
import { useState } from "react";

const DefaultTemplate = () => {
 
  const [color, setColor] = useState('#000000');
  const [slidePopUp, setSlidePopUp] = useState(false);

  return (
    <div>
      <h1 className='font-bold'>Choose the template</h1>
      <div className='relative flex mt-4'>
        <h2 className='font-bold'>slide color : </h2>
        <div onClick={()=>setSlidePopUp((popUp)=>!popUp)} className= "w-10 h-10 border-6 border-amber-200" style={{ background:`${color}`, marginLeft:'10px'}}>     
        </div>
        <HexColorPicker  className={`absolute left-10 ${slidePopUp? "visible" : "invisible"} `}  color={color} onChange={setColor} />
      
      </div>
   </div>
  )
}

export default DefaultTemplate
