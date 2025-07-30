"use client"

import type { Outcome } from "@/app/page";
import OutcomeItem from "./OutcomeItem";

function Outcomes(
    { outcomes, removeHandler }:
        { outcomes: Outcome[], removeHandler: (id: number) => void }
) {
    return (
        <ul className="divide-y divide-gray-700 bg-gray-800 rounded-lg shadow mt-2">
            <li className="px-4 flex items-center gap-1 justify-between py-2 border-b border-gray-700">
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-bold text-gray-100 w-35">Expense Name</span>
                    <span className="font-bold text-gray-100 w-35">Date</span>
                    <span className="font-bold text-gray-100 w-35">Cost (VND)</span>
                </div>
            </li>

            {
                outcomes.map(outcome => (
                    <OutcomeItem key={outcome.id} outcome={outcome} removeHandler={removeHandler} />
                ))
            }
        </ul>
    );
}

export default Outcomes
