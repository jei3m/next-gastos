"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TypographyH4 } from '@/components/custom/typography';
import { fetchTransactions } from '@/store/transactions.store';
import { Transaction, TransactionDetails } from '@/types/transactions.types';
import { toast } from 'sonner';
import DateSelectCard from '@/components/custom/date-select-card';
import { useAccount } from '@/context/account-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import PulseLoader from '@/components/custom/pulse-loader';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const router = useRouter();
  const isMobile = useIsMobile();
  const { selectedAccountID  } = useAccount();

  // Calculate the balance
  const calculateBalance = () => {
    if (!transactions || transactions.length === 0) return 'PHP 0.00';

    const total = transactions.reduce((sum, transaction) => {
      const amount = parseFloat(transaction.total);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    return `PHP ${total.toFixed(2)}`;
  };

  // Handle date range changes from the DateSelectCard component
  const handleDateRangeChange = (start: string, end: string) => {
    setDateStart(start);
    setDateEnd(end);
  };

  // Fetch transactions from API when date range changes
  useEffect(() => {
    if (dateStart && dateEnd && selectedAccountID) {
      setIsLoading(true);
      fetchTransactions(selectedAccountID, dateStart, dateEnd)
        .then((data) => {
          setTransactions(data)
        })
        .catch((error) => {
          if (error instanceof Error) {
            toast.error(error.message)
          };
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [selectedAccountID, dateStart, dateEnd]);

  return (
    <main className={`flex flex-col space-y-2 min-h-screen
      ${isMobile ? 'pb-15' : 'pb-18'}
    `}>

      {/* Date Card Section */}
      <DateSelectCard
        onDateRangeChange={handleDateRangeChange}
        content={<>
          <div className='flex flex-col'>
            <h3 className='text-gray-600 font-normal text-lg'>
              Balance
            </h3>
            <h1 className='text-2xl font-extrabold'>
              {calculateBalance()}
            </h1>
          </div>
          <div className='w-full flex flex-row justify-center space-x-2'>
            <Button
              className='w-[50%] flex flex-row -space-x-1'
              onClick={() => router.push(`/pages/transactions/add?type=income`)}
            >
              <ArrowDownLeft strokeWidth={3}/>
              <span>
                Income
              </span>
            </Button>
            <Button
              variant='destructive'
              className='w-[50%] flex flex-row -space-x-1'
              onClick={() => router.push(`/pages/transactions/add?type=expense`)}
            >
              <ArrowUpRight strokeWidth={3}/>
              <span>
                Expense
              </span>
            </Button>
          </div>
        </>}
      />

      {/* Transactions Section */}
      <section className='flex flex-col space-y-2 px-3 mb-2'>
        <TypographyH4>
          Transactions
        </TypographyH4>
        {isLoading ? (
          <PulseLoader/>
        ):(
          <>
            { transactions && transactions.length > 0 ? (
              <>
                {transactions.map((transaction, index) => (
                  <Card key={index} className='border-2'>
                    <CardHeader>
                      <CardTitle className='flex justify-between'>
                        <span>
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <span
                          className={
                            `${
                              transaction.total.startsWith('-')
                                ? 'text-red-500'
                                : 'text-primary'
                            }`
                          }
                        >
                          PHP {transaction.total}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <div className='w-full border-t border-gray-300' />
                    <CardContent className='-mb-4'>
                      {transaction.details.map((detail: TransactionDetails, index: number) => (
                        <Link key={index} href={`transactions/${detail.id}`}>
                          <div className='space-y-3 flex flex-row items-center justify-between'>
                              <div className='flex flex-col text-sm'>
                                <span>
                                  {detail.category}
                                </span>
                                <span className='text-gray-600'>
                                  {detail.note}
                                </span>
                              </div>
                              <span className={`text-sm ${detail.type === 'income' ? 'text-primary' : 'text-red-500'}`}>
                              PHP
                                {
                                  detail.type === 'income'
                                    ? ' +'
                                    : ' -'
                                }
                              {detail.amount.toFixed(2)}
                              </span>                      
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <TypographyH4 className='text-gray-400 font-semibold text-center'>
                  No Transactions
                </TypographyH4>
                <p className="text-gray-500 text-sm text-center">
                  Start by adding your first transaction
                </p>
              </div>
            )}          
          </>
        )}
      </section>
    </main>
  );
};
