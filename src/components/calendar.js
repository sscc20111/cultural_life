import React, { useEffect, useState, useRef } from 'react';
import { parse, format } from 'date-fns';


const Calendar = ({DATE1,DATE2}) => {
    const date = new Date();
    const year = date.getFullYear();
    const [month, setmonth] = useState(date.getMonth() + 1)
    const DayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토'];
    

    const ToDay = format(date, 'yyyyMMdd');
    const thisMonth = new Date(year, month, 0).getDate();//이번달의 일수
    const lastMonth = new Date(year, month-1, 0).getDate();//지난달의 일수
    const lastDay = new Date(year, month - 2, lastMonth).getDay() + 1; // 지난달의 마지막 요일
    const replacedLastDay = (lastDay === 7) ? 0 : lastDay; // (지난달의 마지막 요일) => 7이면 0으로 변환


    const formatDateString = (DATE) => {// Date 객체를 'yyyyMMdd' 형태의 문자열로 변환
        const parsedDate = parse(DATE, 'yyyy.MM.dd', new Date());// 'yyyy.MM.dd' 형태의 문자열을 Date 객체로 변환
        return format(parsedDate, 'yyyyMMdd');
    };
    const parsingDate = (DATE) => {//'yyyyMMdd' 형태에서 day의 index값이 한 자리인 경우 오류 발생 회피
        const parsedDate = parse(`${DATE}`, 'd', new Date())
        return format(parsedDate, 'dd')
    }

    const formatIndexString = (DATE, point) => {// 
        let adjustedMonth = month;
        if (point === 'prev') adjustedMonth = month - 1
        if (point === 'this') adjustedMonth = month
        if (point === 'next') adjustedMonth = month + 1
        const parsedDate = parse(`${adjustedMonth}${parsingDate(DATE)}`, 'Mdd', new Date())
        return format(parsedDate, 'yyyyMMdd');
    }

    const isActive = (index, point) => {//DATE1, DATE2 범위 판별
        return formatDateString(DATE1) <= formatIndexString(index, point) && formatDateString(DATE2) >= formatIndexString(index, point)
    }





    return(
        <div className="calendarWrap">
            <div className='calendarHeader'>
                <button onClick={() => setmonth(month-1)}>&#60;</button>
                <div>{year}. {month}</div>
                <button onClick={() => setmonth(month+1)}>&#62;</button>
            </div>
            {DATE1 && DATE2 ? (
                <ul className='calendarBody'>
                    {DayOfTheWeek.map((item, index) => (/* 요일 */
                        <li key={index} className='style1'>{item}</li>
                    ))}
                    {Array.from({ length: replacedLastDay}, (_, index) => {/* 지난달 노출 */
                        const Index = lastMonth - replacedLastDay + index + 1;
                        
                        return (
                            <li key={index} className={(isActive(Index, 'prev')) ? ('style2'):('style2 disabled')}>{Index}</li>
                        )
                    })}
                    {Array.from({ length: thisMonth}, (_, index) => {/* 이번달 노출 */
                        let ClassName = 'style3 ';
                        if(!isActive(index + 1, 'this')) ClassName += 'disabled '//DATE1, DATE2 범위 판별
                        if(ToDay === formatIndexString(index + 1, 'this'))  ClassName += 'today'//today 판별

                        return (
                            <li key={index} className={ClassName}>{index + 1}</li>
                        )
                    })}
                    {Array.from({ length: 35 - thisMonth - replacedLastDay}, (_, index) => (/* 다음달 노출 */
                        <li key={index} className={(isActive(index + 1, 'next')) ? ('style2'):('style2 disabled')}>{index + 1}</li>
                    ))}
                </ul>
            ):(null)}
        </div>
    )
}

export default Calendar