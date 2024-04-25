import './App.css';
import Sidebar from './Slidebar';
import React, { useState } from 'react';
import Chart from "react-apexcharts";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const LandingPage = () => {
  const [date, setDate] = useState(new Date());
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const [mainWrapperMargin, setMainWrapperMargin] = useState('250px');

  const toggleMainWrapperMargin = () => {
    setMainWrapperMargin(prevMargin => prevMargin === '250px' ? '0px' : '250px');
  };
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      },
      {
        name: "series-2",
        data: [10, 30, 60, 40, 34, 68, 80, 100]
      }
    ]
  
  });
  return (
    <>
      <Sidebar toggleMainWrapperMargin={toggleMainWrapperMargin} />
      <div className='content-wrapper main-wrapper' style={{ marginLeft: mainWrapperMargin }}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='dashboard-heading pt-3 pb-3'>
                <h2>Dashboard</h2>
              </div>
            </div>
          </div>
          <div className='row pb-3'>
            <div className='col-3 '>
              <div className='box-main rounded'>
                <div className='add-box'>
                  <div className='box-data pt-2 px-3'>
                    <h1 className='text-light'>150</h1>
                    <p className='text-light'>New Orders</p>
                  </div>
                  <div className='icon'>
                    <i className="fa-solid fa-user fa-2xl"></i>
                  </div>
                </div>
                <div className='box-sub-data rounded'>
                  <p className='text-light'>
                    More info
                  </p>
                </div>
              </div>
            </div>
            <div className='col-3 '>
              <div className='box-main2 rounded'>
                <div className='add-box'>
                  <div className='box-data pt-2 px-3'>
                    <h1 className='text-light'>83%</h1>
                    <p className='text-light'>Bounce Rate</p>
                  </div>
                  <div className='icon'>
                    <i className="fa-solid fa-user fa-2xl"></i>
                  </div>
                </div>
                <div className='box-sub-data rounded'>
                  <p className='text-light'>
                    More info
                  </p>
                </div>
              </div>
            </div>
            <div className='col-3 '>
              <div className='box-main3 rounded'>
                <div className='add-box'>
                  <div className='box-data pt-2 px-3'>
                    <h1 className='text-dark'>160+</h1>
                    <p className='text-dark'>Use Registered</p>
                  </div>
                  <div className='icon'>
                    <i className="fa-solid fa-user fa-2xl"></i>
                  </div>
                </div>
                <div className='box-sub-data rounded'>
                  <p className='text-light'>
                    More info
                  </p>
                </div>
              </div>
            </div>
            <div className='col-3 '>
              <div className='box-main4 rounded'>
                <div className='add-box'>
                  <div className='box-data pt-2 px-3'>
                    <h1 className='text-light'>60</h1>
                    <p className='text-light'>Unique Visitors</p>
                  </div>
                  <div className='icon'>
                    <i className="fa-solid fa-user fa-2xl"></i>
                  </div>
                </div>
                <div className='box-sub-data rounded'>
                  <p className='text-light'>
                    More info
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='row rw'>
            <div className='col-7'>
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"

            />
            </div>
            <div className='col-5'>
            <Chart
              options={state.options}
              series={state.series}
              type="area"
              width="500"

            />
            </div>
          </div>
          <div className='row'>
            <div className='col-7'>
            </div>
            <div className='col-5'>
            <Calendar
              onChange={handleDateChange}
              value={date}
            />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
