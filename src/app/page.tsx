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
        <div className="w-1/2 mx-auto mt-8 p-6 bg-gray-900 rounded-lg shadow-lg text-gray-100">
            <h1 className="text-2xl font-bold text-lime-400 mb-4 text-center">Finance</h1>
            <div className="flex flex-wrap gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Expense name"
                    value={newOutcome.name}
                    onChange={e => setNewOutcome({ ...newOutcome, name: e.target.value })}
                    className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-100"
                />
                <input
                    type="date"
                    value={newOutcome.date}
                    onChange={e => setNewOutcome({ ...newOutcome, date: e.target.value })}
                    className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-100"
                />
                <input
                    type="number"
                    placeholder="Cost (VND)"
                    value={newOutcome.cost === 0 ? "" : newOutcome.cost}
                    onChange={e => setNewOutcome({ ...newOutcome, cost: Number(e.target.value) })}
                    className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-gray-100"
                />
            </div>
            <div className="flex justify-center mb-4">
                <button
                    onClick={addOutcome}
                    className="px-3 py-1 rounded bg-lime-400 text-gray-900 font-bold hover:bg-lime-300"
                >
                    Add
                </button>
            </div>
            <div className="text-center text-lime-400 text-lg font-semibold mt-6">
                Total expense: {totalCost.toLocaleString()} (VND)
            </div>

            <Outcomes outcomes={outcomes} removeHandler={removeHandler} />
        </div>
    );
}
