import { useState, useEffect } from "react";
import Categories from "./Categories";
import Params from "./Params";
import symptomss from '../assets/data'
import Recommendation from "./Recommendation";

export default function S2d() {
    const [showCats, setShowCats] = useState(true)
    const [category, setCategory] = useState("")
    const [symptoms, setSymptoms] = useState([])
    const [selectedSymptoms, setSelectedSymptoms] = useState([])
    const [recomPage, setRecomPage] = useState(false)

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
                    setRecomPage={setRecomPage}
                /> : 
                (
                    recomPage ? 
                    <Recommendation 
                        selectedSymptoms={selectedSymptoms}
                        setShowCats={setShowCats}
                        setRecomPage={setRecomPage}
                    /> :
                    <Params 
                        symptoms={symptoms}
                        category={category}
                        selectedSymptoms={selectedSymptoms}
                        setSelectedSymptoms={setSelectedSymptoms}
                        setShowCats={setShowCats}
                    />
                    
                )
                
            }
        </>
    )
}