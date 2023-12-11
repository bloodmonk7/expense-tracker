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
import { useState, useRef, useEffect } from 'react';
import Modal from '@/components/Modal';

// Firebase

import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';

// Icons

import { FaRegTrashAlt } from 'react-icons/fa';

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
  const [income, setIncome] = useState([]);

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);

  const amountRef = useRef();
  const descriptionRef = useRef();

  // Handler functions

  // Add income to db
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    const collectionRef = collection(db, 'income');

    try {
      const docSnap = await addDoc(collectionRef, newIncome);

      // Update state
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });
      descriptionRef.current.value = '';
      amountRef.current.value = '';
    } catch (error) {
      console.log('Error adding income: ', error);
    }
  };

  // Get income from db
  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, 'income');
      const docSnap = await getDocs(collectionRef);

      const data = docSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };

    getIncomeData();
  }, []);

  // Delete income from db
  const deleteIncomeEntryHandler = async (incomeId) => {
    const docRef = doc(db, 'income', incomeId);
    try {
      await deleteDoc(docRef);
      // Update state
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log('Error while deleting doc: ', error);
    }
  };

  return (
    <>
      {/* Add Income Modal */}
      <Modal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      >
        <form onSubmit={addIncomeHandler} className="input-group">
          <div className="input-group">
            <label htmlFor="amount">Income Amount 💰</label>
            <input
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Enter income amount here!"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description 🔤</label>
            <input
              type="text"
              name="description"
              ref={descriptionRef}
              placeholder="Enter income description here!"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add entry
          </button>
        </form>

        {/* Income History */}
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl font-bold">Income History ⏳</h3>
          {income.map((i) => {
            return (
              <div
                className="flex items-center justify-between"
                key={i.id}
              >
                <div>
                  <p className="font-semibold">{i.description}</p>
                  <small className="text-xs">
                    {i.createdAt.toISOString()}
                  </small>
                </div>
                <p className="flex items-center gap-2">
                  {currencyFormatter(i.amount)}
                  <button
                    onClick={() => {
                      deleteIncomeEntryHandler(i.id);
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            );
          })}
        </div>
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
                  key={expense.id}
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
