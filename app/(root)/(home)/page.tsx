'use client'

import React, { useEffect, useState } from 'react';
import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/useGetCalls';

const Home = () => {
  const now = new Date();
  let time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  time = time.replace('am', 'AM').replace('pm', 'PM');
  const date = (new Intl.DateTimeFormat('en-IN', { dateStyle: 'full' })).format(now);
  const { upcomingCalls } = useGetCalls();
  const [upcomingMeetingTime, setUpcomingMeetingTime] = useState<string | null>(null);
  const [upcomingMeetingDate, setUpcomingMeetingDate] = useState<string | null>(null);

  useEffect(() => {
    if (upcomingCalls.length > 0) {
      const nextMeeting = upcomingCalls[0];
      let meetingTime = nextMeeting.state.startsAt ? new Date(nextMeeting.state.startsAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) : 'Invalid Date';
      meetingTime = meetingTime.replace('am', 'AM').replace('pm', 'PM');
      let meetingDate = nextMeeting.state.startsAt ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'full' }).format(new Date(nextMeeting.state.startsAt)) : 'Invalid Date';
      setUpcomingMeetingTime(meetingTime);
      setUpcomingMeetingDate(meetingDate);
    } else {
      setUpcomingMeetingTime(null);
      setUpcomingMeetingDate(null);
    }
  }, [upcomingCalls]);

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
            {upcomingMeetingTime ? `Upcoming Meeting at: ${upcomingMeetingTime}, ${upcomingMeetingDate}` : 'No Upcoming Meeting'}
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;