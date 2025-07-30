"use client"

import type { Outcome } from "@/app/page";

function OutcomeItem(
    { outcome, removeHandler }:
        { outcome: Outcome, removeHandler: (id: number) => void }
) {
    return (
        <li className="px-4 flex items-center gap-1 justify-between py-2 border-b border-gray-700">
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-gray-100 w-35">{outcome.name}</span>
                <span className="text-gray-400 w-35">{outcome.date}</span>
                <span className="text-lime-300 w-35">{outcome.cost.toLocaleString()}</span>
            </div>
            <div className="flex gap-1">
                <button
                    onClick={() => removeHandler(outcome.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                >
                    Remove
                </button>
                <button
                    className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 px-3 py-1 rounded transition-colors"
                >
                    Edit
                </button>
            </div>
        </li >
    );
}

export default OutcomeItem;
