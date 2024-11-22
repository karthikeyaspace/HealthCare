import left from '../assets/left.svg'

export default function Params(props){
    let selectedSymptoms = props.selectedSymptoms
    function handleSympClick(symptom) {
        if (props.selectedSymptoms.includes(symptom)) {
            const updatedSymptoms = props.selectedSymptoms.filter(item => item !== symptom);
            props.setSelectedSymptoms(updatedSymptoms);
        } else {
            props.setSelectedSymptoms([...props.selectedSymptoms, symptom]);
        }
    }
    
    

    return (
        <div className='h-screen flex items-center'>
            <div className='w-1/2 relative bg-blue-400 min-h-96 mx-auto px-4 rounded-lg flex items-center justify-center flex-col'>
                <span className="absolute top-4 left-4 w-8 text-white text-4xl cursor-pointer" onClick={() => props.setShowCats(true)}> <img src={left} className='w-full' alt="" /> </span>
                <h1 className='font-semibold text-2xl mt-4'>Select Category of your Symptom</h1>
                <h2 className='text-xl font-bold'>{props.category}</h2>
                <div className="cats flex flex-row flex-wrap w-full gap-2 justify-center mt-12 mb-8 ">
                    {
                        props.symptoms && props.symptoms.map(symptom => (
                            <div key={symptom} className={`rounded-lg p-4 hover:cursor-pointer select-none shadow-md ${selectedSymptoms.includes(symptom) ? 'bg-green-600 text-white' : 'bg-white text-black'}`} onClick={() => handleSympClick(symptom)}>{symptom}</div>
                        ))
                    }
                </div>
                <span className='absolute bottom-4 right-4 text-white text-xl font-semibold'>symptoms count: {selectedSymptoms.length}</span>
            </div>
        </div>
    )
}