'use client';

import { currencyFormatter } from '@/lib/utils';
import ExpenseCategoryItem from '@/components/ExpenseCategoryItem';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState } from 'react';
import Modal from '@/components/Modal';

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: 'Movie night',
    color: '#000',
    total: 500,
  },
  {
    id: 2,
    title: 'Dinner night',
    color: '#123',
    total: 1000,
  },
  {
    id: 3,
    title: 'Desert night',
    color: '#159',
    total: 250,
  },
];

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  return (
    <>
      {/* Modal */}
      <Modal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      >
        <h3>Modal!!!</h3>
      </Modal>
      <main className="container max-w-2xl px-6 mx-auto">
        {/* Balance */}
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">
            {currencyFormatter(100000)}
          </h2>
        </section>
        {/* Buttons */}
        <section className="flex items-center gap-2 py-3">
          <button className="btn btn-primary">+ Expenses</button>
          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>
        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA.map((expense) => {
              return (
                <ExpenseCategoryItem
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>
        {/* Chart Section */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: DUMMY_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: 'Expenses',
                    data: DUMMY_DATA.map((expense) => expense.total),
                    backgroundColor: DUMMY_DATA.map(
                      (expense) => expense.color
                    ),
                    borderColor: ['#18181b'],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
