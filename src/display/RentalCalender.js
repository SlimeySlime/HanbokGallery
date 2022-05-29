import React, { useState } from "react";

const RentalCalender = () => {

    const [currentMonth, setCurrentMonth] = useState(1)

    return(
    <table className="table-auto flex flex-col min-w-max border">
        <thead className="w-full">
            <tr className="border-b">
                <th className="p-2 border-r h-12 w-16">일요일</th>
                <th className="p-2 border-r">월요일</th>
                <th className="p-2 border-r">화요일</th>
                <th className="p-2 border-r">수요일</th>
                <th className="p-2 border-r">목요일</th>
                <th className="p-2 border-r">금요일</th>
                <th className="p-2 border-r">토요일</th>
            </tr>
        </thead>
        <tbody className="w-full">
            <tr className="text-center h-20 border-b">
                <td className="p-2">
                    <div className="flex h-10 w-10 border-r">
                        1
                    </div>
                </td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
            </tr>
        </tbody>
    </table>
    )
}

export default RentalCalender