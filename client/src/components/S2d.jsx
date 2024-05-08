import { useState, useEffect } from "react";
import Categories from "./Categories";
import Params from "./Params";
import symptomss from '../assets/data'

export default function S2d() {
    const [showCats, setShowCats] = useState(true)
    const [category, setCategory] = useState("")
    const [symptoms, setSymptoms] = useState([])
    const [selectedSymptoms, setSelectedSymptoms] = useState([])

    useEffect(()=>{
        setSymptoms(symptomss[category])
    }, [category])

    console.log(selectedSymptoms)

    return (
        <>
            {
                showCats ? 
                <Categories 
                    setShowCats={setShowCats}
                    setCategory={setCategory}
                    selectedSymptoms={selectedSymptoms}
                /> : 
                <Params 
                    setShowCats={setShowCats}
                    category={category}
                    symptoms={symptoms}
                    selectedSymptoms={selectedSymptoms}
                    setSelectedSymptoms={setSelectedSymptoms}
                />
            }
        </>
    )
}