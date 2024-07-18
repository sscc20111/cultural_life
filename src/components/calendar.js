import React, { useEffect, useState, useRef } from 'react';
import { parse, format } from 'date-fns';


const Calendar = ({DATE1,DATE2}) => {
    const date = new Date();
    
    const year = date.getFullYear();
    const [month, setmonth] = useState(date.getMonth() + 1)

    const ToDay = format(date, 'yyyyMMdd');
    const thisMonth = new Date(year, month, 0).getDate();//이번달의 일수
    const lastMonth = new Date(year, month-1, 0).getDate();//지난달의 일수
    const lastDay = new Date(year, month - 2, lastMonth).getDay() + 1; // 지난달의 마지막 요일
    const replacedLastDay = (lastDay === 7) ? 0 : lastDay; // 7이면 0으로 변환

    const DayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const formatDateString = (DATE) => {
        try {
            const parsedDate = parse(DATE, 'yyyy.MM.dd', new Date());// 'yyyy. MM. dd' 형태의 문자열을 Date 객체로 변환
            return format(parsedDate, 'yyyyMMdd');// Date 객체를 'yyyyMMdd' 형태의 문자열로 변환
        } catch (error) {
            console.error('Invalid date format:', error);
            return '';
        }
    };
    const formatIndexString = (DATE) => {
        try {
            if(DATE>9){//index가 두자리
                const parsedDate = parse(`${month}${DATE}`, 'Mdd', new Date())
                return format(parsedDate, 'yyyyMMdd');// Date 객체를 'yyyyMMdd' 형태의 문자열로 변환
            }else{//index가 한자리
                const parsedDate = parse(`${month}${DATE}`, 'Md', new Date())
                return format(parsedDate, 'yyyyMMdd');// Date 객체를 'yyyyMMdd' 형태의 문자열로 변환
            }
        } catch (error) {
            console.error('Invalid date format:', error);
            return '';
        }
    };
    const formatIndexString2 = (DATE) => {
        try {
            if(DATE>9){//index가 두자리
                const parsedDate = parse(`${month-1}${DATE}`, 'Mdd', new Date())
                return format(parsedDate, 'yyyyMMdd');// Date 객체를 'yyyyMMdd' 형태의 문자열로 변환
            }else{//index가 한자리
                const parsedDate = parse(`${month-1}${DATE}`, 'Md', new Date())
                return format(parsedDate, 'yyyyMMdd');// Date 객체를 'yyyyMMdd' 형태의 문자열로 변환
            }
        } catch (error) {
            console.error('Invalid date format:', error);
            return '';
        }
    };
    const formatIndexString3 = (DATE) => {
        try {
            if(DATE>9){//index가 두자리
                const parsedDate = parse(`${month+1}${DATE}`, 'Mdd', new Date())
                return format(parsedDate, 'yyyyMMdd');// Date 객체를 'yyyyMMdd' 형태의 문자열로 변환
            }else{//index가 한자리
                const parsedDate = parse(`${month+1}${DATE}`, 'Md', new Date())
                return format(parsedDate, 'yyyyMMdd');// Date 객체를 'yyyyMMdd' 형태의 문자열로 변환
            }
        } catch (error) {
            console.error('Invalid date format:', error);
            return '';
        }
    };





    return(
        <div className="calendarWrap">
            <div className='calendarHeader'>
                <button onClick={() => setmonth(month-1)}>&#60;</button>
                <div>{year}. {month}</div>
                <button onClick={() => setmonth(month+1)}>&#62;</button>
            </div>
            <ul className='calendarBody'>
                {/* 요일 */}
                {DayOfTheWeek.map((item, index) => (
                    <li key={index} className='style1'>{item}</li>
                ))}
                {/* 지난달의 남은 일수 */}
                {DATE1 || DATE2 ? (
                    Array.from({ length: replacedLastDay}, (_, index) => (
                        (formatDateString(DATE1) <= formatIndexString2(lastMonth - replacedLastDay + index + 1) && formatDateString(DATE2) >= formatIndexString2(lastMonth - replacedLastDay + index + 1)) ? (
                            <li key={index} className='style2 active'>{lastMonth - replacedLastDay + index + 1}</li>
                        ) : (
                            <li key={index} className='style2'>{lastMonth - replacedLastDay + index + 1}</li>
                        )
                    ))
                ):(null)}
                {/* 이번달 일수 */}
                {DATE1 || DATE2 ? (
                    Array.from({ length: thisMonth}, (_, index) => (
                        (formatDateString(DATE1) <= formatIndexString(index + 1) && formatDateString(DATE2) >= formatIndexString(index + 1)) ? (
                            <li key={index} className={ToDay === formatIndexString(index + 1) ? ('style3 active today'):('style3 active')}>{index + 1}</li>
                        ) : (
                            <li key={index} className={ToDay === formatIndexString(index + 1) ? ('style3 today'):('style3')}>{index + 1}</li>
                        )
                    ))
                ):(null)}
                {/* 다음달 일수 */}
                {DATE1 || DATE2 ? (
                    Array.from({ length: 35 - thisMonth - replacedLastDay}, (_, index) => (
                        (formatDateString(DATE1) <= formatIndexString3(index + 1) && formatDateString(DATE2) >= formatIndexString3(index + 1)) ? (
                            <li key={index} className='style2 active'>{index + 1}</li>
                        ) : (
                            <li key={index} className='style2'>{index + 1}</li>
                        )
                    ))
                ):(null)}
                

            </ul>
        </div>
    )
}

export default Calendar