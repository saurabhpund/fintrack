import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BalanceTrendCard = () => {
  return (
    <>
        <div className='w-1/3 p-3 bg-white rounded flex flex-col'>
            <div className='text-xl font-semibold mb-4'>Balance Trend</div>
            <hr />
            <div className='mt-2 flex justify-between'>
              <div>
                <p className='uppercase text-sm text-gray-600'>Today</p>
                <h2 className='text-2xl font-bold'>$ 10,0000</h2>
              </div>
              <div>
                <p className=' text-sm text-gray-600'>vs previous period</p>
                <div className='bg-gray-400 text-gray-700'></div>
              </div>
            </div>
            <div className='flex justify-between mt-2 h-52'>
              <AreaChartComponent />
              </div>
        </div>
    </>
    
  )
}

const AreaChartComponent = () => {

  const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#55286F" fill="#BC96E6" />
        </AreaChart>
      </ResponsiveContainer>
    
  );
}

export default BalanceTrendCard