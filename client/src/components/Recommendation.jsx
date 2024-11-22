import { useState, useEffect } from "react"
import axios from 'axios'
import { useForm } from 'react-hook-form'
import left from '../assets/left.svg'


export default function Recommendation(props) {

    const symptoms = props.selectedSymptoms
    console.log(symptoms)
    const [recommendation, setRecommendation] = useState('')
    const [description, setDescription] = useState('')
    const [precautions, setPrecautions] = useState([])

    useEffect(() => {
        axios.post('http://localhost:5000/predict', symptoms)
            .then(res => {
                setRecommendation(res.data.recommendation)
                setDescription(res.data.description)
            })
    }, [])
    console.log(recommendation)

    function handlePrecautions() {
        axios.post('http://localhost:5000/precautions', recommendation)
            .then(res => {
                setPrecautions(res.data.precautions)
            })
    }
    return (
        <div className='h-screen flex items-center'>
            <div className='w-1/2 relative bg-blue-400 min-h-96 mx-auto px-4 rounded-lg flex items-center justify-start flex-col'>
                <span className="absolute top-4 left-4 w-8 text-white text-4xl cursor-pointer flex" onClick={() => props.setShowCats(true)}> <img src={left} className='w-1/2' alt="" /><p className="text-sm ml-2">Edit symptoms</p> </span>
                <h1 className='font-semibold text-2xl mt-4'>Recommendation</h1>
                <div className="cats flex flex-col flex-wrap w-5/6 gap-2 justify-center items-center mt-12 mb-8 ">
                    <div>
                        {
                            recommendation &&
                            <p className="text-2xl ">{recommendation}</p>
                        }
                    </div>
                    <div>
                        {
                            description &&
                            <p>{description}</p>
                        }
                    </div>
                    <div>
                        {
                            recommendation !== "No disease found" &&
                            <button onClick={handlePrecautions} className="bg-green-500 px-2 py-1 rounded-md text-md border-white/55 border-2">Get precautions</button>
                        }
                    </div>
                    <div>
                        <ul>
                            {
                                precautions && precautions.map((precaution, index) => {
                                    if (precaution) {
                                        return <li key={index}>{index + 1}. {precaution}</li>;
                                    }
                                    return null;
                                })
                            }

                        </ul>
                    </div>
                </div>


            </div>
        </div>
    )
}