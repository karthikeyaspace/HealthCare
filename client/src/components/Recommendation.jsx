import { useState, useEffect } from "react"
import axios from 'axios'
import { useForm } from 'react-hook-form'


export default function Recommendation() {
    const [params, setParams] = useState()
    const [recommendation, setRecommendation] = useState()
    const { register, handleSubmit } = useForm()
    const [description, setDescription] = useState()
    const [precautions, setPrecautions] = useState()
    const [gotRecommendation, setGotRecommendation] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:5000/params')
            .then(res => {
                setParams(res.data.params)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    async function onSubmit(data) {
        let selectedParams = [];

        Object.keys(data).forEach(key => {
            if (key.startsWith('checkbox-')) {
                selectedParams.push(data[key] ? 1 : 0);
            }
        });

        
        setRecommendation()
        setDescription()
        setPrecautions([])
        
        console.log(selectedParams);

        await axios.post('http://localhost:5000/predict', selectedParams)
            .then(res => {
                setRecommendation(res.data.prediction)
                setDescription(res.data.description)
            })
            .catch(err => {
                console.log(err)
            })

        setGotRecommendation(true)

    }
    console.log('rec', recommendation)
    console.log('des', description)

    function getPrecautions() {
        axios.post('http://localhost:5000/precaution', recommendation )
            .then(res => {
                setPrecautions(res.data.precautions)
            })
            .catch(err => {
                console.log(err)
            })
        console.log('pre', precautions)
    }


    return (
        <div>
            <h1>Recommendation</h1>

            {params &&

                <form onSubmit={handleSubmit(onSubmit)} >
                    <label>Choose a parameter</label>
                    {
                        params && params.map((param, index) => {
                            return (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        {...register(`checkbox-${index}`)}
                                        value={param}
                                    />
                                    <label>{param}</label>
                                </div>
                            )

                        })
                    }

                    <button type="submit">Get Recommendation</button>
                </form>
            }
            {
                recommendation &&
                recommendation.map((r, index) => {
                    return <p key={index}>{r}</p>
                })
            }
            {
                description && 
                <p>{description}</p>
            }
            {
                gotRecommendation &&
                <button onClick={getPrecautions}>Get precautions</button>
            }
            {
                precautions &&
                precautions.map((p, index) => {
                    return <p key={index}>{p}</p>
                })
            }
        </div>
    )
}