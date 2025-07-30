"use client"

import Outcomes from "@/components/Outcomes";
import React, { useState, useEffect } from "react";

export type Outcome = {
    id: number;
    name: string;
    date: string;
    cost: number;
}

export default function Home() {

    // YYYY-MM-DD
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const [outcomes, setOutcome] = useState<Outcome[]>([]);

    const [totalCost, setTotalCost] = useState(0);

    const [newOutcome, setNewOutcome] = useState<Outcome>({
        id: Date.now(),
        name: "",
        date: getTodayDate(),
        cost: 0,
    });

    useEffect(() => {
        const saveOutcomes = localStorage.getItem("outcomes");
        if (saveOutcomes) {
            const parsed = JSON.parse(saveOutcomes);
            setOutcome(parsed);
            setOutcome(sortByDateDesc(parsed));
            setTotalCost(outcomes.reduce((sum, outcome) => sum + outcome.cost, 0));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("outcomes", JSON.stringify(outcomes));
        setTotalCost(outcomes.reduce((sum, outcome) => sum + outcome.cost, 0));
    }, [outcomes]);


    const addOutcome = () => {
        if (
            newOutcome.cost !== 0 &&
            newOutcome.name.trim() !== "" &&
            newOutcome.date.trim() !== ""
        ) {
            // sort first
            const updated = sortByDateDesc([
                ...outcomes,
                {
                    ...newOutcome,
                    id: Date.now(),
                },
            ]);
            // update value
            setOutcome(updated);
        }
    };

    const sortByDateDesc = (outcomes: Outcome[]) =>
        outcomes.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const removeHandler = (id: Number) => {
        setOutcome(sortByDateDesc(outcomes))
        setOutcome(outcomes.filter(o => o.id !== id));
    };

    return (
        <>
            <h1 className="">Finance</h1>
            <div>
                <input
                    type="text"
                    placeholder="name"
                    value={newOutcome.name}
                    onChange={e => setNewOutcome({ ...newOutcome, name: e.target.value })}
                />
                <input
                    type="date"
                    value={newOutcome.date}
                    onChange={e => setNewOutcome({ ...newOutcome, date: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Cost"
                    value={newOutcome.cost === 0 ? "" : newOutcome.cost}
                    onChange={e => setNewOutcome({ ...newOutcome, cost: Number(e.target.value) })}
                />
                <button onClick={addOutcome}>Add</button>
                <Outcomes outcomes={outcomes} removeHandler={removeHandler} />
            </div>
            <h2>Total cost: {totalCost}</h2>
        </>
    );
}
