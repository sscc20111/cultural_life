import React, { useEffect, useState, useRef } from 'react';
import { format, addDays } from 'date-fns';


const Calendar = () => {
    const date = new Date();
    const ToDay = format(date, 'yyyyMMdd');
    // const endDate = format(addDays(date, 10), 'yyyyMMdd'); // 오늘부터 10일 후
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const thisMonth = new Date(year, month, 0).getDate();//이번달의 일수
    const lastMonth = new Date(year, month-1, 0).getDate();//지난달의 일수
    const firstDay = new Date(year, month-1, 1).getDay()+1;//이번달의 첫요일
    const lastDay = new Date(year, month-2, lastMonth).getDay()+1;//지난달의 마지막요일

    // const DATE1 = startDToDayte;
    // const DATE2 = endDate;

    useEffect(() => {
        // console.log(`DATE1 : ${DATE1}, DATE2 : ${DATE2}`)
        console.log(lastDay)
    },[])



    return(
        <div className="calendarWrap">
            <div className='calendarHeader'>{year}. {month}</div>
            <ul className='calendarBody'>
                <li>일</li>
                <li>월</li>
                <li>화</li>
                <li>수</li>
                <li>목</li>
                <li>금</li>
                <li>토</li>
                {Array.from({ length: 35}, (_, index) => (
                    <li key={index}>{index + 1}</li>
                ))}
            </ul>
        </div>
    )
}

export default Calendar