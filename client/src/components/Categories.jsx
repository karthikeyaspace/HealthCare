import symptoms from '../assets/data'

export default function Categories(props) {
    console.log(symptoms)

    function handleCatClick(cat){
        props.setCategory(cat)
        props.setShowCats(false)
    }

    return (
        <div className='h-screen flex items-center'>
            <div className='w-1/2 relative bg-blue-400 min-h-96 mx-auto px-4 rounded-lg flex items-center justify-center flex-col'>
                <h1 className='font-semibold text-2xl mt-4'>Select Category of your Symptom</h1>
                <div className="cats flex flex-row flex-wrap w-full gap-2 justify-center mt-12 mb-8 ">
                    {
                        Object.keys(symptoms).map((cat, index)=>{
                            return (
                                <div className="bg-white text-black  px-6 py-6 rounded-lg text-2xl hover:cursor-pointer" key={index} onClick={() => handleCatClick(cat)}>
                                    <h2>{cat}</h2>
                                </div>
                            )
                        })
                    }
                </div>
                <span className='absolute bottom-4 right-4 text-white text-xl font-semibold'>symptoms count: {props.selectedSymptoms.length}</span>
            </div>
        </div>
    )
}