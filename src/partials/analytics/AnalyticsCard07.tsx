import React from 'react';
import { Link } from 'react-router-dom';

function AnalyticsCard07() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Top City</h2>
      </header>
      <div className="grow p-3">
        <div className="flex flex-col h-full">
          {/* Card content */}
          <div className="grow">
            <ul className="flex justify-between text-xs uppercase text-gray-400 font-semibold px-2 space-x-2">
              <li>City Name</li>
              <li>Total</li>
            </ul>

            <ul className="space-y-1 text-sm text-gray-800 mt-3 mb-4">
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-light-blue-100" aria-hidden="true" style={{width: '82%'}}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Jakarta</div>
                  <div className="font-medium">4.2K</div>
                </div>
              </li>
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-light-blue-100" aria-hidden="true" style={{width: '70%'}}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Bandung</div>
                  <div className="font-medium">3.4K</div>
                </div>
              </li>
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-light-blue-100" aria-hidden="true" style={{width: '60%'}}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Surabaya</div>
                  <div className="font-medium">1.6k</div>
                </div>
              </li>
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-light-blue-100" aria-hidden="true" style={{width: '44%'}}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Tangerang Selatan</div>
                  <div className="font-medium">1.2k</div>
                </div>
              </li>
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-light-blue-100" aria-hidden="true" style={{width: '40%'}}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Jogjakarta</div>
                  <div className="font-medium">912</div>
                </div>
              </li>
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-light-blue-100" aria-hidden="true" style={{width: '30%'}}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Solo</div>
                  <div className="font-medium">677</div>
                </div>
              </li>
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-light-blue-100" aria-hidden="true" style={{width: '22%'}}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Sukabumi</div>
                  <div className="font-medium">449</div>
                </div>
              </li>
              {/* Item */}
              <li className="relative px-2 py-1">
                <div className="absolute inset-0 bg-light-blue-100" aria-hidden="true" style={{width: '12%'}}></div>
                <div className="relative flex justify-between space-x-2">
                  <div>Lampung</div>
                  <div className="font-medium">269</div>
                </div>
              </li>
            </ul>
          </div>
          {/* Card footer */}
          <div className="text-center pt-4 pb-1 border-t border-gray-100">
            <Link className="text-sm font-medium text-indigo-500 hover:text-indigo-600" to="#0">Countries Report -&gt;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard07;
