import symptoms from '../assets/data'

export default function Categories(props) {
    console.log(symptoms)

    function handleCatClick(cat) {
        props.setCategory(cat)
        props.setShowCats(false)
        props.setRecomPage(false)
    }

    function handleRecom() {
        props.setShowCats(false)
        props.setRecomPage(true)
    }

    return (
        <div className='h-screen flex items-center'>
            <div className='w-3/4 relative bg-blue-400 min-h-96 mx-auto px-4 rounded-lg flex flex-col items-center justify-center'>
                <h1 className='font-semibold text-2xl mt-4'>Select Category of your Symptom</h1>
                <div className="cats flex flex-row flex-wrap w-full gap-2 justify-center mt-12 mb-8 ">
                    {
                        Object.keys(symptoms).map((cat, index) => {
                            return (
                                <div className="bg-white text-black  px-5 py-4 rounded-lg text-xl hover:cursor-pointer" key={index} onClick={() => handleCatClick(cat)}>
                                    <h2>{cat}</h2>
                                </div>
                            )
                        })
                    }
                </div>
                <span className='absolute bottom-4 right-4 text-white text-xl font-semibold'>symptoms count: {props.selectedSymptoms.length}</span>

                <div>
                    {
                        props.selectedSymptoms.length > 3 ? (
                            <button onClick={handleRecom} className='px-4 py-2 bg-green-600 border-green-700 border-2 hover:opacity-80 mb-4 rounded-lg text-lg'>
                                Get Recommendation
                            </button>
                        ) : (
                            <p>Select more than 3 symptoms</p>
                        )
                    }


                </div>
            </div>
        </div>
    )
}