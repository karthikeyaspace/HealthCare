import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

export default function Gemini() {
    const [response, setResponse] = useState([])
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data, e) => {
        const userInput = data.textInput;
        e.target.reset();
        setResponse(prevResponse => [
            ...prevResponse,
            { message: userInput, fromUser: true }
        ]);
        try {
            const botResponse = await axios.post('http://localhost:5000/genai', { message: userInput });
            setResponse(prevResponse => [
                ...prevResponse,
                { message: botResponse.data, fromUser: false }
            ]);
        } catch (error) {
            console.error('Error occurred while fetching response:', error);
        }
    }
    


    return (
        <div className='pt-12  mb-0 flex flex-col justify-center items-center'>
            <div className="w-3/4 lg:w-1/2 min-h-screen bg-gray-200 ">
                <p>Gemini AI</p>
                <div className="mb-16">
                    {
                        response &&
                        response.map((res, index) => {
                            return (
                                <div key={index} className={`flex ${res.fromUser ? 'justify-end' : 'justify-start'} whitespace-pre`}>
                                    <p className='bg-gray-400 m-2 p-2 rounded-lg w-full'>{res.message}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className="w-full lg:w-1/2 mx-4 fixed bottom-4 ">
                <form onSubmit={handleSubmit(onSubmit)}  >
                    <input type="text" {...register("textInput")} className='w-3/4 lg:w-full h-12 rounded-2xl border-2 px-6 py-2 text-white text-lg bg-gray-400 text-left items-center' required />
                </form>
            </div>
        </div>
    )

}